import React, {useContext, useEffect} from "react";
import {NFTMarketplaceContext} from "../Context/NFTMarketplaceContext";
import {useRouter} from "next/router";

const logout = () => {
  const {currentAccount, disconnectWallet} = useContext(NFTMarketplaceContext)
  const router = useRouter();

  useEffect(() => {
    disconnectWallet();
    console.log("current Account: "+currentAccount)
    router.push('/'); // Redirect to home page after logout
  }, []);
  return (
    <>

    </>
  )
}
export default logout;