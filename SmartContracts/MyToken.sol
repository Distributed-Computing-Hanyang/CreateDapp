pragma solidity ^0.5.0;

import "./BasicToken.sol";

contract MyToken is BasicToken {
    uint8 public constant decimals = 18;
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));
    
    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        _balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }
}