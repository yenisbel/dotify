import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../assets/stylesheets/splash.css";
import "../assets/stylesheets/header.css";
import "../assets/stylesheets/footer.css";

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="home-div">
          <header className="main-header">
            <div className="header-logo">
              <div className="sidebar-title">
                <Link to="/" className="sidebar-title-link">
                  <i className="fab fa-spotify"></i>
                  <div id="splash-logo" className="sidebar-dotify">Dotify</div>
                </Link>
              </div>
            </div>
            <div className="header-no-session">
              <div className="link-container">
                <button>Premium</button>
                <button>Help</button>
                <button>Download</button>
                <p className="link-divider">｜</p>
                <Link to="/signup" className="session-links">
                  Sign Up
                </Link>
                <Link to="/login" className="session-links">
                  Log In
                </Link>
              </div>
            </div>
          </header>
          <br />
          <div className="greeting-div">
            <h1 className="greeting">Music for everyone.</h1>
            <h4 className="greeting-msg">
              Millions of songs. No credit card needed.
            </h4>
            <div className="demo-button-div">
              <button className="demo-button">GET DOTIFY FREE</button>
            </div>
          </div>
        </div>
        <footer className="container">
          <div className="inner-container">
            <div className="footer-links">
              <h3>Cindy Kuo</h3>
              <div className="github-img">
                <i className="fab fa-github"></i>
                <a href="https://github.com/ckuo15" target="_blank"> Github</a>
              </div>
              <div className="linkedin-img">
                <i className="fab fa-linkedin"></i>
                <a href="#"> LinkedIn</a>
              </div>
            </div>
            <div className="footer-links">
              <h3>Kieran Scannell</h3>
              <div className="github-img">
                <i className="fab fa-github"></i>
                <a href="https://github.com/ktscannell" target="_blank"> Github</a>
              </div>
              <div className="linkedin-img">
                <i className="fab fa-linkedin"></i>
                <a href="#"> LinkedIn</a>
              </div>
            </div>
            <div className="footer-links">
              <h3>Max Lin</h3>
              <div className="github-img">
                <i className="fab fa-github"></i>
                <a href="https://github.com/max821023" target="_blank"> Github</a>
              </div>
              <div className="linkedin-img">
                <i className="fab fa-linkedin"></i>
                <a href="#"> LinkedIn</a>
              </div>
            </div>
            <div className="footer-links">
              <h3>Yenisbel Valle</h3>
              <div className="github-img">
                <i className="fab fa-github"></i>
                <a href="https://github.com/yenisbel" target="_blank"> Github</a>
              </div>
              <div className="linkedin-img">
                <i className="fab fa-linkedin"></i>
                <a href="#"> LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     user: {username: "hunter", password: "hunter12"}
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     processForm: user => dispatch(login(user)),
//     closeModalForm: () => dispatch(closeModalForm()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Splash);
export default Splash;