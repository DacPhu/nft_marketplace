import React ,{useState, useEffect, useContext} from 'react';
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from 'next/router';
import axios from 'axios';
import {create as ipfsHttpClient} from "ipfs-http-client";

const projectId = "";
const projectSecretKey = "";
const auth = `Basic${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`;

const subdomain = "";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers:{
        authorization: auth,
    },
});

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
        const web3Modal = new Wenb3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with smart contract.");
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = (({children}) => {
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

            if(accounts.length){
                setcurrentAccount(accounts[0]);
            }
            else{
                console.log("No Account Found");
            }
            console.log(currentAccount);
        } catch (error) {
            console.log("Something wrong while connecting to wallet.");
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
        try {
            const added = await client.add({content: file});
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;
        } catch (error) {
            console.log("Error Uploading to IPFS");
        }
    };

    //---CREATENFT FUNCTION
    const createNFT = async(name, price, image, description, router) => {

        if(!name || !description || !price || !fileUrl)
            return console.log("Data is missing");

        const data = JSON.stringify({name, description, image: fileUrl});

        try {
            const added = await client.add(data);

            const url = `${subdomain}/ipfs/${added.path}`;

            await createSale(url, price);
        } catch (error) {
            console.log(error);
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
                : await contract.reSellToken(url, price, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();
            router.push('/searchPage');
        } catch (error) {
            console.log("Error while creating sale");
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

    useEffect(() => {
        fetchNFTs();
    }, [])

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
        <NFTMarketplaceContext.Provider value = {{
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
})