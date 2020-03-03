import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import "../assets/stylesheets/Nav.css";
import Sidebar from "./Sidebar";
import Queries from "../graphql/queries";
const { GET_CURRENT_USER } = Queries;


class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDropdown: false
    }
    this.showDropDown = this.showDropDown.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);
  }

  showDropDown = () => {
    this.setState({ showDropdown: true })
  }

  closeDropDown = (e) => {
    if (this.state.showDropdown && e.target.className !== "dropdown") {
      this.setState({ showDropDown: false })
    }
  }
  
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={GET_CURRENT_USER}>
            {({ data }) => {
              return (
                <div onClick={this.closeDropDown}>
                  <div className="static">
                    <Sidebar />
                    <div className="header-wrapper">
                      <div className="header">
                        <div className="header-left">
                          <div className="undoredo">
                            <i className="fas fa-undo"></i>
                            <i className="fas fa-redo"></i>
                          </div>
                        </div>
                        <div className="header-right">
                          <button 
                            className="username-btn"
                            onClick={this.showDropDown}  
                          >
                            {data.username}
                          </button>
                          {this.state.showDropdown 
                            ? (
                            <ul className="dropdown">
                              <li>
                                <button>Account</button>
                              </li>
                              <li>
                                <button
                                  onClick={e => {
                                    e.preventDefault();
                                    localStorage.removeItem("auth-token");
                                    localStorage.removeItem("username");
                                    client.writeData({
                                      data: { isLoggedIn: false }
                                    });
                                    this.props.history.push("/login");
                                  }}
                                >
                                  Log out
                                </button>
                              </li>
                            </ul>
                            )
                            : (
                              null
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="player">PLAYER</div>
                </div>
              );
            }}
          </Query>
        )}
      </ApolloConsumer>
    )
  }
};

export default Nav;
