// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0x22589b369a939b9c36412b3c2cced62ce6de9e52').addPermittedContracts([
  "0x92a182914779faf3170ce24c52a32192c9e9efba", // Setter
  "0xd373d066d93666d66f6b0bebeb9e9a2c7c98df11", // UserWriter
  "0xb73d190cf107afbebf0303ef1b54c002e82b0bd5", // UserReader
  "0x92beb635b65636c277d186dce017949582bc46b3", // ServiceWriter
  "0x483f2898ad80e58c7ad9fbe4693b12c1fa40c1fa", // ServiceReader
  "0xf27743bab04044adee58e84807d9c999bcea8c65", // ScanRequestWriter
  "0xfbd449063a3b9eb3c9beb6874aac2a5c5bad9881", // ScanRequestReader
  "0xf44bc3747e6af344cad8ae34f5feb76bff279c07", // ScanApplicationWriter
  "0xccee9fe4f15a98cfdda62c6bdc7c2f4212786625", // ScanApplicationReader
  "0x05a0320ca28e031812b358f9ed76b2410a3426f8", // TreatmentRequestWriter
  "0x109027b71baf150c54d3b59924c62306b1160a0b", // TreatmentRequestReader
  "0x1e8e72a6c3b8ea27ce276e965b75b4f19ad574ce", // TreatmentApplicationWriter
  "0x15f9446bf36b151042a2d6b14507df089f383ada", // TreatmentApplicationReader
])
*/

DB.at('0x22589b369a939b9c36412b3c2cced62ce6de9e52').addPermittedContracts(["0x92a182914779faf3170ce24c52a32192c9e9efba", "0xd373d066d93666d66f6b0bebeb9e9a2c7c98df11", "0xb73d190cf107afbebf0303ef1b54c002e82b0bd5", "0x92beb635b65636c277d186dce017949582bc46b3", "0x483f2898ad80e58c7ad9fbe4693b12c1fa40c1fa", "0xf27743bab04044adee58e84807d9c999bcea8c65", "0xfbd449063a3b9eb3c9beb6874aac2a5c5bad9881", "0xf44bc3747e6af344cad8ae34f5feb76bff279c07", "0xccee9fe4f15a98cfdda62c6bdc7c2f4212786625", "0x05a0320ca28e031812b358f9ed76b2410a3426f8", "0x109027b71baf150c54d3b59924c62306b1160a0b", "0x1e8e72a6c3b8ea27ce276e965b75b4f19ad574ce", "0x15f9446bf36b151042a2d6b14507df089f383ada" ])

Setter.at('0x92a182914779faf3170ce24c52a32192c9e9efba').setOwner()

Setter.at('0x92a182914779faf3170ce24c52a32192c9e9efba').setConfig()

Setter.at('0x92a182914779faf3170ce24c52a32192c9e9efba').setFirstAdmin("0x13ba42b19c25c0f6ecb7ab1c5db8d736231ecb94") // Phoebe

// UserWriter.at('0xd373d066d93666d66f6b0bebeb9e9a2c7c98df11').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0xd373d066d93666d66f6b0bebeb9e9a2c7c98df11').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina



/* Ignore
// Setter.at('0x92a182914779faf3170ce24c52a32192c9e9efba').setContract("contract/odll-user-writer", "0xd373d066d93666d66f6b0bebeb9e9a2c7c98df11", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x92a182914779faf3170ce24c52a32192c9e9efba').setContract("contract/odll-user-reader", "0xb73d190cf107afbebf0303ef1b54c002e82b0bd5", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0x22589b369a939b9c36412b3c2cced62ce6de9e52').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

// test user address: 0x13ba42b19c25c0f6ecb7ab1c5db8d736231ecb94 [name, email, phone-number, type]
DB.at('0x22589b369a939b9c36412b3c2cced62ce6de9e52').getEntityList(["0x8ca4d0f257789b864abdc0f2df7288914c0e6f54a08d42bacf1bb03ecff195e3", "0x962d41bfc690046052097c57608d1074c41180a2fd14149ade2e063658d83faa", "0x10e292054356c54a5b8bdcde8c1a5c63bd875d54dd8092af79c2eb02b1b2985d", "0xe31e07426f3074652058390613b3d58244526ba7c70d67eda59e5427bf0e3eed"], [7, 7, 5, 2])

// 0xa4b578984936a1d734a978c880d9273ad40ef354bb5f3bff9f4b7d1e5245338a

DB.at('0x22589b369a939b9c36412b3c2cced62ce6de9e52').getPermittedContracts()

DB.at('0x22589b369a939b9c36412b3c2cced62ce6de9e52').getAddressValue('0xe901f0b43f920fc0b85fb414d10fafdf40d2a0b21a6397d54c1f5c09529e47a9') // check owner

// DB.at('0x22589b369a939b9c36412b3c2cced62ce6de9e52').getAddressValue('0xa2a70261844f353edc399d2fe91ce30b0e72f9cddd7ddaab87a3b0b66bc7390b') // check UserWriter Contract

DB.at('0x22589b369a939b9c36412b3c2cced62ce6de9e52').getAddressValue('0x0f6f723d4ae6fa8d6cb219977b9c034e21574f8183956d459a70e20897c43340') // check first admin
