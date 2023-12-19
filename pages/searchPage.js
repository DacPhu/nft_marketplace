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

  const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((items) => {
      if (Array.isArray(items)) {
        setNfts(items.reverse());
        setNftsCopy(items);
      } else {
        console.error('Invalid items format:', items);
      }
    });
  }, []);

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({name}) => 
      String(name).toLowerCase().includes(value.toLowerCase()));

    if(filteredNFTs.length == 0){
      setNfts(nftsCopy);
    }
    else{
      setNfts(filteredNFTs);
    }
  }

  const onClearSearch = () => {
    if(nfts.length && nftsCopy.length){
      setNfts(nftsCopy);
    }
  }

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];
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
      <Brand />
    </div>
  );
};

export default searchPage;
