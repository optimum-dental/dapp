// ropsten network owner account: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9

// development coinbase: 0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4

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

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}))

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').setUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}), 2)

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').addPermittedContracts([
  "0x236fd6b135e8aea00ba889222037d07eaa3d33f0", // Setter
  "0x61a2daed193a6b9a417662c9371aca500df0e978", // Escrow
  "0x2cfb537b3ce9bdd29623cbf9414c51a1d90c0ba5", // UserWriter
  "0xd236b392fc0d22a87c0ac485f52e4aeae095c0b4", // UserReader
  "0x5322b5a66e984b41a864569783bdcb930cedc054", // ServiceWriter
  "0xf93e77baf7a7569e70dd8fbbfc8ed57e68c93f32", // ServiceReader
  "0xcca48444d10b2402fe7cc640ca29dafb7a1427da", // ScanRequestWriter
  "0x6b922cf195a1663bcf635e048fb89fec901f0efd", // ScanRequestWriter2
  "0xd6337a211bcda70033e2010134ac4c37ce2c8460", // ScanRequestReader
  "0x4f923365f9472943b47952a6af30ea4a0104e4dd", // ScanRequestReader2
  "0x9e4adc8bdfc045550945cd1ab7c7d12d70558513", // ScanApplicationWriter
  "0xf9a0e297a00a31cff693acf1c9c352b809ba43e3", // ScanApplicationWriter2
  "0xe71cba5938a412b2c558181fb8e3fd87eea90dca", // ScanApplicationReader
  "0xa92b7cec374c59151425db52654a4de7a2a9c19b", // TreatmentRequestWriter
  "0xb53ebfb021dd090ffaed713eca4ebfe6ca5d56dc", // TreatmentRequestWriter2
  "0x5cfcd863d80f5eb3dc0c9a9246bc9b08166650d8", // TreatmentRequestReader
  "0xd705888c8d08963be718be98df84ef5cbc1ca983", // TreatmentRequestReader2
  "0x4d8c9905a63e775377f1b8d5bbf0a7ba813eec33", // TreatmentApplicationWriter
  "0x310067fcc30585ee6dddcd425b0f0eee920f72cc", // TreatmentApplicationWriter2
  "0xb144e91ac3b9db3a651c5ec847fa6c84394cdc16", // TreatmentApplicationReader
  "0x86afbe1488681e96979b9865dff274c59b10578c", // PostApplicationReader
  "0x43634405f48a157cba18cf261607c4e6322d2966", // PostApplicationReader2
])
*/

// Add main contracts
DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').addPermittedContracts(["0x236fd6b135e8aea00ba889222037d07eaa3d33f0"])

// Add user contracts
DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').addPermittedContracts(["0x61a2daed193a6b9a417662c9371aca500df0e978", "0x2cfb537b3ce9bdd29623cbf9414c51a1d90c0ba5", "0xd236b392fc0d22a87c0ac485f52e4aeae095c0b4", "0x5322b5a66e984b41a864569783bdcb930cedc054", "0xf93e77baf7a7569e70dd8fbbfc8ed57e68c93f32", "0xcca48444d10b2402fe7cc640ca29dafb7a1427da", "0x6b922cf195a1663bcf635e048fb89fec901f0efd", "0xd6337a211bcda70033e2010134ac4c37ce2c8460", "0x4f923365f9472943b47952a6af30ea4a0104e4dd", "0x9e4adc8bdfc045550945cd1ab7c7d12d70558513", "0xf9a0e297a00a31cff693acf1c9c352b809ba43e3", "0xe71cba5938a412b2c558181fb8e3fd87eea90dca", "0xa92b7cec374c59151425db52654a4de7a2a9c19b", "0xb53ebfb021dd090ffaed713eca4ebfe6ca5d56dc", "0x5cfcd863d80f5eb3dc0c9a9246bc9b08166650d8", "0xd705888c8d08963be718be98df84ef5cbc1ca983", "0x4d8c9905a63e775377f1b8d5bbf0a7ba813eec33", "0x310067fcc30585ee6dddcd425b0f0eee920f72cc", "0xb144e91ac3b9db3a651c5ec847fa6c84394cdc16", "0x86afbe1488681e96979b9865dff274c59b10578c", "0x43634405f48a157cba18cf261607c4e6322d2966"])





Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setOwner()

Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setConfig()

Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setFirstAdmin("0xf378d4b0ef447b051fad06133615b33649423c0a") // Phoebe
Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setEscrowAddress("0x61a2daed193a6b9a417662c9371aca500df0e978")

Setter.at("0x236fd6b135e8aea00ba889222037d07eaa3d33f0").setScanPaymentPercentage(5)
Setter.at("0x236fd6b135e8aea00ba889222037d07eaa3d33f0").setTreatmentPaymentPercentage(5)
Setter.at("0x236fd6b135e8aea00ba889222037d07eaa3d33f0").setPaymentAddress("0x7a45f29170b9d4fcc75c4bcd683fe96eed963cfb") // ODLL address that receives ODLL cut


// UserWriter.at('0x2cfb537b3ce9bdd29623cbf9414c51a1d90c0ba5').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0x2cfb537b3ce9bdd29623cbf9414c51a1d90c0ba5').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina
// UserWriter.at('0x2cfb537b3ce9bdd29623cbf9414c51a1d90c0ba5').addOfficialToODLL('0x2644C554888c80462530833292b3Cb943a33395E', 4) // Edo



/* Ignore
// Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setContract("contract/odll-user-writer", "0x2cfb537b3ce9bdd29623cbf9414c51a1d90c0ba5", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setContract("contract/odll-user-reader", "0xd236b392fc0d22a87c0ac485f52e4aeae095c0b4", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getPermittedContracts()
DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').permissionStatusForContract["0x61a2daed193a6b9a417662c9371aca500df0e978"]

// test user address: 0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4 [name, email, phone-number, type]
DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getEntityList(["0xccd13aae8586090a842432a7f94d232b9c2c6b01816f2726f80c35315fefda97", "0xbd2be66110356bab3ab40df26b8761f0abdf45df1c4a8ec8161b4939283aeba4", "0x4e668c29ca402563b67edaf8ed8436cb2f4110388fd3aa39766e31659f8a359d", "0xe7775de79d576d872d0662a58e80f361d9908313a7edadfdf0da7f2b069cd57b"], [7, 7, 5, 2])

// 0xa4b578984936a1d734a978c880d9273ad40ef354bb5f3bff9f4b7d1e5245338a

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

// DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check UserWriter Contract

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getUIntValue('0xfdee3f0a67e1c0905d1d1b9edcca1bfcfb20fa50983fd6ec98ed3c4ec9ab8778') // check user max name length

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getUIntValue('0x27939fccc16d3a632345caa25742703dad1ced4093cdf33a23b64dcf70b4e01d') // check user min name length

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getUIntValue('0xf63344a14ef1f301f2ea2358926e73002ff132dff3be673f4bfbe98e83699fde') // check user max email length

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getUIntValue('0x11612b38ec30ac4f2241d9b322e33f7794d006d5981c6b43ff273a52c6fc051b') // check user min email length

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getAddressValue('0xf357b31d72cdb71138c59d96dfbd8bbb6cc6e9c740b4d31947bcf103faeab635') // check Escrow Address

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getUIntValue(web3.sha3('odll/scan-payment-percentage'))
DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getAddressValue(web3.sha3('odll/payment-address'))


Escrow.at('0xb7ab65085e29a931bc86c92d525d3133a41dcbfa').transferFunds('0xf378d4b0ef447b051fad06133615b33649423c0a', '0x61a2daed193a6b9a417662c9371aca500df0e978') // Send funds of the old Escrow contract address [0xb7ab65085e29a931bc86c92d525d3133a41dcbfa] to the new Escrow contract address [0x61a2daed193a6b9a417662c9371aca500df0e978]. Action can only be performed by Owner [0xf378d4b0ef447b051fad06133615b33649423c0a]
