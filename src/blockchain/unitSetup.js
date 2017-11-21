// ropsten network owner account: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts([
  "0x787d4969b1d308b20b50a08d8855aa8504bf5029", // Setter
  "0xa47e9b9624148336c64cd2ad7e6e2b89032b05b7", // UserWriter
  "0x5f9c3033e84c91798a869c1ecd7e6137424dc301", // UserReader
  "0xb6ac747d985b3b07c2adb8e2e8b1e1b76da42287", // ServiceWriter
  "0x147861029bad761626a074ce6ee1ad0be427aacd", // ServiceReader
  "0x73dd3a4e668beb2e619361bc888f74f87880e049", // ScanRequestWriter
  "0x7d3c9a693fea510bd0dc837c052b044b079659e4", // ScanRequestReader
  "0x936ea5f2a88deb61bef51fa1db905a30b254b560", // ScanApplicationWriter
  "0x1e70080e8654841e49a4864b13e69435c9f52182", // ScanApplicationWriter2
  "0x98f24b7894e3379e2a6be3fa4b1b2b7f1e7419d4", // ScanApplicationReader
  "0x1744d7da7dacbc27b897bfeababbd36f936a1f31", // TreatmentRequestWriter
  "0x264d42eb1a430942be1931956c57fe6782f88c27", // TreatmentRequestReader
  "0x8c48092ce22636dd94654830a41022f7f09343dc", // TreatmentApplicationWriter
  "0xeffaa8e19df2b9549e90457d2f7870b143326a0e", // TreatmentApplicationWriter2
  "0x4dabf088f1f942d2d757ae296fe256963f98a64e", // TreatmentApplicationReader
])
*/

// Add main contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x787d4969b1d308b20b50a08d8855aa8504bf5029"])

// Add user contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0xa47e9b9624148336c64cd2ad7e6e2b89032b05b7", "0x5f9c3033e84c91798a869c1ecd7e6137424dc301", "0xb6ac747d985b3b07c2adb8e2e8b1e1b76da42287", "0x147861029bad761626a074ce6ee1ad0be427aacd", "0x73dd3a4e668beb2e619361bc888f74f87880e049", "0x7d3c9a693fea510bd0dc837c052b044b079659e4", "0x936ea5f2a88deb61bef51fa1db905a30b254b560", "0x1e70080e8654841e49a4864b13e69435c9f52182", "0x98f24b7894e3379e2a6be3fa4b1b2b7f1e7419d4", "0x1744d7da7dacbc27b897bfeababbd36f936a1f31", "0x264d42eb1a430942be1931956c57fe6782f88c27", "0x8c48092ce22636dd94654830a41022f7f09343dc", "0xeffaa8e19df2b9549e90457d2f7870b143326a0e", "0x4dabf088f1f942d2d757ae296fe256963f98a64e"])

Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setOwner()

Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setConfig()

Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe

// UserWriter.at('0xa47e9b9624148336c64cd2ad7e6e2b89032b05b7').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0xa47e9b9624148336c64cd2ad7e6e2b89032b05b7').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setContract("contract/odll-user-writer", "0xa47e9b9624148336c64cd2ad7e6e2b89032b05b7", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setContract("contract/odll-user-reader", "0x5f9c3033e84c91798a869c1ecd7e6137424dc301", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getPermittedContracts()

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
