import React, { useState, useContext } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit, FaCog, FaLanguage, FaAddressBook,FaHandsHelping, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { TbDownload } from "react-icons/tb";
import Link from "next/link";
import Style from "./Profile.module.css";
import images from "../../../img";

// IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Profile = ({currentAccount}) => {
  // const [checked, setChecked] = React.useState(false);
  const {disConnectWallet} = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image
          src={images.user1}
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />

        <div className={Style.profile_account_info}>
          <p>Shoaib Bhai</p>
          <small>{currentAccount.slice(0, 18)}...</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/author" }}>My Profile</Link>
            </p>
          </div>

         

          <div className={Style.profile_menu_one_item}>
            <FaUsers />
            <p>
              <Link href={{ pathname: "/community" }}>Community</Link>
            </p>
          </div>

          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account" }}>Edit Profile</Link>
            </p>
          </div>

          <div className={Style.profile_menu_one_item}>
            <FaHandsHelping />
            <p>
              <Link href={{ pathname: "/contactus" }}>Help</Link>
            </p>
          </div>

        </div>
          <div className={Style.profile_menu_one_item} onClick={disConnectWallet}>
            <FaSignOutAlt />
            <p> Log out </p>
          </div>
          
        </div>
      </div>
  );
};

export default Profile;
