import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import "../stylesheets/Nav.css";
import Sidebar from "./Sidebar";
import Queries from "../graphql/queries";
const { GET_CURRENT_USER } = Queries;


class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false
    }
  }
  
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={GET_CURRENT_USER}>
            {({ data }) => {
              return (
                <div>
                  <div className="static">
                    <Sidebar />
                    <div className="header-wrapper">
                      <div className="header">
                        <div className="header-left">
                          <div className="undoredo">
                            <i class="fas fa-undo"></i>
                            <i class="fas fa-redo"></i>
                          </div>
                        </div>
                        <div className="header-right">
                          <h1>{data.username}</h1>
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
                            Logout
                          </button>
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
