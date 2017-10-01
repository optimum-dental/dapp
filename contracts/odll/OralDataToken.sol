pragma solidity ^0.4.11;

import "../zeppelin/token/StandardToken.sol";

contract OralDataToken is StandardToken {
  // Public variables of the token
  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public initialSupply;// eg. initialSupply.mul(10 ** uint256(decimals));

  /**
   * Constructor function
   *
   * Initializes contract with initial supply tokens to the creator of the contract
   */
  function OralDataToken(
    uint256 initialSupply,
    string tokenName,
    uint8 decimalUnits,
    string tokenSymbol
  ) {
    initialSupply = initialSupply.mul(10 ** uint256(decimals)); // Set initialSupply value to WEI
    balances[msg.sender] = initialSupply;               // Give the creator all initial tokens
    totalSupply = initialSupply;                        // Update total supply
    name = tokenName;                                   // Set the name for display purposes
    symbol = tokenSymbol;                               // Set the symbol for display purposes
    decimals = decimalUnits;                            // Amount of decimals for display purposes
  }
}
