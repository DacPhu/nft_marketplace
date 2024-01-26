import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
import NFTAuctionDetailsPage from "../NFTDetailsPage/NFTAuctionDetailsPage";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const NFTDetails = () => {
  
  const {currentAccount} = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    highestBid: "",
    highestBidder: "",
    seller: "",
    directSold: "",
  });

  const router = useRouter();
  useEffect(() => {
    if(!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  return (
    <div>
      <NFTAuctionDetailsPage nft = {nft}/>
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
