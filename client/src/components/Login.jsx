import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import "../assets/stylesheets/auth.css";
import Mutations from "../graphql/mutations";
const { LOGIN_USER } = Mutations;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    client.writeData({
      data: { 
        isLoggedIn: data.login.loggedIn,
        username: data.login.username,
        userId: data.login._id
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token, username, _id } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("userId", _id);
          this.props.history.push("/");
        }}
        onError={errorsArray => {
          console.log(errorsArray);
          this.setState({ errors: errorsArray.message.slice(15) });
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div>
            <header className="auth-header">
              <Link to="/splash">
                <div className="logo-container">
                  <i className="fab fa-spotify"></i>
                  <h1>Dotify</h1>
                </div>
              </Link>
            </header>
            <div className="auth-container">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  loginUser({
                    variables: {
                      username: this.state.username,
                      password: this.state.password
                    }
                  });
                }}
              >
                <div className="input-container">
                  <input
                    value={this.state.username}
                    onChange={this.update("username")}
                    placeholder="Username"
                  />
                  <input
                    value={this.state.password}
                    onChange={this.update("password")}
                    type="password"
                    placeholder="Password"
                  />
                  <p>{this.state.errors}</p>
                  <button type="submit">Log In</button>
                  <h3>Don't have an account ?</h3>
                  <button className="signup-redirect">
                  <Link to="signup"> 
                    Sign Up for Dotify
                  </Link>
                  </button>
                  <button className="demo-login" onClick={(e) => {
                    e.preventDefault();
                    loginUser({
                      variables: {
                        username: "Demon",
                        password: "password"
                      }
                    })
                  }}>
                    Try the demo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
