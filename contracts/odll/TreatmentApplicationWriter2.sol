pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract TreatmentApplicationWriter2 is Restrictor {

  function TreatmentApplicationWriter2 (address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  // Treatment Application
  function acceptTreatmentApplication (
    address dentistId,
    uint treatmentApplicationId,
    uint quote
  )
    payable
    external
  {
    if (msg.value < quote) {
      msg.sender.transfer(msg.value);
      return;
    }

    userManager.acceptTreatmentApplication(dbAddress, dentistId, msg.sender, treatmentApplicationId, msg.value, quote);
  }
}
