import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Mutations from "../graphql/mutations";
const { SIGNUP_USER } = Mutations;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      gender: "",
      dateOfBirth: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.signup.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={SIGNUP_USER}
        onCompleted={data => {
          const { token } = data.signup;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        onError={err => {
          console.log(err);
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {signupUser => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                signupUser({
                  variables: {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    gender: this.state.gender,
                    dateOfBirth: this.state.dateOfBirth
                  }
                });
              }}
            >
              <input
                value={this.state.username}
                onChange={this.update("username")}
                placeholder={"username"}
              />
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
                type="email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <input
                value="Male"
                onChange={this.update("gender")}
                name="radiobutton"
                type="radio"
              />
              <label htmlFor="gender">Male</label>
              <input
                value="Female"
                onChange={this.update("gender")}
                name="radiobutton"
                type="radio"
              />
              <label htmlFor="gender">Female</label>
              <input
                value="Non-binary"
                onChange={this.update("gender")}
                name="radiobutton"
                type="radio"
              />
              <label htmlFor="gender">Non-binary</label>
              <input
                value={this.state.dateOfBirth}
                placeholder="Date of Birth"
                onChange={this.update("dateOfBirth")}
                type="date"
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup;
