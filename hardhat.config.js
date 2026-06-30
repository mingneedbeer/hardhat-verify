require("@matterlabs/hardhat-zksync-solc");
require("@matterlabs/hardhat-zksync-verify");

module.exports = {
  zksolc: {
    version: "1.5.15",
    compilerSource: "binary",
  },
  networks: {
    abstractTestnet: {
      url: "https://api.testnet.abs.xyz",
      ethNetwork: "sepolia",
      zksync: true,
      verifyURL: "https://api-explorer-verify.testnet.abs.xyz/contract_verification",
    },
  },
  solidity: {
    version: "0.8.24",
  },
};
