import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
import NFTOwnDetailsPage from "../NFTDetailsPage/NFTOwnDetailsPage";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
const NFTDetails = () => {
  
  const {currentAccount} = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
  });

  const router = useRouter();
  useEffect(() => {
    if(!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  return (
    <div>
      <NFTOwnDetailsPage nft = {nft}/>
      <Category />
    </div>
  );
};

export default NFTDetails;
