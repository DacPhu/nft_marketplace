import React from "react";

//INTERNAL IMPORT
import { NFTAuctionDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTAuctionDetailsPage.module.css";

const NFTAuctionDetailsPage = ({nft}) => {
  return (
    <div className={Style.NFTAuctionDetailsPage}>
      <div className={Style.NFTAuctionDetailsPage_box}>
        <NFTDetailsImg nft = {nft}/>
        <NFTAuctionDescription nft = {nft}/>
      </div>
    </div>
  );
};

export default NFTAuctionDetailsPage;
