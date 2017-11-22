// ropsten network owner account: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts([
  "0x75cc8b019acedf1c42f5dbca297fdcf0f7e7697f", // Setter
  "0x58915d6ab0ab35f15c372d20088af042ff0a7843", // UserWriter
  "0x87c9e14a8592f13906d8b459ec86aa3fcf2ae688", // UserReader
  "0xec8fd73662601ee36e62dc078025375c9aded173", // ServiceWriter
  "0x2464db15ba45e65c6c51faa694792b3428cb2a52", // ServiceReader
  "0x49e076bd4e3fe4de6d27019549ee6cf8471543a2", // ScanRequestWriter
  "0xe498432de89e641359929f22293f7a4279280f0a", // ScanRequestReader
  "0x8e1783c9fe41462115ae32d56fa06df90acd8800", // ScanRequestReader2
  "0xbbdffbcd7fef8ee67c89fe263205cc3623a60f45", // ScanApplicationWriter
  "0x7c3c5aa44ddf1d59cfacaabf2486ce7d34e006ad", // ScanApplicationWriter2
  "0xed53888910e341315a9d268049a0134d2108a6bb", // ScanApplicationReader
  "0x124e9ce8ccb446155bd7e689bc9f6abbad97556a", // TreatmentRequestWriter
  "0xf49f7567e1bad70a39b01300ca598f500bbbc901", // TreatmentRequestReader
  "0xae97dcf3044aade2514c0a9440debe631aae20bb", // TreatmentRequestReader2
  "0x70b9e2426d5b06e107075d2ad722f13b47616436", // TreatmentApplicationWriter
  "0x3b50ea72f416c8713070ecfeecc6eb4f7ea29d6c", // TreatmentApplicationWriter2
  "0xa0551ce5a784c0b95123b3a06616439ae19cc2ba", // TreatmentApplicationReader
])
*/

// Add main contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0x75cc8b019acedf1c42f5dbca297fdcf0f7e7697f"])

// Add user contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0x58915d6ab0ab35f15c372d20088af042ff0a7843", "0x87c9e14a8592f13906d8b459ec86aa3fcf2ae688", "0xec8fd73662601ee36e62dc078025375c9aded173", "0x2464db15ba45e65c6c51faa694792b3428cb2a52", "0x49e076bd4e3fe4de6d27019549ee6cf8471543a2", "0xe498432de89e641359929f22293f7a4279280f0a", "0x8e1783c9fe41462115ae32d56fa06df90acd8800", "0xbbdffbcd7fef8ee67c89fe263205cc3623a60f45", "0x7c3c5aa44ddf1d59cfacaabf2486ce7d34e006ad", "0xed53888910e341315a9d268049a0134d2108a6bb", "0x124e9ce8ccb446155bd7e689bc9f6abbad97556a", "0xf49f7567e1bad70a39b01300ca598f500bbbc901", "0xae97dcf3044aade2514c0a9440debe631aae20bb", "0x70b9e2426d5b06e107075d2ad722f13b47616436", "0x3b50ea72f416c8713070ecfeecc6eb4f7ea29d6c", "0xa0551ce5a784c0b95123b3a06616439ae19cc2ba"])

Setter.at('0x75cc8b019acedf1c42f5dbca297fdcf0f7e7697f').setOwner()

Setter.at('0x75cc8b019acedf1c42f5dbca297fdcf0f7e7697f').setConfig()

Setter.at('0x75cc8b019acedf1c42f5dbca297fdcf0f7e7697f').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe

// UserWriter.at('0x58915d6ab0ab35f15c372d20088af042ff0a7843').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0x58915d6ab0ab35f15c372d20088af042ff0a7843').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0x75cc8b019acedf1c42f5dbca297fdcf0f7e7697f').setContract("contract/odll-user-writer", "0x58915d6ab0ab35f15c372d20088af042ff0a7843", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x75cc8b019acedf1c42f5dbca297fdcf0f7e7697f').setContract("contract/odll-user-reader", "0x87c9e14a8592f13906d8b459ec86aa3fcf2ae688", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getPermittedContracts()

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
