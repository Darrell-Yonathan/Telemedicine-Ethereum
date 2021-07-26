const HDWalletProvider = require('@truffle/hdwallet-provider');
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          "arrange planet staff wine affair limb apple smooth flock soap female neglect",
          "https://rinkeby.infura.io/v3/0de518516966419ab7abb3520bbc04ab"
        ),
      network_id: 4
    },

    rinkeby1: {
      provider: () =>
        new HDWalletProvider(
          "arrange planet staff wine affair limb apple smooth flock soap female neglect",
          "wss://rinkeby.infura.io/ws/v3/0de518516966419ab7abb3520bbc04ab"
        ),
      network_id: 4
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  mocha: {
    useColors: true
  },
  
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "0.6.12"
    }
  }
}