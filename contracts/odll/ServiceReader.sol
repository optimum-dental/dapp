pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract ServiceReader is Restrictor {

  function ServiceReader(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function fetchServicesWithFees(
    address userId,
    uint serviceTypeId,
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
    return userManager.fetchServicesWithFees(dbAddress, userId, serviceTypeId, offset, limit, seed);
  }

  function fetchServices(
    address userId,
    uint serviceTypeId,
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
    return userManager.fetchServices(dbAddress, userId, serviceTypeId, offset, limit, seed);
  }

  function fetchScanRequestsForPatient (
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
    return userManager.fetchScanRequestsForPatient(dbAddress, patientId, offset, limit, seed);
  }

  function fetchAcceptedScanRequestsForPatient (
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
    return userManager.fetchAcceptedScanRequestsForPatient(dbAddress, patientId, offset, limit, seed);
  }

  function fetchScanApplicationsForPatient (
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
    return userManager.fetchScanApplicationsForPatient(dbAddress, patientId, offset, limit, seed);
  }

  function fetchAllScanRequests (
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
    return userManager.fetchAllScanRequests(dbAddress, offset, limit, seed);
  }

  function fetchDirectScanRequestsForDentist (
    address dbAddress,
    address dentistId,
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns(
      uint,
      uint[]
    )
  {
    return userManager.fetchDirectScanRequestsForDentist(dbAddress, dentistId, offset, limit, seed);
  }

  function fetchAcceptedScanRequestsForDentist (
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
    return userManager.fetchAcceptedScanRequestsForDentist(dbAddress, dentistId, offset, limit, seed);
  }

  function fetchScanApplicationsForDentist (
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
    return userManager.fetchScanApplicationsForDentist(dbAddress, dentistId, offset, limit, seed);
  }
}
