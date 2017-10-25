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
}
