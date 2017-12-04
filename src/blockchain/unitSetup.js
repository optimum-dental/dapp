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

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}))

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').setUInt8Value(web3.sha3(web3.toHex('payment/state') + '0000000000000000000000000000000000000000000000000000000000000000', {encoding: 'hex'}), 2)

// ADD ODLLSetter, ODLLUserWriter, ODLLUserReader // , ODLLServiceWriter, ODLLServiceReader

/*
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts([
  "0x827eae894835a8bbfcd867d0b9ad6c0078b71dba", // Setter
  "0x15a480500ffa14c116f625cdefa379a549f3eb59", // Escrow
  "0x630f519c89f254a2456013c4682f16e7afcc322b", // UserWriter
  "0x23f907afb8ca0c5801513f8d3a7d141a38b538a5", // UserReader
  "0x4203ee5c23238f43749c5a5cd85c9077f089c20a", // ServiceWriter
  "0xa037635425826b929da6f72325ca8c8676341dfd", // ServiceReader
  "0x8890c2185f44a6fb3d7bfc922cdcc2e91d35cb1a", // ScanRequestWriter
  "0x689a5e793c3c80fe45725dbce2fb34b37b708487", // ScanRequestReader
  "0xea629e8f8c5575d5f2a94bffccf6f2b8ec75efc1", // ScanRequestReader2
  "0xdbfe17870c2fba022f3d48deb7685abd5944dc6e", // ScanApplicationWriter
  "0xbab3313c72f39f6171f3890803fb39cc46a8a243", // ScanApplicationWriter2
  "0xc31839bd46419d2701c41aa0af8d2cfa06de11ec", // ScanApplicationReader
  "0x53945d6a40242f78ba4fad7d41236cae48d18231", // TreatmentRequestWriter
  "0xa253f107043b8eeeb292792de6ac1a9be19d9dbc", // TreatmentRequestReader
  "0x07f2d358c3c1e9a23052e4b2446d8e28afddbce6", // TreatmentRequestReader2
  "0x2359c7979d13bde03b4b0b0470b24ed721d9419b", // TreatmentApplicationWriter
  "0xfac55105ed6673b8d86b2969076e21153f4cdfa5", // TreatmentApplicationWriter2
  "0xb6d0721b08f0e43358cf97937b3334490c009eab", // TreatmentApplicationReader
  "0xdf58d65dbe922c3b2afcff1604cfe929a786618d", // PostApplicationReader
  "0x4e9061d287e0614af07c5367a9c6f41fecf70ad9", // PostApplicationReader2
])
*/

// Add main contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x827eae894835a8bbfcd867d0b9ad6c0078b71dba"])

// Add user contracts
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x15a480500ffa14c116f625cdefa379a549f3eb59", "0x630f519c89f254a2456013c4682f16e7afcc322b", "0x23f907afb8ca0c5801513f8d3a7d141a38b538a5", "0x4203ee5c23238f43749c5a5cd85c9077f089c20a", "0xa037635425826b929da6f72325ca8c8676341dfd", "0x8890c2185f44a6fb3d7bfc922cdcc2e91d35cb1a", "0x689a5e793c3c80fe45725dbce2fb34b37b708487", "0xea629e8f8c5575d5f2a94bffccf6f2b8ec75efc1", "0xdbfe17870c2fba022f3d48deb7685abd5944dc6e", "0xbab3313c72f39f6171f3890803fb39cc46a8a243", "0xc31839bd46419d2701c41aa0af8d2cfa06de11ec", "0x53945d6a40242f78ba4fad7d41236cae48d18231", "0xa253f107043b8eeeb292792de6ac1a9be19d9dbc", "0x07f2d358c3c1e9a23052e4b2446d8e28afddbce6", "0x2359c7979d13bde03b4b0b0470b24ed721d9419b", "0xfac55105ed6673b8d86b2969076e21153f4cdfa5", "0xb6d0721b08f0e43358cf97937b3334490c009eab", "0xdf58d65dbe922c3b2afcff1604cfe929a786618d", "0x4e9061d287e0614af07c5367a9c6f41fecf70ad9"])



// misc
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContracts(["0x15a480500ffa14c116f625cdefa379a549f3eb59", "0xbab3313c72f39f6171f3890803fb39cc46a8a243", "0xfac55105ed6673b8d86b2969076e21153f4cdfa5"])

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').addPermittedContract("0x229585932dbdb0eca213ff7664aa582aa26688b1")




Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setOwner()

Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setConfig()

Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setFirstAdmin("0xe1eb3251dce3d8ba0bf186bffeba19cbc7c1ddf4") // Phoebe
Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setEscrowAddress("0x15a480500ffa14c116f625cdefa379a549f3eb59")

Setter.at("0x827eae894835a8bbfcd867d0b9ad6c0078b71dba").setScanPaymentPercentage(5)
Setter.at("0x827eae894835a8bbfcd867d0b9ad6c0078b71dba").setTreatmentPaymentPercentage(5)
Setter.at("0x827eae894835a8bbfcd867d0b9ad6c0078b71dba").setPaymentAddress("0x7a45f29170b9d4fcc75c4bcd683fe96eed963cfb")


// UserWriter.at('0x630f519c89f254a2456013c4682f16e7afcc322b').addOfficialToODLL('0xe2761238fe59bc0dde7d2a15bad605cda6047c5a', 4) // Quadri
// UserWriter.at('0x630f519c89f254a2456013c4682f16e7afcc322b').addOfficialToODLL('0xf0bc73eaa439392723f0dc653abfb9058112bee1', 4) // Tina
// UserWriter.at('0x630f519c89f254a2456013c4682f16e7afcc322b').addOfficialToODLL('0x2644C554888c80462530833292b3Cb943a33395E', 4) // Edo



/* Ignore
// Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setContract("contract/odll-user-writer", "0x630f519c89f254a2456013c4682f16e7afcc322b", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
// Setter.at('0x827eae894835a8bbfcd867d0b9ad6c0078b71dba').setContract("contract/odll-user-reader", "0x23f907afb8ca0c5801513f8d3a7d141a38b538a5", { from: "0xa6976e0d32f99930641ced889143bf0ca99ee51d" })
*/


// DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getEntityList(["0x9809848503a7a3c248ea05e4ff1f22340f5669a447314922d16089b378f07c01", "0xe328f31efd88b9b64e442ec2d7267d3043883ffde671c77d6c254b02207758b5", "0x8c6f0fe5fc4a6ab81e8ac401a8c9dbc1238f57cc246a5ffcdb095254cb665025", "0x897147767a635b5d5cd5d3c6a2cfbbcb020bd7fae3451a1086e2690743ec2281"], [7, 7, 5, 2])

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getPermittedContracts()
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').permissionStatusForContract["0x15a480500ffa14c116f625cdefa379a549f3eb59"]

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

DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getUIntValue(web3.sha3('odll/scan-payment-percentage'))
DB.at('0x59964c8ec4457f4c24ce2e697dd1cc358c1eb19a').getAddressValue(web3.sha3('odll/payment-address'))
