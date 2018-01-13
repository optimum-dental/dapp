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
    } else if (serviceTypeId == 2) {
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

  function getScanRequestsForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns(
      uint[] scanRequestsIds
    )
  {
    scanRequestsIds = utilities.getIdArray(dbAddress, patientId, "patient/scan-request", "patient/scan-requests-count");
  }

  function getAcceptedScanRequestsForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanRequestsIds
    )
  {
    var allScanRequestsIds = utilities.getIdArray(dbAddress, patientId, "patient/scan-request", "patient/scan-requests-count");
    var count = allScanRequestsIds.length;
    scanRequestsIds = new uint[](count);

    uint j = 0;
    for (uint i = 0; i < count; i++) {
      if (DB(dbAddress).getBooleanValue(keccak256("scan-request/is-accepted?", allScanRequestsIds[i]))) {
        scanRequestsIds[j] = allScanRequestsIds[i];
        j++;
      }
    }

    scanRequestsIds = utilities.take(j, scanRequestsIds);
  }

  function getScanApplicationsForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanApplicationsIds
    )
  {
    scanApplicationsIds = utilities.getIdArray(dbAddress, patientId, "patient/scan-application", "patient/scan-applications-count");
  }

  function getAllScanRequests (address dbAddress)
    internal
    view
    returns(
      uint[] scanRequestsIds
    )
  {
    var allScanRequestsIds = utilities.getArrayItems(dbAddress, "scan-request", "scan-requests-count");
    var count = allScanRequestsIds.length;
    scanRequestsIds = new uint[](count);

    uint j = 0;
    for (uint i = 0; i < count; i++) {
      if (DB(dbAddress).getBooleanValue(keccak256("scan-request/is-general?", allScanRequestsIds[i]))) {
        scanRequestsIds[j] = allScanRequestsIds[i];
        j++;
      }
    }

    scanRequestsIds = utilities.take(j, scanRequestsIds);
  }

  function getDirectScanRequestsForDentist (
    address dbAddress,
    address dentistId
  )
    internal
    view
    returns(
      uint[] scanRequestsIds
    )
  {
    scanRequestsIds = utilities.getIdArray(dbAddress, dentistId, "dentist/scan-request", "dentist/scan-requests-count");
  }

  function getAcceptedScanRequestsForDentist (
    address dbAddress,
    address dentistId
  )
    internal
    view
    returns (
      uint[] scanRequestsIds
    )
  {
    var allScanRequestsIds = utilities.getIdArray(dbAddress, dentistId, "dentist/scan-request", "dentist/scan-requests-count");
    var count = allScanRequestsIds.length;
    scanRequestsIds = new uint[](count);

    uint j = 0;
    for (uint i = 0; i < count; i++) {
      if (DB(dbAddress).getBooleanValue(keccak256("scan-request/is-accepted?", allScanRequestsIds[i]))) {
        scanRequestsIds[j] = allScanRequestsIds[i];
        j++;
      }
    }

    scanRequestsIds = utilities.take(j, scanRequestsIds);
  }

  function getScanApplicationsForDentist (
    address dbAddress,
    address dentistId
  )
    internal
    view
    returns (
      uint[] scanApplicationsIds
    )
  {
    scanApplicationsIds = utilities.getIdArray(dbAddress, dentistId, "dentist/scan-application", "dentist/scan-applications-count");
  }

  function getTreatmentRequestsForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns (
      uint[] treatmentRequestsIds
    )
  {
    treatmentRequestsIds = utilities.getIdArray(dbAddress, patientId, "patient/treatment-request", "patient/treatment-requests-count");
  }

  function getAllTreatmentRequests (
    address dbAddress
  )
    internal
    view
    returns (
      uint[] treatmentRequestsIds
    )
  {
    treatmentRequestsIds = utilities.getArrayItems(dbAddress, "treatment-request", "treatment-requests-count");
  }

  function getTreatmentApplicationsForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns (
      uint[] treatmentApplicationsIds
    )
  {
    treatmentApplicationsIds = utilities.getIdArray(dbAddress, patientId, "patient/treatment-application", "patient/treatment-applications-count");
  }

  function getTreatmentApplicationsForDentist (
    address dbAddress,
    address dentistId
  )
    internal
    view
    returns (
      uint[] treatmentApplicationsIds
    )
  {
    treatmentApplicationsIds = utilities.getIdArray(dbAddress, dentistId, "dentist/treatment-application", "dentist/treatment-applications-count");
  }

  function getCasesForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns (
      uint[] casesIds
    )
  {
    casesIds = utilities.getIdArray(dbAddress, patientId, "patient/case", "patient/cases-count");
  }

  function getCasesForDentist (
    address dbAddress,
    address dentistId
  )
    internal
    view
    returns (
      uint[] casesIds
    )
  {
    casesIds = utilities.getIdArray(dbAddress, dentistId, "dentist/case", "dentist/cases-count");
  }

  function getAllCases (
    address dbAddress
  )
    internal
    view
    returns (
      uint[] casesIds
    )
  {
    casesIds = utilities.getArrayItems(dbAddress, "case", "cases-count");
  }

  function getTreatmentsForPatient (
    address dbAddress,
    address patientId
  )
    internal
    view
    returns (
      uint[] treatmentIds
    )
  {
    treatmentIds = utilities.getIdArray(dbAddress, patientId, "patient/treatment", "patient/treatments-count");
  }

  function getTreatmentsForDentist (
    address dbAddress,
    address dentistId
  )
    internal
    view
    returns (
      uint[] treatmentIds
    )
  {
    treatmentIds = utilities.getIdArray(dbAddress, dentistId, "dentist/treatment", "dentist/treatments-count");
  }

  function getAllTreatments (
    address dbAddress
  )
    internal
    view
    returns (
      uint[] casesIds
    )
  {
    casesIds = utilities.getArrayItems(dbAddress, "treatment", "treatments-count");
  }
}
