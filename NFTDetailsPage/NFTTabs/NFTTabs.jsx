import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";

const NFTTabs = ({ dataTab, bidHistory, icon }) => {
  return (
    <div className={Style.NFTTabs}>
      {bidHistory?.map((el, i) => (
        <div className={Style.NFTTabs_box} key={i + 1}>
          {/* <Image
            src={el}
            alt="profile image"
            width={40}
            height={40}
            className={Style.NFTTabs_box_img}
          /> */}
          <div className={Style.NFTTabs_box_info}>
            <span>
              Offer by $${el.bid} by <span>${el.auctioner}</span>
              {icon}
            </span>

            <small>{new Date(el.timeStamp * 1000).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
