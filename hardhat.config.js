require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {},
  },
  gasReporter: {
    currency: "CHF",
    gasPrice: 21,
  },
}
