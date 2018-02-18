pragma solidity 0.4.18;

import "../../odll/DB.sol";

library utilities {
  function getCount(address dbAddress, string countKey) internal view returns(uint) {
    return DB(dbAddress).getUIntValue(keccak256(countKey));
  }

  function createNext(address dbAddress, string countKey) internal view returns(uint index) {
    var count = getCount(dbAddress, countKey);
    DB(dbAddress).addUIntValue(keccak256(countKey), 1);
    return count + 1;
  }

  function containsValue(address dbAddress, uint id, string key, uint8[] array) internal view returns(bool) {
    if (array.length == 0) {
      return true;
    }
    var val = DB(dbAddress).getUInt8Value(keccak256(key, id));
    for (uint i = 0; i < array.length ; i++) {
      if (array[i] == val) {
        return true;
      }
    }

    return false;
  }

  function addArrayItem(address dbAddress, string key, string countKey, address val) internal {
    var idx = DB(dbAddress).getUIntValue(keccak256(countKey));
    DB(dbAddress).setAddressValue(keccak256(key, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey), idx + 1);
  }

  function addArrayItem(address dbAddress, string key, string countKey, uint val) internal {
    var idx = DB(dbAddress).getUIntValue(keccak256(countKey));
    DB(dbAddress).setUIntValue(keccak256(key, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey), idx + 1);
  }

  function getIdFromArrayItemsCount(address dbAddress, string countKey) internal view returns(uint idValue) {
    idValue = getArrayItemsCount(dbAddress, countKey) + 1;
  }

  function getArrayItems(address dbAddress, string key, string countKey) internal view returns(uint[] result) {
    var count = DB(dbAddress).getUIntValue(keccak256(countKey));
    result = new uint[](count);
    for (uint i = 0; i < count; i++) {
      result[i] = DB(dbAddress).getUIntValue(keccak256(key, i));
    }

    return result;
  }

  function getAddressArray(address dbAddress, string key, string countKey) internal view returns(address[] result) {
    var count = DB(dbAddress).getUIntValue(keccak256(countKey));
    result = new address[](count);
    for (uint i = 0; i < count; i++) {
      result[i] = DB(dbAddress).getAddressValue(keccak256(key, i));
    }

    return result;
  }

  function getArrayItemsCount(address dbAddress, string countKey) internal view returns(uint) {
    return DB(dbAddress).getUIntValue(keccak256(countKey));
  }

  function getIdArrayItemsCount(address dbAddress, uint id, string countKey) internal view returns(uint) {
    return DB(dbAddress).getUIntValue(keccak256(countKey, id));
  }

  function getIdArrayItemsCount(address dbAddress, address id, string countKey) internal view returns(uint) {
    return DB(dbAddress).getUIntValue(keccak256(countKey, id));
  }

  function addIdArrayItem(address dbAddress, uint id, string key, string countKey, uint val) internal {
    var idx = getIdArrayItemsCount(dbAddress, id, countKey);
    DB(dbAddress).setUIntValue(keccak256(key, id, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, id, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey, id), idx + 1);
  }

  function addIdArrayItem(address dbAddress, uint id, string key, string countKey, address val) internal {
    var idx = getIdArrayItemsCount(dbAddress, id, countKey);
    DB(dbAddress).setAddressValue(keccak256(key, id, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, id, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey, id), idx + 1);
  }

  function addIdArrayItem(address dbAddress, address id, string key, string countKey, uint val) internal {
    var idx = getIdArrayItemsCount(dbAddress, id, countKey);
    DB(dbAddress).setUIntValue(keccak256(key, id, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, id, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey, id), idx + 1);
  }

  function addIdArrayItem(address dbAddress, address id, string key, string countKey, address val) internal {
    var idx = getIdArrayItemsCount(dbAddress, id, countKey);
    DB(dbAddress).setAddressValue(keccak256(key, id, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, id, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey, id), idx + 1);
  }

  function addIdArrayItem(address dbAddress, uint id, string key, string countKey, bytes32 val) internal {
    var idx = getIdArrayItemsCount(dbAddress, id, countKey);
    DB(dbAddress).setBytes32Value(keccak256(key, id, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, id, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey, id), idx + 1);
  }

  function addIdArrayItem(address dbAddress, address id, string key, string countKey, bytes32 val) internal {
    var idx = getIdArrayItemsCount(dbAddress, id, countKey);
    DB(dbAddress).setBytes32Value(keccak256(key, id, idx), val);
    DB(dbAddress).setUIntValue(keccak256(key, id, val, "index"), idx);
    DB(dbAddress).setUIntValue(keccak256(countKey, id), idx + 1);
  }

  function getIdArray(address dbAddress, uint id, string key, string countKey)
    internal
    view
    returns(uint[] result)
  {
    uint count = getIdArrayItemsCount(dbAddress, id, countKey);
    result = new uint[](count);
    for (uint i = 0; i < count; i++) {
      result[i] = DB(dbAddress).getUIntValue(keccak256(key, id, i));
    }
  }

  function getIdArray(address dbAddress, address id, string key, string countKey)
    internal
    view
    returns(uint[] result)
  {
    uint count = getIdArrayItemsCount(dbAddress, id, countKey);
    result = new uint[](count);
    for (uint i = 0; i < count; i++) {
      result[i] = DB(dbAddress).getUIntValue(keccak256(key, id, i));
    }

    return result;
  }

  function getIdArrayAddresses(address dbAddress, address id, string key, string countKey)
    internal
    view
    returns(address[] result)
  {
    uint count = getIdArrayItemsCount(dbAddress, id, countKey);
    result = new address[](count);
    for (uint i = 0; i < count; i++) {
      result[i] = DB(dbAddress).getAddressValue(keccak256(key, id, i));
    }
  }

  function getIdArrayAddresses(address dbAddress, uint id, string key, string countKey)
    internal
    view
    returns(address[] result)
  {
    uint count = getIdArrayItemsCount(dbAddress, id, countKey);
    result = new address[](count);
    for (uint i = 0; i < count; i++) {
      result[i] = DB(dbAddress).getAddressValue(keccak256(key, id, i));
    }
  }

  function setIdArray(address dbAddress, uint id, string key, string countKey, uint[] array) internal {
    for (uint i = 0; i < array.length; i++) {
      require(array[i] != 0);
      DB(dbAddress).setUIntValue(keccak256(key, id, i), array[i]);
    }

    DB(dbAddress).setUIntValue(keccak256(countKey, id), array.length);
  }

  function setIdArray(address dbAddress, address id, string key, string countKey, uint[] array) internal {
    for (uint i = 0; i < array.length; i++) {
      require(array[i] != 0);
      DB(dbAddress).setUIntValue(keccak256(key, id, i), array[i]);
    }

    DB(dbAddress).setUIntValue(keccak256(countKey, id), array.length);
  }

  function setIdArray(address dbAddress, address id, string key, string countKey, address[] array) internal {
    for (uint i = 0; i < array.length; i++) {
      require(array[i] != 0x0);
      DB(dbAddress).setAddressValue(keccak256(key, id, i), array[i]);
    }

    DB(dbAddress).setUIntValue(keccak256(countKey, id), array.length);
  }

  function setIdArray(address dbAddress, uint id, string key, string countKey, address[] array) internal {
    for (uint i = 0; i < array.length; i++) {
      require(array[i] != 0x0);
      DB(dbAddress).setAddressValue(keccak256(key, id, i), array[i]);
    }

    DB(dbAddress).setUIntValue(keccak256(countKey, id), array.length);
  }

  function getAddressIdArray(address dbAddress, uint id, string key, string countKey) internal view returns(address[] result) {
    uint count = getIdArrayItemsCount(dbAddress, id, countKey);
    result = new address[](count);
    for (uint i = 0; i < count; i++) {
      result[i] = DB(dbAddress).getAddressValue(keccak256(key, id, i));
    }

    return result;
  }

  function addRemovableIdItem(address dbAddress, address id, string key, string countKey, string keysKey, uint val) internal {
    if (DB(dbAddress).getUInt8Value(keccak256(key, id, val)) == 0) { // never seen before
      addIdArrayItem(dbAddress, id, keysKey, countKey, val);
    }

    DB(dbAddress).setUInt8Value(keccak256(key, id, val), 1); // 1 == active
  }

  function addRemovableIdItem(address dbAddress, address id, string key, string countKey, string keysKey, address val) internal {
    if (DB(dbAddress).getUInt8Value(keccak256(key, id, val)) == 0) { // never seen before
      addIdArrayItem(dbAddress, id, keysKey, countKey, val);
    }

    DB(dbAddress).setUInt8Value(keccak256(key, id, val), 1); // 1 == active
  }

  function addRemovableIdItem(address dbAddress, uint id, string key, string countKey, string keysKey, uint val) internal {
    if (DB(dbAddress).getUInt8Value(keccak256(key, id, val)) == 0) { // never seen before
      addIdArrayItem(dbAddress, id, keysKey, countKey, val);
    }

    DB(dbAddress).setUInt8Value(keccak256(key, id, val), 1); // 1 == active
  }

  function addRemovableIdItem(address dbAddress, uint id, string key, string countKey, string keysKey, address val) internal {
    if (DB(dbAddress).getUInt8Value(keccak256(key, id, val)) == 0) { // never seen before
      addIdArrayItem(dbAddress, id, keysKey, countKey, val);
    }

    DB(dbAddress).setUInt8Value(keccak256(key, id, val), 1); // 1 == active
  }

  function addRemovableIdArrayItem(address dbAddress, address[] ids, string key, string countKey, string keysKey, uint val) internal {
    if (ids.length == 0) {
      return;
    }
    for (uint i = 0; i < ids.length; i++) {
      addRemovableIdItem(dbAddress, ids[i], key, countKey, keysKey, val);
    }
  }

  function addRemovableIdArrayItem(address dbAddress, address[] ids, string key, string countKey, string keysKey, address val) internal {
    if (ids.length == 0) {
      return;
    }
    for (uint i = 0; i < ids.length; i++) {
      addRemovableIdItem(dbAddress, ids[i], key, countKey, keysKey, val);
    }
  }

  function addRemovableIdArrayItem(address dbAddress, uint[] ids, string key, string countKey, string keysKey, uint val) internal {
    if (ids.length == 0) {
      return;
    }
    for (uint i = 0; i < ids.length; i++) {
      addRemovableIdItem(dbAddress, ids[i], key, countKey, keysKey, val);
    }
  }

  function addRemovableIdArrayItem(address dbAddress, uint[] ids, string key, string countKey, string keysKey, address val) internal {
    if (ids.length == 0) {
      return;
    }

    for (uint i = 0; i < ids.length; i++) {
      addRemovableIdItem(dbAddress, ids[i], key, countKey, keysKey, val);
    }
  }

  function getRemovableIdArrayItems(address dbAddress, address id, string key, string countKey, string keysKey)
    internal view returns (uint[] result)
  {
    var count = getIdArrayItemsCount(dbAddress, id, countKey);
    result = new uint[](count);
    uint j = 0;
    for (uint i = 0; i < count; i++) {
      var itemId = DB(dbAddress).getUIntValue(keccak256(keysKey, id, i));
      if (DB(dbAddress).getUInt8Value(keccak256(key, id, itemId)) == 1) { // 1 == active
        result[j] = itemId;
        j++;
      }
    }

    return take(j, result);
  }

  function getRemovableIdArrayAddressItems(address dbAddress, address id, string key, string countKey, string keysKey)
    internal view returns (address[] result)
  {
    var count = getIdArrayItemsCount(dbAddress, id, countKey);
    result = new address[](count);
    uint j = 0;
    for (uint i = 0; i < count; i++) {
      var itemId = DB(dbAddress).getAddressValue(keccak256(keysKey, id, i));
      if (DB(dbAddress).getUInt8Value(keccak256(key, id, itemId)) == 1) { // 1 == active
        result[j] = itemId;
        j++;
      }
    }

    return take(j, result);
  }

  function removeIdItem(address dbAddress, address id, string key, uint val) internal {
    DB(dbAddress).setUInt8Value(keccak256(key, id, val), 2); // 2 == blocked
  }

  function removeIdItem(address dbAddress, address id, string key, address val) internal {
    DB(dbAddress).setUInt8Value(keccak256(key, id, val), 2); // 2 == blocked
  }

  function removeIdArrayItem(address dbAddress, address[] ids, string key, uint val) internal {
    if (ids.length == 0) {
      return;
    }

    for (uint i = 0; i < ids.length; i++) {
      DB(dbAddress).setUInt8Value(keccak256(key, ids[i], val), 2); // 2 == blocked
    }
  }

  function removeIdArrayItem(address dbAddress, address[] ids, string key, address val) internal {
    if (ids.length == 0) {
      return;
    }

    for (uint i = 0; i < ids.length; i++) {
      DB(dbAddress).setUInt8Value(keccak256(key, ids[i], val), 2); // 2 == blocked
    }
  }

  function getRemovableIdArrayItems(address dbAddress, uint id, string key, string countKey, string keysKey)
    internal view returns (uint[] result)
  {
    var count = getIdArrayItemsCount(dbAddress, id, countKey);
    result = new uint[](count);
    uint j = 0;
    for (uint i = 0; i < count; i++) {
      var itemId = DB(dbAddress).getUIntValue(keccak256(keysKey, id, i));
      if (DB(dbAddress).getUInt8Value(keccak256(key, id, itemId)) == 1) { // 1 == active
        result[j] = itemId;
        j++;
      }
    }

    return take(j, result);
  }

  function getRemovableIdArrayAddressItems(address dbAddress, uint id, string key, string countKey, string keysKey)
    internal view returns (address[] result)
  {
    var count = getIdArrayItemsCount(dbAddress, id, countKey);
    result = new address[](count);
    uint j = 0;
    for (uint i = 0; i < count; i++) {
      var itemId = DB(dbAddress).getAddressValue(keccak256(keysKey, id, i));
      if (DB(dbAddress).getUInt8Value(keccak256(key, id, itemId)) == 1) { // 1 == active
        result[j] = itemId;
        j++;
      }
    }

    return take(j, result);
  }

  function removeIdItem(address dbAddress, uint id, string key, uint val) internal {
    DB(dbAddress).setUInt8Value(keccak256(key, id, val), 2); // 2 == blocked
  }

  function removeIdItem(address dbAddress, uint id, string key, address val) internal {
    DB(dbAddress).setUInt8Value(keccak256(key, id, val), 2); // 2 == blocked
  }

  function removeIdArrayItem(address dbAddress, uint[] ids, string key, uint val) internal {
    if (ids.length == 0) {
      return;
    }

    for (uint i = 0; i < ids.length; i++) {
      DB(dbAddress).setUInt8Value(keccak256(key, ids[i], val), 2); // 2 == blocked
    }
  }

  function removeIdArrayItem(address dbAddress, uint[] ids, string key, address val) internal {
    if (ids.length == 0) {
      return;
    }

    for (uint i = 0; i < ids.length; i++) {
      DB(dbAddress).setUInt8Value(keccak256(key, ids[i], val), 2); // 2 == blocked
    }
  }

  function getPage(uint[] array, uint offset, uint limit, bool cycle) internal pure returns (uint[] result) {
    uint j = 0;
    uint length = array.length;
    if (offset >= length || limit == 0) {
      return result;
    }

    result = new uint[](limit);
    for (uint i = offset; i < (offset + limit); i++) {
      if (length == i) {
        break;
      }

      result[j] = array[i];
      j++;
    }

    if (cycle && j < limit) {
      var k = limit - j;
      for (i = 0; i <= k; i++) {
        if (limit == j) {
          break;
        }

        result[j] = array[i];
        j++;
      }
    }

    return take(j, result);
  }

  function getPage(address[] array, uint offset, uint limit, bool cycle) internal pure returns (address[] result) {
    uint j = 0;
    uint length = array.length;
    if (offset >= length || limit == 0) {
      return result;
    }

    result = new address[](limit);
    for (uint i = offset; i < (offset + limit); i++) {
      if (length == i) {
        break;
      }

      result[j] = array[i];
      j++;
    }

    if (cycle && j < limit) {
      var k = limit - j;
      for (i = 0; i <= k; i++) {
        if (limit == j) {
          break;
        }

        result[j] = array[i];
        j++;
      }
    }

    return take(j, result);
  }

  function getPage(bytes32[] array, uint offset, uint limit, bool cycle) internal pure returns (bytes32[] result) {
    uint j = 0;
    uint length = array.length;
    if (offset >= length || limit == 0) {
      return result;
    }

    result = new bytes32[](limit);
    for (uint i = offset; i < (offset + limit); i++) {
      if (length == i) {
        break;
      }

      result[j] = array[i];
      j++;
    }

    if (cycle && j < limit) {
      var k = limit - j;
      for (i = 0; i <= k; i++) {
        if (limit == j) {
          break;
        }

        result[j] = array[i];
        j++;
      }
    }

    return take(j, result);
  }

  /* Assumes a and b are sorted */
  function intersect(uint[] a, uint[] b) internal pure returns(uint[] c) {
    uint aLen = a.length;
    uint bLen = b.length;
    if (aLen == 0 || bLen == 0) {
      return c;
    }
    c = new uint[](aLen);
    uint i = 0;
    uint j = 0;
    uint k = 0;
    while (i < aLen && j < bLen) {
      if (a[i] > b[j]) {
        j++;
      } else if (a[i] < b[j]) {
        i++;
      } else {
        c[k] = a[i];
        i++;
        j++;
        k++;
      }
    }

    return take(k, c);
  }

  /* Assumes a and b are sorted */
  function intersect(address[] a, address[] b) internal pure returns(address[] c) {
    uint aLen = a.length;
    uint bLen = b.length;
    if (aLen == 0 || bLen == 0) {
      return c;
    }
    c = new address[](aLen);
    uint i = 0;
    uint j = 0;
    uint k = 0;
    while (i < aLen && j < bLen) {
      if (a[i] > b[j]) {
        j++;
      } else if (a[i] < b[j]) {
        i++;
      } else {
        c[k] = a[i];
        i++;
        j++;
        k++;
      }
    }

    return take(k, c);
  }

  /* Assumes a and b are sorted */
  function union(uint[] a, uint[] b) internal pure returns(uint[] c) {
    uint aLen = a.length;
    uint bLen = b.length;
    c = new uint[](aLen + bLen);
    uint i = 0;
    uint j = 0;
    uint k = 0;
    while (i < aLen && j < bLen) {
      if (a[i] < b[j]) {
        c[k] = a[i];
        i++;
      } else if (b[j] < a[i]) {
        c[k] = b[j];
        j++;
      } else {
        c[k] = a[i];
        i++;
        j++;
      }

      k++;
    }

    while (i < aLen) {
      c[k] = a[i];
      i++;
      k++;
    }

    while (j < bLen) {
      c[k] = b[j];
      j++;
      k++;
    }

    return take(k, c);
  }

  /* Assumes a and b are sorted */
  function union(address[] a, address[] b) internal pure returns(address[] c) {
    uint aLen = a.length;
    uint bLen = b.length;
    c = new address[](aLen + bLen);
    uint i = 0;
    uint j = 0;
    uint k = 0;
    while (i < aLen && j < bLen) {
      if (a[i] < b[j]) {
        c[k] = a[i];
        i++;
      } else if (b[j] < a[i]) {
        c[k] = b[j];
        j++;
      } else {
        c[k] = a[i];
        i++;
        j++;
      }

      k++;
    }

    while (i < aLen) {
      c[k] = a[i];
      i++;
      k++;
    }

    while (j < bLen) {
      c[k] = b[j];
      j++;
      k++;
    }

    return take(k, c);
  }

  function diff(uint[] _old, uint[] _new) internal pure returns(uint[] added, uint[] removed) {
    if (_old.length == 0 && _new.length == 0) {
      return (added, removed);
    }

    var maxCount = _old.length + _new.length;
    added = new uint[](maxCount);
    removed = new uint[](maxCount);

    _old = sort(_old);
    _new = sort(_new);
    uint ol_i = 0;
    uint ne_i = 0;
    uint ad_i = 0;
    uint re_i = 0;
    while (ol_i < _old.length && ne_i < _new.length) {
      if (_old[ol_i] > _new[ne_i]) {
        added[ad_i] = _new[ne_i];
        ne_i++;
        ad_i++;
      } else if (_old[ol_i] < _new[ne_i]) {
        removed[re_i] = _old[ol_i];
        ol_i++;
        re_i++;
      } else {
        ol_i++;
        ne_i++;
      }
    }

    if (_old.length > ol_i) {
      while (ol_i < _old.length) {
        removed[re_i] = _old[ol_i];
        ol_i++;
        re_i++;
      }
    }

    if (_new.length > ne_i) {
      while (ne_i < _new.length) {
        added[ad_i] = _new[ne_i];
        ne_i++;
        ad_i++;
      }
    }

    return (take(ad_i, added), take(re_i, removed));
  }

  function sort(uint[] array) internal pure returns (uint[]) {
    for (uint i = 1; i < array.length; i++) {
      var t = array[i];
      var j = i;
      while(j > 0 && array[j - 1] > t) {
        array[j] = array[j - 1];
        j--;
      }

      array[j] = t;
    }

    return array;
  }

  function sort(address[] array) internal pure returns (address[]) {
    for (uint i = 1; i < array.length; i++) {
      var t = array[i];
      var j = i;
      while(j > 0 && array[j - 1] > t) {
        array[j] = array[j - 1];
        j--;
      }

      array[j] = t;
    }

    return array;
  }

  function sortDescBy(uint[] array, uint[] compareArray) internal pure returns (uint[]) {
    for (uint i = 1; i < array.length; i++) {
      var t = array[i];
      var t2 = compareArray[i];
      var j = i;
      while(j > 0 && compareArray[j - 1] < t2) {
        array[j] = array[j - 1];
        compareArray[j] = compareArray[j - 1];
        j--;
      }

      array[j] = t;
      compareArray[j] = t2;
    }

    return array;
  }

  function take(uint n, uint8[] array) internal pure returns(uint8[] result) {
    if (n > array.length) {
      return array;
    }

    result = new uint8[](n);
    for (uint i = 0; i < n ; i++) {
      result[i] = array[i];
    }

    return result;
  }

  function take(uint n, uint[] array) internal pure returns(uint[] result) {
    if (n > array.length) {
      return array;
    }

    result = new uint[](n);
    for (uint i = 0; i < n ; i++) {
      result[i] = array[i];
    }

    return result;
  }

  function take(uint n, bytes32[] array) internal pure returns(bytes32[] result) {
    if (n > array.length) {
      return array;
    }

    result = new bytes32[](n);
    for (uint i = 0; i < n ; i++) {
      result[i] = array[i];
    }

    return result;
  }

  function take(uint n, address[] array) internal pure returns(address[] result) {
    if (n > array.length) {
      return array;
    }

    result = new address[](n);
    for (uint i = 0; i < n ; i++) {
      result[i] = array[i];
    }

    return result;
  }

  function findTopNValues(uint[] values, uint n) internal pure returns(uint[]) {
    uint length = values.length;

    for (uint i = 0; i <= n; i++) {
      uint maxPos = i;
      for (uint j = i + 1; j < length; j++) {
        if (values[j] > values[maxPos]) {
          maxPos = j;
        }
      }

      if (maxPos != i) {
        uint maxValue = values[maxPos];
        values[maxPos] = values[i];
        values[i] = maxValue;
      }
    }

    return take(n, values);
  }

  function filter(
    address dbAddress,
    function (address, uint[] memory, uint) returns (bool) f,
    uint[] memory items,
    uint[] memory args
  )
    internal view returns (uint[] memory r)
  {
    uint j = 0;
    r = new uint[](items.length);
    for (uint i = 0; i < items.length; i++) {
      if (f(dbAddress, args, items[i])) {
        r[j] = items[i];
        j++;
      }
    }

    return take(j, r);
  }

  function filter(
    address dbAddress,
    function (address, address[] memory, uint) returns (bool) f,
    uint[] memory items,
    address[] memory args
  )
    internal view returns (uint[] memory r)
  {
    uint j = 0;
    r = new uint[](items.length);
    for (uint i = 0; i < items.length; i++) {
      if (f(dbAddress, args, items[i])) {
        r[j] = items[i];
        j++;
      }
    }

    return take(j, r);
  }

  function filter(
    address dbAddress,
    function (address, uint[] memory, uint[] memory, uint) returns (bool) f,
    uint[] memory items,
    uint[] memory args,
    uint[] memory args2
  )
    internal view returns (uint[] memory r)
  {
    uint j = 0;
    r = new uint[](items.length);
    for (uint i = 0; i < items.length; i++) {
      if (f(dbAddress, args, args2, items[i])) {
        r[j] = items[i];
        j++;
      }
    }

    return take(j, r);
  }

  function contains(address[] array, address val) internal pure returns(bool) {
    for (uint i = 0; i < array.length ; i++) {
      if (array[i] == val) {
        return true;
      }
    }

    return false;
  }

  function contains(uint[] array, uint val) internal pure returns(bool) {
    for (uint i = 0; i < array.length ; i++) {
      if (array[i] == val) {
        return true;
      }
    }

    return false;
  }

  function bytes32ToString(bytes32 x) internal pure returns (string) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    for (uint j = 0; j < 32; j++) {
      byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
      if (char != 0) {
        bytesString[charCount] = char;
        charCount++;
      }
    }

    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (j = 0; j < charCount; j++) {
      bytesStringTrimmed[j] = bytesString[j];
    }

    return string(bytesStringTrimmed);
  }

  function intersectBudgetAndStateBasedDentists
  (
    address dbAddress,
    address[] budgetBasedDentistsIds,
    address[] stateBasedDentistsIds
  )
    internal view returns (address[] result)
  {
    var maxCount = DB(dbAddress).getUIntValue(keccak256("dentists/count"));
    if (maxCount == 0) {
      return result;
    }

    budgetBasedDentistsIds = sort(budgetBasedDentistsIds);
    stateBasedDentistsIds = sort(stateBasedDentistsIds);

    return intersect(budgetBasedDentistsIds, stateBasedDentistsIds);
  }

  function getSlicedArray(uint[] arrayObject, uint offset, uint limit, uint seed)
    internal
    pure
    returns (uint totalSize, uint[] slicedArray)
  {
    totalSize = arrayObject.length;

    if (arrayObject.length > 0) {
      if (offset > arrayObject.length) {
        return (totalSize, take(0, arrayObject));
      } else if (offset + limit > arrayObject.length) {
        limit = arrayObject.length - offset;
      }

      slicedArray = getPage(arrayObject, (seed + offset) % arrayObject.length, limit, true);
    }
  }

  function getSlicedArray(address[] arrayObject, uint offset, uint limit, uint seed)
    internal
    pure
    returns (uint totalSize, address[] slicedArray)
  {
    totalSize = arrayObject.length;

    if (arrayObject.length > 0) {
      if (offset > arrayObject.length) {
        return (totalSize, take(0, arrayObject));
      } else if (offset + limit > arrayObject.length) {
        limit = arrayObject.length - offset;
      }

      slicedArray = getPage(arrayObject, (seed + offset) % arrayObject.length, limit, true);
    }
  }

  function toAsciiString(address x) public pure returns (string) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
      byte b = byte(uint8(uint(x) / (2**(8*(19 - i)))));
      byte hi = byte(uint8(b) / 16);
      byte lo = byte(uint8(b) - 16 * uint8(hi));
      s[2*i] = char(hi);
      s[2*i+1] = char(lo);
    }

    return string(s);
  }

  function char(byte b) public pure returns (byte c) {
    if (b < 10) return byte(uint8(b) + 0x30);
    else return byte(uint8(b) + 0x57);
  }
}
