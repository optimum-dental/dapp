pragma solidity ^0.4.11;

import "./searchLibrary.sol";

library servicesLibrary {
  function addDentist(address dbAddress, uint serviceTypeId, uint[] serviceIds, address userId) internal {
    if (serviceTypeId == 1) {
      utilities.addRemovableIdArrayItem(dbAddress, serviceIds, "scan-services/dentists", "scan-services/dentists-count", "scan-services/dentists-keys", userId);
    } else if (serviceTypeId == 2){
      utilities.addRemovableIdArrayItem(dbAddress, serviceIds, "treatment-services/dentists", "treatment-services/dentists-count", "treatment-services/dentists-keys", userId);
    }
  }

  function addDentistToService(address dbAddress, uint serviceTypeId, uint serviceId, address userId) internal {
    if (serviceTypeId == 1) {
      utilities.addRemovableIdItem(dbAddress, serviceId, "scan-services/dentists", "scan-services/dentists-count", "scan-services/dentists-keys", userId);
    } else if (serviceTypeId == 2){
      utilities.addRemovableIdItem(dbAddress, serviceId, "treatment-services/dentists", "treatment-services/dentists-count", "treatment-services/dentists-keys", userId);
    }
  }

  function removeDentistFromService(address dbAddress, uint serviceTypeId, uint serviceId, address userId) internal {
    if (serviceTypeId == 1) {
      utilities.removeIdItem(dbAddress, serviceId, "scan-services/dentists", userId);
    } else if (serviceTypeId == 2){
      utilities.removeIdItem(dbAddress, serviceId, "treatment-services/dentists", userId);
    }
  }

  function removeDentist(address dbAddress, uint serviceTypeId, uint[] serviceIds, address userId) internal {
    if (serviceTypeId == 1) {
      utilities.removeIdArrayItem(dbAddress, serviceIds, "scan-services/dentists", userId);
    } else if (serviceTypeId == 2){
      utilities.removeIdArrayItem(dbAddress, serviceIds, "treatment-services/dentists", userId);
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
      ODLLDB(dbAddress).setUIntValue(sha3("scan-services/dentists", "fee", serviceId, userId), fee);
    } else if (serviceTypeId == 2){
      ODLLDB(dbAddress).setUIntValue(sha3("treatment-services/dentists", "fee", serviceId, userId), fee);
    }
  }
}
