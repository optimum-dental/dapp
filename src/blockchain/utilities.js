import {chunkArray} from '../util/ArrayManager'

export function getObjectFromResponse (state, result, entitiesCount, keys, fieldTypes) {
  // types: 1 => boolean, 2 => uint8, 3 => uint, 4 => address, 5 => bytes32, 7 => string
  const dataObject = []
  let itemValue
  const intValues = result[0]
  const stringValues = result[1]
  const entitiesStrings = stringValues.split('666--ODLL-LIST--666').splice(0, stringValues.split('666--ODLL-LIST--666').length - 1)
  const entitiesStringsArrays = entitiesStrings.map(entityStrings => entityStrings.split('666--ODLL--666').splice(0, entityStrings.split('666--ODLL--666').length - 1))
  const intResultCountPerEntity = result[0].length / entitiesCount
  const entitiesIntsArrays = chunkArray(intValues, intResultCountPerEntity)

  for (let i = 0; i < entitiesCount; i++) {
    let intValuesIndex = 0
    let stringValuesIndex = 0
    const entityObject = keys.reduce((hash, key, index) => {
      if (fieldTypes[index] === 1) {
        itemValue = entitiesIntsArrays[i][intValuesIndex]
        intValuesIndex += 1
      } else if ([2, 3].includes(fieldTypes[index])) {
        itemValue = entitiesIntsArrays[i][intValuesIndex].toNumber()
        intValuesIndex += 1
      } else if (fieldTypes[index] === 4) {
        itemValue = state.web3.instance().toHex(entitiesIntsArrays[i][intValuesIndex])
        intValuesIndex += 1
      } else if (fieldTypes[index] === 5) {
        itemValue = state.web3.instance().toUtf8(entitiesIntsArrays[i][intValuesIndex].toString())
        intValuesIndex += 1
      } else {
        itemValue = entitiesStringsArrays[i][stringValuesIndex]
        stringValuesIndex += 1
      }

      hash[key] = itemValue
      return hash
    }, {})

    dataObject.push(entityObject)
  }

  return dataObject
}

export function getSlicedAddressString (state, addressString) {
  return state.web3.instance().toHex(addressString).slice(2)
}
