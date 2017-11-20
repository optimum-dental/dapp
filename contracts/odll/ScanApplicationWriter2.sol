pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract ScanApplicationWriter2 is Restrictor {
  function ScanApplicationWriter2 (address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  // Scan Application
  function acceptScanApplication (
    address dentistId,
    uint scanApplicationId,
    uint quote
  )
    external
    payable
    onlyPermittedSmartContract
  {
    if (msg.value < quote) {
      msg.sender.transfer(msg.value);
      return;
    }

    userManager.acceptScanApplication(dbAddress, dentistId, msg.sender, scanApplicationId, msg.value, quote);
  }
}
