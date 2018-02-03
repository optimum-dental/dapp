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

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}))

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').setUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}), 2)

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').addPermittedContracts([
  "0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa", // Setter
  "0xc529fc60d154a841c1fae731b6bbb16ed3574361", // Escrow
  "0xf57bb9811e7aed65ceefacaacc86f4eb1c3d39a0", // UserWriter
  "0x48373c09febe4a42f4542f2d75c8d0c1341ba062", // UserReader
  "0xc9ffa33ba81263f429b6bfda534eb21be584be55", // ServiceWriter
  "0x8004e86ff30d50f90d805f19f5eb801fee8352d0", // ServiceReader
  "0x5aa001d2409b87f441487af356f655e9905cc1b6", // ScanRequestWriter
  "0x4bec71559fec0f69710adadf90607769df6daad6", // ScanRequestWriter2
  "0xcf677806ae81941bb57bc50e16d416ba2604b279", // ScanRequestReader
  "0xeaf00553cf1fed274ca0442ac77bbfcbbd516d8f", // ScanRequestReader2
  "0xe539a0387bb6bb05a94940b9655ea9b5142dcad6", // ScanApplicationWriter
  "0x414a027f6664083ccef30b6b175f6edbf80bc24c", // ScanApplicationWriter2
  "0xca4c208f014b52b8fa4b153de5381cc27497c7c4", // ScanApplicationReader
  "0x9685f6ee050dfac11ea81b2d9ddf2ce1bb157d5b", // TreatmentRequestWriter
  "0xcbda50d6404eed163ed6c4fcf855254efc335a8e", // TreatmentRequestWriter2
  "0x265e7bdf860b08ea35ebf53aa005fe5626a1038b", // TreatmentRequestReader
  "0xbcdde89f55f83162dfa9552f66450218de2af2c9", // TreatmentRequestReader2
  "0x7de2a6985b674048768ba75deac8d39cecd336af", // TreatmentApplicationWriter
  "0x77d42d03532a06502dee2f751fdbe230cbeab273", // TreatmentApplicationWriter2
  "0xa6a0928ddc31c3d0b16c7642a1f6045b9516bf6c", // TreatmentApplicationReader
  "0x55debced8114717272e02aaa0f8f6f9ad88f5af3", // PostApplicationReader
  "0xdf51db248983776ed8a507e798767bed24ee2717", // PostApplicationReader2
])
*/

// Add main contracts
DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').addPermittedContracts(["0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa"])

// Add user contracts
DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').addPermittedContracts(["0xc529fc60d154a841c1fae731b6bbb16ed3574361", "0xf57bb9811e7aed65ceefacaacc86f4eb1c3d39a0", "0x48373c09febe4a42f4542f2d75c8d0c1341ba062", "0xc9ffa33ba81263f429b6bfda534eb21be584be55", "0x8004e86ff30d50f90d805f19f5eb801fee8352d0", "0x5aa001d2409b87f441487af356f655e9905cc1b6", "0x4bec71559fec0f69710adadf90607769df6daad6", "0xcf677806ae81941bb57bc50e16d416ba2604b279", "0xeaf00553cf1fed274ca0442ac77bbfcbbd516d8f", "0xe539a0387bb6bb05a94940b9655ea9b5142dcad6", "0x414a027f6664083ccef30b6b175f6edbf80bc24c", "0xca4c208f014b52b8fa4b153de5381cc27497c7c4", "0x9685f6ee050dfac11ea81b2d9ddf2ce1bb157d5b", "0xcbda50d6404eed163ed6c4fcf855254efc335a8e", "0x265e7bdf860b08ea35ebf53aa005fe5626a1038b", "0xbcdde89f55f83162dfa9552f66450218de2af2c9", "0x7de2a6985b674048768ba75deac8d39cecd336af", "0x77d42d03532a06502dee2f751fdbe230cbeab273", "0xa6a0928ddc31c3d0b16c7642a1f6045b9516bf6c", "0x55debced8114717272e02aaa0f8f6f9ad88f5af3", "0xdf51db248983776ed8a507e798767bed24ee2717"])





Setter.at('0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa').setOwner()

Setter.at('0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa').setConfig()

Setter.at('0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa').setEscrowAddress("0xc529fc60d154a841c1fae731b6bbb16ed3574361")

Setter.at("0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa").setScanPaymentPercentage(5)
Setter.at("0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa").setTreatmentPaymentPercentage(5)
Setter.at("0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa").setPaymentAddress("0x7a45f29170b9d4fcc75c4bcd683fe96eed963cfb")


// UserWriter.at('0xf57bb9811e7aed65ceefacaacc86f4eb1c3d39a0').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0xf57bb9811e7aed65ceefacaacc86f4eb1c3d39a0').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina
// UserWriter.at('0xf57bb9811e7aed65ceefacaacc86f4eb1c3d39a0').addOfficialToODLL('0x2644C554888c80462530833292b3Cb943a33395E', 4) // Edo



/* Ignore
// Setter.at('0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa').setContract("contract/odll-user-writer", "0xf57bb9811e7aed65ceefacaacc86f4eb1c3d39a0", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x0ffc95c3e234ea7f95f418ed0f99439e1e99b7fa').setContract("contract/odll-user-reader", "0x48373c09febe4a42f4542f2d75c8d0c1341ba062", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getPermittedContracts()
DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').permissionStatusForContract["0xc529fc60d154a841c1fae731b6bbb16ed3574361"]

// test user address: 0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4 [name, email, phone-number, type]
DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getEntityList(["0xccd13aae8586090a842432a7f94d232b9c2c6b01816f2726f80c35315fefda97", "0xbd2be66110356bab3ab40df26b8761f0abdf45df1c4a8ec8161b4939283aeba4", "0x4e668c29ca402563b67edaf8ed8436cb2f4110388fd3aa39766e31659f8a359d", "0xe7775de79d576d872d0662a58e80f361d9908313a7edadfdf0da7f2b069cd57b"], [7, 7, 5, 2])

// 0xa4b578984936a1d734a978c880d9273ad40ef354bb5f3bff9f4b7d1e5245338a

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

// DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check UserWriter Contract

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getUIntValue('0xfdee3f0a67e1c0905d1d1b9edcca1bfcfb20fa50983fd6ec98ed3c4ec9ab8778') // check user max name length

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getUIntValue('0x27939fccc16d3a632345caa25742703dad1ced4093cdf33a23b64dcf70b4e01d') // check user min name length

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getUIntValue('0xf63344a14ef1f301f2ea2358926e73002ff132dff3be673f4bfbe98e83699fde') // check user max email length

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getUIntValue('0x11612b38ec30ac4f2241d9b322e33f7794d006d5981c6b43ff273a52c6fc051b') // check user min email length

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getAddressValue('0xf357b31d72cdb71138c59d96dfbd8bbb6cc6e9c740b4d31947bcf103faeab635') // check Escrow Address

DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getUIntValue(web3.sha3('odll/scan-payment-percentage'))
DB.at('0xbf588135843465cbb2b4493c654231a4fa12b182').getAddressValue(web3.sha3('odll/payment-address'))
