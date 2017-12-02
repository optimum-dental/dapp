// ropsten network owner account: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9

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
  "0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4", // Setter
  "0x6723d1a36d0501187c1f3f30856f82e70baba465", // Escrow
  "0x411dde57b0e86d04a0f743fe24bcc11752e7671b", // UserWriter
  "0x15891e7cdd2323128714d4c39ea6b5c76cde084d", // UserReader
  "0x78ef611bee496da0383005950f876c73dda611f2", // ServiceWriter
  "0x9aef7bc20b1a9e71421e6b5211f60ea2586c08aa", // ServiceReader
  "0xb8cd52ef76435b3ef47b6f0e295a5fb0995a4d5d", // ScanRequestWriter
  "0x5662b1251919530d15d553cd5748022a745e98ed", // ScanRequestReader
  "0x2064f3f446b6449950ec239f69a68e59a4aa223b", // ScanRequestReader2
  "0x9f89debe7f08b6ff455871d5cc091ae28370052f", // ScanApplicationWriter
  "0xea528e0988be5847d8001b29afd3b19a4f7fe677", // ScanApplicationWriter2
  "0x4833b438518cc6219bb25c9f9dce853c31015f24", // ScanApplicationReader
  "0x3da54d6927fe88fa6fe153a447f08e3b34c67ee6", // TreatmentRequestWriter
  "0x8e44171a07ea08ec622319fc3b2ba3739a183205", // TreatmentRequestReader
  "0x2f832684228b4902973ffa7be1ca11f45960842e", // TreatmentRequestReader2
  "0x010dae078143e2ebe4b08dd876a4dc8e7d2a1b70", // TreatmentApplicationWriter
  "0x81dcfcb5459c12baf256eb6a406b28419fbb3fa9", // TreatmentApplicationWriter2
  "0xd20ee71f9b3c2406bd4ee13fb54e72170c9763da", // TreatmentApplicationReader
  "0x7d4ed23f5d10eae1a8384d8d70fc94fb064fdfeb", // PostApplicationReader
  "0x7d89d92c93af43df1dd938c2c250ccac717c25eb", // PostApplicationReader2
])
*/

// Add main contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4"])

// Add user contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x6723d1a36d0501187c1f3f30856f82e70baba465", "0x411dde57b0e86d04a0f743fe24bcc11752e7671b", "0x15891e7cdd2323128714d4c39ea6b5c76cde084d", "0x78ef611bee496da0383005950f876c73dda611f2", "0x9aef7bc20b1a9e71421e6b5211f60ea2586c08aa", "0xb8cd52ef76435b3ef47b6f0e295a5fb0995a4d5d", "0x5662b1251919530d15d553cd5748022a745e98ed", "0x2064f3f446b6449950ec239f69a68e59a4aa223b", "0x9f89debe7f08b6ff455871d5cc091ae28370052f", "0xea528e0988be5847d8001b29afd3b19a4f7fe677", "0x4833b438518cc6219bb25c9f9dce853c31015f24", "0x3da54d6927fe88fa6fe153a447f08e3b34c67ee6", "0x8e44171a07ea08ec622319fc3b2ba3739a183205", "0x2f832684228b4902973ffa7be1ca11f45960842e", "0x010dae078143e2ebe4b08dd876a4dc8e7d2a1b70", "0x81dcfcb5459c12baf256eb6a406b28419fbb3fa9", "0xd20ee71f9b3c2406bd4ee13fb54e72170c9763da", "0x7d4ed23f5d10eae1a8384d8d70fc94fb064fdfeb", "0x7d89d92c93af43df1dd938c2c250ccac717c25eb"])



// misc
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x6723d1a36d0501187c1f3f30856f82e70baba465", "0xea528e0988be5847d8001b29afd3b19a4f7fe677", "0x81dcfcb5459c12baf256eb6a406b28419fbb3fa9"])




Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setOwner()

Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setConfig()

Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setEscrowAddress("0x6723d1a36d0501187c1f3f30856f82e70baba465")

Setter.at("0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4").setScanPaymentPercentage(5)
Setter.at("0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4").setTreatmentPaymentPercentage(5)
Setter.at("0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4").setPaymentAddress("0x7a45f29170b9d4fcc75c4bcd683fe96eed963cfb")


// UserWriter.at('0x411dde57b0e86d04a0f743fe24bcc11752e7671b').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0x411dde57b0e86d04a0f743fe24bcc11752e7671b').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setContract("contract/odll-user-writer", "0x411dde57b0e86d04a0f743fe24bcc11752e7671b", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setContract("contract/odll-user-reader", "0x15891e7cdd2323128714d4c39ea6b5c76cde084d", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getPermittedContracts()
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').permissionStatusForContract["0x6723d1a36d0501187c1f3f30856f82e70baba465"]

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
