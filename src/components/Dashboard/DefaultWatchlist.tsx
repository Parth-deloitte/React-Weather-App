import React from "react";
import cloudImage from "../../assets/clouds.png";
import "./DefaultWatchlist.css";

const DefaultWatchlist = () => {
  return (
    <div className="defaultwatchlist-container">
      <img className="clouds" src={cloudImage} alt="clouds img" />
      <p className="empty-watchlist">No Location added to watchlist</p>
    </div>
  );
};

export default DefaultWatchlist;
