
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    // harhat: { chainId: 1337 },
    hardhat: {},
    polygon_mumbai: {
      url: process.env.POLYGON_MUMBAI_URL,
      accounts:[
        `0x${process.env.PRIVATE_KEY_METAMASK_ACCOUNT}`,
      ],
    }
  }
};
