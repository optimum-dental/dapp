pragma solidity 0.4.17;

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
      return ODLLDB(dbAddress).getUIntValue(keccak256("dentist/scan-service/fee", userId, serviceId));
    } else if (serviceTypeId == 2){
      return ODLLDB(dbAddress).getUIntValue(keccak256("dentist/treatment-service/fee", userId, serviceId));
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

    return countryId == ODLLDB(dbAddress).getUIntValue(keccak256("user/country", userId));
  }

  function isFromState(address dbAddress, address userId, uint stateId) internal view returns(bool) {
    if (stateId == 0) {
      return true;
    }

    return stateId == ODLLDB(dbAddress).getUIntValue(keccak256("user/state", userId));
  }

  function patientScanConditionFunction (string searchKey, address patientId, uint scanAppointmentId, uint patientScanAppointmentIndexNumber) internal view returns(bool) {
    return ODLLDB(dbAddress).getBooleanValue(keccak256(searchKey, patientId, scanAppointmentId, patientScanAppointmentIndexNumber));
  }

  function dentistScanConditionFunction (string searchKey, address dentistId, uint scanAppointmentId, uint patientScanAppointmentIndexNumber) internal view returns(bool) {
    return ODLLDB(dbAddress).getBooleanValue(keccak256(searchKey, dentistId, scanAppointmentId, patientScanAppointmentIndexNumber));
  }

  function getScanAppointmentsForPatient(
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns(
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] dentistsIds
    )
  {
    if (dentistId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndex(dbAddress, patientId, "patient/scan-appointment", "patient/scan-appointments-count");
      var count = scanAppointmentsIds.length;
      dentistsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        dentistsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("patient/scan-appointment/dentist", patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndex(dbAddress, patientId, dentistId, "patient/dentist/scan-appointment", "patient/dentist/scan-appointments-count");
    }
  }

  function getCanceledScanAppointmentsForPatient (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] dentistsIds
    )
  {
    if (dentistId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, patientId, "patient/scan-appointment", "patient/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-canceled?");
      var count = scanAppointmentsIds.length;
      dentistsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        dentistsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("patient/scan-appointment/dentist", patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, patientId, dentistId, "patient/dentist/scan-appointment", "patient/dentist/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-canceled?");
    }
  }

  function getAceptedScanAppointmentsForPatient (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] dentistsIds
    )
  {
    if (dentistId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, patientId, "patient/scan-appointment", "patient/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-accepted?");
      var count = scanAppointmentsIds.length;
      dentistsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        dentistsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("patient/scan-appointment/dentist", patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, patientId, dentistId, "patient/dentist/scan-appointment", "patient/dentist/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-accepted?");
    }
  }

  function getRejectedScanAppointmentsForPatient (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] dentistsIds
    )
  {
    if (dentistId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, patientId, "patient/scan-appointment", "patient/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-rejected?");
      var count = scanAppointmentsIds.length;
      dentistsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        dentistsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("patient/scan-appointment/dentist", patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, patientId, dentistId, "patient/dentist/scan-appointment", "patient/dentist/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-rejected?");
    }
  }

  function getPaidScanAppointmentsForPatient (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] dentistsIds
    )
  {
    if (dentistId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, patientId, "patient/scan-appointment", "patient/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-paid-for?");
      var count = scanAppointmentsIds.length;
      dentistsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        dentistsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("patient/scan-appointment/dentist", patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, patientId, dentistId, "patient/dentist/scan-appointment", "patient/dentist/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-paid-for?");
    }
  }

  function getScanApplicationsForPatient (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] dentistsIds,
      bytes32[] comments,
      uint[] quotes
    )
  {
    if (dentistId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, patientId, "patient/scan-appointment", "patient/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-accepted?");
      var count = scanAppointmentsIds.length;
      dentistsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        dentistsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("patient/scan-appointment/dentist", patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }

      for (uint i = 0; i < dentistsIds.length; i++) {
        comments[i] = ODLLDB(dbAddress).getBytes32Value(keccak256("dentist/patient/scan-appointment/index/comment", dentistsIds[i], patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
        quotes[i] = ODLLDB(dbAddress).getUIntValue(keccak256("dentist/patient/scan-appointment/index/quote", dentistsIds[i]. patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, patientId, dentistId, "patient/dentist/scan-appointment", "patient/dentist/scan-appointments-count", patientScanConditionFunction, "patient/scan-appointment/index/is-accepted?");

      for (uint i = 0; i < scanAppointmentsIds.length; i++) {
        comments[i] = ODLLDB(dbAddress).getBytes32Value(keccak256("dentist/patient/scan-appointment/index/comment", dentistId, patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
        quotes[i] = ODLLDB(dbAddress).getUIntValue(keccak256("dentist/patient/scan-appointment/index/quote", dentistId. patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }
    }
  }

  function getScanAppointmentsForDentist (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] patientsIds
    )
  {
    if (patientId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndex(dbAddress, dentistId, "dentist/scan-appointment", "dentist/scan-appointments-count");
      var count = scanAppointmentsIds.length;
      patientsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        patientsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("dentist/scan-appointment/patient", dentistId, scanAppointmentsIds[i], i, patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndex(dbAddress, dentistId, patientId, "dentist/patient/scan-appointment", "dentist/patient/scan-appointments-count");
    }
  }

  function getCanceledScanAppointmentsForDentist (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] patientsIds
    )
  {
    if (patientId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, dentistId, "dentist/scan-appointment", "dentist/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-canceled?");
      var count = scanAppointmentsIds.length;
      patientsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        patientsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("dentist/scan-appointment/dentist", dentistId, scanAppointmentsIds[i], i, patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, dentistId, patientId, "dentist/patient/scan-appointment", "dentist/patient/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-canceled?");
    }
  }

  function getAceptedScanAppointmentsForDentist (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] patientsIds
    )
  {
    if (patientId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, dentistId, "dentist/scan-appointment", "dentist/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-accepted?");
      var count = scanAppointmentsIds.length;
      patientsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        patientsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("dentist/scan-appointment/dentist", dentistId, scanAppointmentsIds[i], i, patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, dentistId, patientId, "dentist/patient/scan-appointment", "dentist/patient/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-accepted?");
    }
  }

  function getRejectedScanAppointmentsForDentist (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] patientsIds
    )
  {
    if (patientId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, dentistId, "dentist/scan-appointment", "dentist/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-rejected?");
      var count = scanAppointmentsIds.length;
      patientsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        patientsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("dentist/scan-appointment/dentist", dentistId, scanAppointmentsIds[i], i, patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, dentistId, patientId, "dentist/patient/scan-appointment", "dentist/patient/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-rejected?");
    }
  }

  function getPaidScanAppointmentsForDentist (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] patientsIds
    )
  {
    if (patientId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, dentistId, "dentist/scan-appointment", "dentist/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-paid-for?");
      var count = scanAppointmentsIds.length;
      patientsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        patientsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("dentist/scan-appointment/dentist", dentistId, scanAppointmentsIds[i], i, patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, dentistId, patientId, "dentist/patient/scan-appointment", "dentist/patient/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-paid-for?");
    }
  }

  function getScanApplicationsForDentist (
    address dbAddress,
    address dentistId,
    address patientId
  )
    internal
    view
    returns (
      uint[] scanAppointmentsIds,
      uint[] patientScanAppointmentIndexNumbers,
      address[] patientsIds,
      bytes32[] comments,
      uint[] quotes
    )
  {
    if (patientId == 0x0) {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getIdArrayWithIndexAndCondition(dbAddress, dentistId, "dentist/scan-appointment", "dentist/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-accepted?");
      var count = scanAppointmentsIds.length;
      patientsIds = new address[](count);
      for (uint i = 0; i < count; i++) {
        patientsIds[i] = ODLLDB(dbAddress).getAddressValue(keccak256("dentist/scan-appointment/patient", dentistId, scanAppointmentsIds[i], i, patientScanAppointmentIndexNumbers[i]));
      }

      for (uint i = 0; i < patientsIds.length; i++) {
        comments[i] = ODLLDB(dbAddress).getBytes32Value(keccak256("dentist/patient/scan-appointment/index/comment", dentistId, patientsIds[i], scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
        quotes[i] = ODLLDB(dbAddress).getUIntValue(keccak256("dentist/patient/scan-appointment/index/quote", dentistId. patientsIds[i], scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }
    } else {
      (scanAppointmentsIds, patientScanAppointmentIndexNumbers) = utilities.getAssociationIdArrayItemsWithIndexAndCondition(dbAddress, dentistId, patientId, "dentist/patient/scan-appointment", "dentist/patient/scan-appointments-count", dentistScanConditionFunction, "dentist/scan-appointment/index/is-accepted?");

      for (uint i = 0; i < scanAppointmentsIds.length; i++) {
        comments[i] = ODLLDB(dbAddress).getBytes32Value(keccak256("dentist/patient/scan-appointment/index/comment", dentistId, patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
        quotes[i] = ODLLDB(dbAddress).getUIntValue(keccak256("dentist/patient/scan-appointment/index/quote", dentistId. patientId, scanAppointmentsIds[i], patientScanAppointmentIndexNumbers[i]));
      }
    }
  }
}
