import React from "react";
import "../assets/stylesheets/Sidebar.css";
import { Link, withRouter } from "react-router-dom";
import create from "../assets/images/create.png";
import liked from "../assets/images/liked.png";

const Sidebar = ({props}) => {
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
          {props.history.location.pathname === "/" ? (
            <Link to="/" className="home-button-selected">
              <i className="fas fa-home"></i>
              <div>Home</div>
            </Link>
          ) : (
            <Link to="/" className="home-button-unselected">
              <i className="fas fa-home"></i>
              <div>Home</div>
            </Link>
          )}
        </div>
        <div className="search">
          {props.history.location.pathname === "/search" ? (
            <Link to="/search" className="search-button-selected">
              <i className="fas fa-search"></i>
              <div>Search</div>
            </Link>
          ) : (
            <Link to="/search" className="search-button-unselected">
              <i className="fas fa-search"></i>
              <div>Search</div>
            </Link>
          )}
        </div>
        <div className="library">
          {props.history.location.pathname === "/collection" ? (
            <Link to="/collection" className="library-button-selected">
              <i className="fas fa-book-open"></i>
              <div>Your Library</div>
            </Link>
          ) : (
            <Link to="/collection" className="library-button-unselected">
              <i className="fas fa-book-open"></i>
              <div>Your Library</div>
            </Link>
          )}
        </div>
      </div>
      <div className="playlist">
        <span className="playlist-title">PLAYLISTS</span>
        <button className="create">
          <img src={create} className="create-image"/>
          <div className="create-playlist">Create Playlist</div> 
        </button>
        <button className="liked-songs">
          <img src={liked} className="liked-image"/>
          <div className="liked">Liked Songs</div> 
        </button>
        <hr className="playlist-divider" />
      </div>
    </div>
  );
}

export default withRouter(Sidebar);
