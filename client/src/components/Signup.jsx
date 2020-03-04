import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import Mutations from "../graphql/mutations";
const { SIGNUP_USER } = Mutations;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      confirmEmail: "",
      username: "",
      password: "",
      birthMonth: "Month",
      birthYear: "",
      birthDay: "",
      gender: "",
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
        isLoggedIn: data.signup.loggedIn,
        username: data.signup.username
      }
    });
  }

  handleError(errorsArray) {
    // const errorsString = "";
    // errorsArray.forEach(error => {
    //   errorsString = errorsString.concat()
    // })
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
        onError={errorsArray => {
          console.log(errorsArray);
          this.setState({ errors: errorsArray.message.slice(15) });
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
                    email: this.state.email,
                    confirmEmail: this.state.confirmEmail,
                    username: this.state.username,
                    password: this.state.password,
                    gender: this.state.gender,
                    birthMonth: this.state.birthMonth,
                    birthYear: parseInt(this.state.birthYear) || 0,
                    birthDay: parseInt(this.state.birthDay) || 0
                  }
                });
              }}
            >
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
                type="email"
              />
              <input
                value={this.state.confirmEmail}
                onChange={this.update("confirmEmail")}
                placeholder="Confirm Email"
                type="email"
              />
              <input
                value={this.state.username}
                onChange={this.update("username")}
                placeholder={"What should we call you?"}
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <label>
                Date Of Birth
                <div className="date-container">
                  <select 
                    value={this.state.birthMonth}
                    onChange={this.update("birthMonth")}
                  >
                    <option value="Month">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  <input 
                    type="number"
                    value={this.state.birthDay}
                    placeholder="Day"
                    onChange={this.update("birthDay")}
                  />
                  <input
                    value={this.state.birthYear}
                    placeholder="Year"
                    onChange={this.update("birthYear")}
                    type="number"
                  />
                </div>
              </label>
              <input
                name="gender"
                value="Male"
                onChange={this.update("gender")}
                type="radio"
                id="male"
              />
              <label htmlFor="male">Male</label>
              <input
                name="gender"
                value="Female"
                onChange={this.update("gender")}
                type="radio"
                id="female"
              />
              <label htmlFor="female">Female</label>
              <input
                name="gender"
                value="Non-binary"
                onChange={this.update("gender")}
                type="radio"
                id="non-binary"
              />
              <label htmlFor="non-binary">Non-binary</label>
              <button type="submit">Sign Up</button>
              <span>Already have an account?</span>
              <Link to="/login">Login</Link>
            </form>
            <span>{this.state.errors}</span>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup;
