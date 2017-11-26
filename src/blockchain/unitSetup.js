// ropsten network owner account: 0x3b26a28666a28e5037613947ac09dcf5d6caf7b9

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts([
  "0xd1ba29ebc79e3fcda240165667af7f4c1d5da399", // Setter
  "0x6fae820d9c62903fa93dfe989edf0c8228eb4659", // Escrow
  "0x50241f79166ad2f7247fe0a76d035af405a4905f", // UserWriter
  "0x00a0caa2d19f1c0532119fd68fdb48b29479ecb3", // UserReader
  "0xdfe8976bbed822e7e006b11e143c7d93ef9c3b03", // ServiceWriter
  "0x12720895a61f279401674a6e489a313c78feac69", // ServiceReader
  "0xfa857fe158a9f4a7745296b4d98c7a35eaa14447", // ScanRequestWriter
  "0xbbb635b46505f9719b4f6533212becdc0af508e6", // ScanRequestReader
  "0x490cc5955d6ac7d62ce3180e1f8ad5afebf3dfa6", // ScanRequestReader2
  "0xbf126c35b9da432d849bbdcff42bddc1510ab9eb", // ScanApplicationWriter
  "0x8436b4aab0dbccdc7599d9adde2cb1190b296178", // ScanApplicationWriter2
  "0x72045eb257fc0f232389cebc397615fad4e29fe8", // ScanApplicationReader
  "0x5a4a87fb24c5ebaa59d849ce049a8387f027287f", // TreatmentRequestWriter
  "0xc8fcb8e31e3dcce07e2e88de8de35b74d01ea4c9", // TreatmentRequestReader
  "0xfe5303d40746eda3c2cc4ead865854e440f3b1f7", // TreatmentRequestReader2
  "0x00ce8b9f6eb6c6d5e2b12928011737cf3e807825", // TreatmentApplicationWriter
  "0x3135711196a2daae0cc0e596c50f27d95ccad600", // TreatmentApplicationWriter2
  "0x5730b38102b96ef4dd6b0b4a482fe6b2d56e38d6", // TreatmentApplicationReader
])
*/

// Add main contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0xd1ba29ebc79e3fcda240165667af7f4c1d5da399"])

// Add user contracts
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').addPermittedContracts(["0x6fae820d9c62903fa93dfe989edf0c8228eb4659", "0x50241f79166ad2f7247fe0a76d035af405a4905f", "0x00a0caa2d19f1c0532119fd68fdb48b29479ecb3", "0xdfe8976bbed822e7e006b11e143c7d93ef9c3b03", "0x12720895a61f279401674a6e489a313c78feac69", "0xfa857fe158a9f4a7745296b4d98c7a35eaa14447", "0xbbb635b46505f9719b4f6533212becdc0af508e6", "0x490cc5955d6ac7d62ce3180e1f8ad5afebf3dfa6", "0xbf126c35b9da432d849bbdcff42bddc1510ab9eb", "0x8436b4aab0dbccdc7599d9adde2cb1190b296178", "0x72045eb257fc0f232389cebc397615fad4e29fe8", "0x5a4a87fb24c5ebaa59d849ce049a8387f027287f", "0xc8fcb8e31e3dcce07e2e88de8de35b74d01ea4c9", "0xfe5303d40746eda3c2cc4ead865854e440f3b1f7", "0x00ce8b9f6eb6c6d5e2b12928011737cf3e807825", "0x3135711196a2daae0cc0e596c50f27d95ccad600", "0x5730b38102b96ef4dd6b0b4a482fe6b2d56e38d6"])

Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setOwner()

Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setConfig()

Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setEscrowAddress("0x6fae820d9c62903fa93dfe989edf0c8228eb4659")

// UserWriter.at('0x50241f79166ad2f7247fe0a76d035af405a4905f').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0x50241f79166ad2f7247fe0a76d035af405a4905f').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setContract("contract/odll-user-writer", "0x50241f79166ad2f7247fe0a76d035af405a4905f", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0xd1ba29ebc79e3fcda240165667af7f4c1d5da399').setContract("contract/odll-user-reader", "0x00a0caa2d19f1c0532119fd68fdb48b29479ecb3", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').getPermittedContracts()
DB.at('0xc5668d26804abff30ca97dcf0eb4b14be11ab474').permissionStatusForContract["0xd1ba29ebc79e3fcda240165667af7f4c1d5da399"]

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
