import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const FETCH_USERS = gql`
  {
    users {
      _id
      username
      email
    }
  }
`;

const App = () => {
  return (
    <Query query={FETCH_USERS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.users.map(user => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default App;
