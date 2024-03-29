import React, { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";

import { useRouter } from 'next/router';
import { Switch } from "@mui/joy";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import {Notification, Profile, More } from "./index";
import { Button } from "../componentsindex";
import images from "../../img";

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import { TbTextColor } from "react-icons/tb";

const NavBar = ({ switchTheme, switchState, handleSwitchChange }) => {
  
  //----USESTATE COMPONNTS
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText === "More") {
      if (openMore) {
        setOpenMore(false);
      } else {
        setNotification(false);
        setProfile(false);
        setOpenMore(true);
      }
    } else {
      setNotification(false);
      setProfile(false);
      setOpenMore(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setProfile(false);
      setOpenMore(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setOpenMore(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  // SMART CONTRACT SECTION
  const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image
              src={images.logo}
              alt="NFT MARKET PLACE"
              width={100}
              height={100}
              onClick={() => {
                window.location.href = "/";
              }}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch onClick={() => { }} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* //END OF LEFT SECTION */}

        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_home}>
            <p onClick={() => window.location.href = "/"}
              style={{ color: "#4c5773", cursor: 'pointer' }}
              onMouseOver={(e) => e.target.style.color = 'blue'}
              onMouseOut={(e) => e.target.style.color = "#4c5773"} >
              Home
            </p>
          </div>
          <div className={Style.navbar_container_right_discover}>
            <p onClick={() => window.location.href = "/searchPage"}
            style={{ color: "#4c5773", cursor: 'pointer' }}
            onMouseOver={(e) => e.target.style.color = 'blue'}
            onMouseOut={(e) => e.target.style.color = "#4c5773"}>
              Market
            </p>
          </div>

          {/* HELP CENTER MENU */}

          <div className={Style.navbar_container_right_more}>
          <p onClick={(e) => openMenu(e)}
            style={{ color: "#4c5773", cursor: 'pointer' }}
            onMouseOver={(e) => e.target.style.color = 'blue'}
            onMouseOut={(e) => e.target.style.color = "#4c5773"}
            >
              More
            </p>
            {openMore && (
              <div className={Style.navbar_container_right_more_box}>
                <More />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

          {/* CREATE BUTTON SECTION */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount == ""
              ? (<Button btnName="Connect" handleClick={() => connectWallet()} />)
              : (
                <a href="/uploadNFT">
                  <Button btnName="Create" handleClick={() => { }} />
                </a>
              )}
          </div>
          <div className="navbar_container_right_switch">
            <Switch
              onChange={() => {
                switchTheme();
                handleSwitchChange();
              }}
              checked={switchState}
              color={switchState ? 'warning' : 'neutral'}
              variant={switchState ? 'solid' : 'outlined'}
              endDecorator={switchState ? 'Light' : 'Dark'}
            />
          </div>

          {/* USER PROFILE */}

          <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />

              {profile && <Profile currentAccount = {currentAccount}/>}
            </div>
          </div>

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;