import React from "react";
import "../assets/stylesheets/Sidebar.css";
import { Link } from "react-router-dom";
import create from "../assets/images/create.png";
import liked from "../assets/images/liked.png";

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
          <Link to="/" className="side-home-button">
            <i className="fas fa-home"></i>
            <div>Home</div> 
          </Link>
        </div>
        <div className="search">
          <Link to="/search" className="side-search-button">
            <i className="fas fa-search"></i>
            <div>Search</div>
          </Link>
        </div>
        <div className="library">
          <Link to="/collection" className="side-library-button">
            <i className="fas fa-book-open"></i>
            <div>Your Library</div>
          </Link>
        </div>
      </div>
      <div className="playlist">
        <span>Playlists</span>
        <div className="create">
          <img src={create} className="create-image"/>
          <div>Create Playlist</div> 
        </div>
        <div className="liked-songs">
          <img src={liked} className="liked-image"/>
          <div>Liked Songs</div> 
        </div>
        <hr className="playlist-divider" />
      </div>
    </div>
  );
}

export default Sidebar;
