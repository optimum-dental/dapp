pragma solidity ^0.4.11;

import '../zeppelin/lifecycle/Destructible.sol';
import './ODLL.sol';

contract Dentist is Destructible {
  ODLL odll;
  address dentistAddress;
  bytes name;
  bytes email;

  function Dentist(address odllAddress, address dentistAddress, bytes name, bytes email) {
    odll = ODLL(odllAddress);
    dentistAddress = dentistAddress;
    name = name;
    email = email;
  }
}
