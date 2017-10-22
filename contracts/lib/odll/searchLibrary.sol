pragma solidity ^0.4.11;

import "./userManager.sol";

library searchLibrary {
  function getDentists(address dbAddress)
    internal
    constant
    returns (address[])
  {
    return utilities.getAddressArray(dbAddress, "dentists/ids", "dentists/count");
  }

  function getManagers(address dbAddress)
    internal
    constant
    returns (address[])
  {
    return utilities.getAddressArray(dbAddress, "managers/ids", "managers/count");
  }

  function getServiceDentistFee(address dbAddress, uint serviceTypeId, uint serviceId, address userId)
    internal
    constant
    returns (uint)
  {
    if (serviceTypeId == 1) {
      return ODLLDB(dbAddress).getUIntValue(sha3("scan-services/dentists", "fee", serviceId, userId));
    } else if (serviceTypeId == 2){
      return ODLLDB(dbAddress).getUIntValue(sha3("treatment-services/dentists", "fee", serviceId, userId));
    } else {
      return 0;
    }
  }

  function getServiceDentistsByBudget(address dbAddress, uint serviceTypeId, uint serviceId, uint[] budget)
    internal
    returns (
      address[] foundDentists
    ) {
    var allDentistsRenderingService = getDentistsByService(dbAddress, serviceTypeId, serviceId);
    foundDentists = new address[](allDentistsRenderingService.length);
    uint j = 0;
    for (uint i = 0; i < allDentistsRenderingService.length; i++) {
      address dentistId = allDentistsRenderingService[i];
      uint dentistFee = getServiceDentistFee(dbAddress, serviceTypeId, serviceId, dentistId);
      if (dentistFee >= budget[0] && dentistFee <= budget[1]) {
        foundDentists[j] = dentistId;
        j++;
      }
    }

    return utilities.take(j, foundDentists);
  }

  function getServiceDentistsByState(address dbAddress, uint serviceTypeId, uint serviceId, uint stateId)
    internal
    returns (
      address[] foundDentists
  ) {
    var allDentistsRenderingService = getDentistsByService(dbAddress, serviceTypeId, serviceId);
    foundDentists = new address[](allDentistsRenderingService.length);
    uint j = 0;
    for (uint i = 0; i < allDentistsRenderingService.length; i++) {
      address dentistId = allDentistsRenderingService[i];
      if (userManager.isFromState(dbAddress, dentistId, stateId)) {
        foundDentists[j] = dentistId;
        j++;
      }
    }

    return utilities.take(j, foundDentists);
  }

  function getDentistsByService(address dbAddress, uint serviceTypeId, uint serviceId)
    internal
    constant
    returns (
      address[] foundDentists
  ) {
    if (serviceTypeId == 1) {
      return utilities.getRemovableIdArrayAddressItems(dbAddress, serviceId, "scan-services/dentists", "scan-services/dentists-count", "scan-services/dentists-keys");
    } else if (serviceTypeId == 2){
      return utilities.getRemovableIdArrayAddressItems(dbAddress, serviceId, "treatment-services/dentists", "treatment-services/dentists-count", "treatment-services/dentists-keys");
    }
  }

  function getServices(address dbAddress, address userId)
  internal
  constant
  returns (uint[] serviceTypeIds, uint[] serviceSubtypeIds) {
    uint[] serviceTypeIds = new uint[1];
    uint[] serviceSubtypeIds = new uint[1];
  }
}
