pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract ScanApplicationWriter is Restrictor {
  function ScanApplicationWriter(address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  // Scan Application
  function applyToScan (
    address patientId,
    uint scanRequestId,
    uint quote,
    bytes32 scanDate,
    bytes32 scanTime,
    string comment
  )
    external
    onlyPermittedSmartContract
  {
    userManager.applyToScanPatient(dbAddress, msg.sender, patientId, scanRequestId, quote, scanDate, scanTime, comment);
  }

  function cancelScanApplication (
    address patientId,
    uint scanApplicationId
  )
    external
  {
    userManager.cancelDentistScanApplication(dbAddress, msg.sender, patientId, scanApplicationId);
  }
}
