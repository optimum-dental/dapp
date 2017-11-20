// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts([
  "0x787d4969b1d308b20b50a08d8855aa8504bf5029", // Setter
  "0xa949a4e5b3bd4d982a2bdf11fc37428f97ad9cc7", // UserWriter
  "0x72aca86df9173fef4267007dee8c6d2a09db633b", // UserReader
  "0x9f0891ab8956af0d1b5a2875bea469006d5e058f", // ServiceWriter
  "0x39954244da56141cce566685f96dc76b0c8421c3", // ServiceReader
  "0x39d50ce274893704b4166244425b49339c32f849", // ScanRequestWriter
  "0x6b9389dc8b6f0e052a17efc2965c09cceb598411", // ScanRequestReader
  "0x40e5ebbf98340e150fe82a11d74d85c146eb860f", // ScanApplicationWriter
  "0xf5ae132940657ffa7f3c0623d0405b4313844db1", // ScanApplicationWriter2
  "0x8224758d708b1d395a2ee3af474b58045c74b532", // ScanApplicationReader
  "0x20699a513973a36f83fdd82857acd8e5ba7f0b33", // TreatmentRequestWriter
  "0x2c6ce773ebbe22b57679144f9b1b579a47776e73", // TreatmentRequestReader
  "0x376ccab05874c596b0f78984a58014bc288d4f23", // TreatmentApplicationWriter
  "0xbc95bf2ecbb4ba529c05044c674dc126514678c2", // TreatmentApplicationWriter2
  "0x9e146c623f2462272482c61a834c8aae381d07a7", // TreatmentApplicationReader
])
*/

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x787d4969b1d308b20b50a08d8855aa8504bf5029", "0xa949a4e5b3bd4d982a2bdf11fc37428f97ad9cc7", "0x72aca86df9173fef4267007dee8c6d2a09db633b", "0x9f0891ab8956af0d1b5a2875bea469006d5e058f", "0x39954244da56141cce566685f96dc76b0c8421c3", "0x39d50ce274893704b4166244425b49339c32f849", "0x6b9389dc8b6f0e052a17efc2965c09cceb598411", "0x40e5ebbf98340e150fe82a11d74d85c146eb860f", "0xf5ae132940657ffa7f3c0623d0405b4313844db1", "0x8224758d708b1d395a2ee3af474b58045c74b532", "0x20699a513973a36f83fdd82857acd8e5ba7f0b33", "0x2c6ce773ebbe22b57679144f9b1b579a47776e73", "0x376ccab05874c596b0f78984a58014bc288d4f23", "0xbc95bf2ecbb4ba529c05044c674dc126514678c2", "0x9e146c623f2462272482c61a834c8aae381d07a7" ])

Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setOwner()

Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setConfig()

Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe

// UserWriter.at('0xa949a4e5b3bd4d982a2bdf11fc37428f97ad9cc7').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0xa949a4e5b3bd4d982a2bdf11fc37428f97ad9cc7').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setContract("contract/odll-user-writer", "0xa949a4e5b3bd4d982a2bdf11fc37428f97ad9cc7", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x787d4969b1d308b20b50a08d8855aa8504bf5029').setContract("contract/odll-user-reader", "0x72aca86df9173fef4267007dee8c6d2a09db633b", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
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
