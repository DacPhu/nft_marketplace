import React, {useEffect, useState, useContext} from "react";

//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Sort, Banner, NFTCard } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";

import images from "../img";

// IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import Filter from "../components/Filter/Filter";

const searchPage = () => {

  const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchNFTs().then((items) => {
        if (sortOrder === 'asc') {
          items.sort((a, b) => a.price - b.price);
        } else {
          items.sort((a, b) => b.price - a.price);
        }

        // setNfts(items?.reverse());
        setNfts(items);
        setNftsCopy(items);
    });
  }, [sortOrder]);

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({name}) => 
      name.toLowerCase().includes(value.toLowerCase()));

    if(filteredNFTs.length === 0){
      setNfts(nftsCopy);
    }
    else{
      setNfts(filteredNFTs);
    }
  };

  const onClearSearch = () => {
    if(nfts.length && nftsCopy.length){
      setNfts(nftsCopy);
    }
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground3} />
      <SearchBar 
        onHandleSearch = {onHandleSearch}
        onClearSearch = {onClearSearch}  
      />
      <Filter sortOrder={sortOrder} onChangeSortOrder={setSortOrder} />
      <NFTCard NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
