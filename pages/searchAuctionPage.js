import React, {useEffect, useState, useContext} from "react";

//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Banner, Filter, NFTAuctionCard } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";

import images from "../img";

// IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchAuctionPage = () => {
  
  const {fetchAllAuctionNFTs} = useContext(NFTMarketplaceContext);
  const [auctionNFTs, setAuctionNFTs] = useState([]);
  const [auctionNFTsCopy, setAuctionNFTsCopy] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchAuctionNFTs().then((items) => {
      if (sortOrder === 'asc') {
        items.sort((a, b) => a.highestBid - b.highestBid);
      } else {
        items.sort((a, b) => b.highestBid - a.highestBid);
      }

      setAuctionNFTs(items);
      // setAuctionNFTs(items?.reverse());
      setAuctionNFTsCopy(items);
    });
  }, [sortOrder] );

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
      setAuctionNFTs(auctionNFTsCopy);
    }
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar 
        onHandleSearch = {onHandleSearch}
        onClearSearch = {onClearSearch}  
      />
      <Filter sortOrder={sortOrder} onChangeSortOrder={setSortOrder} />
      <NFTAuctionCard NFTData = {auctionNFTs}/>
      <Slider />
      <Brand />
    </div>
  );
};

export default searchAuctionPage;
