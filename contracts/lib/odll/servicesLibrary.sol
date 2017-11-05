pragma solidity 0.4.17;

import "./utilities.sol";

library servicesLibrary {
  function addDentist(address dbAddress, uint serviceTypeId, uint[] serviceIds, address userId) internal {
    for (uint i = 0; i < serviceIds.length; i++) {
      addDentistToService(dbAddress, serviceTypeId, serviceIds[i], userId);
    }
  }

  function addDentistToService(address dbAddress, uint serviceTypeId, uint serviceId, address userId) internal {
    if (serviceTypeId == 1) {
      utilities.addRemovableIdItem(dbAddress, userId, "dentist/scan-service", "dentist/scan-services-count", "dentist/scan-service-key", serviceId);
      utilities.addRemovableIdItem(dbAddress, serviceId, "scan-service/dentist", "scan-service/dentists-count", "scan-service/dentist-key", userId);
    } else if (serviceTypeId == 2){
      utilities.addRemovableIdItem(dbAddress, userId, "dentist/treatment-service", "dentist/treatment-services-count", "dentist/treatment-service-key", serviceId);
      utilities.addRemovableIdItem(dbAddress, serviceId, "treatment-service/dentist", "treatment-service/dentists-count", "treatment-service/dentist-key", userId);
    }
  }

  function removeDentistFromService(address dbAddress, uint serviceTypeId, uint serviceId, address userId) internal {
    if (serviceTypeId == 1) {
      utilities.removeIdItem(dbAddress, userId, "dentist/scan-service", serviceId);
      utilities.removeIdItem(dbAddress, serviceId, "scan-service/dentist", userId);
    } else if (serviceTypeId == 2){
      utilities.removeIdItem(dbAddress, userId, "dentist/treatment-service", serviceId);
      utilities.removeIdItem(dbAddress, serviceId, "treatment-service/dentist", userId);
    }
  }

  function removeDentist(address dbAddress, uint serviceTypeId, uint[] serviceIds, address userId) internal {
    for (uint i = 0; i < serviceIds.length; i++) {
      removeDentistFromService(dbAddress, serviceTypeId, serviceIds[i], userId);
    }
  }

  function setFees(address dbAddress, uint serviceTypeId, uint[] serviceIds, uint[] fees, address userId) internal {
    if (serviceIds.length == 0 || fees.length == 0 || serviceIds.length != fees.length) {
      return;
    }

    for (uint i = 0; i < serviceIds.length; i++) {
      setFee(dbAddress, serviceTypeId, serviceIds[i], fees[i], userId);
    }
  }

  function setFee(address dbAddress, uint serviceTypeId, uint serviceId, uint fee, address userId) internal {
    if (serviceTypeId == 1) {
      ODLLDB(dbAddress).setUIntValue(keccak256("dentist/scan-service/fee", userId, serviceId), fee);
    } else if (serviceTypeId == 2){
      ODLLDB(dbAddress).setUIntValue(keccak256("dentist/treatment-service/fee", userId, serviceId), fee);
    }
  }

  // scan appointment [patient || patient/dentist] status: 0 => pending, 1 => paid, 2 => closed
  // scan appointment [dentist/patient] 0 => pending, 1 => accepted, 2 => rejected
  function writeScanAppointment (
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    bytes32 appointmentDate,
    bytes32 scanTime,
    bytes32 scanInsurance,
    bytes32 scanComment
  )
    internal
  {
    uint patientScanAppointmentIndexNumber = utilities.getIdArrayItemsCount(dbAddress, patientId, "patient/scan-appointments-count")

    require(!(ODLLDB(dbAddress).getBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber))));

    addPatientToScanAppointment(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, appointmentDate, scanTime, scanInsurance, scanComment);
    if (dentistId == 0x0)  {
      ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-general?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    } else {
      addDentistToScanData(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber);
      ODLLDB(dbAddress).setUInt8Value(keccak256("dentist/patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), 0)
    }
  }

  function addPatientToScanAppointment (
    address dbAddress,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    bytes32 appointmentDate,
    bytes32 scanTime,
    bytes32 scanInsurance,
    bytes32 scanComment
  )
    internal
  {
    utilities.addIdArrayItemWithIndex(dbAddress, patientId, patientScanAppointmentIndexNumber, "patient/scan-appointment", "patient/scan-appointments-count", scanAppointmentId);
    utilities.addIdArrayItemWithIndex(dbAddress, scanAppointmentId, patientScanAppointmentIndexNumber, "scan-appointment/patient", "scan-appointment/patients-count", patientId);

    ODLLDB(dbAddress).setBytes32Value(keccak256("patient/scan-appointment/index/appointment-date", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), appointmentDate);
    ODLLDB(dbAddress).setBytes32Value(keccak256("patient/scan-appointment/index/appointment-time", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), scanTime);
    ODLLDB(dbAddress).setBytes32Value(keccak256("patient/scan-appointment/index/appointment-insurance", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), scanInsurance);
    ODLLDB(dbAddress).setBytes32Value(keccak256("patient/scan-appointment/index/appointment-comment", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), scanComment);
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-expired?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false);
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-canceled?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false);
    ODLLDB(dbAddress).setUInt8Value(keccak256("patient/scan-appointment/index/status", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), 0);
  }

  function addDentistToScanData (
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber
  )
    internal
  {
    utilities.addIdArrayItemWithIndex(dbAddress, dentistId, patientScanAppointmentIndexNumber, "dentist/scan-appointment", "dentist/scan-appointments-count", scanAppointmentId);
    utilities.addIdArrayItemWithIndex(dbAddress, scanAppointmentId, patientScanAppointmentIndexNumber, "scan-appointment/dentist", "scan-appointment/dentists-count", dentistId);

    utilities.addAssociationIdArrayItemWithIndex(dbAddress, dentistId, scanAppointmentId, patientScanAppointmentIndexNumber, "dentist/scan-appointment/patient", "dentist/scan-appointment/patients-count", patientId);
    utilities.addAssociationIdArrayItemWithIndex(dbAddress, dentistId, patientId, patientScanAppointmentIndexNumber, "dentist/patient/scan-appointment", "dentist/patient/scan-appointments-count", scanAppointmentId);

    utilities.addAssociationIdArrayItemWithIndex(dbAddress, scanAppointmentId, dentistId, patientScanAppointmentIndexNumber, "scan-appointment/dentist/patient", "scan-appointment/dentist/patients-count", patientId);
    utilities.addAssociationIdArrayItemWithIndex(dbAddress, scanAppointmentId, patientId, patientScanAppointmentIndexNumber, "scan-appointment/patient/dentist", "scan-appointment/patient/dentists-count", dentistId);

    utilities.addAssociationIdArrayItemWithIndex(dbAddress, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, "patient/scan-appointment/dentist", "patient/scan-appointment/dentists-count", dentistId);
    utilities.addAssociationIdArrayItemWithIndex(dbAddress, patientId, dentistId, patientScanAppointmentIndexNumber, "patient/dentist/scan-appointment", "patient/dentist/scan-appointments-count", scanAppointmentId);

    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/patient/scan-appointment/index/is-exists?", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
  }

  function cancelScanAppointment (
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber
  )
    internal
  {
    require(ODLLDB(dbAddress).getBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber)));

    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false);
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-canceled?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/scan-appointment/index/is-canceled?", dentistId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    if (dentistId != 0x0) {
      ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/patient/scan-appointment/index/is-exists?", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false)
    }
  }

  function expireScanAppointment (
    address dbAddress,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber
  )
    internal
  {
    require(ODLLDB(dbAddress).getBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber)));

    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false);
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-expired?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/scan-appointment/index/is-expired?", dentistId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
  }

  function acceptScanAppointment (
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    uint quote,
    bytes32 comment
  )
    internal
  {
    require(ODLLDB(dbAddress).getUInt8Value(keccak256("dentist/patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber)) == 0
      && ODLLDB(dbAddress).getBooleanValue(keccak256(dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, "dentist/patient/scan-appointment/index/is-exists?"))
      && ODLLDB(dbAddress).getBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber)));

    createScanApplication(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, quote, comment);
  }

  function createScanApplication (
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    uint quote,
    bytes32 comment
  )
    internal
  {
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-accepted?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/scan-appointment/index/is-accepted?", dentistId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    ODLLDB(dbAddress).setUInt8Value(keccak256("dentist/patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), 1);
    ODLLDB(dbAddress).setBytes32Value(keccak256("dentist/patient/scan-appointment/index/comment", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), comment);
    ODLLDB(dbAddress).setUIntValue(keccak256("dentist/patient/scan-appointment/index/quote", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), quote);
    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/patient/scan-appointment/index/is-canceled?", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false);
  }

  function rejectScanAppointment (
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber
  )
    internal
  {
    require(ODLLDB(dbAddress).getUInt8Value(keccak256("dentist/patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber) == 0)
      && ODLLDB(dbAddress).getBooleanValue(keccak256(dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, "dentist/patient/scan-appointment/index/is-exists?"))
      && ODLLDB(dbAddress).getBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber)));

    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false);
    ODLLDB(dbAddress).setUInt8Value(keccak256("dentist/patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), 2);
    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/patient/scan-appointment/index/is-exists?", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false)
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-canceled?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-rejected?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);

    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/scan-appointment/index/is-canceled?", dentistId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/scan-appointment/index/is-rejected?", dentistId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
  }

  function applyToScan(
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    uint quote,
    bytes32 comment
  )
    internal
  {
    acceptScanAppointment(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, quote, comment);
  }

  function cancelScanApplication (
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber
  )
    internal
  {
    require(ODLLDB(dbAddress).getUInt8Value(keccak256("dentist/patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber) == 1)
      && ODLLDB(dbAddress).setUInt8Value(keccak256("patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber)) == 0
      && ODLLDB(dbAddress).getBooleanValue(keccak256(dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber, "dentist/patient/scan-appointment/index/is-exists?"))
      && ODLLDB(dbAddress).getBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber)));

    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false);
    ODLLDB(dbAddress).setUInt8Value(keccak256("dentist/patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), 2);
    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/patient/scan-appointment/index/is-exists?", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false);
    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/patient/scan-appointment/index/is-canceled?", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
  }

  function acceptScanApplication (
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    uint amount
  )
    internal
  {
    require(ODLLDB(dbAddress).getUInt8Value(keccak256("patient/scan-appointment/index/status", patientId, scanAppointmentId, patientScanAppointmentIndexNumber)) == 0 && ODLLDB(dbAddress).getUInt8Value(keccak256("dentist/patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber)) == 1);

    ODLLDB(dbAddress).setUIntValue(keccak256("patient/scan-appointment/index/amount", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), amount);

    addDentistToScanData(dbAddress, dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber);
    ODLLDB(dbAddress).setUInt8Value(keccak256("patient/scan-appointment/index/status", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), 1);
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-paid-for?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
    ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/scan-appointment/index/is-paid-for?", dentistId, scanAppointmentId, patientScanAppointmentIndexNumber), true);
  }

  // treatment request status: 0 => pending, 1 => has applications, 2 => closed to applications, 3 => finished
  function applyForTreatment (
    address dbAddress,
    address dentistId,
    address patientId,
    uint scanAppointmentId,
    uint patientScanAppointmentIndexNumber,
    bytes32 treatmentInsurance,
    bytes32[] scanResults,
    bytes32 treatmentComment
  )
    internal
  {
    uint patientTreatmentIndexNumber = utilities.getIdArrayItemsCount(dbAddress, patientId, "patient/treatment-requests-count")
    if (scanAppointmentId != 0) {
      if (ODLLDB(dbAddress).getBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber))) {
        ODLLDB(dbAddress).setBooleanValue(keccak256("patient/scan-appointment/index/is-active?", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false);
        ODLLDB(dbAddress).setUInt8Value(keccak256("patient/scan-appointment/index/status", patientId, scanAppointmentId, patientScanAppointmentIndexNumber), 3);
      }

      if (dentistId != 0x0) {
        ODLLDB(dbAddress).setBooleanValue(keccak256("dentist/patient/scan-appointment/index/is-exists?", dentistId, patientId, scanAppointmentId, patientScanAppointmentIndexNumber), false)
      }

      ODLLDB(dbAddress).setUIntValue(keccak256("patient/treatment-request-index/scan-appointment", patientId, patientTreatmentIndexNumber), scanAppointmentId);
    }

    ODLLDB(dbAddress).setUIntValue(keccak256("patient/treatment-requests-count", patientId), patientTreatmentIndexNumber + 1);
    ODLLDB(dbAddress).setUIntValue(keccak256("patient/treatment-request-index/scan-results-count", patientId, patientTreatmentIndexNumber), scanResults.length);
    ODLLDB(dbAddress).setUInt8Value(keccak256("patient/treatment-request-index/status", patientId, patientTreatmentIndexNumber), 0);
    ODLLDB(dbAddress).setBooleanValue(keccak256("patient/treatment-request-index/is-canceled?", patientId, patientTreatmentIndexNumber), false);

    for (uint i = 0; i < scanResults.length; i++) {
      ODLLDB(dbAddress).setBytes32Value(keccak256("patient/treatment-request-index/scan-result-index/scan-result", patientId, patientTreatmentIndexNumber, i), scanResults[i]);
    }

    ODLLDB(dbAddress).setBytes32Value(keccak256("patient/treatment-request-index/treatment-comment", patientId, patientTreatmentIndexNumber), treatmentComment);
    ODLLDB(dbAddress).setBytes32Value(keccak256("patient/treatment-request-index/treatment-insurance", patientId, patientTreatmentIndexNumber), treatmentInsurance);
  }

  function cancelTreatmentRequest (
    address dbAddress,
    address patientId,
    uint patientTreatmentIndexNumber
  )
    internal
  {
    if (!(ODLLDB(dbAddress).getBooleanValue(keccak256("patient/treatment-request-index/is-canceled?", patientId, patientTreatmentIndexNumber)))) {
      ODLLDB(dbAddress).setBooleanValue(keccak256("patient/treatment-request-index/is-canceled?", patientId, patientTreatmentIndexNumber), true);
    }
  }
}
