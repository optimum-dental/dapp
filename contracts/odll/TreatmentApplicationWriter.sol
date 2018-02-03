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
    bytes32 treatmentDate,
    bytes32 treatmentTime,
    string comment
  )
    external
  {
    userManager.applyToTreatPatient(dbAddress, msg.sender, patientId, treatmentRequestId, quote, treatmentDate, treatmentTime, comment);
  }

  function cancelTreatmentApplication (
    address patientId,
    uint treatmentApplicationId
  )
    external
  {
    userManager.cancelDentistTreatmentApplication(dbAddress, msg.sender, patientId, treatmentApplicationId);
  }

  function cancelTreatment (
    address dentistId,
    uint treatmentId
  )
    external
  {
    userManager.cancelPatientTreatment(dbAddress, dentistId, msg.sender, treatmentId);
  }

  function markTreatmentDone (
    address dentistId,
    uint treatmentId
  )
    external
  {
    userManager.markPatientTreatmentDone(dbAddress, dentistId, msg.sender, treatmentId);
  }
}
