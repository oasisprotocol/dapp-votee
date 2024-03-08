// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import { IPollACL } from "../interfaces/IPollACL.sol";
import { IPollManagerACL } from "../interfaces/IPollManagerACL.sol";

contract NativeBalanceACL is IPollACL, IPollManagerACL
{
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

    function onPollCreated(bytes32, address, bytes calldata)
        external
    {
        // Do nothing
    }

    function onPollClosed(bytes32)
        external
    {
        // Do nothing
    }

    function canManagePoll(address, bytes32, address)
        external pure
        returns(bool)
    {
        // Anyone can manage any poll
        return true;
    }

    function canVoteOnPoll(address, bytes32, address who, bytes calldata)
        external view
        returns(uint)
    {
        require(who.balance > 100 ether);
        return 1;
    }
}
