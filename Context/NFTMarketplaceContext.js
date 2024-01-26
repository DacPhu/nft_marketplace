import React ,{useState, useEffect, useContext, createContext} from 'react';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from 'next/router';
import axios from 'axios';
require('dotenv').config();

const FormData = require("form-data");
const JWT_IMAGE_API = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMWRmMDBmMS0wODEzLTRjZTAtOWI5ZS0zYmExNzhjZGQ3ZDAiLCJlbWFpbCI6InBsZHBwbGRwMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0MDEwNzVjNWNhYzYyOWY4NTJkZSIsInNjb3BlZEtleVNlY3JldCI6ImQ4OWI4MjliMjY5ZmY3NmFmMDIxMmM2ZjdiYTA3NzhiOWVhZjVhZjkxZmEwN2E2N2MwNzIyMzJkMjY0ZTlhMzgiLCJpYXQiOjE3MDI4Nzg3MzB9.YrUjdRI0RjrPaL1ytGXqdIVqP_6Y78DQWzQxBzP3U3Q'
const JWT_META_API = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMWRmMDBmMS0wODEzLTRjZTAtOWI5ZS0zYmExNzhjZGQ3ZDAiLCJlbWFpbCI6InBsZHBwbGRwMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1NGE3ZWJiYWMzZDQ3MGE1NDE1MSIsInNjb3BlZEtleVNlY3JldCI6IjgwN2MwNDdmNDNkMjI2NDhhMzQ3YTBjZmVhOGU3MWVhZTU3OTIxZDM3ZTRhYTEwZTc4YWYzMWE2OGI3MDExMzciLCJpYXQiOjE3MDI1NDc5MDh9.ZGOw-cX_PC3ibP5OWDj5YSpCOfbeCR9ojjiG0rgGgVE'

// INTERNAL IMPORT 
import { NFTMarketplaceAddress, NFTMarketplaceABI} from './constants';

//---FETCHING SMART CONTRACT 
const fetchContract = (signerOrProvider) => new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
);

//---CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async ()=>{
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

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({children}) => {
    const titleData = "Discover, collect, and sell NFTs";

    //---USESTATE
    const [currentAccount, setcurrentAccount] = useState("");
    const router = useRouter();

    //---CHECK IF WALLET IS CONNECTED
    const checkIfWalletConnected = async() =>{
        try {
          const isDisconnected = localStorage.getItem("isDisconnected") === "true";

          if (isDisconnected) {
            return;
          }
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

    useEffect(() =>{
        checkIfWalletConnected();
    }, []);

    //---CONNECT WALLET FUNCTION
    const connectWallet = async() =>{
        try {
            if(!window.ethereum)
                return console.log("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setcurrentAccount(accounts[0]);
            localStorage.removeItem("isDisconnected");
            window.location.reload();
        } catch (error) {
            console.log("Error while connecting to wallet");
        }
    };

    //--- DISCONNECT WALLET FUNCTION
    const disConnectWallet = async () => {
      setcurrentAccount("");
      localStorage.setItem("isDisconnected", "true");
      window.location.reload();
    }

    //---UPLOAD TO IPFS FUNCTION
    const uploadToIPFS = async(file) =>{
        const formData = new FormData();
        formData.append('file', file)

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        })
        formData.append('pinataOptions', pinataOptions);

        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

        try {
            const response = await axios.post(url, formData, {
                maxBodyLength: "Infinity",
                headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: JWT_IMAGE_API
                }
            });
            console.log(response.data);

            if (response.status === 200) {
                const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

                return ipfsUrl;
            } else {
                throw new Error('Failed to upload file to IPFS');
            }
        } catch (error) {
            throw new Error('Failed to upload file to IPFS: ' + error.message);
        }

    };

    //---CREATENFT FUNCTION
    const createNFT = async(name, price, image, description, router) => {
        try {
            if (!name || !description || !price || !image) {
              console.error("Data is missing");
              return;
            }

            // Constructing the metadata for Pinata
            const data = JSON.stringify({
                pinataContent: {
                  name: name,
                  description: description,
                  image: image,
                },
                pinataMetadata: {
                  name: "metadata.json"
                }
              })

            // Appending JSON stringified options to the FormData
            // formData.append("pinataOptions", JSON.stringify(pinataOptions));
            // Making a POST request to Pinata to pin the file to IPFS
            const response = await axios.post(
              "https://api.pinata.cloud/pinning/pinJSONToIPFS",
              data,
              {
                maxBodyLength: "Infinity",
                headers: {
                  "Content-Type": `application/json`,
                  Authorization: JWT_META_API, // Replace with your actual JWT token
                },
              }
            );

            // Log the response from Pinata
            console.log(response.data);

            if (response.status === 200) {
              // Constructing the IPFS URL
              const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

              // Call the createSale function with the constructed IPFS URL and price
              await createSale(ipfsUrl, price);
              router.push('/searchPage');
              // Redirect to another page using the router (if needed)x
            } else {
              throw new Error("Failed to upload file to IPFS");
            }
          } catch (error) {
            console.error("Fail to create NFT", error);
          }
    };

    //---CREATESALE FUNCTION
    const createSale = async(url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.parseUnits(formInputPrice, "ether");
            const contract = await connectingWithSmartContract();
            const listingPrice = await contract.getListingPrice();
            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.resellToken(id, price, {
                    value: (listingPrice.toString()),
                });

            await transaction.wait();
        } catch (error) {
            console.log("Error while creating sale", error);
        }
    };

    const startAuction = async(tokenId, formInputInitialPrice, durations) => {
        try {
          const contract = await connectingWithSmartContract();
          const initialPrice = ethers.parseUnits(formInputInitialPrice, "ether");
          
          const auctionDuration = durations * 24 * 60 * 60;
          
          const transaction = await contract.startAuction(tokenId, initialPrice, auctionDuration);
          await transaction.wait();
        } catch (error) {
          console.log("Error starting the auction:", error);
        }
      }

    //---FETCHNFTS FUNCTION
    const fetchNFTs = async () => {
        try {
            const provider = new ethers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItems();
            const items = await Promise.all(
                data.map(async({tokenId, seller, owner, price: unformattedPrice, directSold}) => {
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
                        tokenURI,
                        directSold,
                    };
                })
            );
            return items;
        } catch (error) {
            console.log("Error while fetching NFTs", error);
        }
    };

    useEffect(() => {
        fetchNFTs();
    }, []);

    //---FETCHING MY NFTs OR LISTED NFTs
    const fetchMyNFTsOrListedNTFs = async(type) =>{
        try {
            const contract = await connectingWithSmartContract();

            const data = (type == "fetchItemsListed")
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNFTs();

            const items = await Promise.all(
                data.map(async ({tokenId, seller, owner, price: unformattedPrice, directSold}) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: {image, name, description}
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
                        tokenURI,
                        directSold,
                    };
                })
            );
            return items;
        } catch (error) {
            console.log("Error while fetching listed NFTs", error);
        }
    };

    const fetchAuctionNFTs = async() => {
        try {
            const provider = new ethers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchAuctionItems();

            const items = await Promise.all(
                data.map(async ({tokenId, seller, owner, startTime, endTime, highestBidder, highestBid: unformattedPrice, directSold}) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: {image, name, description}
                    } = await axios.get(tokenURI);
                    const highestBid = ethers.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    return {
                        name,
                        highestBid, 
                        tokenId: Number(tokenId),
                        seller,
                        owner,
                        highestBidder,
                        startTime,
                        endTime,
                        image,
                        description,
                        tokenURI,
                        directSold
                    };
                })
            );
            return items;
        } catch (error) {
            console.log("Error while fetching Auction NFTs", error);
        }
        
    }

    useEffect(() => {
        fetchAuctionNFTs();
    }, []);

    //---BUY NFTs FUNCTION
    const buyNFT = async (nft) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.parseUnits(nft.price, "ether");

            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });

            await transaction.wait();
            router.push("/author");
        } catch (error) {
            console.log("Error while buying NFTs", error)
        }
    };

    //---PLACE BID NFTs FUNCTION
    const placeBid = async (nft, userBidPrice) => {
        try {
            const contract = await connectingWithSmartContract();
            const bidPrice = ethers.parseUnits(userBidPrice, "ether"); // Use a different variable name
            
            const transaction = await contract.placeBid(nft.tokenId, { value: bidPrice });
    
            await transaction.wait();
            router.push("/searchAuctionPage");
        } catch (error) {
            console.error("Error while placing a bid on NFTs", error);
        }
    };

    //--- FINISH AUCTION FUNCTION
    const finishAuction = async(nft) => {
        try{
            const contract = await connectingWithSmartContract();
            const transaction = await contract.finishAuction(nft.tokenId);

            await transaction.wait();
            router.push("/searchPage");
        } catch(error){
            console.log("Error while finishing auction", error);
        }
    }

    //--- CANCEL AUCTION FUNCTION
    const cancelAuction = async(nft) =>{
        try {
            const contract = await connectingWithSmartContract();
            const transaction = await contract.cancelAuction(nft.tokenId);
            await transaction.wait();
            router.push("/author");
        } catch (error) {
            console.log("Error whole canceling auction", error);
        }
    }

    const getTimeEndAuction = async(nft) =>{
        try{
            const contract = await connectingWithSmartContract();
            const timeEndString = await contract.getTimeEndOfAuction(nft.tokenId);
            const timeEnd = parseInt(timeEndString, 10);
            return timeEnd;
        } catch (error){
            console.log("Error while getting time end of auction", error);
        }
    }

    //--- CANCEL SELLING FUNCTION
    const cancelSelling = async(nft) =>{
        try {
            const contract = await connectingWithSmartContract();
            const transaction = await contract.cancelSelling(nft.tokenId);
            await transaction.wait();
            router.push("/author");
        } catch (error) {
            console.log("Error whole canceling selling", error);
        }
    }

    return (
        <NFTMarketplaceContext.Provider
            value = {{
                checkIfWalletConnected,
                connectWallet,
                disConnectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNTFs,
                buyNFT,
                createSale,
                currentAccount,
                titleData,
                startAuction,
                fetchAuctionNFTs,
                placeBid,
                finishAuction,
                cancelAuction,
                cancelSelling,
                getTimeEndAuction
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    )
}