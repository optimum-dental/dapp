pragma solidity 0.4.18;

import "./utilities.sol";

library searchLibrary {
  function getDentists(address dbAddress)
    internal
    view
    returns (address[])
  {
    return utilities.getAddressArray(dbAddress, "dentists/ids", "dentists/count");
  }

  function getManagers(address dbAddress)
    internal
    view
    returns (address[])
  {
    return utilities.getAddressArray(dbAddress, "managers/ids", "managers/count");
  }

  function getServiceFee(address dbAddress, uint serviceTypeId, uint serviceId, address userId)
    internal
    view
    returns (uint)
  {
    if (serviceTypeId == 1) {
      return DB(dbAddress).getUIntValue(keccak256("dentist/scan-service/fee", userId, serviceId));
    } else if (serviceTypeId == 2){
      return DB(dbAddress).getUIntValue(keccak256("dentist/treatment-service/fee", userId, serviceId));
    } else {
      return 0;
    }
  }

  function getServiceDentistsByBudget(address dbAddress, uint serviceTypeId, uint serviceId, uint[] budget)
    internal
    view
    returns (
      address[] foundDentists
    ) {
    var allDentistsRenderingService = getDentistsByService(dbAddress, serviceTypeId, serviceId);
    foundDentists = new address[](allDentistsRenderingService.length);
    uint j = 0;
    for (uint i = 0; i < allDentistsRenderingService.length; i++) {
      address dentistId = allDentistsRenderingService[i];
      uint dentistFee = getServiceFee(dbAddress, serviceTypeId, serviceId, dentistId);
      if (dentistFee >= budget[0] && dentistFee <= budget[1]) {
        foundDentists[j] = dentistId;
        j++;
      }
    }

    foundDentists = utilities.take(j, foundDentists);
  }

  function getServiceDentistsByState(address dbAddress, uint serviceTypeId, uint serviceId, uint stateId)
    internal
    view
    returns (
      address[] foundDentists
  ) {
    var allDentistsRenderingService = getDentistsByService(dbAddress, serviceTypeId, serviceId);
    foundDentists = new address[](allDentistsRenderingService.length);
    uint j = 0;
    for (uint i = 0; i < allDentistsRenderingService.length; i++) {
      address dentistId = allDentistsRenderingService[i];
      if (isFromState(dbAddress, dentistId, stateId)) {
        foundDentists[j] = dentistId;
        j++;
      }
    }

    foundDentists = utilities.take(j, foundDentists);
  }

  function getDentistsByService(address dbAddress, uint serviceTypeId, uint serviceId)
    internal
    view
    returns (
      address[]
  ) {
    if (serviceTypeId == 1) {
      return utilities.getRemovableIdArrayAddressItems(dbAddress, serviceId, "scan-service/dentist", "scan-service/dentists-count", "scan-service/dentist-key");
    } else if (serviceTypeId == 2){
      return utilities.getRemovableIdArrayAddressItems(dbAddress, serviceId, "treatment-service/dentist", "treatment-service/dentists-count", "treatment-service/dentist-key");
    }
  }

  function getServices(address dbAddress, uint serviceTypeId, address userId)
  internal
  view
  returns (uint[]) {
    if (serviceTypeId == 1) {
      return utilities.getRemovableIdArrayItems(dbAddress, userId, "dentist/scan-service", "dentist/scan-services-count", "dentist/scan-service-key");
    } else if (serviceTypeId == 2){
      return utilities.getRemovableIdArrayItems(dbAddress, userId, "dentist/treatment-service", "dentist/treatment-services-count", "dentist/treatment-service-key");
    }
  }

  function getServiceFees(address dbAddress, uint serviceTypeId, uint[] serviceIds, address userId)
    internal
    view
    returns (uint[] fees)
  {
    fees = new uint[](serviceIds.length);
    for (uint i = 0; i < serviceIds.length; i++) {
      fees[i] = getServiceFee(dbAddress, serviceTypeId, serviceIds[i], userId);
    }
  }

  function isFromCountry(address dbAddress, address userId, uint countryId) internal view returns(bool) {
    if (countryId == 0) {
      return true;
    }

    return countryId == DB(dbAddress).getUIntValue(keccak256("user/country", userId));
  }

  function isFromState(address dbAddress, address userId, uint stateId) internal view returns(bool) {
    if (stateId == 0) {
      return true;
    }

    return stateId == DB(dbAddress).getUIntValue(keccak256("user/state", userId));
  }

  function patientScanConditionFunction (address dbAddress, string searchKey, address patientId, uint scanAppointmentId, uint patientScanAppointmentIndexNumber) internal view returns(bool) {
    return DB(dbAddress).getBooleanValue(keccak256(searchKey, patientId, scanAppointmentId, patientScanAppointmentIndexNumber));
  }

  function dentistScanConditionFunction (address dbAddress, string searchKey, address dentistId, uint scanAppointmentId, uint patientScanAppointmentIndexNumber) internal view returns(bool) {
    return DB(dbAddress).getBooleanValue(keccak256(searchKey, dentistId, scanAppointmentId, patientScanAppointmentIndexNumber));
  }

  function getScanRequestsForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns(
      uint[] scanRequestsIds,
      bytes32[] appointmentDates,
      bytes32[] scanTimes,
      bytes32[] scanInsurances,
      bytes32[] comments,
      uint8[] statuses,
      uint[] createdOns
    )
  {
    scanRequestsIds = utilities.getIdArray(dbAddress, patientId, "patient/scan-request", "patient/scan-requests-count");
    var count = scanRequestsIds.length;
    appointmentDates = new bytes32[](count);
    scanTimes = new bytes32[](count);
    scanInsurances = new bytes32[](count);
    comments = new bytes32[](count);
    statuses = new uint8[](count);
    createdOns = new uint[](count);

    for (uint i = 0; i < count; i++) {
      appointmentDates[i] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-date", scanRequestsIds[i]));
      scanTimes[i] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-time", scanRequestsIds[i]));
      scanInsurances[i] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-insurance", scanRequestsIds[i]));
      comments[i] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-comment", scanRequestsIds[i]));
      statuses[i] = DB(dbAddress).getUInt8Value(keccak256("scan-request/status", scanRequestsIds[i]));
      createdOns[i] = DB(dbAddress).getUIntValue(keccak256("scan-request/created-on", scanRequestsIds[i]));
    }
  }

  function getAcceptedScanRequestsForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanRequestsIds,
      bytes32[] appointmentDates,
      bytes32[] scanTimes,
      bytes32[] scanInsurances,
      bytes32[] comments,
      uint8[] statuses,
      uint[] createdOns,
      address dentistsIds
    )
  {
    uint[] allScanRequestsIds = utilities.getIdArray(dbAddress, patientId, "patient/scan-request", "patient/scan-requests-count");
    var count = allScanRequestsIds.length;
    scanRequestsIds = new uint[](count)
    appointmentDates = new bytes32[](count);
    scanTimes = new bytes32[](count);
    scanInsurances = new bytes32[](count);
    comments = new bytes32[](count);
    statuses = new uint8[](count);
    createdOns = new uint[](count);
    dentistsIds = new address[](count);

    uint j = 0;
    for (uint i = 0; i < count; i++) {
      if (DB(dbAddress).getBytes32Value(keccak256("scan-request/is-accepted?", allScanRequestsIds[i]))) {
        scanRequestsIds[j] = allScanRequestsIds[i];
        appointmentDates[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-date", allScanRequestsIds[i]));
        scanTimes[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-time", allScanRequestsIds[i]));
        scanInsurances[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-insurance", allScanRequestsIds[i]));
        comments[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-comment", allScanRequestsIds[i]));
        statuses[j] = DB(dbAddress).getUInt8Value(keccak256("scan-request/status", allScanRequestsIds[i]));
        createdOns[j] = DB(dbAddress).getUIntValue(keccak256("scan-request/created-on", allScanRequestsIds[i]));
        dentistsIds[j] = DB(dbAddress).getAddressValue(keccak256("scan-request/dentist", allScanRequestsIds[i]));

        j++;
      }
    }

    scanRequestsIds = utilities.take(j, scanRequestsIds);
    appointmentDates = utilities.take(j, appointmentDates);
    scanTimes = utilities.take(j, scanTimes);
    scanInsurances = utilities.take(j, scanInsurances);
    comments = utilities.take(j, comments);
    statuses = utilities.take(j, statuses);
    createdOns = utilities.take(j, createdOns);
    dentistsIds = utilities.take(j, dentistsIds);
  }

  function getScanApplicationsForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanApplicationsIds
      address[] dentistsIds,
      bytes32[] comments,
      uint[] quotes,
      uint8[] statuses,
      uint[] createdOns
    )
  {
    scanApplicationsIds = utilities.getIdArray(dbAddress, patientId, "patient/scan-application", "patient/scan-applications-count");
    var count = scanApplicationsIds.length;
    dentistsIds = new address[](count);
    comments = new bytes32[](count);
    quotes = new uint[](count);
    statuses = new uint8[](count);
    createdOns = new uint[](count);

    for (uint i = 0; i < count; i++) {
      dentistsIds[i] = DB(dbAddress).getAddressValue(keccak256("scan-application/dentist", scanApplicationsIds[i]));
      comments[i] = DB(dbAddress).getBytes32Value(keccak256("scan-application/comment", scanApplicationsIds[i]));
      quotes[i] = DB(dbAddress).getUIntValue(keccak256("scan-application/quote", scanApplicationsIds[i]));
      statuses[i] = DB(dbAddress).getUInt8Value(keccak256("scan-application/status", scanApplicationsIds[i]));
      createdOns[i] = DB(dbAddress).getUIntValue(keccak256("scan-application/created-on", scanApplicationsIds[i]));
    }
  }

  function getAllScanRequests (address dbAddress)
    internal
    view
    returns(
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
    uint[] allScanRequestsIds = utilities.getArrayItems(dbAddress, "patient/scan-request", "patient/scan-requests-count");
    var count = allScanRequestsIds.length;
    scanRequestsIds = new uint[](count);
    patientsIds = new address[](count);
    appointmentDates = new bytes32[](count);
    scanTimes = new bytes32[](count);
    scanInsurances = new bytes32[](count);
    comments = new bytes32[](count);
    statuses = new uint8[](count);
    createdOns = new uint[](count);

    uint j = 0;
    for (uint i = 0; i < count; i++) {
      if (DB(dbAddress).getBooleanValue(keccak256("scan-request/is-general?"))) {
        patientsIds[j] = DB(dbAddress).getAddressValue(keccak256("scan-request/patient", allScanRequestsIds[i]));
        appointmentDates[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-date", allScanRequestsIds[i]));
        scanTimes[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-time", allScanRequestsIds[i]));
        scanInsurances[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-insurance", allScanRequestsIds[i]));
        comments[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-comment", allScanRequestsIds[i]));
        statuses[j] = DB(dbAddress).getUInt8Value(keccak256("scan-request/status", allScanRequestsIds[i]));
        createdOns[j] = DB(dbAddress).getUIntValue(keccak256("scan-request/created-on", allScanRequestsIds[i]));

        j++;
      }
    }

    scanRequestsIds = utilities.take(j, scanRequestsIds);
    patientsIds = utilities.take(j, patientsIds);
    appointmentDates = utilities.take(j, appointmentDates);
    scanTimes = utilities.take(j, scanTimes);
    scanInsurances = utilities.take(j, scanInsurances);
    comments = utilities.take(j, comments);
    statuses = utilities.take(j, statuses);
    createdOns = utilities.take(j, createdOns);
  }

  function getDirectScanRequestsForDentist (
    address dbAddress,
    address dentistId
  )
    internal
    view
    returns(
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
    scanRequestsIds = utilities.getIdArray(dbAddress, dentistId, "dentist/scan-request", "dentist/scan-requests-count");
    var count = scanRequestsIds.length;
    patientsIds = new address[](count);
    appointmentDates = new bytes32[](count);
    scanTimes = new bytes32[](count);
    scanInsurances = new bytes32[](count);
    comments = new bytes32[](count);
    statuses = new uint8[](count);
    createdOns = new uint[](count);

    for (uint i = 0; i < count; i++) {
      patientsIds[i] = DB(dbAddress).getBytes32Value(keccak256("scan-request/patient", scanRequestsIds[i]));
      appointmentDates[i] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-date", scanRequestsIds[i]));
      scanTimes[i] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-time", scanRequestsIds[i]));
      scanInsurances[i] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-insurance", scanRequestsIds[i]));
      comments[i] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-comment", scanRequestsIds[i]));
      statuses[i] = DB(dbAddress).getUInt8Value(keccak256("scan-request/status", scanRequestsIds[i]));
      createdOns[i] = DB(dbAddress).getUIntValue(keccak256("scan-request/created-on", scanRequestsIds[i]));
    }
  }

  function getAcceptedScanRequestsForDentist (
    address dbAddress,
    address dentistId
  )
    internal
    view
    returns (
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
    uint[] allScanRequestsIds = utilities.getArrayItems(dbAddress, "dentist/scan-request", "dentist/scan-requests-count");
    var count = allScanRequestsIds.length;
    scanRequestsIds = new uint[](count);
    patientsIds = new address[](count);
    appointmentDates = new bytes32[](count);
    scanTimes = new bytes32[](count);
    scanInsurances = new bytes32[](count);
    comments = new bytes32[](count);
    statuses = new uint8[](count);
    createdOns = new uint[](count);

    uint j = 0;
    for (uint i = 0; i < count; i++) {
      if (DB(dbAddress).getBooleanValue(keccak256("scan-request/is-accepted?"))) {
        patientsIds[j] = DB(dbAddress).getAddressValue(keccak256("scan-request/patient", allScanRequestsIds[i]));
        appointmentDates[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-date", allScanRequestsIds[i]));
        scanTimes[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-time", allScanRequestsIds[i]));
        scanInsurances[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-insurance", allScanRequestsIds[i]));
        comments[j] = DB(dbAddress).getBytes32Value(keccak256("scan-request/appointment-comment", allScanRequestsIds[i]));
        statuses[j] = DB(dbAddress).getUInt8Value(keccak256("scan-request/status", allScanRequestsIds[i]));
        createdOns[j] = DB(dbAddress).getUIntValue(keccak256("scan-request/created-on", allScanRequestsIds[i]));

        j++;
      }
    }

    scanRequestsIds = utilities.take(j, scanRequestsIds);
    patientsIds = utilities.take(j, patientsIds);
    appointmentDates = utilities.take(j, appointmentDates);
    scanTimes = utilities.take(j, scanTimes);
    scanInsurances = utilities.take(j, scanInsurances);
    comments = utilities.take(j, comments);
    statuses = utilities.take(j, statuses);
    createdOns = utilities.take(j, createdOns);
  }

  function getScanApplicationsForDentist (
    address dbAddress,
    address dentistId
  )
    internal
    view
    returns (
      uint[] scanApplicationsIds
      address[] patientsIds,
      bytes32[] comments,
      uint[] quotes,
      uint8[] statuses,
      uint[] createdOns
    )
  {
    scanApplicationsIds = utilities.getIdArray(dbAddress, dentistId, "dentist/scan-application", "dentist/scan-applications-count");
    var count = scanApplicationsIds.length;
    patientsIds = new address[](count);
    comments = new bytes32[](count);
    quotes = new uint[](count);
    statuses = new uint8[](count);
    createdOns = new uint[](count);

    for (uint i = 0; i < count; i++) {
      patientsIds[i] = DB(dbAddress).getAddressValue(keccak256("scan-application/patient", scanApplicationsIds[i]));
      comments[i] = DB(dbAddress).getBytes32Value(keccak256("scan-application/comment", scanApplicationsIds[i]));
      quotes[i] = DB(dbAddress).getUIntValue(keccak256("scan-application/quote", scanApplicationsIds[i]));
      statuses[i] = DB(dbAddress).getUInt8Value(keccak256("scan-application/status", scanApplicationsIds[i]));
      createdOns[i] = DB(dbAddress).getUIntValue(keccak256("scan-application/created-on", scanApplicationsIds[i]));
    }
  }
}
