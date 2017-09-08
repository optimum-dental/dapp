pragma solidity ^0.4.11;

import './zeppelin/lifecycle/Destructible.sol';
import './odll/ODLL.sol';

contract Authentication is Destructible {
  struct User {
    bytes name;
    bytes email;
  }

  mapping (address => User) private users;
  address[] usersArray;

  uint private id; // Stores user id temporarily

  modifier onlyExistingUser {
    // Check if user exists or terminate

    require(!(users[msg.sender].name == 0x0) && !(users[msg.sender].email == 0x0));
    _;
  }

  modifier onlyValidEmail(bytes email) {
    // Only valid emails allowed

    require(!(email == 0x0));
    _;
  }

  modifier onlyValidName(bytes name) {
    // Only valid names allowed

    require(!(name == 0x0));
    _;
  }

  function login() constant
  onlyExistingUser
  returns (bytes, bytes) {
    return (users[msg.sender].name, users[msg.sender].email);
  }

  function signup(bytes name, bytes email)
  payable
  onlyValidName(name)
  onlyValidEmail(email)
  returns (bytes, bytes) {
    // Check if user exists.
    // If yes, return user.
    // If no, check if user details were sent.
    // If yes, create and return user.

    if (users[msg.sender].name == 0x0) users[msg.sender].name = name;
    if (users[msg.sender].email == 0x0) users[msg.sender].email = email;

    return (users[msg.sender].name, users[msg.sender].email);
  }

  function update(bytes name, bytes email)
  payable
  onlyValidName(name)
  onlyValidEmail(email)
  onlyExistingUser
  returns (bytes, bytes) {
    // Update user.

    if (users[msg.sender].name != 0x0) users[msg.sender].name = name;
    if (users[msg.sender].email != 0x0) users[msg.sender].email = email;
    return (users[msg.sender].name, users[msg.sender].email);
  }
}
