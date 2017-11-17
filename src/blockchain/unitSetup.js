// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').addPermittedContracts([
  "0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f", // Setter
  "0x9fbda871d559710256a2502a2517b794b482db40", // UserWriter
  "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4", // UserReader
  "0x30753e4a8aad7f8597332e813735def5dd395028", // ServiceWriter
  "0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6", // ServiceReader
  "0xaa588d3737b611bafd7bd713445b314bd453a5c8", // ScanRequestWriter
  "0xf204a4ef082f5c04bb89f7d5e6568b796096735a", // ScanRequestReader
  "0x75c35c980c0d37ef46df04d31a140b65503c0eed", // ScanApplicationWriter
  "0x82d50ad3c1091866e258fd0f1a7cc9674609d254", // ScanApplicationReader
  "0xdda6327139485221633a1fcd65f4ac932e60a2e1", // TreatmentRequestWriter
  "0xeec918d74c746167564401103096d45bbd494b74", // TreatmentRequestReader
  "0x0d8cc4b8d15d4c3ef1d70af0071376fb26b5669b", // TreatmentApplicationWriter
  "0xecfcab0a285d3380e488a39b4bb21e777f8a4eac", // TreatmentApplicationReader
])
*/

DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').addPermittedContracts(["0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f", "0x9fbda871d559710256a2502a2517b794b482db40", "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4", "0x30753e4a8aad7f8597332e813735def5dd395028", "0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6", "0xaa588d3737b611bafd7bd713445b314bd453a5c8", "0xf204a4ef082f5c04bb89f7d5e6568b796096735a", "0x75c35c980c0d37ef46df04d31a140b65503c0eed", "0x82d50ad3c1091866e258fd0f1a7cc9674609d254", "0xdda6327139485221633a1fcd65f4ac932e60a2e1", "0xeec918d74c746167564401103096d45bbd494b74", "0x0d8cc4b8d15d4c3ef1d70af0071376fb26b5669b", "0xecfcab0a285d3380e488a39b4bb21e777f8a4eac" ])

Setter.at('0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f').setOwner()

Setter.at('0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f').setConfig()

Setter.at('0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f').setFirstAdmin("0x821aea9a577a9b44299b9c15c88cf3087f3b5544") // Phoebe

// UserWriter.at('0x9fbda871d559710256a2502a2517b794b482db40').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0x9fbda871d559710256a2502a2517b794b482db40').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f').setContract("contract/odll-user-writer", "0x9fbda871d559710256a2502a2517b794b482db40", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f').setContract("contract/odll-user-reader", "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getPermittedContracts()

// test user address: 0x821aea9a577a9b44299b9c15c88cf3087f3b5544 [name, email, phone-number, type]
DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getEntityList(["0x8ca4d0f257789b864abdc0f2df7288914c0e6f54a08d42bacf1bb03ecff195e3", "0x962d41bfc690046052097c57608d1074c41180a2fd14149ade2e063658d83faa", "0x10e292054356c54a5b8bdcde8c1a5c63bd875d54dd8092af79c2eb02b1b2985d", "0xe31e07426f3074652058390613b3d58244526ba7c70d67eda59e5427bf0e3eed"], [7, 7, 5, 2])

// 0xa4b578984936a1d734a978c880d9273ad40ef354bb5f3bff9f4b7d1e5245338a

DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

// DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check UserWriter Contract

DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin

DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getUIntValue('0xfdee3f0a67e1c0905d1d1b9edcca1bfcfb20fa50983fd6ec98ed3c4ec9ab8778') // check user max name length

DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getUIntValue('0x27939fccc16d3a632345caa25742703dad1ced4093cdf33a23b64dcf70b4e01d') // check user min name length

DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getUIntValue('0xf63344a14ef1f301f2ea2358926e73002ff132dff3be673f4bfbe98e83699fde') // check user max email length

DB.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10').getUIntValue('0x11612b38ec30ac4f2241d9b322e33f7794d006d5981c6b43ff273a52c6fc051b') // check user min email length
