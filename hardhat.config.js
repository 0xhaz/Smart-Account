require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
  solidity: {
    version: "0.8.19",
    optimizer: {
      enabled: true,
      runs: 500,
      details: { yul: false },
    },
  },
};
