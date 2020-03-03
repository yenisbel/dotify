import React from "react";
import "../stylesheets/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <i className="fab fa-spotify"></i>
        <div className="sidebar-dotify">
          Dotify
        </div>
      </div>
      <div>
        <div>
          <i className="fas fa-home"></i>
          Home
        </div>
        <div>
          <i class="fas fa-search"></i>
          Search
        </div>
        <div>
          <i class="fas fa-book-open"></i>
          Your Library
        </div>
      </div>
      <div className="playlist">
        <div className="create">Create Playlist</div>
        <div className="liked-songs">Liked Songs</div>
        <hr className="playlist-divider" />
      </div>
    </div>
  );
}

export default Sidebar;
