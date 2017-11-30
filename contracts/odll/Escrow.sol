pragma solidity 0.4.18;

import "./Restrictor.sol";
import "../lib/odll/userManager.sol";

contract Escrow is Restrictor {
  event PaymentLocked();
  event FundReleased();
  event Refunded();
  event Paid(address callerAddress, uint amount);

  // States: 1 => Created, 2 => Locked, 3 => Inactive

  modifier inState (uint paymentId, uint8 stateId) {
    require(DB(dbAddress).getUInt8Value(keccak256("payment/state", paymentId)) == stateId);
    _;
  }

  function Escrow (address _dbAddress) public {
    dbAddress = _dbAddress;
  }

  function lockPayment (address userId, uint paymentId)
    external
    onlyActivePatientId(userId)
    inState(paymentId, 1)
  {
    DB(dbAddress).setUInt8Value(keccak256("payment/state", paymentId), 2);
    PaymentLocked();
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
    uint amount = DB(dbAddress).getUIntValue(keccak256("case/amount", caseId));
    uint quote = DB(dbAddress).getUIntValue(keccak256("case/quote", caseId));

    require(amount >= 0);
    require(this.balance >= amount);

    DB(dbAddress).setUInt8Value(keccak256("payment/state", paymentId), 3);
    userManager.releaseFundForScan(dbAddress, dentistId, patientId, amount, quote);
    FundReleased();
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
    uint amount = DB(dbAddress).getUIntValue(keccak256("treatment/amount", treatmentId));
    uint quote = DB(dbAddress).getUIntValue(keccak256("treatment/quote", treatmentId));

    require(amount >= 0);
    require(this.balance >= amount);

    DB(dbAddress).setUInt8Value(keccak256("payment/state", paymentId), 3);
    userManager.releaseFundForTreatment(dbAddress, dentistId, patientId, amount, quote);
    FundReleased();
  }

  function refund (address userId, address payee, uint paymentId)
    external
    onlyOwnerOrActiveAdminOrActiveManagerId(userId)
    onlyActivePatientId(payee)
    inState(paymentId, 2)
  {
    uint paymentForType = DB(dbAddress).getUInt8Value(keccak256("payment/for-type", paymentId));
    uint amount = paymentForType == 1 ? DB(dbAddress).getUIntValue(keccak256("case/amount", paymentId)) : DB(dbAddress).getUIntValue(keccak256("treatment/amount", paymentId));

    require(amount >= 0);
    require(this.balance >= amount);

    DB(dbAddress).setUInt8Value(keccak256("payment/state", paymentId), 3);
    payee.transfer(amount);
    Refunded();
  }

  function getBalance() external view returns (uint balance) {
    balance = this.balance;
  }

  function () public payable {
    Paid(msg.sender, msg.value);
  }
}
