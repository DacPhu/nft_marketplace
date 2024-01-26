import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { notification } from 'antd';
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
//import { Button } from "../../components/componentsindex.js";
import { NFTTabs } from "../NFTDetailsIndex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext.js";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const NFTDescription = ({ nft }) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);

  const router = useRouter();
  //SMART CONTRACT DATA
  const { buyNFT,
    placeBid,
    cancelAuction,
    cancelSelling,
    finishAuction,
    getTimeEndAuction,
    currentAccount } = useContext(NFTMarketplaceContext);

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
    } else if (btnText == "Provanance") {
      setHistory(false);
      setProvanance(true);
    }
  };

  const [open, setOpen] = useState(false); // Add this state for controlling dialog visibility
  const [bidPrice, setBidPrice] = useState('');


  const handleBidClick = () => {
    setOpen(true); // Open the dialog when bid button is clicked
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePlaceBid = () => {
    // Validate bid price
    const numericBidPrice = parseFloat(bidPrice);
    const numericHighestBid = parseFloat(nft.highestBid);
    
    if (isNaN(numericBidPrice) || numericBidPrice <= 0) {
      notification.error({
        message: 'Invalid Bid Price',
        description: 'Please enter a valid bid price greater than 0.',
      });
      return;
    }
    
    if (numericBidPrice <= numericHighestBid) {
      notification.error({
        message: 'Invalid Bid Price',
        description: 'Bid price must be higher than the current highest bid.',
      });
      return;
    }
  
    // Proceed with placing bid
    placeBid(nft, bidPrice);
    notification.success({
      message: 'Bid Placed Successfully',
      description: `Your bid of ${bidPrice} ETH has been successfully placed.`,
    });
    setOpen(false); // Close the dialog after placing bid
  };

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = async () => {
      try {
        const timeEnd = await getTimeEndAuction(nft);
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        if (timeEnd !== undefined && currentTimeInSeconds !== undefined) {
          const timeLeft = timeEnd - currentTimeInSeconds + 24 * 60 * 60 * 2;
          setCountdown({
            days: Math.floor(timeLeft / (24 * 60 * 60)),
            hours: Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60)),
            minutes: Math.floor((timeLeft % (60 * 60)) / 60),
            seconds: Math.floor(timeLeft % 60),
          });
        }
      } catch (error) {
        console.error('Error fetching time left:', error);
        notification.error({
          message: 'Error fetching time left',
          description: 'There was an error fetching the time left for the auction.',
        });
      }
    };

    updateCountdown();

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        const { days, hours, minutes, seconds } = prevCountdown;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
        } else {
          const totalSecond = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds - 1;
          const newDays = Math.floor(totalSecond / (24 * 60 * 60));
          const newHours = Math.floor((totalSecond % (24 * 60 * 60)) / (60 * 60));
          const newMinutes = Math.floor((totalSecond % (60 * 60)) / 60);
          const newSeconds = Math.floor(totalSecond % 60);

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
  }, [nft.tokenId]);


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
                <Link href={{ pathname: "/author", query: `${nft.seller}` }}>
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
                        <span>( ≈ ${nft.price != null ? String(nft.price * 2233.41).slice(0, 10) : 'N/A'})</span>
                      </p>
                    </>
                  )
                  : (
                    <>
                      <small> Current Highest Bid</small>
                      <p>
                        {nft.highestBid != null ? (nft.highestBid).slice(0, 10) + ' ETH' : 'N/A'}
                        <span>( ≈ ${nft.highestBid != null ? String(nft.highestBid * 2233.41).slice(0, 10) : 'N/A'})</span>
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
                      variant="contained"
                      color="error"
                      onClick={() => cancelSelling(nft)}
                      className={Style.button}
                      size="large"
                    >
                      Cancel Selling
                    </Button>
                  )
                  : (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => finishAuction(nft)}
                        size="large"
                        className={Style.button}
                      >
                        Finish Auction
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => cancelAuction(nft)}
                        size="large"
                        className={Style.button}
                      >
                        Cancel Auction
                      </Button>
                    </>
                  )
                )
                : (currentAccount == nft.owner.toLowerCase()
                  ? (<>
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
                      color="primary"
                      onClick={() => router.push(`/startAuction?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                      size="large"
                      className={Style.button}
                    >
                      Start Auction
                    </Button>
                  </>)
                  : (<>
                    {
                      nft.directSold == "true"
                        ? (
                          <Button
                            startIcon={<FaWallet />}
                            variant="contained"
                            color="success"
                            onClick={() => buyNFT(nft)}
                            size="large"
                            className={Style.button}
                          >
                            Buy NFT
                          </Button>
                        )
                        : (
                          <>
                            <Button
                              startIcon={<FaWallet />}
                              variant="contained"
                              color="primary"
                              onClick={handleBidClick}
                              size="large"
                              className={Style.button}
                            >
                              Place a bid
                            </Button>
                          </>
                        )
                    }

                    <Button
                      startIcon={<FaPercentage />}
                      variant="contained"
                      color="warning"
                      onClick={() => { }}
                      size="large"
                      className={Style.button}
                    >
                      Make offer
                    </Button>
                  </>
                  ))
              }
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
              <button onClick={(e) => openTabs(e)}>Bid History</button>
              <button onClick={(e) => openTabs(e)}>Provanance</button>
              <button onClick={() => openOwmer()}>Owner</button>
            </div>
            {
              <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '90vh' } }}>
                <DialogTitle sx={{ fontSize: '2rem' }}>Enter Bid Price</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="bidPrice"
                    label="Bid Price"
                    type="number"
                    fullWidth
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  {/* <Button
                    btnName="Cancel"
                    handleClick={() => handleClose()}
                    classStyle={Style.button}/> */}
                  <Button onClick={handlePlaceBid} variant="contained" color="primary">
                    Submit Bid
                  </Button>
                  {/* <Button
                    btnName="Submit Bid"
                    handleClick={() => handlePlaceBid()}
                    classStyle={Style.button}/> */}
                </DialogActions>
              </Dialog>
            }

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
