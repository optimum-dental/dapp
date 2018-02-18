pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract Escrow is Restrictor {
  event FundReleased(uint paymentId, address payee);
  event Refunded(uint paymentId, address payee);
  event Paid(address callerAddress, uint amount);
  //   uint public profit;

  // States: 1 => Created, 2 => Locked, 3 => Won, 4 => Lost

  function Escrow (address _dbAddress) public {
    require(_dbAddress != 0x0);
    dbAddress = _dbAddress;
  }

  function releaseFundForScan (address userId, address payee, uint paymentId)
    external
    onlyActiveDentistId(payee)
    onlyActivePatientId(userId)
    inState(paymentId, 2)
  {
    uint caseId = DB(dbAddress).getUIntValue(keccak256("payment/case", paymentId));
    address dentistId = DB(dbAddress).getAddressValue(keccak256("case/dentist", caseId));
    address patientId = DB(dbAddress).getAddressValue(keccak256("case/patient", caseId));
    uint amount = DB(dbAddress).getUIntValue(keccak256("payment/amount", paymentId));

    require(userId == patientId && payee == dentistId);
    require(amount >= 0 && this.balance >= amount);

    DB(dbAddress).setUInt8Value(keccak256("payment/state", paymentId), 3);
    userManager.releaseScanFund(dbAddress, dentistId, patientId, paymentId);
    FundReleased(paymentId, payee);
  }

  function releaseFundForTreatment (address userId, address payee, uint paymentId)
    external
    onlyActiveDentistId(payee)
    onlyActivePatientId(userId)
    inState(paymentId, 2)
  {
    uint treatmentId = DB(dbAddress).getUIntValue(keccak256("payment/treatment", paymentId));
    address dentistId = DB(dbAddress).getAddressValue(keccak256("treatment/dentist", treatmentId));
    address patientId = DB(dbAddress).getAddressValue(keccak256("treatment/patient", treatmentId));
    uint amount = DB(dbAddress).getUIntValue(keccak256("payment/amount", paymentId));

    require(userId == patientId && payee == dentistId);
    require(amount >= 0 && this.balance >= amount);

    DB(dbAddress).setUInt8Value(keccak256("payment/state", paymentId), 3);
    userManager.releaseTreatmentFund(dbAddress, dentistId, patientId, paymentId);
    FundReleased(paymentId, payee);
  }

  function refund (address userId, address payee, uint paymentId)
    external
    onlyOwnerOrActiveAdminOrActiveManagerId(userId)
    onlyActivePatientId(payee)
    inState(paymentId, 2)
  {
    uint amount = DB(dbAddress).getUIntValue(keccak256("payment/amount", paymentId));

    require(amount >= 0 && this.balance >= amount);

    DB(dbAddress).setUInt8Value(keccak256("payment/state", paymentId), 4);
    payee.transfer(amount);
    Refunded(paymentId, payee);
  }

  /*function getBalance() external view returns (uint balance) {
    balance = this.balance;
  }*/

//   // don't use for now
//   function transferProfit(address userId, address toAddress)
//     external
//     payable
//     onlyOwnerCanCall(userId)
//   {
//     toAddress.transfer(profit);
//   }

//   // don't use for now
//   function secureFunding(uint amount, uint fundAmount)
//     internal
//     constant
//     returns (uint)
//   {
//     if (amount > fundAmount) {
//       profit += SafeMath.sub(amount, fundAmount);
//     } else {
//       fundAmount = amount;
//     }

//     return fundAmount;
//   }

  function transferFunds(address userId, address newAddress)
    external
    payable
    onlyOwnerCanCall(userId)
  {
    require(newAddress != 0x0);
    uint amount = this.balance;
    newAddress.transfer(amount);
  }

  function () public payable {
    Paid(msg.sender, msg.value);
  }
}
