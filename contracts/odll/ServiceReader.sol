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
      uint[],
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
      uint totalNumberFound,
      uint[] scanRequestsIds,
      bytes32[] appointmentDates,
      bytes32[] scanTimes,
      bytes32[] scanInsurances,
      bytes32[] comments,
      uint8[] statuses,
      uint[] createdOns
    )
  {
    return userManager.fetchScanAppointmentsForPatient(dbAddress, patientId, offset, limit, seed);
  }

  function fetchAcceptedScanRequestsForPatient (
    address patientId,
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    internal
    view
    returns (
      uint totalNumberFound,
      uint[] scanRequestsIds,
      bytes32[] appointmentDates,
      bytes32[] scanTimes,
      bytes32[] scanInsurances,
      bytes32[] comments,
      uint8[] statuses,
      uint[] createdOns,
      address[] dentistsIds
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
    internal
    view
    returns (
      uint totalNumberFound,
      uint[] scanApplicationsIds,
      address[] dentistsIds,
      bytes32[] comments,
      uint[] quotes,
      uint8[] statuses,
      uint[] createdOns
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
      uint totalNumberFound,
      uint[] scanRequestsIds,
      address[] patientsIds,
      bytes32[] appointmentDates,
      bytes32[] scanTimes,
      bytes32[] scanInsurances,
      bytes32[] comments,
      uint8[] statuses,
      uint[] createdOns
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
    internal
    view
    returns(
      uint totalNumberFound,
      uint[] scanRequestsIds,
      address[] patientsIds,
      bytes32[] appointmentDates,
      bytes32[] scanTimes,
      bytes32[] scanInsurances,
      bytes32[] comments,
      uint8[] statuses,
      uint[] createdOns
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
    internal
    view
    returns (
      uint totalNumberFound,
      uint[] scanRequestsIds,
      address[] patientsIds,
      bytes32[] appointmentDates,
      bytes32[] scanTimes,
      bytes32[] scanInsurances,
      bytes32[] comments,
      uint8[] statuses,
      uint[] createdOns
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
    internal
    view
    returns (
      uint totalNumberFound,
      uint[] scanApplicationsIds
      address[] patientsIds,
      bytes32[] comments,
      uint[] quotes,
      uint8[] statuses,
      uint[] createdOns
    )
  {
    return userManager.fetchScanApplicationsForDentist(dbAddress, dentistId, offset, limit, seed);
  }
}
