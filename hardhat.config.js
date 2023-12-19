
require("@nomicfoundation/hardhat-toolbox");

task("accounts: Prints the list of accounts", async() => {
  const accounts = await ethers.getSigners();
  for(const account of accounts){
    console.log(account.target);
  }
});

module.exports = {
  solidity: "0.8.20",
  networks: { hardhat: { chainId: 1337 }}
};
