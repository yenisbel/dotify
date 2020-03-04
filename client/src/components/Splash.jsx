import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../assets/stylesheets/splash.css";
import "../assets/stylesheets/header.css";

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <> 
      <div className="home-div">
        <header className='main-header'>
          <div className='header-logo'>
            <a href="/">
              <i id="logo" className="fab fa-spotify"> Dotify</i>
            </a>
          </div>
          <div className='header-no-session'>
            <div className='link-container'>
              <a href='#' target="_blank">Premium</a>
              <a href='#' target="_blank">Help</a>
              <a href='#' target="_blank">Download</a>
              <p className='link-divider'>｜</p>
              <Link to='/signup' className='session-links'>Sign Up</Link>
              <Link to='/login' className='session-links'>Log In</Link>
            </div>
          </div>
        </header> 
        <br/> 
        <div className="greeting-div">
          <h1 className="greeting">Music for everyone.</h1>
          <h4 className="greeting-msg">Millions of songs. No credit card needed.</h4>
          <div className="demo-button-div">
            <button
              className="demo-button">GET DOTIFY FREE
            </button>
          </div>
        </div>
      </div>
      </>
    )
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