pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";
import "./Escrow.sol";

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
    require(DB(dbAddress).getAddressValue(keccak256("odll/escrow-address")) != 0x0);
    uint amount = msg.value;
    require(amount >= quote);
    if (amount > quote) {
      uint tempAmount = amount;
      amount = quote;
      msg.sender.transfer(SafeMath.sub(tempAmount, quote));
    }

    uint paymentId = utilities.getArrayItemsCount(dbAddress, "payments-count");
    DB(dbAddress).setUIntValue(keccak256("payment/for-type", paymentId), 2);
    userManager.acceptTreatmentApplication(dbAddress, dentistId, msg.sender, treatmentApplicationId, paymentId, amount, quote);
    DB(dbAddress).getAddressValue(keccak256("odll/escrow-address")).transfer(amount);
    Escrow(DB(dbAddress).getAddressValue(keccak256("odll/escrow-address"))).lockPayment(msg.sender, paymentId);
  }
}
