pragma solidity 0.4.18;
import "./Restrictor.sol";
import "../lib/odll/userManager.sol";
import "./Escrow.sol";

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
    require(DB(dbAddress).getAddressValue(keccak256("odll/escrow-address")) != 0x0);
    uint amount = msg.value;
    require(amount >= quote);
    if (amount > quote) {
      uint tempAmount = amount;
      amount = quote;
      msg.sender.transfer(SafeMath.sub(tempAmount, quote));
    }

    uint paymentId = utilities.getArrayItemsCount(dbAddress, "payments-count");
    DB(dbAddress).setUIntValue(keccak256("payment/for-type", paymentId), 1);
    userManager.acceptScanApplication(dbAddress, dentistId, msg.sender, scanApplicationId, paymentId, amount, quote);

    /*var idx = DB(dbAddress).getUIntValue(keccak256(countKey));
    DB(dbAddress).setAddressValue(keccak256(key, idx), val);
    DB(dbAddress).setUIntValue(keccak256(countKey), idx + 1);*/

    /*uint scanRequestId = DB(dbAddress).getUIntValue(keccak256("scan-application/scan-request", scanApplicationId));
    uint scanServiceId = DB(dbAddress).getUIntValue(keccak256("scan-application/scan-service", scanApplicationId));*/

    DB(dbAddress).getAddressValue(keccak256("odll/escrow-address")).transfer(amount);
    Escrow(DB(dbAddress).getAddressValue(keccak256("odll/escrow-address"))).lockPayment(msg.sender, paymentId);
    /*DB(dbAddress).setUIntValue(keccak256("scan-application/payment", scanApplicationId), paymentId);
    DB(dbAddress).setUIntValue(keccak256("payment/created-on", paymentId), now);
    DB(dbAddress).setUIntValue(keccak256("payment/scan-application", paymentId), scanApplicationId);
    DB(dbAddress).setUIntValue(keccak256("payment/scan-request", paymentId), scanRequestId);
    DB(dbAddress).setUIntValue(keccak256("payment/scan-service", paymentId), scanServiceId);
    DB(dbAddress).setUIntValue(keccak256("payment/amount", paymentId), amount);
    DB(dbAddress).setUIntValue(keccak256("payment/quote", paymentId), quote);
    DB(dbAddress).setAddressValue(keccak256("payment/dentist", paymentId), dentistId);
    DB(dbAddress).setAddressValue(keccak256("payment/patient", paymentId), msg.sender);
    utilities.addArrayItem(dbAddress, "payment", "payments-count", paymentId); // paymentId is currently just there for counter purpose
    utilities.addIdArrayItem(dbAddress, dentistId, "dentist/payment", "dentist/payments-count", paymentId);
    utilities.addIdArrayItem(dbAddress, msg.sender, "patient/payment", "patient/payments-count", paymentId);*/
  }
}
