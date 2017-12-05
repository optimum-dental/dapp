// ropsten network owner account: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9

// ropsten coinbase: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9
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

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}))

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').setUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}), 2)

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts([
  "0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68", // Setter
  "0xb7ab65085e29a931bc86c92d525d3133a41dcbfa", // Escrow
  "0xdb9b96e79b7056d6f2377a330368a82a1cc7b87e", // UserWriter
  "0x443a061bdd3d4d9213e4f5f845d8339301eb8a81", // UserReader
  "0xc02569a978d095c74c1ada8f101f18b8dd96b66e", // ServiceWriter
  "0x504d48bac488bb469940fa2a73dcaf183a371919", // ServiceReader
  "0x2cbbe65efc688c0c4619530f69ba1d2a65d15e7f", // ScanRequestWriter
  "0x7ff212f1e288d9a05b08d1727ecf364fdefbd038", // ScanRequestReader
  "0xe7b25ff12ba0f775a0d19cac426042192fbfae4b", // ScanRequestReader2
  "0x152123f5104c28b1863f93ffe91360bad7b0bea3", // ScanApplicationWriter
  "0x74d47487025d5592ef55c09529fe4247a56a0357", // ScanApplicationWriter2
  "0xbec9a1476f5fdf73a662b5da22e7ebe08df47718", // ScanApplicationReader
  "0xb83b0ac1e0d4bf82a44cab0b39663508653f929c", // TreatmentRequestWriter
  "0x7a9de3f39277b8bf3936f1a947967d90e9335847", // TreatmentRequestReader
  "0x1031f4b5637164dd1eca6ef0bc5ae5fbcf3a8e90", // TreatmentRequestReader2
  "0xca24892c4f025c62065fd1fa33a27d5dab45cf52", // TreatmentApplicationWriter
  "0xeae8b318620deaaa443a27b6aa4563d4efc0462f", // TreatmentApplicationWriter2
  "0x8ad26dbf15d84e55bcaa82ece2bd697bf2d652bd", // TreatmentApplicationReader
  "0xa1949cc4f1a37738e2956e50412b8067c5b7a3ed", // PostApplicationReader
  "0x8a99d0aa9e259e32f9de8463879f482c5e669eaa", // PostApplicationReader2
])
*/

// Add main contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68"])

// Add user contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0xb7ab65085e29a931bc86c92d525d3133a41dcbfa", "0xdb9b96e79b7056d6f2377a330368a82a1cc7b87e", "0x443a061bdd3d4d9213e4f5f845d8339301eb8a81", "0xc02569a978d095c74c1ada8f101f18b8dd96b66e", "0x504d48bac488bb469940fa2a73dcaf183a371919", "0x2cbbe65efc688c0c4619530f69ba1d2a65d15e7f", "0x7ff212f1e288d9a05b08d1727ecf364fdefbd038", "0xe7b25ff12ba0f775a0d19cac426042192fbfae4b", "0x152123f5104c28b1863f93ffe91360bad7b0bea3", "0x74d47487025d5592ef55c09529fe4247a56a0357", "0xbec9a1476f5fdf73a662b5da22e7ebe08df47718", "0xb83b0ac1e0d4bf82a44cab0b39663508653f929c", "0x7a9de3f39277b8bf3936f1a947967d90e9335847", "0x1031f4b5637164dd1eca6ef0bc5ae5fbcf3a8e90", "0xca24892c4f025c62065fd1fa33a27d5dab45cf52", "0xeae8b318620deaaa443a27b6aa4563d4efc0462f", "0x8ad26dbf15d84e55bcaa82ece2bd697bf2d652bd", "0xa1949cc4f1a37738e2956e50412b8067c5b7a3ed", "0x8a99d0aa9e259e32f9de8463879f482c5e669eaa"])



// misc
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0xb7ab65085e29a931bc86c92d525d3133a41dcbfa", "0x74d47487025d5592ef55c09529fe4247a56a0357", "0xeae8b318620deaaa443a27b6aa4563d4efc0462f"])

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContract("0x229585932dbdb0eca213ff7664aa582aa26688b1")




Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setOwner()

Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setConfig()

Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setEscrowAddress("0xb7ab65085e29a931bc86c92d525d3133a41dcbfa")

Setter.at("0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68").setScanPaymentPercentage(5)
Setter.at("0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68").setTreatmentPaymentPercentage(5)
Setter.at("0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68").setPaymentAddress("0x7a45f29170b9d4fcc75c4bcd683fe96eed963cfb")


// UserWriter.at('0xdb9b96e79b7056d6f2377a330368a82a1cc7b87e').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0xdb9b96e79b7056d6f2377a330368a82a1cc7b87e').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina
// UserWriter.at('0xdb9b96e79b7056d6f2377a330368a82a1cc7b87e').addOfficialToODLL('0x2644C554888c80462530833292b3Cb943a33395E', 4) // Edo



/* Ignore
// Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setContract("contract/odll-user-writer", "0xdb9b96e79b7056d6f2377a330368a82a1cc7b87e", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setContract("contract/odll-user-reader", "0x443a061bdd3d4d9213e4f5f845d8339301eb8a81", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getPermittedContracts()
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').permissionStatusForContract["0xb7ab65085e29a931bc86c92d525d3133a41dcbfa"]

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
