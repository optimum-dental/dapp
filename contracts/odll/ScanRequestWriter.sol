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
    bytes32 scanInsurance,
    bytes32 scanPolicyNumber,
    bytes32 scanPayerId,
    bytes32 scanMainSubscriber,
    string scanInsuranceAddress,
    string comment
  )
    external
    onlyPermittedSmartContract
  {
    uint scanRequestId = userManager.initScanRequest(dbAddress, scanAppointmentId);
    userManager.writePatientScanRequest(dbAddress, scanRequestId, dentistId, msg.sender, appointmentDate, scanTime, comment);
    userManager.writePatientScanRequestInsurance(dbAddress, scanRequestId, scanInsurance, scanPolicyNumber, scanPayerId, scanMainSubscriber, scanInsuranceAddress);
  }
}
