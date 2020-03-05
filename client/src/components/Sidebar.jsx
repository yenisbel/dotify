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
          <button className="side-home-button">
            <i className="fas fa-home"></i>
            <div>Home</div> 
          </button>
        </div>
        <div className="search">
          <button className="side-search-button">
            <i className="fas fa-search"></i>
            <div>Search</div>
          </button>
        </div>
        <div className="library">
          <button className="side-library-button">
            <i className="fas fa-book-open"></i>
            <div>Your Library</div>
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
