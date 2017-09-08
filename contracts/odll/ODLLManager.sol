pragma solidity ^0.4.11;

import '../zeppelin/lifecycle/Destructible.sol';
import './ODLL.sol';

contract ODLLManager {
  ODLL odll;
  address odllManagerAddress;
  bytes name;
  bytes email;

  function ODLLManager(address odllAddress, address odllManagerAddress, bytes name, bytes email) {
    odll = ODLL(odllAddress);
    odllManagerAddress = odllManagerAddress;
    name = name;
    email = email;
  }
}
