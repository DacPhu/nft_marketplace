import React, { useState, useContext, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Title,
  Category,
  Filter,
  NFTCard,
  FollowerTab,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreator/TopCreator";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {

  const {checkIfWalletConnected, currentAccount } = useContext(NFTMarketplaceContext);
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
      fetchNFTs().then((items) => {
          setNfts(items?.reverse());
          setNftsCopy(items);
      });
  }, []);

  // CREATOR LIST
  const creators = getTopCreators(nfts);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <BigNFTSilder />
      {creators && <FollowerTab TopCreator={creators}/>}
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      <NFTCard NFTData={nfts}/>
      <Service />
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category/>
    </div>
  );
};

export default Home;
