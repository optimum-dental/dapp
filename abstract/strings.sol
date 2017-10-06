pragma solidity 0.4.11;

contract strings {
  struct slice {
    uint _len;
    uint _ptr;
  }

  function memcpy(uint dest, uint src, uint strLen) private;
  function toSlice(string self) internal returns (slice);
  function len(bytes32 self) internal returns (uint);
  function toSliceB32(bytes32 self) internal returns (slice ret);
  function copy(slice self) internal returns (slice);
  function toString(slice self) internal returns (string);
  function len(slice self) internal returns (uint);
  function empty(slice self) internal returns (bool);
  function compare(slice self, slice other) internal returns (int);
  function equals(slice self, slice other) internal returns (bool);
  function nextRune(slice self, slice rune) internal returns (slice);
  function nextRune(slice self) internal returns (slice ret);
  function ord(slice self) internal returns (uint ret);
  function keccak(slice self) internal returns (bytes32 ret);
  function startsWith(slice self, slice needle) internal returns (bool);
  function beyond(slice self, slice needle) internal returns (slice);
  function endsWith(slice self, slice needle) internal returns (bool);
  function until(slice self, slice needle) internal returns (slice);
  function findPtr(uint selflen, uint selfptr, uint needlelen, uint needleptr) private returns (uint);
  function rfindPtr(uint selflen, uint selfptr, uint needlelen, uint needleptr) private returns (uint);
  function find(slice self, slice needle) internal returns (slice);
  function rfind(slice self, slice needle) internal returns (slice);
  function split(slice self, slice needle, slice token) internal returns (slice);
  function split(slice self, slice needle) internal returns (slice token);
  function rsplit(slice self, slice needle, slice token) internal returns (slice);
  function rsplit(slice self, slice needle) internal returns (slice token);
  function count(slice self, slice needle) internal returns (uint _count);
  function contains(slice self, slice needle) internal returns (bool);
  function concat(slice self, slice other) internal returns (string);
  function join(slice self, slice[] parts) internal returns (string);
}
