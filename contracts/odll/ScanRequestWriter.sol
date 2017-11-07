pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract ScanAppointmentWriter is Restrictor {
  function ScanAppointmentWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function writeScanRequest (
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    bytes32 appointmentDate,
    bytes32 scanTime,
    bytes32 scanInsurance,
    bytes32 comment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.writeScanRequest(dbAddress, dentistId, msg.sender, scanAppointmentId, appointmentDate, scanTime, scanInsurance, comment);
  }

  function cancelScanRequest (
    address patientId,
    uint scanRequestId
  )
    external
    onlyPermittedSmartContract
  {
    userManager.cancelScanRequest(dbAddress, msg.sender, scanRequestId);
  }

  function expireScanRequest (
    uint scanRequestId
  )
    external
    onlyPermittedSmartContract
  {
    userManager.expireScanRequest(dbAddress, scanRequestId);
  }

  function acceptScanRequest (
    address dentistId,
    address patientId,
    uint scanRequestId,
    uint quote,
    bytes32 comment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.acceptScanRequest(dbAddress, msg.sender, patientId, scanRequestId, quote, comment);
  }

  function rejectScanRequest (
    address dentistId,
    address patientId,
    uint scanRequestId
  )
    external
    onlyPermittedSmartContract
  {
    userManager.rejectScanRequest(dbAddress, msg.sender, patientId, scanRequestId);
  }
}
