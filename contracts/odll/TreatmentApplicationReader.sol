pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract TreatmentApplicationReader is Restrictor {

  function TreatmentApplicationReader (address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function fetchTreatmentApplicationsForPatient (
    address patientId,
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns (
      uint,
      uint[]
    )
  {
    return userManager.fetchTreatmentApplicationsForPatient(dbAddress, patientId, offset, limit, seed);
  }

  function fetchTreatmentApplicationsForDentist (
    address dentistId,
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns (
      uint,
      uint[]
    )
  {
    return userManager.fetchTreatmentApplicationsForDentist(dbAddress, dentistId, offset, limit, seed);
  }
}
