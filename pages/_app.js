import "../styles/globals.css";
//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";
import { useState, useEffect } from "react";
import { Switch } from "@mui/joy";
import { createContext } from "react";
import KommunicateChat from "../components/ChatBot";
const ThemeContext = createContext();

const MyApp = ({ Component, pageProps }) => {

  const [theme, setTheme] = useState("light");
  const [switchState, setSwitchState] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const storedSwitchState = localStorage.getItem("switchState");
    if (storedTheme) {
      setTheme(storedTheme);
    }
    if (storedSwitchState !== null) {
      setSwitchState(storedSwitchState === "true");
    }
  }, []); // Empty dependency array ensures this effect runs once on mount

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const handleSwitchChange = () => {
    const newSwitchState = !switchState;
    setSwitchState(newSwitchState);
    localStorage.setItem("switchState", newSwitchState.toString());
    switchTheme();
  };


  return (
    <div>
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <div data-theme={theme}>
        <NFTMarketplaceProvider>
          <NavBar
            switchTheme={switchTheme}
            switchState={switchState}
            handleSwitchChange={handleSwitchChange}
          />
           <KommunicateChat />
          <Component {...pageProps} />
          <Footer />
          
        </NFTMarketplaceProvider>
       
      </div>
    </ThemeContext.Provider>
    </div>

  );
}


export default MyApp;