import React, {useContext, useEffect} from "react";
import {NFTMarketplaceContext} from "../Context/NFTMarketplaceContext";
import {useRouter} from "next/router";

const logout = () => {
  const {disconnectWallet} = useContext(NFTMarketplaceContext)
  const router = useRouter();

  useEffect(() => {
    disconnectWallet();
    router.push('/'); // Redirect to home page after logout
  }, []);
  return (<></>)
}
export default logout;