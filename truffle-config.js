require('dotenv').config()  // Store environment-specific variable from '.env' to process.env
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MTMSK_MNEMONIC,
          "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY
        );
      },
      network_id: 3,
      gas: 4500000,
      gasPrice: 10000000000
    },
    develop: {
      port: 8545
    },
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
