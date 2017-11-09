var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');

// Get our mnemonic and create an hdwallet
var mnemonic = "piano file obey immense polar rack great subject clutch camera maid ostrich";
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/";
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

var providerUrl = "https://testnet.infura.io";
var engine = new ProviderEngine();
// filters
engine.addProvider(new FilterSubprovider());

engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(); // Required by the provider engine.



module.exports = {
  // networks: {
    // development: {
      // host: "localhost",
      // port: 8545,
      // network_id: "*", // Match any network id
      // from: "0x13ba42b19c25c0f6ecb7ab1c5db8d736231ecb94"
    // }
  // }
  networks: {
    "ropsten": {
      network_id: 3,    // Official ropsten network id
      provider: engine, // Use our custom provider
      from: address,     // Use the address we derived
      gas: 5700000
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      from: address, //"0x13ba42b19c25c0f6ecb7ab1c5db8d736231ecb94",
      gas: 5700000
    }
  },
  rpc: {
    // Use the default host and port when not using ropsten
    host: "localhost",
    port: 8545,
    gas: 5700000
  }
  // solc: {
  //   optimizer: {
  //     enabled: true,
  //     runs: 200
  //   }
  // }
};


