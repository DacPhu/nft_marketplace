import React, { useState } from "react";
import Image from "next/image";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./AuthorTaps.module.css";

const AuthorTaps = ({
  setListed,
  setOwned,
  setAuction,
  setLike,
  setFollower,
  setFollowing,
}) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");

  const listArray = [
    "Created By Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed",
  ];

  const openDropDownList = () => {
    if (!openList) {
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  };

  const openTab = (e) => {
    const btnText = e.target.innerText;
    console.log(btnText);
    if (btnText == "Listed NFTs") {
      setListed(true);
      setOwned(false);
      setAuction(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(1);
    } else if (btnText == "Own NFTs") {
      setListed(false);
      setOwned(true);
      setAuction(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(2);
    } else if(btnText == "Auction NFTs"){
      setListed(false);
      setOwned(false);
      setAuction(true);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(3);
    } 
    else if (btnText == "Liked") {
      setListed(false);
      setOwned(false);
      setAuction(false);
      setFollower(false);
      setFollowing(false);
      setLike(true);
      setActiveBtn(4);
    } else if (btnText == "Following") {
      setListed(false);
      setOwned(false);
      setAuction(false);
      setFollower(false);
      setFollowing(true);
      setLike(false);
      setActiveBtn(5);
    } else if (btnText == "Followers") {
      setListed(false);
      setOwned(false);
      setAuction(false);
      setFollower(true);
      setFollowing(false);
      setLike(false);
      setActiveBtn(6);
    }
  };

  return (
    <div className={Style.AuthorTaps}>
      <div className={Style.AuthorTaps_box}>
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            <button
              className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Listed NFTs
            </button>
            <button
              className={`${activeBtn == 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Own NFTs
            </button>
            <button
              className={`${activeBtn == 3 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Auction NFTs 
            </button>
            <button 
              className={`${activeBtn == 4 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Liked
            </button>
            <button
              className={`${activeBtn == 5 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Following
            </button>
            <button
              className={`${activeBtn == 6 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Followers
            </button>
          </div>
        </div>

        <div className={Style.AuthorTaps_box_right}>
          <div
            className={Style.AuthorTaps_box_right_para}
            onClick={() => openDropDownList()}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className={Style.AuthorTaps_box_right_list}>
              {listArray.map((el, i) => (
                <div
                  key={i + 1}
                  onClick={() => setSelectedMenu(el)}
                  className={Style.AuthorTaps_box_right_list_item}
                >
                  <p>{el}</p>
                  <span>{selectedMenu == el && <TiTick />}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorTaps;
