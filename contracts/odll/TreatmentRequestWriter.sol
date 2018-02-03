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
    bytes32 treatmentInsurance,
    bytes32 treatmentPolicyNumber,
    bytes32 treatmentPayerId,
    bytes32 treatmentMainSubscriber,
    string treatmentInsuranceAddress,
    string scanResults,
    string comment
  )
    external
    onlyPermittedSmartContract
  {
    uint treatmentRequestId = userManager.initTreatmentRequest(dbAddress, hasCaseId, caseId);
    require(DB(dbAddress).getUInt8Value(keccak256("treatment-request/status", treatmentRequestId)) == 1
      && DB(dbAddress).getUInt8Value(keccak256("case/status", caseId)) == 1);

    userManager.writePatientTreatmentRequest(dbAddress, treatmentRequestId, msg.sender, scanResults, comment);
    userManager.writePatientTreatmentRequestInsurance(dbAddress, treatmentRequestId, treatmentInsurance, treatmentPolicyNumber, treatmentPayerId, treatmentMainSubscriber, treatmentInsuranceAddress);
  }
}
