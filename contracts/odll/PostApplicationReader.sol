pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract PostApplicationReader is Restrictor {

  function PostApplicationReader (address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function fetchCasesForPatient (
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
    return userManager.fetchPatientCases(dbAddress, patientId, offset, limit, seed);
  }

  function fetchCasesForDentist (
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
    return userManager.fetchDentistCases(dbAddress, dentistId, offset, limit, seed);
  }

  function fetchTreatmentsForPatient (
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
    return userManager.fetchPatientTreatment(dbAddress, patientId, offset, limit, seed);
  }

  function fetchTreatmentsForDentist (
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
    return userManager.fetchDentistTreatment(dbAddress, dentistId, offset, limit, seed);
  }
}
