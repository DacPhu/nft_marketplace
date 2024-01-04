import React, { useState, useContext, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreator/TopCreator";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {

  const {checkIfWalletConnected, currentAccount } = useContext(NFTMarketplaceContext);
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const {fetchNFTs, fetchAuctionNFTs} = useContext(NFTMarketplaceContext);
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
      {/* <Service /> */}
      <BigNFTSilder />
      {/* <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      /> */}
      {/* <AudioLive /> */}
      <FollowerTab TopCreator={creators}/>
      {/* <Slider /> */}
      {/* <Collection /> */}
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      <NFTCard NFTData={nfts}/>
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      {/* <Subscribe />
      <Brand /> */}
      {/* <Video /> */}
    </div>
  );
};

export default Home;
