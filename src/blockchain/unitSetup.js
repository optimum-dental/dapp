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

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}))

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').setUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}), 2)

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts([
  "0xd1ba29ebc79e3fcda240165667af7f4c1d5da399", // Setter
  "0x9579419d8470f0334f850646d791eb5c76dec6d3", // Escrow
  "0x28543356ca81e7543fded1057a40215ad4f34512", // UserWriter
  "0x7eb0be7150736b370e2b44cec466cb79ebd6941f", // UserReader
  "0xc58e64513762fb1ae4b26d0f1708971825dd3b06", // ServiceWriter
  "0x0e231906fdade50a58baa4f4863f2bac442095a2", // ServiceReader
  "0x7b5442a55df3db707dbd180e3c9911d84ac94318", // ScanRequestWriter
  "0xdde4ae919be067c0889e1e71f12a86c76c5520d4", // ScanRequestReader
  "0x0ce4ec3f9aedaa31cc4db013336f1bbf9594b869", // ScanRequestReader2
  "0x129522a73785e46da88d4b9fdb4722f72d78c84f", // ScanApplicationWriter
  "0xce72d455cd66941aed56e053d075f13d173a0c02", // ScanApplicationWriter2
  "0xc307ff56eb1917829b729aa930fcded1bd7049c3", // ScanApplicationReader
  "0xbbc9a2effde0e1a857788b2a3dde4bf7a67c9efc", // TreatmentRequestWriter
  "0x7fc4a85a0319092e5050f5741052746a551f4416", // TreatmentRequestReader
  "0x9d91e5e94f95380883589a4fa89b267269be0066", // TreatmentRequestReader2
  "0x43acb91b4948f1fbbbbcff20e293e3e18fccede2", // TreatmentApplicationWriter
  "0x545a1c4d8f46405445cde1c875d1b0dea95f76d9", // TreatmentApplicationWriter2
  "0xe4ca4e4748fb9fc8eb0861122fa128ae78ad2f9c", // TreatmentApplicationReader
  "0x5edfd014e6d5be233d9ad67944d401502184ccd7", // PostApplicationReader
  "0x5d4d0a92c31123fb16e6c95c79e010b83fac4405", // PostApplicationReader2
])
*/

// Add main contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0xd1ba29ebc79e3fcda240165667af7f4c1d5da399"])

// Add user contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0x9579419d8470f0334f850646d791eb5c76dec6d3", "0x28543356ca81e7543fded1057a40215ad4f34512", "0x7eb0be7150736b370e2b44cec466cb79ebd6941f", "0xc58e64513762fb1ae4b26d0f1708971825dd3b06", "0x0e231906fdade50a58baa4f4863f2bac442095a2", "0x7b5442a55df3db707dbd180e3c9911d84ac94318", "0xdde4ae919be067c0889e1e71f12a86c76c5520d4", "0x0ce4ec3f9aedaa31cc4db013336f1bbf9594b869", "0x129522a73785e46da88d4b9fdb4722f72d78c84f", "0xce72d455cd66941aed56e053d075f13d173a0c02", "0xc307ff56eb1917829b729aa930fcded1bd7049c3", "0xbbc9a2effde0e1a857788b2a3dde4bf7a67c9efc", "0x7fc4a85a0319092e5050f5741052746a551f4416", "0x9d91e5e94f95380883589a4fa89b267269be0066", "0x43acb91b4948f1fbbbbcff20e293e3e18fccede2", "0x545a1c4d8f46405445cde1c875d1b0dea95f76d9", "0xe4ca4e4748fb9fc8eb0861122fa128ae78ad2f9c", "0x5edfd014e6d5be233d9ad67944d401502184ccd7", "0x5d4d0a92c31123fb16e6c95c79e010b83fac4405"])



// misc
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0x9579419d8470f0334f850646d791eb5c76dec6d3", "0xce72d455cd66941aed56e053d075f13d173a0c02", "0x545a1c4d8f46405445cde1c875d1b0dea95f76d9"])




Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setOwner()

Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setConfig()

Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setEscrowAddress("0x9579419d8470f0334f850646d791eb5c76dec6d3")

Setter.at("0xd1ba29ebc79e3fcda240165667af7f4c1d5da399").setScanPaymentPercentage(5)
Setter.at("0xd1ba29ebc79e3fcda240165667af7f4c1d5da399").setTreatmentPaymentPercentage(5)


// UserWriter.at('0x28543356ca81e7543fded1057a40215ad4f34512').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0x28543356ca81e7543fded1057a40215ad4f34512').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setContract("contract/odll-user-writer", "0x28543356ca81e7543fded1057a40215ad4f34512", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setContract("contract/odll-user-reader", "0x7eb0be7150736b370e2b44cec466cb79ebd6941f", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getPermittedContracts()
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').permissionStatusForContract["0x9579419d8470f0334f850646d791eb5c76dec6d3"]

// test user address: 0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4 [name, email, phone-number, type]
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getEntityList(["0xccd13aae8586090a842432a7f94d232b9c2c6b01816f2726f80c35315fefda97", "0xbd2be66110356bab3ab40df26b8761f0abdf45df1c4a8ec8161b4939283aeba4", "0x4e668c29ca402563b67edaf8ed8436cb2f4110388fd3aa39766e31659f8a359d", "0xe7775de79d576d872d0662a58e80f361d9908313a7edadfdf0da7f2b069cd57b"], [7, 7, 5, 2])

// 0xa4b578984936a1d734a978c880d9273ad40ef354bb5f3bff9f4b7d1e5245338a

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

// DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check UserWriter Contract

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getUIntValue('0xfdee3f0a67e1c0905d1d1b9edcca1bfcfb20fa50983fd6ec98ed3c4ec9ab8778') // check user max name length

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getUIntValue('0x27939fccc16d3a632345caa25742703dad1ced4093cdf33a23b64dcf70b4e01d') // check user min name length

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getUIntValue('0xf63344a14ef1f301f2ea2358926e73002ff132dff3be673f4bfbe98e83699fde') // check user max email length

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getUIntValue('0x11612b38ec30ac4f2241d9b322e33f7794d006d5981c6b43ff273a52c6fc051b') // check user min email length

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getAddressValue('0xf357b31d72cdb71138c59d96dfbd8bbb6cc6e9c740b4d31947bcf103faeab635') // check Escrow Address

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getUIntValue(web3.sha3('odll/scan-payment-percentage'))
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getAddressValue(web3.sha3('odll/payment-address'))
