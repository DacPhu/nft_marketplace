import React from "react";

//INTERNAL IMPORT
import { NFTOwnDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTOwnDetailsPage.module.css";

const NFTOwnDetailsPage = ({nft}) => {
  return (
    <div className={Style.NFTOwnDetailsPage}>
      <div className={Style.NFTOwnDetailsPage_box}>
        <NFTDetailsImg nft = {nft}/>
        <NFTOwnDescription nft = {nft}/>
      </div>
    </div>
  );
};

export default NFTOwnDetailsPage;
