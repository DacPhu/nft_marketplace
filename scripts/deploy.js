const hre = require("hardhat");

async function main() {

  const nftMarketplace = await hre.ethers.deployContract("NFTMarketplace");
  const auction = await hre.ethers.deployContract("Auction");

  await nftMarketplace.waitForDeployment();
  await auction.waitForDeployment();

  console.log(`deployed NFTMarketplace contract address ${nftMarketplace.target}`);
  console.log(`deployed Auction contract address ${auction.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
