pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract ScanRequestReader2 is Restrictor {

  function ScanRequestReader2 (address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function fetchAllScanRequests (
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
    return userManager.fetchScanRequests(dbAddress, offset, limit, seed);
  }
}
