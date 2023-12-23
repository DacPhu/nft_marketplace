import React from 'react';

//INTERNAL IMPORT
import Style from "./Loading.module.css";

const Loading = ({ isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <div id={Style.loading_overlay}>
          <div className="loading_spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div id={Style.loading_overlay_none}>
          <div className={Style.loading_spinner}></div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Loading;
