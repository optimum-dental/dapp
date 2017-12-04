pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract TreatmentRequestWriter is Restrictor {

  function TreatmentRequestWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  // Treatment Request
  function writeTreatmentRequest (
    bool hasCaseId,
    uint caseId,
    string insurance,
    string scanResults,
    string comment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.writePatientTreatmentRequest(dbAddress, msg.sender, hasCaseId, caseId, insurance, scanResults, comment);
  }

  function cancelTreatmentRequest (
    uint treatmentRequestId
  )
    external
    onlyPermittedSmartContract
  {
    userManager.cancelPatientTreatmentRequest(dbAddress, msg.sender, treatmentRequestId);
  }
}
