import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, {useContext, useState, useEffect} from "react";
import Web3Modal from "web3modal";

import { AuctionAddress, AuctionABI} from './constants';

export const AuctionContext = React.createContext();

const fetchContract = (signerOrProvider) => new ethers.Contract(
    AuctionAddress,
    AuctionABI,
    signerOrProvider
);

//---CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () =>{
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with smart contract.", error);
    }
}

export const AuctionProvider = ({children}) => {
  const [currentAccount, setcurrentAccount] = useState("");
  const router = useRouter();

  //---CHECK IF WALLET IS CONNECTED
  const checkIfWalletConnected = async() => {
    try {
      if(!window.ethereum)
          return console.log("Install MetaMask");
      const accounts = await window.ethereum.request({
          method: "eth_accounts"
      });
      
      if(accounts.length){
          setcurrentAccount(accounts[0]);
      }
      else{
          console.log("No Account Found");
      }
      console.log(currentAccount);
      } catch (error) {
        console.log("Something wrong while connecting to wallet.", error);
      }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const connectWallet = async() => {
    try {
      if(!window.ethereum)
          return console.log("Install MetaMask");

      const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
      });

      setcurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
        console.log("Error while connecting to wallet");
    }
  };

  const startAuction = async(tokenId, initialPrice, startTime, endTime) => {
    try {
      const contract = await connectingWithSmartContract();

      if(!nft || !tokenId || !price){
        console.error("Data is missing!");
        return;
      }
      const transaction = contract.createAuction(tokenId, initialPrice, startTime, endTime);
      await transaction.wait();
    } catch (error) {
      console.log("Error starting the auction:", error);
    }
  }

  const placeBid = async(auctionId, amount) => {
    try {
        const valueInWei = ethers.utils.parseEther(amount.toString()); // Convert to Wei
        const contract = await connectingWithSmartContract();
        const transaction = await contract.joinAuction(auctionId, valueInWei, "");
        await transaction.wait();
        console.log(`Bid of ${amount} ETH placed successfully!`);
    } catch (error) {
        console.error('Error placing bid:', error);
    }
  }

  const endAuction = async() => {
      try {
        const contract = await connectingWithSmartContract();
        const transaction = await contract.end();
        await transaction.wait();
        console.log('Auction ended successfully!');
      } catch (error) {
        console.error('Error ending the auction:', error);
      }
  };

  const fetchAuctionNFTs = async() => {
    try {
      const provider = new ethers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const data = await contract.getAuctionsByStatus(true);

      const items = await Promise.all(
          data.map(async({tokenId, seller, owner, price: unformattedPrice}) => {
              const tokenURI = await contract.tokenURI(tokenId);

              const {
                  data: {image, name, description},
              } = await axios.get(tokenURI);
              const price = ethers.formatUnits(
                  unformattedPrice.toString(),
                  "ether"
              );
              return {
                  name,
                  price,
                  tokenId: Number(tokenId),
                  seller,
                  owner,
                  image,
                  description,
                  tokenURI
              };
          })
      );

      return items;
    } catch (error) {
      
    }
  }

  return (
    <AuctionContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        placeBid,
        startAuction,
        endAuction,
        currentAccount,
        fetchAuctionNFTs
      }}
    >
      {children}
    </AuctionContext.Provider>
  )
}
