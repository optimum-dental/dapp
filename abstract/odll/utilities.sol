pragma solidity ^0.4.11;

import "../../odll/ODLLDB.sol";
import "../strings.sol";

contract utilities {
  function getCount(address dbAddress, string countKey) internal returns(uint);
  function createNext(address dbAddress, string countKey) internal returns(uint index);
  function containsValue(address dbAddress, uint id, string key, uint8[] array) internal returns(bool);
  function addArrayItem(address dbAddress, string key, string countKey, address val) internal;
  function getAddressArray(address dbAddress, string key, string countKey) internal returns(address[] result);
  function getIdArrayItemsCount(address dbAddress, uint id, string countKey) internal returns(uint);
  function getIdArrayItemsCount(address dbAddress, address id, string countKey) internal returns(uint);
  function addIdArrayItem(address dbAddress, uint id, string key, string countKey, uint val) internal;
  function addIdArrayItem(address dbAddress, uint id, string key, string countKey, address val) internal;
  function addIdArrayItem(address dbAddress, address id, string key, string countKey, uint val) internal;
  function setIdArray(address dbAddress, uint id, string key, string countKey, uint[] array) internal;
  function setIdArray(address dbAddress, address id, string key, string countKey, uint[] array) internal;
  function getIdArray(address dbAddress, uint id, string key, string countKey) internal returns(uint[] result);
  function getIdArray(address dbAddress, address id, string key, string countKey) internal returns(uint[] result);
  function setIdArray(address dbAddress, uint id, string key, string countKey, address[] array) internal;
  function getAddressIdArray(address dbAddress, uint id, string key, string countKey) internal returns(address[] result);
  function addRemovableIdArrayItem(address dbAddress, uint[] ids, string key, string countKey, string keysKey, uint val) internal;
  function addRemovableIdArrayItem(address dbAddress, uint[] ids, string key, string countKey, string keysKey, address val) internal;
  function getRemovableIdArrayItems(address dbAddress, uint id, string key, string countKey, string keysKey)
    internal returns (uint[] result);
  function getRemovableIdArrayAddressItems(address dbAddress, uint id, string key, string countKey, string keysKey)
    internal returns (address[] result);
  function removeIdArrayItem(address dbAddress, uint[] ids, string key, uint val) internal;
  function removeIdArrayItem(address dbAddress, uint[] ids, string key, address val) internal;
  function getPage(uint[] array, uint offset, uint limit, bool cycle) internal returns (uint[] result);
  function getPage(address[] array, uint offset, uint limit, bool cycle) internal returns (address[] result);
  /* Assumes a and b are sorted */
  function intersect(uint[] a, uint[] b) internal returns(uint[] c);
  /* Assumes a and b are sorted */
  function intersect(address[] a, address[] b) internal returns(address[] c);
  /* Assumes a and b are sorted */
  function union(uint[] a, uint[] b) internal returns(uint[] c);
  /* Assumes a and b are sorted */
  function union(address[] a, address[] b) internal returns(address[] c);
  function diff(uint[] _old, uint[] _new) internal returns(uint[] added, uint[] removed);
  function sort(uint[] array) internal returns (uint[]);
  function sort(address[] array) internal returns (address[]);
  function sortDescBy(uint[] array, uint[] compareArray) internal returns (uint[]);
  function take(uint n, uint[] array) internal returns(uint[] result);
  function take(uint n, bytes32[] array) internal returns(bytes32[] result);
  function take(uint n, address[] array) internal returns(address[] result);
  function findTopNValues(uint[] values, uint n) internal returns(uint[]);
  function filter(
    address dbAddress,
    function (address, uint[] memory, uint) returns (bool) f,
    uint[] memory items,
    uint[] memory args
  ) internal returns (uint[] memory r);
  function filter(
    address dbAddress,
    function (address, address[] memory, uint) returns (bool) f,
    uint[] memory items,
    address[] memory args
  ) internal returns (uint[] memory r);
  function filter(
    address dbAddress,
    function (address, uint[] memory, uint[] memory, uint) returns (bool) f,
    uint[] memory items,
    uint[] memory args,
    uint[] memory args2
  ) internal returns (uint[] memory r);
  function contains(address[] array, address val) internal returns(bool);
  function contains(uint[] array, uint val) internal returns(bool);
}
