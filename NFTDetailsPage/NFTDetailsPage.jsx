import React from "react";

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";

const NFTDetailsPage = ({nft}) => {
  console.log("DEBUG", nft);
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft = {nft}/>
        <NFTDescription nft = {nft}/>
      </div>
    </div>
  );
};

export default NFTDetailsPage;
