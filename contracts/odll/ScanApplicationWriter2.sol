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
    address escrowAddress = DB(dbAddress).getAddressValue(keccak256("odll/escrow-address"));
    require(escrowAddress != 0x0);
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

    Escrow(escrowAddress).lockPayment(msg.sender, paymentId);
    escrowAddress.transfer(amount);
  }
}
