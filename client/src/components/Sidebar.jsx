import React from "react";
import "../assets/stylesheets/Sidebar.css";
import { Link, withRouter } from "react-router-dom";
import create from "../assets/images/create.png";
import liked from "../assets/images/liked.png";
import PlaylistIndex from "./playlist/PlaylistIndex";
import PlaylistForm from "./playlist/PlaylistForm";

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      showModal: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal(e) {
    this.setState({ showModal: false })
  }

  render() {
    const { props } = this.props
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
            <div className="create-playlist" onClick={this.openModal}>
              Create Playlist
            </div> 
          </button>
          {/* <button className="liked-songs">
            <img src={liked} className="liked-image"/>
            <div className="liked">Liked Songs</div> 
          </button> */}
          <hr className="playlist-divider" />
          <PlaylistIndex props={props}/>
        </div>
        {this.state.showModal ? (
          <div>
            <PlaylistForm closeModal={this.closeModal}/>
          </div>
        ) : (
          null
        )}
      </div>
    )
  }
}

export default withRouter(Sidebar);
