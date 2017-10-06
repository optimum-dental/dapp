pragma solidity ^0.4.11;

import "../zeppelin/ownership/Ownable.sol";
import "../zeppelin/math/SafeMath.sol";
// import "../abstract/strings.sol";
import "../lib/arachnid/solidity-stringutils/strings.sol";

contract ODLLDB is Ownable {
  using strings for *;

  address[] public permittedContractsAddresses;
  mapping(address => bool) public permissionStatusForContract;

  modifier onlyPermittedContractOrOwner {
    require(permissionStatusForContract[msg.sender] && msg.sender == owner);
    _;
  }

  function ODLLDB() {

  }

  function addPermittedContract(address addresses)
  onlyOwner {
    permissionStatusForContract[addresses] = true;
    permittedContractsAddresses.push(addresses);
  }

  function addPermittedContracts(address[] addresses)
  onlyOwner {
    for (uint i = 0; i < addresses.length; i++) {
      permissionStatusForContract[addresses[i]] = true;
      permittedContractsAddresses.push(addresses[i]);
    }
  }

  function removePermittedContract(address addresses)
  onlyOwner {
    permissionStatusForContract[addresses] = false;
  }

  function removePermittedContracts(address[] addresses)
  onlyOwner {
    for (uint i = 0; i < addresses.length; i++) {
      permissionStatusForContract[addresses[i]] = false;
    }
  }

  function permittedContractsCount() constant returns(uint count) {
    for (uint i = 0; i < permittedContractsAddresses.length; i++) {
      if (permissionStatusForContract[permittedContractsAddresses[i]]) {
        count++;
      }
    }

    return count;
  }

  function getPermittedContracts() constant returns(address[] addresses) {
    addresses = new address[](permittedContractsCount());
    for (uint i = 0; i < permittedContractsAddresses.length; i++) {
      if (permissionStatusForContract[permittedContractsAddresses[i]]) {
        addresses[i] = permittedContractsAddresses[i];
      }
    }

    return addresses;
  }

  mapping(bytes32 => uint8) UInt8Storage;

  function getUInt8Value(bytes32 record) constant returns (uint8){
    return UInt8Storage[record];
  }

  function setUInt8Value(bytes32 record, uint8 value)
    onlyPermittedContractOrOwner
  {
    UInt8Storage[record] = value;
  }

  function deleteUInt8Value(bytes32 record)
    onlyPermittedContractOrOwner
  {
    delete UInt8Storage[record];
  }

  mapping(bytes32 => uint) UIntStorage;

  function getUIntValue(bytes32 record) constant returns (uint){
    return UIntStorage[record];
  }

  function setUIntValue(bytes32 record, uint value)
    onlyPermittedContractOrOwner
  {
    UIntStorage[record] = value;
  }

  function addUIntValue(bytes32 record, uint value)
    onlyPermittedContractOrOwner
  {
    UIntStorage[record] = SafeMath.add(UIntStorage[record], value);
  }

  function subUIntValue(bytes32 record, uint value)
    onlyPermittedContractOrOwner
  {
    UIntStorage[record] = SafeMath.sub(UIntStorage[record], value);
  }

  function deleteUIntValue(bytes32 record)
    onlyPermittedContractOrOwner
  {
    delete UIntStorage[record];
  }

  mapping(bytes32 => string) StringStorage;

  function getStringValue(bytes32 record) constant returns (string){
    return StringStorage[record];
  }

  function setStringValue(bytes32 record, string value)
    onlyPermittedContractOrOwner
  {
    StringStorage[record] = "^".toSlice().concat(value.toSlice());
  }

  function deleteStringValue(bytes32 record)
    onlyPermittedContractOrOwner
  {
    delete StringStorage[record];
  }

  mapping(bytes32 => address) AddressStorage;

  function getAddressValue(bytes32 record) constant returns (address){
    return AddressStorage[record];
  }

  function setAddressValue(bytes32 record, address value)
    onlyPermittedContractOrOwner
  {
    AddressStorage[record] = value;
  }

  function deleteAddressValue(bytes32 record)
    onlyPermittedContractOrOwner
  {
    delete AddressStorage[record];
  }

  mapping(bytes32 => bytes) BytesStorage;

  function getBytesValue(bytes32 record) constant returns (bytes){
    return BytesStorage[record];
  }

  function setBytesValue(bytes32 record, bytes value)
    onlyPermittedContractOrOwner
  {
    BytesStorage[record] = value;
  }

  function deleteBytesValue(bytes32 record)
    onlyPermittedContractOrOwner
  {
    delete BytesStorage[record];
  }

  mapping(bytes32 => bytes32) Bytes32Storage;

  function getBytes32Value(bytes32 record) constant returns (bytes32){
    return Bytes32Storage[record];
  }

  function setBytes32Value(bytes32 record, bytes32 value)
    onlyPermittedContractOrOwner
  {
    Bytes32Storage[record] = value;
  }

  function deleteBytes32Value(bytes32 record)
    onlyPermittedContractOrOwner
  {
    delete Bytes32Storage[record];
  }

  mapping(bytes32 => bool) BooleanStorage;

  function getBooleanValue(bytes32 record) constant returns (bool){
    return BooleanStorage[record];
  }

  function setBooleanValue(bytes32 record, bool value)
    onlyPermittedContractOrOwner
  {
    BooleanStorage[record] = value;
  }

  function deleteBooleanValue(bytes32 record)
    onlyPermittedContractOrOwner
  {
    delete BooleanStorage[record];
  }

  mapping(bytes32 => int) IntStorage;

  function getIntValue(bytes32 record) constant returns (int){
    return IntStorage[record];
  }

  function setIntValue(bytes32 record, int value)
    onlyPermittedContractOrOwner
  {
    IntStorage[record] = value;
  }

  function deleteIntValue(bytes32 record)
    onlyPermittedContractOrOwner
  {
    delete IntStorage[record];
  }

  function booleanToUInt(bool x) constant returns (uint) {
    if (x) {
      return 1;
    } else {
      return 0;
    }
  }

  function getUIntValueConverted(bytes32 record, uint8 uintType) constant returns(uint) {
    if (uintType == 1) {
      return booleanToUInt(getBooleanValue(record));
    } else if (uintType == 2) {
      return uint(getUInt8Value(record));
    } else if (uintType == 3) {
      return getUIntValue(record);
    } else if (uintType == 4) {
      return uint(bytes32(getAddressValue(record)));
    } else if (uintType == 5) {
      return uint(getBytes32Value(record));
    } else {
      return 0;
    }
  }

  function getUIntTypesCount(uint8[] types) constant returns(uint count) {
    count = 0;
    for (uint i = 0; i < types.length ; i++) {
      if (types[i] != 7) {
        count += 1;
      }
    }

    return count;
  }

  function getEntityList(bytes32[] records, uint8[] types)
    public constant returns
  (
    uint[] items,
    string strs
  )
  {
    uint uintTypesCount = getUIntTypesCount(types);
    uint itemsCount = records.length / types.length;

    items = new uint[](itemsCount * uintTypesCount);
    uint k;
    for (uint i = 0; i < itemsCount; i++) {
      for (uint j = 0; j < types.length; j++) {
        uint r_i = (i * types.length) + j;
        if (types[j] == 7) {
          strs = strs.toSlice().concat(getStringValue(records[r_i]).toSlice());
          strs = strs.toSlice().concat("99--DELIMITER--11".toSlice());
        } else {
          items[k] = getUIntValueConverted(records[r_i], types[j]);
          k++;
        }
      }
      strs = strs.toSlice().concat("99--DELIMITER-LIST--11".toSlice());
    }

    return (items, strs);
  }
}
