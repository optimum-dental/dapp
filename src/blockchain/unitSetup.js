// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').addPermittedContracts([
  "0xa0551ce5a784c0b95123b3a06616439ae19cc2ba", // Setter
  "0xce43c8053aaa83a6895f3a7849ef61b1616d81f1", // UserWriter
  "0x86096761a8bb08c8cce0f2a4eb13f3f2b8b5757b", // UserReader
  "0x0497921631b5bdedc1ff86f8959d722355abcfbf", // ServiceWriter
  "0x0d57c9cbeeb425d669e07b08fffd71d5f6ad110a", // ServiceReader
  "0x077a7ffa0cdf1845cbff5d460f99fd85a43fa8b5", // ScanRequestWriter
  "0x91cdfa1c74a97e9df0fb796d5598bd72de8f179e", // ScanRequestReader
  "0x8e1783c9fe41462115ae32d56fa06df90acd8800", // ScanApplicationWriter
  "0xae97dcf3044aade2514c0a9440debe631aae20bb", // ScanApplicationReader
  "0x748ba00cd7d086cf80fc710bc5a7fb9ad5ed7686", // TreatmentRequestWriter
  "0x91c3bc00419e662a51f2392294c5c3122f68f1f6", // TreatmentRequestReader
  "0x07aedaa52c4d36bafc9b3d9a052c9526e12397e3", // TreatmentApplicationWriter
  "0x017c2d9c2d9ca046299e8e32b4a9035014ea3d9b", // TreatmentApplicationReader
])
*/

DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').addPermittedContracts(["0xa0551ce5a784c0b95123b3a06616439ae19cc2ba", "0xce43c8053aaa83a6895f3a7849ef61b1616d81f1", "0x86096761a8bb08c8cce0f2a4eb13f3f2b8b5757b", "0x0497921631b5bdedc1ff86f8959d722355abcfbf", "0x0d57c9cbeeb425d669e07b08fffd71d5f6ad110a", "0x077a7ffa0cdf1845cbff5d460f99fd85a43fa8b5", "0x91cdfa1c74a97e9df0fb796d5598bd72de8f179e", "0x8e1783c9fe41462115ae32d56fa06df90acd8800", "0xae97dcf3044aade2514c0a9440debe631aae20bb", "0x748ba00cd7d086cf80fc710bc5a7fb9ad5ed7686", "0x91c3bc00419e662a51f2392294c5c3122f68f1f6", "0x07aedaa52c4d36bafc9b3d9a052c9526e12397e3", "0x017c2d9c2d9ca046299e8e32b4a9035014ea3d9b" ])

Setter.at('0xa0551ce5a784c0b95123b3a06616439ae19cc2ba').setOwner()

Setter.at('0xa0551ce5a784c0b95123b3a06616439ae19cc2ba').setConfig()

Setter.at('0xa0551ce5a784c0b95123b3a06616439ae19cc2ba').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe

// UserWriter.at('0xce43c8053aaa83a6895f3a7849ef61b1616d81f1').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0xce43c8053aaa83a6895f3a7849ef61b1616d81f1').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0xa0551ce5a784c0b95123b3a06616439ae19cc2ba').setContract("contract/odll-user-writer", "0xce43c8053aaa83a6895f3a7849ef61b1616d81f1", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0xa0551ce5a784c0b95123b3a06616439ae19cc2ba').setContract("contract/odll-user-reader", "0x86096761a8bb08c8cce0f2a4eb13f3f2b8b5757b", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getPermittedContracts()

// test user address: 0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4 [name, email, phone-number, type]
DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getEntityList(["0xccd13aae8586090a842432a7f94d232b9c2c6b01816f2726f80c35315fefda97", "0xbd2be66110356bab3ab40df26b8761f0abdf45df1c4a8ec8161b4939283aeba4", "0x4e668c29ca402563b67edaf8ed8436cb2f4110388fd3aa39766e31659f8a359d", "0xe7775de79d576d872d0662a58e80f361d9908313a7edadfdf0da7f2b069cd57b"], [7, 7, 5, 2])

// 0xa4b578984936a1d734a978c880d9273ad40ef354bb5f3bff9f4b7d1e5245338a

DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

// DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check UserWriter Contract

DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin

DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getUIntValue('0xfdee3f0a67e1c0905d1d1b9edcca1bfcfb20fa50983fd6ec98ed3c4ec9ab8778') // check user max name length

DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getUIntValue('0x27939fccc16d3a632345caa25742703dad1ced4093cdf33a23b64dcf70b4e01d') // check user min name length

DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getUIntValue('0xf63344a14ef1f301f2ea2358926e73002ff132dff3be673f4bfbe98e83699fde') // check user max email length

DB.at('0x70b9e2426d5b06e107075d2ad722f13b47616436').getUIntValue('0x11612b38ec30ac4f2241d9b322e33f7794d006d5981c6b43ff273a52c6fc051b') // check user min email length
