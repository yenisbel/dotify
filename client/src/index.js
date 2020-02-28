import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import Mutations from "./graphql/mutations";
import { HashRouter } from "react-router-dom";
const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const client = new ApolloClient({
  cache,
  uri: "http://localhost:5000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
  request: (operation) => {
    const token = localStorage.getItem('auth-token')
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  }
});

const token = localStorage.getItem("auth-token");
cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
  }
});

if (token) {
  client
  .mutate({mutation: VERIFY_USER, variables: {token}})
  .then(({data})=>{
    cache.writeData({
      data: {
        isLoggedIn: data.verifyUser.loggedIn
      }
    });
  })
} else {
  cache.writeData({
    data: {
      isLoggedIn: false
    }
  })
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
