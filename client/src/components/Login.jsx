import React, { Component } from "react";
import { Mutation } from "react-apollo";
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
    console.log(data);
    client.writeData({
      data: { 
        isLoggedIn: data.login.loggedIn,
        username: data.login.username
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token, username } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("username", username);
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
              <button type="submit">Log In</button>
            </form>
            <span>{this.state.errors}</span>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
