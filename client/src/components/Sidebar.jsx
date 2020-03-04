import React from "react";
import "../assets/stylesheets/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <Link to="/" className="sidebar-title-link">
          <i className="fab fa-spotify"></i>
          <div className="sidebar-dotify">Dotify</div>
        </Link>
      </div>
      <div className="static-links">
        <div className="home">
          <Link to="/" className="home-buttons">
            <i className="fas fa-home"></i>
            Home
          </Link>
        </div>
        <div className="search">
          <Link to="/search" className="home-buttons">
            <i className="fas fa-search"></i>
            Search
          </Link>
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
