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
  "0x3ed1cb5663ec309c7fcf39b6b15aba252d5e58a0", // Escrow
  "0x280c6b813784d88c1349fa298dbb22771b4873b3", // UserWriter
  "0xb2f9c4f47277d3120e4d52f287774a9d243afb43", // UserReader
  "0x45a86ea8c1be5af81ecad7bc113e38e22626998d", // ServiceWriter
  "0xae4fb8239a1b2970597c5e8c8afbdcd0e731b7fc", // ServiceReader
  "0x7a8f7169e592712cce23929632310dfb3f07c97f", // ScanRequestWriter
  "0xc0b7c99640adeb90bcc0d630f06bd232f0b1bc97", // ScanRequestReader
  "0x0c74bc8d019bf0e195f27de2b06d95887a232169", // ScanRequestReader2
  "0xf6a569e141fc1df32debe26e0c055d953e425d71", // ScanApplicationWriter
  "0xc945148f763037df00be73b249d42f254b7298ec", // ScanApplicationWriter2
  "0xaa84ca869a430e6b8fe2ed343502ae5baa443532", // ScanApplicationReader
  "0xe3aa4669d18620284763ee9d8761c53d7dce8aeb", // TreatmentRequestWriter
  "0xee04d53198a18a0390764168395711e23dc03fbe", // TreatmentRequestReader
  "0x0297769371301f2d428c70966b249d8e8da88c4d", // TreatmentRequestReader2
  "0xbc1c66fcbc60bfd74bba09cb0128a3bcfc1213ae", // TreatmentApplicationWriter
  "0x3ece675ccf7b888e702e71dac229a0b608844158", // TreatmentApplicationWriter2
  "0x25792cec0e4206a875f0cdc515cb10ac7d22b269", // TreatmentApplicationReader
  "0xbdecac8e6dd41d972ae3b806306a32fe2acfc047", // PostApplicationReader
  "0x7139a37600a0a4a03d31c81694d77e9912817aa4", // PostApplicationReader2
])
*/

// Add main contracts
DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').addPermittedContracts(["0x236fd6b135e8aea00ba889222037d07eaa3d33f0"])

// Add user contracts
DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').addPermittedContracts(["0x3ed1cb5663ec309c7fcf39b6b15aba252d5e58a0", "0x280c6b813784d88c1349fa298dbb22771b4873b3", "0xb2f9c4f47277d3120e4d52f287774a9d243afb43", "0x45a86ea8c1be5af81ecad7bc113e38e22626998d", "0xae4fb8239a1b2970597c5e8c8afbdcd0e731b7fc", "0x7a8f7169e592712cce23929632310dfb3f07c97f", "0xc0b7c99640adeb90bcc0d630f06bd232f0b1bc97", "0x0c74bc8d019bf0e195f27de2b06d95887a232169", "0xf6a569e141fc1df32debe26e0c055d953e425d71", "0xc945148f763037df00be73b249d42f254b7298ec", "0xaa84ca869a430e6b8fe2ed343502ae5baa443532", "0xe3aa4669d18620284763ee9d8761c53d7dce8aeb", "0xee04d53198a18a0390764168395711e23dc03fbe", "0x0297769371301f2d428c70966b249d8e8da88c4d", "0xbc1c66fcbc60bfd74bba09cb0128a3bcfc1213ae", "0x3ece675ccf7b888e702e71dac229a0b608844158", "0x25792cec0e4206a875f0cdc515cb10ac7d22b269", "0xbdecac8e6dd41d972ae3b806306a32fe2acfc047", "0x7139a37600a0a4a03d31c81694d77e9912817aa4"])





Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setOwner()

Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setConfig()

Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setEscrowAddress("0x3ed1cb5663ec309c7fcf39b6b15aba252d5e58a0")

Setter.at("0x236fd6b135e8aea00ba889222037d07eaa3d33f0").setScanPaymentPercentage(5)
Setter.at("0x236fd6b135e8aea00ba889222037d07eaa3d33f0").setTreatmentPaymentPercentage(5)
Setter.at("0x236fd6b135e8aea00ba889222037d07eaa3d33f0").setPaymentAddress("0x7a45f29170b9d4fcc75c4bcd683fe96eed963cfb") // ODLL address that receives ODLL cut


// UserWriter.at('0x280c6b813784d88c1349fa298dbb22771b4873b3').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0x280c6b813784d88c1349fa298dbb22771b4873b3').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina
// UserWriter.at('0x280c6b813784d88c1349fa298dbb22771b4873b3').addOfficialToODLL('0x2644C554888c80462530833292b3Cb943a33395E', 4) // Edo



/* Ignore
// Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setContract("contract/odll-user-writer", "0x280c6b813784d88c1349fa298dbb22771b4873b3", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x236fd6b135e8aea00ba889222037d07eaa3d33f0').setContract("contract/odll-user-reader", "0xb2f9c4f47277d3120e4d52f287774a9d243afb43", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').getPermittedContracts()
DB.at('0xb870fafb1e26e4069ed34dd1bcf9b42b1b87a93f').permissionStatusForContract["0x3ed1cb5663ec309c7fcf39b6b15aba252d5e58a0"]

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


Escrow.at('0xb7ab65085e29a931bc86c92d525d3133a41dcbfa').transferFunds('0xf378d4b0ef447b051fad06133615b33649423c0a', '0x3ed1cb5663ec309c7fcf39b6b15aba252d5e58a0') // Send funds of the old Escrow contract address [0xb7ab65085e29a931bc86c92d525d3133a41dcbfa] to the new Escrow contract address [0x3ed1cb5663ec309c7fcf39b6b15aba252d5e58a0]. Action can only be performed by Owner [0xf378d4b0ef447b051fad06133615b33649423c0a]
