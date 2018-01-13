pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract ScanRequestWriter is Restrictor {
  function ScanRequestWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  // Scan Request
  function writeScanRequest (
    address dentistId,
    uint scanAppointmentId,
    bytes32 appointmentDate,
    bytes32 scanTime,
    string scanInsurance,
    string comment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.writePatientScanRequest(dbAddress, dentistId, msg.sender, scanAppointmentId, appointmentDate, scanTime, scanInsurance, comment);
  }

  function cancelScanRequest (
    uint scanRequestId
  )
    external
    onlyPermittedSmartContract
  {
    userManager.cancelPatientScanRequest(dbAddress, msg.sender, scanRequestId);
  }

  function expireScanRequest (
    uint scanRequestId
  )
    external
    onlyPermittedSmartContract
  {
    userManager.expirePatientScanRequest(dbAddress, scanRequestId);
  }

  function acceptScanRequest (
    address patientId,
    uint scanRequestId,
    uint quote,
    string comment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.acceptPatientScanRequest(dbAddress, msg.sender, patientId, scanRequestId, quote, comment);
  }

  function rejectScanRequest (
    address patientId,
    uint scanRequestId
  )
    external
    onlyPermittedSmartContract
  {
    userManager.rejectPatientScanRequest(dbAddress, msg.sender, patientId, scanRequestId);
  }
}
