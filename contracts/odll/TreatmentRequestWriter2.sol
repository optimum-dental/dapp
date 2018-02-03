pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract TreatmentRequestWriter2 is Restrictor {

  function TreatmentRequestWriter2(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  // Treatment Request
  function cancelTreatmentRequest (
    uint treatmentRequestId
  )
    external
    onlyPermittedSmartContract
  {
    userManager.cancelPatientTreatmentRequest(dbAddress, msg.sender, treatmentRequestId);
  }
}
