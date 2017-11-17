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
  networks: {
    "ropsten": {
      network_id: 3,    // Official ropsten network id
      provider: engine, // Use our custom provider
      from: address,     // Use the address we derived
      gas: 5700000
    },
    // development: {
    //   host: "localhost",
    //   port: 7545,
    //   network_id: "*",
    //   from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", //"0x13ba42b19c25c0f6ecb7ab1c5db8d736231ecb94",
    //   gas: 5700000
    // }
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      from: "0xf378d4b0ef447b051fad06133615b33649423c0a",
      gas: 5700000,
      gasPrice: 2000000
    }
  },
  rpc: {
    // Use the default host and port when not using ropsten
    host: "localhost",
    port: 8545,
    gas: 5700000
  }
};
