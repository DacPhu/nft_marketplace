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
  const [ntfs, setNfts] = useState([]);
  const [ntfsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items.reverse());
      setNftsCopy(items);
    })
  });

  const onHandleSearch = (value) => {
    const filteredNFTs = nft.filter(({name}) => name.toLowerCase().includes(value.toLowerCase()));

    if(filteredNFTs.length == 0){
      setNfts(ntfsCopy);
    }
    else{
      setNfts(filteredNFTs);
    }
  }

  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar onHandleSearch = {onHandleSearch} />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
