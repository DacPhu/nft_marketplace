import React, {useEffect, useState, useContext} from "react";

//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

// IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import {AuctionContext} from "../Context/AuctionContext";

const searchPage = () => {

  const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  
  const {fetchAuctionNFTs} = useContext(AuctionContext);
  const [auctionNFTs, setAuctionNFTs] = useState([]);
  const [auctionNFTsCopy, setAuctionNFTsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((items) => {
        setNfts(items?.reverse());
        setNftsCopy(items);
    });
  }, []);

  useEffect(() => {
    fetchAuctionNFTs().then((items) => {
      setAuctionNFTs(items?.reverse());
      setAuctionNFTsCopy(items);
    })
  })

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({name}) => 
      name.toLowerCase().includes(value.toLowerCase()));
    
    const filteredAuctionNFTs = auctionNFTs.filter(({name}) =>
      name.toLowerCase().includes(value.toLowerCase()));

    if(filteredNFTs.length === 0){
      setNfts(nftsCopy);
    }
    else{
      setNfts(filteredNFTs);
    }

    if(filteredAuctionNFTs.length === 0){
      setAuctionNFTs(auctionNFTsCopy);
    }
    else{
      setAuctionNFTs(filteredAuctionNFTs);
    }
  };

  const onClearSearch = () => {
    if(nfts.length && nftsCopy.length){
      setNfts(nftsCopy);
    }
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar 
        onHandleSearch = {onHandleSearch}
        onClearSearch = {onClearSearch}  
      />
      <Filter />
      <NFTCardTwo NFTData={nfts} />
      <Slider />
      <NFTCardTwo NFTAuctionData = {auctionNFTs}/>
      <Brand />
    </div>
  );
};

export default searchPage;
