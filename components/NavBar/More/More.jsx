import React from "react";
import Link from "next/link";

import Style from "./MoreCenter.module.css";
//INTERNAL IMPORT
const More = () => {
  const moreCenter = [
    {
      name: "Auctions",
      link: "searchAuctionPage"
    },
    {
        name: "Recruitment",
        link: "recruitment",
    },
    {
        name: "Pandora",
        link: "pandora",
    },
    {
      name: "Blog",
      link: "AllBlog",
    },
    {
      name: "NFT Tutorial",
      link: "nfttutorial",
    },
    {
      name: "Privacy",
      link: "privacy",
    },
    {
      name: "About",
      link: "aboutus",
    },
  ];
  return (
    <div className={Style.box}>
      {moreCenter.map((el, i) => (
        <div className={Style.moreCenter} key = {i + 1}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default More;
