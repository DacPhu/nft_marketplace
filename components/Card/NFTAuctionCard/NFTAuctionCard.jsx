import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTAuctionCard.module.css";
import { LikeProfile } from "../../componentsindex";

// IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const NFTAuctionCard = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);
  const { getTimeEndAuction } = useContext(NFTMarketplaceContext);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
  };

  const [countdown, setCountdown] = useState({
    hours: 0,
  });
  
  useEffect(() => {
    const updateCountdown = async (el) => {
      try {
        const timeEnd = await getTimeEndAuction(el);
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        if (timeEnd !== undefined && currentTimeInSeconds !== undefined) {
          const timeLeft = timeEnd - currentTimeInSeconds;
          setCountdown({
            hours: Math.floor(timeLeft / (60 * 60)),
          });
        }
      } catch (error) {
        console.error('Error fetching time left:', error);
      }
    }
    NFTData.forEach((el) => updateCountdown(el));
  }, [NFTData]);

  return (
    <div className={Style.NFTAuctionCard}>
      {NFTData?.map((el, i) => (
        <Link href={{pathname: "/NFTAuction-details", query: el}} key={i + 1}>
        <div className={Style.NFTAuctionCard_box} key={i + 1}>
          <div className={Style.NFTAuctionCard_box_like}>
            <div className={Style.NFTAuctionCard_box_like_box}>
              <div className={Style.NFTAuctionCard_box_like_box_box}>
                <BsImage className={Style.NFTAuctionCard_box_like_box_box_icon} />
                <p onClick={() => likeNFT()}>
                  {like ? <AiOutlineHeart /> : <AiFillHeart />}
                  {""}
                  <span>{likeInc + 1}</span>
                </p>
              </div>
            </div>
          </div>

          <div className={Style.NFTAuctionCard_box_img}>
            <Image
              src={el.image}
              alt="NFT"
              width={500}
              height={500}
              objectFit="cover"
              className={Style.NFTAuctionCard_box_img_img}
            />
          </div>

          <div className={Style.NFTAuctionCard_box_info}>
            <div className={Style.NFTAuctionCard_box_info_left}>
              <LikeProfile />
              <p>{el.name}</p>
            </div>
            <small>4{i + 2}</small>
          </div>

          <div className={Style.NFTAuctionCard_box_price}>
            <div className={Style.NFTAuctionCard_box_price_box}>
                <small>Current Highest Bid</small>
                <p> {el.highestBid} ETH</p>
            </div>
              <p className={Style.NFTAuctionCard_box_price_stock}>
              <MdTimer /> <span>{countdown.hours} hours left</span>
              </p>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTAuctionCard;
