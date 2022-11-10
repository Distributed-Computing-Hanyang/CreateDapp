pragma solidity ^0.8.0;

import "./BasicToken.sol";

contract MyToken is BasicToken {
    uint256 public constant INITIAL_SUPPLY = 1000;
    
    constructor() {
        totalSupply_ = INITIAL_SUPPLY;
        _balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }
}
