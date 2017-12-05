// ropsten network owner account: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9

// ropsten coinbase: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9

// Sample keccak256 implementation
web3.sha3(web3.toHex('scan-application/quote') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('scan-application/scan-service') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('scan-application/scan-request') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('scan-request/status') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('scan-request/patient') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('scan-application/patient') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('scan-application/dentist') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('scan-application/quote') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('scan-application/amount') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('case/status') + '0000000000000000000000000000000000000000000000000000000000000001', {encoding: 'hex'})
web3.sha3(web3.toHex('dentist/average-rating-count') + '5429f164a48b54e7b2a2276e646b6dacf40fbf07', {encoding: 'hex'})
web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'})
web3.sha3(web3.toHex('payment/amount') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'})
web3.sha3(web3.toHex('payment/quote') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'})

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}))

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').setUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}), 2)

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts([
  "0x827eae894835a8bbfcd867d0b9ad6c0078b71dba", // Setter
  "0x8c21ccb420359a70ffa54366f654b81af3f228ae", // Escrow
  "0xb5cea668f79f27c721f4150e5e1d382858cfc591", // UserWriter
  "0x088a0c9c097b1f11b2fe1b4b185a2d38632d4597", // UserReader
  "0x5116535e2860822cd082727b22a170d7f6b3f179", // ServiceWriter
  "0x39d7989e07a48620c90e403aa8eefc06433f96ab", // ServiceReader
  "0xe5c310e4e513986f1d17e8bcdd57aec002e359af", // ScanRequestWriter
  "0xd0fd7deb6992a4208b68df7ffe3239da2f05bfa8", // ScanRequestReader
  "0xba3b28172a30c1e9a08287972b047e87e2f9679c", // ScanRequestReader2
  "0x3d6b58a65a9c594b2484b83de036f984ce3fd5ef", // ScanApplicationWriter
  "0x39ccbcd78c7791347b9ce4d3b70856183634328b", // ScanApplicationWriter2
  "0xd367133b7d5f4e3f264469233b449cac40830143", // ScanApplicationReader
  "0xe41d758519bb2e7b8e6cac58b149837d22eb228c", // TreatmentRequestWriter
  "0xbe9ea2e36d1d8685fecef70aa8422ffecf9fc046", // TreatmentRequestReader
  "0x78778a81452c2a5fc0bd845d9a74f6454b4d49ac", // TreatmentRequestReader2
  "0x10b893a0dcc6e6c9c00999078f935dff1c4004fe", // TreatmentApplicationWriter
  "0x8965dbb3c5c1c857027707ae3b1232c00ea686d5", // TreatmentApplicationWriter2
  "0x8f2abd235b3e9ff6f77be00003b8ab23519ee9c8", // TreatmentApplicationReader
  "0xd8b347dc2530854bd0da42d61d6a8e2d5be3fe02", // PostApplicationReader
  "0x9d87b3657901a260166e57ee3fe1017c2b66a2f7", // PostApplicationReader2
])
*/

// Add main contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x827eae894835a8bbfcd867d0b9ad6c0078b71dba"])

// Add user contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x8c21ccb420359a70ffa54366f654b81af3f228ae", "0xb5cea668f79f27c721f4150e5e1d382858cfc591", "0x088a0c9c097b1f11b2fe1b4b185a2d38632d4597", "0x5116535e2860822cd082727b22a170d7f6b3f179", "0x39d7989e07a48620c90e403aa8eefc06433f96ab", "0xe5c310e4e513986f1d17e8bcdd57aec002e359af", "0xd0fd7deb6992a4208b68df7ffe3239da2f05bfa8", "0xba3b28172a30c1e9a08287972b047e87e2f9679c", "0x3d6b58a65a9c594b2484b83de036f984ce3fd5ef", "0x39ccbcd78c7791347b9ce4d3b70856183634328b", "0xd367133b7d5f4e3f264469233b449cac40830143", "0xe41d758519bb2e7b8e6cac58b149837d22eb228c", "0xbe9ea2e36d1d8685fecef70aa8422ffecf9fc046", "0x78778a81452c2a5fc0bd845d9a74f6454b4d49ac", "0x10b893a0dcc6e6c9c00999078f935dff1c4004fe", "0x8965dbb3c5c1c857027707ae3b1232c00ea686d5", "0x8f2abd235b3e9ff6f77be00003b8ab23519ee9c8", "0xd8b347dc2530854bd0da42d61d6a8e2d5be3fe02", "0x9d87b3657901a260166e57ee3fe1017c2b66a2f7"])



// misc
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x8c21ccb420359a70ffa54366f654b81af3f228ae", "0x39ccbcd78c7791347b9ce4d3b70856183634328b", "0x8965dbb3c5c1c857027707ae3b1232c00ea686d5"])

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContract("0x229585932dbdb0eca213ff7664aa582aa26688b1")




Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setOwner()

Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setConfig()

Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setEscrowAddress("0x8c21ccb420359a70ffa54366f654b81af3f228ae")

Setter.at("0x827eae894835a8bbfcd867d0b9ad6c0078b71dba").setScanPaymentPercentage(5)
Setter.at("0x827eae894835a8bbfcd867d0b9ad6c0078b71dba").setTreatmentPaymentPercentage(5)
Setter.at("0x827eae894835a8bbfcd867d0b9ad6c0078b71dba").setPaymentAddress("0x7a45f29170b9d4fcc75c4bcd683fe96eed963cfb")


// UserWriter.at('0xb5cea668f79f27c721f4150e5e1d382858cfc591').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0xb5cea668f79f27c721f4150e5e1d382858cfc591').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina
// UserWriter.at('0xb5cea668f79f27c721f4150e5e1d382858cfc591').addOfficialToODLL('0x2644C554888c80462530833292b3Cb943a33395E', 4) // Edo



/* Ignore
// Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setContract("contract/odll-user-writer", "0xb5cea668f79f27c721f4150e5e1d382858cfc591", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setContract("contract/odll-user-reader", "0x088a0c9c097b1f11b2fe1b4b185a2d38632d4597", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getPermittedContracts()
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').permissionStatusForContract["0x8c21ccb420359a70ffa54366f654b81af3f228ae"]

// test user address: 0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4 [name, email, phone-number, type]
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getEntityList(["0xccd13aae8586090a842432a7f94d232b9c2c6b01816f2726f80c35315fefda97", "0xbd2be66110356bab3ab40df26b8761f0abdf45df1c4a8ec8161b4939283aeba4", "0x4e668c29ca402563b67edaf8ed8436cb2f4110388fd3aa39766e31659f8a359d", "0xe7775de79d576d872d0662a58e80f361d9908313a7edadfdf0da7f2b069cd57b"], [7, 7, 5, 2])

// 0xa4b578984936a1d734a978c880d9273ad40ef354bb5f3bff9f4b7d1e5245338a

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

// DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check UserWriter Contract

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getUIntValue('0xfdee3f0a67e1c0905d1d1b9edcca1bfcfb20fa50983fd6ec98ed3c4ec9ab8778') // check user max name length

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getUIntValue('0x27939fccc16d3a632345caa25742703dad1ced4093cdf33a23b64dcf70b4e01d') // check user min name length

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getUIntValue('0xf63344a14ef1f301f2ea2358926e73002ff132dff3be673f4bfbe98e83699fde') // check user max email length

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getUIntValue('0x11612b38ec30ac4f2241d9b322e33f7794d006d5981c6b43ff273a52c6fc051b') // check user min email length

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getAddressValue('0xf357b31d72cdb71138c59d96dfbd8bbb6cc6e9c740b4d31947bcf103faeab635') // check Escrow Address

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getUIntValue(web3.sha3('odll/scan-payment-percentage'))
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getAddressValue(web3.sha3('odll/payment-address'))
