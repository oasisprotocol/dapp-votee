// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import { IERC165 } from "@openzeppelin/contracts/interfaces/IERC165.sol";

/**
 * @title Generic ACL interface for DAO polls.
 *
 * Write functions for setting actual permissions are not part of this
 * interface and should be specific to ACL implementations and specific dApp.
 */
interface IPollACL is IERC165 {
    // DAO callback function when a new poll was created. This is typically invoked
    // to assign poll creator as its manager.
    function onPollCreated(bytes32 proposalId, address creator, bytes calldata data) external;

    function onPollClosed(bytes32 proposalId) external;

    // Can a given user manage poll (e.g. close the poll, add eligible voters).
    function canManagePoll(address dao, bytes32 proposalId, address user) external view returns(bool);

    // Is a given user eligible voter for the given poll.
    // Returns the weight of their votes, 0 if they're not allowed to vote!
    function canVoteOnPoll(address dao, bytes32 proposalId, address user, bytes calldata data) external view returns(uint);
}
