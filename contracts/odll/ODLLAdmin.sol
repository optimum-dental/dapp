pragma solidity ^0.4.11;

import '../zeppelin/lifecycle/Destructible.sol';
import './ODLL.sol';

contract ODLLAdmin {
  ODLL odll;
  address odllAdminAddress;
  bytes name;
  bytes email;

  function ODLLAdmin(address odllAddress, address odllAdminAddress, bytes name, bytes email) {
    odll = ODLL(odllAddress);
    odllAdminAddress = odllAdminAddress;
    name = name;
    email = email;
  }
}
