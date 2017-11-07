pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract ScanApplicationWriter is Restrictor {
  function ScanApplicationWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function applyToScan (
    address dentistId,
    address patientId,
    uint scanRequestId,
    uint quote,
    bytes32 comment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.applyToScan(dbAddress, msg.sender, patientId, scanRequestId, quote, comment);
  }

  function cancelScanApplication (
    address dentistId,
    address patientId,
    uint scanApplicationId
  )
    external
  {
    userManager.cancelScanApplication(dbAddress, msg.sender, patientId, scanApplicationId);
  }

  function acceptScanApplication (
    address dentistId,
    address patientId,
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
