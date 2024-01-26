import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage, FaFontAwesome, FaFileContract } from "react-icons/fa";

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";

//INTERNAL IMPORT
import Style from "./NFTOwnDescription.module.css";
import images from "../../img";
import { NFTTabs } from "../NFTDetailsIndex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext.js";

const NFTOwnDescription = ({nft}) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);

  const router = useRouter();
  //SMART CONTRACT DATA
  const {currentAccount} = useContext(NFTMarketplaceContext);

  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];

  const ownerArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Owner") {
      setOwner(true);
      setProvanance(false);
    } else if (btnText == "Provanance") {
      setOwner(false);
      setProvanance(true);
    }
  };

  return (
    <div className={Style.NFTOwnDescription}>
      <div className={Style.NFTOwnDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTOwnDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTOwnDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTOwnDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTOwnDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebooke
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instragram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>
              </div>
            )}

            <BsThreeDots
              className={Style.NFTOwnDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTOwnDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar /> Change price
                </a>
                <a href="#">
                  <BiTransferAlt /> Transfer
                </a>
                <a href="#">
                  <MdReportProblem /> Report abouse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep /> Delete item
                </a>
              </div>
            )}
          </div>
        </div>
        {/* //Part TWO */}
        <div className={Style.NFTOwnDescription_box_profile}>
          <h1>{nft.name} #{nft.tokenId}</h1>
          <div className={Style.NFTOwnDescription_box_profile_box}>
            <div className={Style.NFTOwnDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTOwnDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTOwnDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <Link href={{pathname: "/author", query: `${nft.seller}`}}>
                  <span>
                    Karli Costa <MdVerified />
                  </span>
                </Link>
              </div>
            </div>

            <div className={Style.NFTOwnDescription_box_profile_box_right}>
              <Image
                src={images.creatorbackground1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTOwnDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTOwnDescription_box_profile_box_right_info}>
                <small>Collection</small> <br />
                <span>
                  Karli Costa <MdVerified />
                </span>
              </div>
            </div>
          </div>
          <div className={Style.NFTOwnDescription_box_profile_biding}>
            <div className={Style.NFTOwnDescription_box_profile_biding_box_button}>
                {/* <Button
                icon=<FaWallet />
                btnName="List on Marketplace"
                handleClick={() => router.push(`/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                classStyle={Style.button}/>

                <Button
                icon=<FaFileContract />
                btnName="Start Auction"
                handleClick={() => router.push(`/startAuction?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                classStyle={Style.button}/> */}
                <Button
                      startIcon={<FaWallet />}
                      variant="contained"
                      color="primary"
                      onClick={() => router.push(`/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                      size="large"
                      className={Style.button}
                    >
                      List on Marketplace
                    </Button>
                <Button
                      startIcon={<FaFileContract />}
                      variant="contained"
                      color="warning"
                      onClick={() => router.push(`/startAuction?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                      size="large"
                      className={Style.button}
                    >
                      Start Auction
                    </Button>
            </div>

            <div className={Style.NFTOwnDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Provanance</button>
              <button onClick={(e) => openTabs(e)}>Owner</button>
            </div>

            {provanance && (
              <div className={Style.NFTOwnDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={provananceArray} />
              </div>
            )}

            {owner && (
              <div className={Style.NFTOwnDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={ownerArray} icon=<MdVerified /> />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTOwnDescription;
