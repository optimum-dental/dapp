pragma solidity ^0.4.11;

import '../zeppelin/lifecycle/Destructible.sol';
import './ODLL.sol';

contract Patient is Destructible {
  ODLL odll;
  address patientAddress;
  bytes name;
  bytes email;

  function Patient(address odllAddress, address patientAddress, bytes name, bytes email) {
    odll = ODLL(odllAddress);
    patientAddress = patientAddress;
    name = name;
    email = email;
  }
}
