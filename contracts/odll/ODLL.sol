pragma solidity ^0.4.11;

import '../zeppelin/lifecycle/Destructible.sol';
import './Patient.sol';
import './Dentit.sol';
import './ODLLManager.sol';
import './ODLLAdmin.sol';

contract ODLL is Destructible {
  mapping (address => Patient) public patients;  
  mapping (address => Dentist) public dentists;  
  mapping (address => ODLLAdmin) public odllAdmins;
  mapping (address => ODLLManager) public odllManagers;
  
  // userTypes: { 1: 'patient', 2: 'dentist', 3: 'odll-manager', 4: 'odll-admin', }
  mapping (address => uint) public userAddressTypes;
  
  address[] public userAddresses;

  modifier onlyValidAddress(userAddress) {
    require(userAddress != 0x0);
    _;
  }

  modifier onlyValidUserType(userType) {
    require(userType != 0x0 && userType >= 1 && userType <= 4);
    _;
  }

  function addUser(address userAddress, uint userType, bytes name, bytes email)
  onlyValidAddress(userAddress)
  onlyValidUserType(userType) {
    userAddress.length++;
    userAddresses[userAddresses.length - 1] = userAddress;
    userAddressTypes[userAddress] = userType;

    if (userType == 1) {
      Patient patient = new Patient(this, userAddress, name, email);
      patients[userAddress] = patient;
    } else if (userType == 2) {
      Dentist dentist = new Dentist(this, userAddress, name, email);
      dentists[userAddress] = dentist;
    } else if (userType == 3) {
      ODLLManager odllManager = new ODLLManager(this, userAddress, name, email);
      odllManagers[userAddress] = odllManager;
    } else if (userType == 4) {
      ODLLAdmin odllAdmin = new ODLLAdmin(this, userAddress, name, email);
      odllAdmins[userAddress] = odllAdmin;
    }
  }
}
