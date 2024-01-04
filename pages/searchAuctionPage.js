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

const searchPage = () => {
  
  const {fetchAuctionNFTs} = useContext(NFTMarketplaceContext);
  const [auctionNFTs, setAuctionNFTs] = useState([]);
  const [auctionNFTsCopy, setAuctionNFTsCopy] = useState([]);

  useEffect(() => {
    fetchAuctionNFTs().then((items) => {
      setAuctionNFTs(items?.reverse());
      setAuctionNFTsCopy(items);
    });
  }, []);

  const onHandleSearch = (value) => {
    const filteredAuctionNFTs = auctionNFTs.filter(({name}) =>
      name.toLowerCase().includes(value.toLowerCase()));

    if(filteredAuctionNFTs.length === 0){
      setAuctionNFTs(auctionNFTsCopy);
    }
    else{
      setAuctionNFTs(filteredAuctionNFTs);
    }
  };

  const onClearSearch = () => {
    if(auctionNFTs.length && auctionNFTsCopy.length){
      setNfts(auctionNFTsCopy);
    }
  };

  console.log("NFT Auction", auctionNFTs);

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar 
        onHandleSearch = {onHandleSearch}
        onClearSearch = {onClearSearch}  
      />
      <Filter/>
      <NFTCardTwo NFTData = {auctionNFTs}/>
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
