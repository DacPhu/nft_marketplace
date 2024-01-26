import React, {useEffect, useState, useContext} from "react";

//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Filter, Banner, NFTCard } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";

import images from "../img";

// IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPage = () => {

  const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((items) => {
        setNfts(items?.reverse());
        setNftsCopy(items);
    });
  }, []);

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
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar 
        onHandleSearch = {onHandleSearch}
        onClearSearch = {onClearSearch}  
      />
      <Filter />
      <NFTCard NFTData={nfts} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
