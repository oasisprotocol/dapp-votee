// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

interface IPollManagerACL {
    // Can a given user create a new poll.
    function canCreatePoll(address in_dao, address in_creator) external view returns(bool);
}
