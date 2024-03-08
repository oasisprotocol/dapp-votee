// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import { IPollACL } from "../interfaces/IPollACL.sol";
import { IPollManagerACL } from "../interfaces/IPollManagerACL.sol";

contract NativeBalanceACL is IPollACL, IPollManagerACL
{
    struct ProposalOptions {
        address owner;
        uint256 minBalance;
    }

    mapping(bytes32 => ProposalOptions) private m_proposals;

    function internal_id(bytes32 in_proposalId, address in_pm)
        internal pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(in_proposalId, in_pm));
    }

    function internal_getProposal(bytes32 in_proposalId, address in_pm)
        internal view
        returns (ProposalOptions storage)
    {
        bytes32 id = internal_id(in_proposalId, in_pm);

        ProposalOptions storage prop = m_proposals[id];

        require( prop.owner != address(0), "404" );

        return prop;
    }

    function supportsInterface(bytes4 interfaceId)
        public pure
        returns(bool)
    {
        return interfaceId == type(IPollACL).interfaceId
            || interfaceId == type(IPollManagerACL).interfaceId;
    }

    function canCreatePoll(address, address)
        external pure
        returns(bool)
    {
        return true;
    }

    function onPollCreated(bytes32 in_proposalId, address in_pm, bytes calldata in_data)
        external
    {
        (address owner, uint256 minBalance) = abi.decode(in_data, (address,uint256));

        require( owner != address(0), "owner!" );

        bytes32 id = internal_id(in_proposalId, in_pm);
        require( m_proposals[id].owner == address(0), "404" );

        m_proposals[id] = ProposalOptions(owner, minBalance);
    }

    function onPollClosed(bytes32 in_proposalId)
        external
    {
        bytes32 id = internal_id(in_proposalId, msg.sender);

        ProposalOptions storage prop = m_proposals[id];

        require( prop.owner != address(0), "404" );

        delete m_proposals[id];
    }

    function canManagePoll(address in_pm, bytes32 in_proposalId, address in_who)
        external view
        returns(bool)
    {
        ProposalOptions storage prop = internal_getProposal(in_proposalId, in_pm);

        return prop.owner == in_who;
    }

    function canVoteOnPoll(address in_pm, bytes32 in_proposalId, address who, bytes calldata)
        external view
        returns(uint)
    {
        ProposalOptions storage prop = internal_getProposal(in_proposalId, in_pm);

        require(who.balance > prop.minBalance);

        return 1;
    }
}
