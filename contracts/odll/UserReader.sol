pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract UserReader is Restrictor {

  function UserReader (address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function fetchUserDentists (
    address userId,
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns (
      uint,
      address[]
    )
  {
    return userManager.fetchDentistsForUser(dbAddress, userId, offset, limit, seed);
  }

  function findDentists (
    uint stateId,
    uint serviceTypeId,
    uint serviceId,
    uint[] budget, // within budget range
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
    )
      external
      view
      returns (
        uint,
        address[]
      )
  {
    return userManager.findDentistsIds(dbAddress, stateId, serviceTypeId, serviceId, budget, offset, limit, seed);
  }

  function fetchDentists (
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns (
      uint,
      address[]
    )
  {
    return userManager.fetchDentistsIds(dbAddress, offset, limit, seed);
  }

  function fetchManagers (
    uint offset, // starting from offset: 0-based
    uint limit, // not more than limit
    uint seed // seed value to give the illusion of randomisation
  )
    external
    view
    returns (
      uint,
      address[]
    )
  {
    return userManager.fetchManagersIds(dbAddress, offset, limit, seed);
  }
}
