pragma solidity 0.4.17;

import "./ODLLRestrictor.sol";
import "../lib/odll/userManager.sol";

contract ODLLUserWriter is ODLLRestrictor {
  event OnAdminAdded(address userId);
  event OnDentistAdded(address userId);
  event OnManagerAdded(address userId);
  event OnPatientAdded(address userId);

  function ODLLUserWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function writeUser(
    uint8 userType,
    bytes32 name,
    bytes32 email,
    bytes32 gravatar,
    bytes32 street,
    bytes32 city,
    uint stateId,
    bytes32 zipCode,
    uint countryId,
    bytes32 phoneNumber,
    bytes32 socialSecurityNumber,
    bytes32 birthday,
    uint8 gender
  )
    external
    onlyPermittedSmartContract
  {
    // require the last compulsories first
    require(stateId != 0 && countryId != 0);

    writeUserIdentity(userType, name, email, gravatar);
    writeUserLocation(street, city, stateId, zipCode, countryId);
    writeUserOptionalValues(phoneNumber, socialSecurityNumber, birthday, gender);
    determineEvent(userType);
  }

  function writeUserIdentity(uint8 userType, bytes32 name, bytes32 email, bytes32 gravatar) public {
    userManager.setUserIdentity(dbAddress, msg.sender, userType, name, email, gravatar);
  }

  function writeUserLocation(bytes32 street, bytes32 city, uint stateId, bytes32 zipCode, uint countryId) public {
    userManager.setUserLocation(dbAddress, msg.sender, street, city, stateId, zipCode, countryId);
  }

  function writeUserOptionalValues(bytes32 phoneNumber, bytes32 socialSecurityNumber, bytes32 birthday, uint8 gender) public {
    userManager.setUserOptionalValues(dbAddress, msg.sender, phoneNumber, socialSecurityNumber, birthday, gender);
  }

  function determineEvent(uint8 userType) public {
    if (userType == 1) {
      OnPatientAdded(msg.sender);
    } else if (userType == 3) {
      OnManagerAdded(msg.sender);
    } else if (userType == 4) {
      OnAdminAdded(msg.sender);
    }
  }

  function continueWritingDentist(
    bool isODLLDentist,
    bool isAvailable,
    bytes32 companyName
  )
    external
    onlyPermittedSmartContract
  {
    userManager.setDentist(dbAddress, msg.sender, isODLLDentist, isAvailable, companyName);
    OnDentistAdded(msg.sender);
  }

  function addODLLDentist(
    address userId
  )
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.addODLLDentist(dbAddress, msg.sender);
  }

  function addOfficialToODLL(address officialId, uint8 userType)
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.addOfficialToODLL(dbAddress, officialId, userType);
  }

  function blockUser(address userId)
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.blockUser(dbAddress, userId);
  }

  function unblockUser(address userId)
    external
    onlyOwnerOrActiveAdminOrActiveManager
  {
    userManager.unblockUser(dbAddress, userId);
  }

  function writeServices(
    uint serviceTypeId,
    uint[] serviceIds
  )
    external
  {
    require(serviceTypeId != 0 && serviceIds.length > 0);
    userManager.writeServices(dbAddress, serviceTypeId, serviceIds, msg.sender);
  }

  function writeServiceWithFee(
    uint serviceTypeId,
    uint serviceId,
    uint fee
  )
    external
  {
    require(serviceTypeId != 0 && serviceId != 0 && fee != 0);
    userManager.writeServiceWithFee(dbAddress, serviceTypeId, serviceId, fee, msg.sender);
  }

  function removeDentistFromService(
    uint serviceTypeId,
    uint serviceId
  )
    external
  {
    require(serviceTypeId != 0 && serviceId != 0);
    userManager.removeDentistFromService(dbAddress, serviceTypeId, serviceId, msg.sender);
  }

  function removeServices(
    uint serviceTypeId,
    uint[] serviceIds
  )
    external
  {
    require(serviceTypeId != 0 && serviceIds.length > 0);
    userManager.removeServices(dbAddress, serviceTypeId, serviceIds, msg.sender);
  }

  function writeDentistRating(address dentistId, uint8 rating)
    external
  {
    require(dentistId != 0x0 && rating > 0);
    userManager.writeDentistRating(dbAddress, dentistId, rating);
  }

  function writeUserDentistId (address dentistId) external {
    userManager.writeUserDentistId(dbAddress, msg.sender, dentistId);
  }

  function writeScanAppointment (
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    bytes32 appointmentDate,
    bytes32 scanTime,
    bytes32 scanInsurance,
    bytes32 scanComment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.writeScanAppointment(dbAddress, dentistId, patientId, scanAppointmentId, appointmentDate, scanTime, scanInsurance, scanComment);
  }

  function cancelScanAppointment (
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber
  )
    external
    onlyPermittedSmartContract
  {
    userManager.cancelScanAppointment(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber);
  }

  function expireScanAppointment (
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber
  )
    external
    onlyPermittedSmartContract
  {
    userManager.expireScanAppointment(dbAddress, patientId, scanAppointmentId, patientScanAppointmentIndexNumber);
  }

  function acceptScanAppointment (
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    uint quote,
    bytes32 comment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.acceptScanAppointment(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, quote, comment);
  }

  function rejectScanAppointment (
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber
  )
    external
    onlyPermittedSmartContract
  {
    userManager.rejectScanAppointment(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber);
  }

  function applyToScan(
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    uint quote,
    bytes32 comment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.applyToScan(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, quote, comment);
  }

  function acceptScanApplication (
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    uint amount
  )
    external
    onlyPermittedSmartContract
  {
    userManager.acceptScanApplication(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, amount);
  }

  function cancelScanApplication (
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber
  )
    external
  {
    userManager.cancelScanApplication(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber);
  }

  // treatment request status: 0 => pending, 1 => has applications, 2 => closed to applications, 3 => finished
  function applyForTreatment (
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    bytes32 treatmentInsurance,
    bytes32[] scanResults,
    bytes32 treatmentComment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.applyForTreatment(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, treatmentInsurance, scanResults, treatmentComment);
  }

  function cancelTreatmentRequest (
    address patientId,
    uint patientTreatmentIndexNumber
  )
    external
    onlyPermittedSmartContract
  {
    userManager.cancelTreatmentRequest(dbAddress, patientId, patientScanAppointmentIndexNumber);
  }

  function destroySelf(address callerAddress, address newContractAddress)
    external
    onlyOwnerCanCall(callerAddress)
  {
    selfdestruct(newContractAddress);
  }
}

