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

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}))

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').setUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}), 2)

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts([
  "0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68", // Setter
  "0x331ee726864bd39130e3bd3810cf0c268a6d0738", // Escrow
  "0xb517059bfa1794002924c2e7bac606e7649dd3d8", // UserWriter
  "0xe10a3610d6bf2ef146ff3191aa1c8859cf89ae53", // UserReader
  "0x63baa39768ccf45efdc476fff1560bd5bc49e482", // ServiceWriter
  "0xfc6e199046e0d448f5169702269720542bdc57e2", // ServiceReader
  "0xd4c9c5c0ddc7a7cb66a99bdf40c253766163fbe7", // ScanRequestWriter
  "0x3e3c24a863c61d9642e738652c32a2848ea4eace", // ScanRequestReader
  "0xcdf3d2de0571b6759b038356c8e02c5f9ec669c0", // ScanRequestReader2
  "0xe8d1927aff3b27f249485343a782f0262898442d", // ScanApplicationWriter
  "0xe55b7136fcaa50427a4875a156b9c38c99a06895", // ScanApplicationWriter2
  "0x0243d587437be869324e699433d545aedc0dd05a", // ScanApplicationReader
  "0x2361ef424fe44054d6f1f24ecd5af5422a415fbe", // TreatmentRequestWriter
  "0x33a40f67b39c193351842e09dbefaece1ac6a8d2", // TreatmentRequestReader
  "0x0e885b0bcfd20996e85e452cc1f5016700a56cbe", // TreatmentRequestReader2
  "0x05a244bfd8bf82c60d48fac20a5af6e206da2c17", // TreatmentApplicationWriter
  "0xbf832a5d0a4718b3708391992b44495070a88b4b", // TreatmentApplicationWriter2
  "0x48124b8d0cc7a684f582dad8eaa44c36529cc2d1", // TreatmentApplicationReader
  "0x33354e1152cf53a328148f3f618363461d6e2c10", // PostApplicationReader
  "0x330daff69ab6e703280742cf54c6f3d18d9d66fe", // PostApplicationReader2
])
*/

// Add main contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68"])

// Add user contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0x331ee726864bd39130e3bd3810cf0c268a6d0738", "0xb517059bfa1794002924c2e7bac606e7649dd3d8", "0xe10a3610d6bf2ef146ff3191aa1c8859cf89ae53", "0x63baa39768ccf45efdc476fff1560bd5bc49e482", "0xfc6e199046e0d448f5169702269720542bdc57e2", "0xd4c9c5c0ddc7a7cb66a99bdf40c253766163fbe7", "0x3e3c24a863c61d9642e738652c32a2848ea4eace", "0xcdf3d2de0571b6759b038356c8e02c5f9ec669c0", "0xe8d1927aff3b27f249485343a782f0262898442d", "0xe55b7136fcaa50427a4875a156b9c38c99a06895", "0x0243d587437be869324e699433d545aedc0dd05a", "0x2361ef424fe44054d6f1f24ecd5af5422a415fbe", "0x33a40f67b39c193351842e09dbefaece1ac6a8d2", "0x0e885b0bcfd20996e85e452cc1f5016700a56cbe", "0x05a244bfd8bf82c60d48fac20a5af6e206da2c17", "0xbf832a5d0a4718b3708391992b44495070a88b4b", "0x48124b8d0cc7a684f582dad8eaa44c36529cc2d1", "0x33354e1152cf53a328148f3f618363461d6e2c10", "0x330daff69ab6e703280742cf54c6f3d18d9d66fe"])



// misc
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0x331ee726864bd39130e3bd3810cf0c268a6d0738", "0xe55b7136fcaa50427a4875a156b9c38c99a06895", "0xbf832a5d0a4718b3708391992b44495070a88b4b"])

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContract("0x229585932dbdb0eca213ff7664aa582aa26688b1")




Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setOwner()

Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setConfig()

Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setEscrowAddress("0x331ee726864bd39130e3bd3810cf0c268a6d0738")

Setter.at("0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68").setScanPaymentPercentage(5)
Setter.at("0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68").setTreatmentPaymentPercentage(5)
Setter.at("0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68").setPaymentAddress("0x7a45f29170b9d4fcc75c4bcd683fe96eed963cfb")


// UserWriter.at('0xb517059bfa1794002924c2e7bac606e7649dd3d8').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0xb517059bfa1794002924c2e7bac606e7649dd3d8').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina
// UserWriter.at('0xb517059bfa1794002924c2e7bac606e7649dd3d8').addOfficialToODLL('0x2644C554888c80462530833292b3Cb943a33395E', 4) // Edo



/* Ignore
// Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setContract("contract/odll-user-writer", "0xb517059bfa1794002924c2e7bac606e7649dd3d8", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0xbd5fd96fd83ccb46ea175a3ac61ff673b2d41f68').setContract("contract/odll-user-reader", "0xe10a3610d6bf2ef146ff3191aa1c8859cf89ae53", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getPermittedContracts()
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').permissionStatusForContract["0x331ee726864bd39130e3bd3810cf0c268a6d0738"]

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


Escrow.at('0xb7ab65085e29a931bc86c92d525d3133a41dcbfa').transferFunds('0xf378d4b0ef447b051fad06133615b33649423c0a', '0x331ee726864bd39130e3bd3810cf0c268a6d0738')
