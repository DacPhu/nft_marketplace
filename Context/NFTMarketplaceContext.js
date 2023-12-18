import React ,{useState, useEffect, useContext} from 'react';
import Web3Modal from "web3modal";
import Web3 from "web3";
import { ethers } from "ethers";
import { useRouter } from 'next/router';
import axios from 'axios';

const FormData = require("form-data");
const JWT_IMAGE = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMWRmMDBmMS0wODEzLTRjZTAtOWI5ZS0zYmExNzhjZGQ3ZDAiLCJlbWFpbCI6InBsZHBwbGRwMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0MDEwNzVjNWNhYzYyOWY4NTJkZSIsInNjb3BlZEtleVNlY3JldCI6ImQ4OWI4MjliMjY5ZmY3NmFmMDIxMmM2ZjdiYTA3NzhiOWVhZjVhZjkxZmEwN2E2N2MwNzIyMzJkMjY0ZTlhMzgiLCJpYXQiOjE3MDI4Nzg3MzB9.YrUjdRI0RjrPaL1ytGXqdIVqP_6Y78DQWzQxBzP3U3Q'
const JWT_META = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMWRmMDBmMS0wODEzLTRjZTAtOWI5ZS0zYmExNzhjZGQ3ZDAiLCJlbWFpbCI6InBsZHBwbGRwMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1NGE3ZWJiYWMzZDQ3MGE1NDE1MSIsInNjb3BlZEtleVNlY3JldCI6IjgwN2MwNDdmNDNkMjI2NDhhMzQ3YTBjZmVhOGU3MWVhZTU3OTIxZDM3ZTRhYTEwZTc4YWYzMWE2OGI3MDExMzciLCJpYXQiOjE3MDI1NDc5MDh9.ZGOw-cX_PC3ibP5OWDj5YSpCOfbeCR9ojjiG0rgGgVE'

// INTERNAL IMPORT 
import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';

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
        console.log(contract);
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
            if(!window.ethereum)
                return console.log("Install MetaMask");
            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            });
            console.log(accounts);
            
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
            window.location.reload();
        } catch (error) {
            console.log("Erro while connecting to wallet");
        }
    };

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
                Authorization: JWT_IMAGE
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
                  Authorization: JWT_META, // Replace with your actual JWT token
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
        
            //   // Redirect to another page using the router (if needed)
            //   router.push("/success"); // Replace with the actual path you want to redirect to
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
            console.log(NFTMarketplaceABI);
            // await contract["getListingPrice()"]();
            console.log(contract);
            const listingPrice = await contract.getListingPrice();
            // console.log(listingPrice);
            // const listingPrice = 1n;
            const transaction = !isReselling 
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.reSellToken(url, price, {
                    value: (listingPrice.toString()),
                });

            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            console.log("Error while creating sale", error);
        }
    };

    //---FETCHNFTS FUNCTION
    const fetchNFTs = async () => {
        try {
            const provider = new ethers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItem();

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
                        price,
                        tokenId: tokenId.toNumber(),
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
            console.log("Error while fetching NFTs");
        }
    };

    // useEffect(() => {
    //     fetchNFTs();
    // }, [])

    //---FETCHING MY NFTs OR LISTED NFTs
    const fetchMyNFTsOrListedNTFs = async(type) =>{
        try {
            const contract = await connectingWithSmartContract();

            const data = type == "fetchItemsListed" 
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNFT();

            const items = await Promise.all(
                data.map(async ({tokenId, seller, owner, price: unformattedPrice}) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: {image, name, description}
                    } = await axios.get(tokenURI);
                    const price = ethers.parseUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    return {
                        price, 
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        description,
                        tokenURI,
                    };
                })
            );
            return items;
        } catch (error) {
            console.log("Error while fetching listed NFTs");
        }
    };

    //---BUY NFTs FUNCTION
    const buyNFT = async (nft) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.parseUnits(nft.price.toString(), "ether");
            
            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });

            await transaction.wait();
        } catch (error) {
            console.log("Error while buying NFTs")
        }
    };

    return (
        <NFTMarketplaceContext.Provider 
            value = {{
                // checkContract,
                checkIfWalletConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNTFs,
                buyNFT,
                currentAccount,
                titleData
            }}
        >
            {children}
        </NFTMarketplaceContext.Provider>
    )
}