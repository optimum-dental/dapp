pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract ServiceWriter is Restrictor {

  function ServiceWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function writeServices(
    uint serviceTypeId,
    uint[] serviceIds
  )
    external
  {
    require(serviceTypeId != 0 && serviceIds.length > 0);
    userManager.writeServices(dbAddress, serviceTypeId, serviceIds, msg.sender);
  }

  function writeServiceWithFee(
    uint serviceTypeId,
    uint serviceId,
    uint fee
  )
    external
  {
    require(serviceTypeId != 0 && serviceId != 0 && fee != 0);
    userManager.writeServiceWithFee(dbAddress, serviceTypeId, serviceId, fee, msg.sender);
  }

  function removeDentistFromService(
    uint serviceTypeId,
    uint serviceId
  )
    external
  {
    require(serviceTypeId != 0 && serviceId != 0);
    userManager.removeDentistFromService(dbAddress, serviceTypeId, serviceId, msg.sender);
  }

  function removeServices(
    uint serviceTypeId,
    uint[] serviceIds
  )
    external
  {
    require(serviceTypeId != 0 && serviceIds.length > 0);
    userManager.removeServices(dbAddress, serviceTypeId, serviceIds, msg.sender);
  }
}
