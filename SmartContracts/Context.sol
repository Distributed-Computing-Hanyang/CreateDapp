// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}
