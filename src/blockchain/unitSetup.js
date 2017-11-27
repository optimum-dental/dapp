// ropsten network owner account: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts([
  "0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4", // Setter
  "0x8ba4f172704c107e35155f6ce3e44aa2f198a9e5", // UserWriter
  "0x1237a441badbca754b46dd2e2970ee174d855875", // UserReader
  "0xc1be5021c5838b6f033555e823795e8c02a6dfab", // ServiceWriter
  "0x8d3242af94a693000678ac038d31753dfff6632d", // ServiceReader
  "0x5d2fb46227db33594128aac491faa8bd73ffe9df", // ScanRequestWriter
  "0x6a8bfeca8525473da83d87e5aa12550b08f0bf13", // ScanRequestReader
  "0x20f76e31ff795feeab0c862607eb45b9e531be5e", // ScanRequestReader2
  "0xb005d7c38b3735a08a7ed0de3c27367732d68122", // ScanApplicationWriter
  "0x480ee9a9e4aac7bec4e685a293b35e0eb6ab485f", // ScanApplicationWriter2
  "0x3532f5bb5f2b7dbb647080bd398fbf64cc681d46", // ScanApplicationReader
  "0xf5873fb394b069f3b5222525a58eff42fd083385", // TreatmentRequestWriter
  "0x3365ecf6b8ca57fc5f5748eec0e45e752bc9dcef", // TreatmentRequestReader
  "0xcdc709f802d71b28ee9fda7f3b70540989351b61", // TreatmentRequestReader2
  "0x429905ae80b3ca9cfa42e08b079f9758972107db", // TreatmentApplicationWriter
  "0x3a564efd3204ebd8903e6738a3eec9d114f6e183", // TreatmentApplicationWriter2
  "0x98b6d40616e3171c4f5b887458e44b5e2cd8043a", // TreatmentApplicationReader
  "0x074ff69ad4c1f67785090d916f1b5425ba4551ae", // Escrow
])
*/

// Add main contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4"])

// Add user contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x8ba4f172704c107e35155f6ce3e44aa2f198a9e5", "0x1237a441badbca754b46dd2e2970ee174d855875", "0xc1be5021c5838b6f033555e823795e8c02a6dfab", "0x8d3242af94a693000678ac038d31753dfff6632d", "0x5d2fb46227db33594128aac491faa8bd73ffe9df", "0x6a8bfeca8525473da83d87e5aa12550b08f0bf13", "0x20f76e31ff795feeab0c862607eb45b9e531be5e", "0xb005d7c38b3735a08a7ed0de3c27367732d68122", "0x480ee9a9e4aac7bec4e685a293b35e0eb6ab485f", "0x3532f5bb5f2b7dbb647080bd398fbf64cc681d46", "0xf5873fb394b069f3b5222525a58eff42fd083385", "0x3365ecf6b8ca57fc5f5748eec0e45e752bc9dcef", "0xcdc709f802d71b28ee9fda7f3b70540989351b61", "0x429905ae80b3ca9cfa42e08b079f9758972107db", "0x3a564efd3204ebd8903e6738a3eec9d114f6e183", "0x98b6d40616e3171c4f5b887458e44b5e2cd8043a", "0x074ff69ad4c1f67785090d916f1b5425ba4551ae"])



// misc
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x480ee9a9e4aac7bec4e685a293b35e0eb6ab485f", "0x3a564efd3204ebd8903e6738a3eec9d114f6e183", "0x074ff69ad4c1f67785090d916f1b5425ba4551ae"])




Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setOwner()

Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setConfig()

Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setEscrowAddress("0x074ff69ad4c1f67785090d916f1b5425ba4551ae")

// UserWriter.at('0x8ba4f172704c107e35155f6ce3e44aa2f198a9e5').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0x8ba4f172704c107e35155f6ce3e44aa2f198a9e5').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setContract("contract/odll-user-writer", "0x8ba4f172704c107e35155f6ce3e44aa2f198a9e5", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4').setContract("contract/odll-user-reader", "0x1237a441badbca754b46dd2e2970ee174d855875", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getPermittedContracts()
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').permissionStatusForContract["0xb2074c46c54f9b06dc4b31c99621b8199a6cf0f4"]

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
