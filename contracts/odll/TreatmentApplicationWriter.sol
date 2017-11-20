pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract TreatmentApplicationWriter is Restrictor {

  function TreatmentApplicationWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  // Treatment Application
  function applyToTreat (
    address patientId,
    uint treatmentRequestId,
    uint quote,
    string comment
  )
    external
  {
    userManager.applyToTreat(dbAddress, msg.sender, patientId, treatmentRequestId, quote, comment);
  }
  
  function cancelTreatmentApplication (
    address patientId,
    uint treatmentApplicationId
  )
    external
  {
    userManager.cancelTreatmentApplication(dbAddress, msg.sender, patientId, treatmentApplicationId);
  }

  function cancelTreatment (
    address dentistId,
    uint treatmentId
  )
    external
  {
    userManager.cancelTreatment(dbAddress, dentistId, msg.sender, treatmentId);
  }

  function markTreatmentDone (
    address dentistId,
    uint treatmentId
  )
    external
  {
    userManager.markTreatmentDone(dbAddress, dentistId, msg.sender, treatmentId);
  }
}
