import React from "react";
import "../assets/stylesheets/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <i className="fab fa-spotify"></i>
        <div className="sidebar-dotify">Dotify</div>
      </div>
      <div className="static-links">
        <div className="home">
          <button className="home-buttons">
            <i className="fas fa-home"></i>
            Home
          </button>
        </div>
        <div className="search">
          <button className="home-buttons">
            <i className="fas fa-search"></i>
            Search
          </button>
        </div>
        <div className="library">
          <button className="home-buttons">
            <i className="fas fa-book-open"></i>
            Your Library
          </button>
        </div>
      </div>
      <div className="playlist">
        <span>Playlists</span>
        <div className="create">Create Playlist</div>
        <div className="liked-songs">Liked Songs</div>
        <hr className="playlist-divider" />
      </div>
    </div>
  );
}

export default Sidebar;
