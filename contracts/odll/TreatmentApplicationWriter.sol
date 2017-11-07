pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract TreatmentApplicationWriter is Restrictor {

  function TreatmentApplicationWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function applyToTreat (
    address patientId,
    uint treatmentRequestId,
    uint quote,
    bytes32 comment
  )
    internal
  {
    userManager.applyToTreat(dbAddress, msg.sender, patientId, treatmentRequestId, quote, comment);
  }

  function cancelTreatmentApplication (
    address patientId,
    uint treatmentApplicationId
  )
    internal
  {
    userManager.cancelTreatmentApplication(dbAddress, msg.sender, patientId, treatmentApplicationId);
  }

  function acceptTreatmentApplication (
    address dentistId,
    uint treatmentApplicationId,
    uint quote
  )
    internal
  {
    if (msg.value < quote) {
      msg.sender.transfer(msg.value);
      return;
    }

    userManager.acceptTreatmentApplication(dbAddress, dentistId, msg.sender, treatmentApplicationId, msg.value, quote);
  }

  function cancelTreatment (
    address dentistId,
    uint treatmentId
  )
    internal
  {
    userManager.cancelTreatment(dbAddress, dentistId, msg.sender, treatmentId);
  }

  function markTreatmentDone (
    address dentistId,
    uint treatmentId
  )
    internal
  {
    userManager.markTreatmentDone(dbAddress, dentistId, msg.sender, treatmentId);
  }
}
