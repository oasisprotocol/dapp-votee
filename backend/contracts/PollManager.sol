// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import { EnumerableSet } from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import { IERC165 } from "@openzeppelin/contracts/interfaces/IERC165.sol";

import { IPollManager } from "../interfaces/IPollManager.sol";
import { IPollACL } from "../interfaces/IPollACL.sol";
import { IPollManagerACL } from "../interfaces/IPollManagerACL.sol";

contract PollManager is IERC165, IPollManager {
    using EnumerableSet for EnumerableSet.Bytes32Set;

    uint256 public constant MAX_CHOICES = 8;

    // ------------------------------------------------------------------------
    // ERRORS

    // Errors relating to the creation of polls
    error Create_NotAllowed();
    error Create_AlreadyExists();
    error Create_NoChoices();
    error Create_InvalidACL();
    error Create_TooManyChoices();

    // Errors relating to voting on polls
    error Vote_NotAllowed();
    error Vote_NotActive();
    error Vote_UnknownChoice();

    // Errors relating to the closing of polls
    error Close_NotAllowed();
    error Close_NotActive();

    // Misc. errors relating to info about polls
    error Poll_NotPublishingVotes();
    error Poll_StillActive();
    error Poll_NotActive();


    // ------------------------------------------------------------------------
    // EVENTS

    event ProposalCreated(bytes32 id);

    event ProposalClosed(bytes32 indexed id, uint256 topChoice);


    // ------------------------------------------------------------------------
    // DATA STRUCTURES

    struct ProposalParams {
        bytes ipfsHash;
        uint8 numChoices;
        uint64 closeTimestamp;
        IPollACL acl;
    }

    struct Proposal {
        bool active;
        uint8 topChoice;
        ProposalParams params;
    }

    struct ProposalWithId {
        bytes32 id;
        Proposal proposal;
    }

    struct Choice {
        uint weight;
        uint8 choice;
    }

    struct Ballot {
        /// voter -> choice id
        mapping(address => Choice) votes;
        /// list of voters that submitted their vote
        address[] voters;
        /// Obscure votes using this xor mask
        uint256 xorMask;
        /// choice id -> vote count
        uint256[MAX_CHOICES] voteCounts;
        uint totalVotes;
    }


    // ------------------------------------------------------------------------
    // CONFIDENTIAL STORAGE

    mapping(bytes32 => Ballot) private s_ballots;

    IPollManagerACL private immutable s_managerACL;


    // ------------------------------------------------------------------------
    // PUBLIC STORAGE

    mapping(bytes32 => Proposal) public PROPOSALS;

    EnumerableSet.Bytes32Set private ACTIVE_PROPOSALS;

    bytes32[] public PAST_PROPOSALS;


    // ------------------------------------------------------------------------

    constructor(IPollManagerACL in_managerACL)
    {
        s_managerACL = in_managerACL;
    }

    // IERC165
    function supportsInterface(bytes4 interfaceId)
        external pure
        returns (bool)
    {
        return interfaceId == type(IERC165).interfaceId
            || interfaceId == type(IPollManager).interfaceId;
    }

    function getACL()
        external view
        returns (IPollManagerACL)
    {
        return s_managerACL;
    }

    function getPollACL(bytes32 proposalId)
        external view
        returns (IPollACL)
    {
        return PROPOSALS[proposalId].params.acl;
    }

    function create(
        ProposalParams calldata in_params,
        bytes calldata in_aclData
    )
        external payable
        returns (bytes32)
    {
        if (!s_managerACL.canCreatePoll(address(this), msg.sender)) {
            revert Create_NotAllowed();
        }

        // User-provided ACL must adhere to IPollACL interface
        if( ! in_params.acl.supportsInterface(type(IPollACL).interfaceId) ) {
            revert Create_InvalidACL();
        }

        if (in_params.numChoices == 0) {
            revert Create_NoChoices();
        }

        if (in_params.numChoices > MAX_CHOICES) {
            revert Create_TooManyChoices();
        }

        bytes32 proposalId = keccak256(abi.encode(msg.sender, in_params, in_aclData));

        if (PROPOSALS[proposalId].active) {
            revert Create_AlreadyExists();
        }

        PROPOSALS[proposalId] = Proposal({
            active: true,
            params: in_params,
            topChoice:0
        });

        ACTIVE_PROPOSALS.add(proposalId);

        Ballot storage ballot = s_ballots[proposalId];

        uint xorMask = ballot.xorMask = uint256(keccak256(abi.encodePacked(address(this), msg.sender)));

        for (uint256 i; i < in_params.numChoices; ++i)
        {
            ballot.voteCounts[i] = xorMask;
        }

        if( in_params.acl != IPollACL(address(0)) )
        {
            in_params.acl.onPollCreated(proposalId, msg.sender, in_aclData);
        }

        emit ProposalCreated(proposalId);

        return proposalId;
    }

    function bool2int(bool a)
        internal pure
        returns (uint b)
    {
        assembly {
            b := a
        }
    }

    function canVoteOnPoll(bytes32 in_proposalId, address in_voter, bytes calldata in_data)
        public view
        returns (uint out_weight)
    {
        Proposal storage proposal = PROPOSALS[in_proposalId];

        // Proposal must be active to vote
        if (!proposal.active) {
            revert Vote_NotActive();
        }

        // No votes allowed after it's closed
        uint closeTimestamp = proposal.params.closeTimestamp;
        if( closeTimestamp != 0 ) {
            if( block.timestamp >= closeTimestamp ) {
                revert Vote_NotActive();
            }
        }

        out_weight = proposal.params.acl.canVoteOnPoll(address(this), in_proposalId, in_voter, in_data);
        if( out_weight == 0 ) {
            revert Vote_NotAllowed();
        }
    }

    function internal_castVote(
        address in_voter,
        bytes32 in_proposalId,
        uint8 in_choiceId,
        bytes calldata in_data
    )
        internal
    {
        uint weight = canVoteOnPoll(in_proposalId, in_voter, in_data);

        Proposal storage proposal = PROPOSALS[in_proposalId];

        uint256 numChoices = proposal.params.numChoices;

        if (in_choiceId >= numChoices) {
            require(false, "Vote_UnknownChoice()");
        }

        Ballot storage ballot = s_ballots[in_proposalId];

        Choice storage existingVote = ballot.votes[in_voter];

        // Use the first weight that was provided
        // As varying weights mid-poll will mess up the ballot voteCounts
        uint existingWeight = existingVote.weight;
        weight = (bool2int(existingWeight == 0) * weight)
               + (bool2int(existingWeight != 0) * existingWeight);

        // Cycle the xor mask on each vote
        // Ensures storage I/O patterns are uniform across all votes
        uint xorMask = ballot.xorMask;
        uint nextXorMask = uint256(keccak256(abi.encodePacked(xorMask)));
        uint existingChoice = existingVote.choice;
        for (uint256 i; i < numChoices; ++i)
        {
            // Modify the vote count in constant time
            uint z = ballot.voteCounts[i];
            uint a = bool2int(i == existingChoice) * existingWeight;
            uint b = bool2int(i == in_choiceId) * weight;
            z ^= xorMask;
            z -= a;
            z += b;
            z ^= nextXorMask;
            ballot.voteCounts[i] = z;
        }

        ballot.xorMask = nextXorMask;

        // Note: this code path reveals (via gas) whether the vote is the first
        //       or if it's somebody changing their vote
        if( 0 == existingWeight )
        {
            ballot.totalVotes += existingWeight;
        }

        existingVote.weight = weight;
        existingVote.choice = in_choiceId;
    }

    function vote(bytes32 in_proposalId, uint8 in_choiceId, bytes calldata in_data)
        external
    {
        internal_castVote(msg.sender, in_proposalId, in_choiceId, in_data);
    }

    function close(bytes32 in_proposalId)
        external
    {
        Proposal storage proposal = PROPOSALS[in_proposalId];
        if (!proposal.active) {
            revert Close_NotActive();
        }

        // If no timestamp is specified, only poll creator can close (at any time)
        uint closeTimestamp = proposal.params.closeTimestamp;
        if( closeTimestamp == 0 )
        {
            if (!proposal.params.acl.canManagePoll(address(this), in_proposalId, msg.sender)) {
                revert Close_NotAllowed();
            }
        }
        else {
            // Otherwise, anybody can close, $now >= closeTimestamp
            if( block.timestamp < closeTimestamp ) {
                revert Close_NotAllowed();
            }
        }

        Ballot storage ballot = s_ballots[in_proposalId];

        uint256 topChoice;
        uint256 topChoiceCount;
        uint256 xorMask = ballot.xorMask;
        for (uint8 i; i < proposal.params.numChoices; ++i)
        {
            uint256 choiceVoteCount = ballot.voteCounts[i] ^ xorMask;
            if (choiceVoteCount > topChoiceCount)
            {
                topChoice = i;
                topChoiceCount = choiceVoteCount;
            }
        }

        PROPOSALS[in_proposalId].topChoice = uint8(topChoice);
        PROPOSALS[in_proposalId].active = false;
        ACTIVE_PROPOSALS.remove(in_proposalId);
        PAST_PROPOSALS.push(in_proposalId);

        proposal.params.acl.onPollClosed(in_proposalId);

        emit ProposalClosed(in_proposalId, topChoice);
    }

    function getVoteCounts(bytes32 in_proposalId)
        external view
        returns (uint256[] memory)
    {
        Proposal storage proposal = PROPOSALS[in_proposalId];

        Ballot storage ballot = s_ballots[in_proposalId];

        // Cannot get vote counts while poll is still active
        if (proposal.active) {
            revert Poll_StillActive();
        }

        uint256[] memory unmaskedVoteCounts = new uint256[](MAX_CHOICES);
        uint256 xorMask = ballot.xorMask;
        for (uint256 i; i<unmaskedVoteCounts.length; i++) {
            unmaskedVoteCounts[i] = ballot.voteCounts[i] ^ xorMask;
        }
        return unmaskedVoteCounts;
    }

    function ballotIsActive(bytes32 in_id)
        external view
        returns (bool)
    {
        return PROPOSALS[in_id].active;
    }
}
