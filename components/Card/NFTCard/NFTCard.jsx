import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import { LikeProfile } from "../../componentsindex";

const NFTCard = ({ NFTData }) => {
  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
  };

  return (
    <div className={Style.NFTCard}>
      {NFTData?.map((el, i) => (
        <Link href={{pathname: "/NFT-details", query: el}} key={i + 1}>
        <div className={Style.NFTCard_box} key={i + 1}>
          <div className={Style.NFTCard_box_like}>
            <div className={Style.NFTCard_box_like_box}>
              <div className={Style.NFTCard_box_like_box_box}>
                <BsImage className={Style.NFTCard_box_like_box_box_icon} />
                <p onClick={() => likeNFT()}>
                  {like ? <AiOutlineHeart /> : <AiFillHeart />}
                  {""}
                  <span>{likeInc + 1}</span>
                </p>
              </div>
            </div>
          </div>

          <div className={Style.NFTCard_box_img}>
            <Image
              src={el.image}
              alt="NFT"
              width={500}
              height={500}
              objectFit="cover"
              className={Style.NFTCard_box_img_img}
            />
          </div>

          <div className={Style.NFTCard_box_info}>
            <div className={Style.NFTCard_box_info_left}>
              <LikeProfile />
              <p>{el.name}</p>
            </div>
            <small>4{i + 2}</small>
          </div>

          <div className={Style.NFTCard_box_price}>
            <div className={Style.NFTCard_box_price_box}>
              <small>Price</small>
              <p> {el.price} ETH</p>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCard;
