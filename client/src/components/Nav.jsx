import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import "../assets/stylesheets/Nav.css";
import Sidebar from "./Sidebar";
import Queries from "../graphql/queries";
import { withRouter, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
const { GET_CURRENT_USER } = Queries;


class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDropdown: false
    }
    this.showDropdown = this.showDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  showDropdown = () => {
    this.setState({ showDropdown: true })
  }

  closeDropdown = (e) => {
    if (this.state.showDropdown && e.target.className !== "dropdown") {
      this.setState({ showDropdown: false })
    }
  }
  
  render() {
    return (
      <>
      <ApolloConsumer>
        {client => (
          <Query query={GET_CURRENT_USER}>
            {({ data }) => {
              return (
                <div onClick={this.closeDropdown} className="main">
                  <div className="static">
                    <Sidebar props={this.props}/>
                    <div className="header-wrapper">
                      <div className="header">
                        <div className="header-left">
                          <div className="undoredo">
                            <button className="undo" onClick={() => this.props.history.goBack()}>
                              <div>
                                <i className="fas fa-angle-left"></i>
                              </div>
                            </button>
                            <button className="redo" onClick={() => this.props.history.goForward()}>
                              <div>
                                <i className="fas fa-angle-right"></i>
                              </div>
                            </button>
                          </div>
                          <Route path="/search" component={SearchBar} />
                        </div>
                        {/* <div className="header-middle">
                        </div> */}
                        <div className="header-right">
                          <button
                            className="username-btn"
                            onClick={this.showDropdown}
                          >
                            <div className="header-button">
                              <div className="button-name">{data.username}</div>
                              <div className="dropdown-triangle">
                                {this.state.showDropdown ? (
                                  <i className="fas fa-caret-up"></i>
                                ) : (
                                  <i className="fas fa-caret-down"></i>
                                )}
                              </div>
                            </div>
                          </button>
                          {this.state.showDropdown ? (
                            <div className="dropdown list">
                              <button className="dropdown">Account</button>
                              <hr className="dropdown-hr"/>
                              <button
                                onClick={e => {
                                  e.preventDefault();
                                  localStorage.removeItem("auth-token");
                                  localStorage.removeItem("username");
                                  localStorage.removeItem("userId");
                                  client.writeData({
                                    data: { isLoggedIn: false }
                                  });
                                  this.props.history.push("/splash");
                                }}
                              >
                                Log out
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Query>
          
        )}
      </ApolloConsumer>
      </>
    )
  }
};

export default withRouter(Nav);
