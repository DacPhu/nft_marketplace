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
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import { NFTTabs } from "../NFTDetailsIndex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext.js";

const NFTDescription = ({nft}) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);

  const router = useRouter();
  //SMART CONTRACT DATA
  const {buyNFT, 
        placeBid, 
        cancelAuction, 
        cancelSelling,
        finishAuction,  
        currentAccount} = useContext(NFTMarketplaceContext);

  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user1,
    images.user8,
    images.user2,
    images.user6,
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

    if (btnText == "Bid History") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "Provanance") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  };

  const openOwmer = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
      setHistory(true);
    }
  };

  const [bidPrice, setBidPrice] = useState('');

  const handleBidClick = () => {
    const userInput = prompt("Enter Bid Price:");

    if (userInput !== null) {
      setBidPrice(userInput);
      handlePlaceBid();
    }
  };

  const handlePlaceBid = () => {
    placeBid(nft, bidPrice);
    alert(`Placing bid with price: $${bidPrice}`);
  };

  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 22,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        const { days, hours, minutes, seconds } = prevCountdown;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          // Handle timer completion logic here
        } else {
          const newSeconds = seconds === 0 ? 59 : seconds - 1;
          const newMinutes = newSeconds === 59 ? minutes - 1 : minutes;
          const newHours = newMinutes === -1 ? hours - 1 : hours;
          const newDays = newHours === -1 ? days - 1 : days;

          return {
            days: newDays,
            hours: newHours >= 0 ? newHours : 0,
            minutes: newMinutes >= 0 ? newMinutes : 0,
            seconds: newSeconds,
          };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Worlds</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
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
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
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
        <div className={Style.NFTDescription_box_profile}>
          <h1>{nft.name} #{nft.tokenId}</h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <Link href={{pathname: "/author", query: `${nft.seller}`}}>
                  <span>
                    Karli Costa <MdVerified />
                  </span>
                </Link>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
              <Image
                src={images.creatorbackground1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />

              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Collection</small> <br />
                <span>
                  Karli Costa <MdVerified />
                </span>
              </div>
            </div>
          </div>
          <div className={Style.NFTDescription_box_profile_biding}>
            {nft.directSold != "true" && (
                <>
                  <p>
                    <MdTimer /> <span>Auction ending in:</span>
                  </p>

                  <div className={Style.NFTDescription_box_profile_biding_box_timer}>
                    <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                      <p>{countdown.days}</p>
                      <span>Days</span>
                    </div>
                    <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                      <p>{countdown.hours}</p>
                      <span>Hours</span>
                    </div>
                    <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                      <p>{countdown.minutes}</p>
                      <span>Mins</span>
                    </div>
                    <div className={Style.NFTDescription_box_profile_biding_box_timer_item}>
                      <p>{countdown.seconds}</p>
                      <span>Secs</span>
                    </div>
                  </div>
                </>
              )}

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                {nft.directSold == "true" ?
                  (
                    <>
                      <small>Price</small>
                      <p>
                        {nft.price != null ? (nft.price).slice(0, 10) + ' ETH' : 'N/A'} 
                        <span>( ≈ ${nft.price != null ? String(nft.price * 2233.41).slice(0, 10): 'N/A'})</span>
                      </p>
                    </>
                  )
                  :(
                    <>
                      <small> Current Highest Bid</small>
                      <p>
                        {nft.highestBid != null ? (nft.highestBid).slice(0, 10) + ' ETH' : 'N/A'} 
                        <span>( ≈ ${nft.highestBid != null ? String(nft.highestBid * 2233.41).slice(0, 10): 'N/A'})</span>
                      </p>
                    </>
                  )
                }
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
            {currentAccount == nft.seller.toLowerCase() 
              ? (nft.directSold == "true"
                  ? (
                    <Button
                    btnName="Cancel Selling"
                    handleClick={() => cancelSelling(nft)}
                    classStyle={Style.button}/>
                  )
                  :(
                  <>
                    <Button
                    btnName="Finish Auction"
                    handleClick={() => finishAuction(nft)}
                    classStyle={Style.button}/>
                    <Button
                    btnName="Cancel Auction"
                    handleClick={() => cancelAuction(nft)}
                    classStyle={Style.button}/>
                  </>)
              )
              : (currentAccount == nft.owner.toLowerCase()
                ? (<>
                  <Button
                    icon=<FaWallet />
                    btnName="List on Marketplace"
                    handleClick={() => router.push(`/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                    classStyle={Style.button}/>
                  <Button
                    icon=<FaFileContract />
                    btnName="Start Auction"
                    handleClick={() => router.push(`/startAuction?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                    classStyle={Style.button}/>
                  </>)
                  : (<>
                  {
                    nft.directSold == "true"
                    ? (
                      <Button
                      icon=<FaWallet />
                      btnName="Buy NFT"
                      handleClick={() => buyNFT(nft)}
                      classStyle={Style.button}/>
                    )
                    : (
                      <>
                        <Button
                          icon={<FaWallet />}
                          btnName="Place a bid"
                          handleClick={handleBidClick}
                          classStyle={Style.button}
                        />
                      </>
                    )
                  }
                  
                  <Button
                    icon=<FaPercentage />
                    btnName="Make offer"
                    handleClick={() => {}}
                    classStyle={Style.button}/>
                  </>
               ))
               }
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Bid History</button>
              <button onClick={(e) => openTabs(e)}>Provanance</button>
              <button onClick={() => openOwmer()}>Owner</button>
            </div>

            {history && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={historyArray} />
              </div>
            )}
            {provanance && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={provananceArray} />
              </div>
            )}

            {owner && (
              <div className={Style.NFTDescription_box_profile_biding_box_card}>
                <NFTTabs dataTab={ownerArray} icon=<MdVerified /> />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
