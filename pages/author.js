import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Brand, Title, Banner } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
  ];

  const [listed, setListed] = useState(true);
  const [owned, setOwned] = useState(false);
  const [auction, setAuction] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  //IMPORT SMART CONTRACT DATA
  const {fetchMyNFTsOrListedNTFs, fetchAuctionNFTs, currentAccount} = useContext(NFTMarketplaceContext);

  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [auctionNFTs, setAuctionNFTs] = useState([]);

  useEffect(() => {
    fetchMyNFTsOrListedNTFs("fetchItemsListed").then((items) => {
      setNfts(items);
    });
  }, []);

  useEffect(() => {
    fetchMyNFTsOrListedNTFs("fetchMyNFTs").then((items) => {
      setMyNFTs(items);
    });
  }, []);

  useEffect(() => {
    fetchAuctionNFTs().then((items) => {
      setAuctionNFTs(items);
    });
  }, []);

  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard currentAccount = {currentAccount}/>
      <AuthorTaps
        setListed={setListed}
        setOwned={setOwned}
        setAuction={setAuction}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />

      <AuthorNFTCardBox
        listed={listed}
        owned={owned}
        auction={auction}
        like={like}
        follower={follower}
        following={following}
        nfts={nfts}
        myNFTs={myNFTs}
        auctionNFTs={auctionNFTs}
      />
      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio"
      />
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} key={i + 1}/>
        ))}
      </div>

      <Brand />
    </div>
  );
};

export default author;
