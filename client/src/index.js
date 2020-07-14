import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/reset.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo"; // connect apollo to react, gives all components access to ApolloProvider
import Mutations from "./graphql/mutations";
import { HashRouter } from "react-router-dom";
const { VERIFY_USER } = Mutations;

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

let uri;

if (process.env.NODE_ENV === "production") {
  uri = `/graphql`;
} else {
  uri = "http://localhost:5000/graphql";
}

const token = localStorage.getItem("auth-token");
const username = localStorage.getItem("username");
const userId = localStorage.getItem("userId");
cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    username,
    userId,
    currentSong: {
      _id: "5e61356b92f664f411114216",
      title: "Oh My God",
      url: "https://dotify-aa-dev.s3.us-east-2.amazonaws.com/Oh+My+God.mp3",
      album: {
        url: "https://dotify-aa-dev.s3.us-east-2.amazonaws.com/ohMyGod_album.png",
        __typename: "album"
      },
      artist: {
        name: "Alec Benjamin",
        __typename: "artist"
      },
      __typename: "song"
    },
    currentAlbum: {
      _id: "5e61353192f664f411114215",
      songs: {_id: "", url:"", title:"", __typename: "songs"},
      artist: {
        _id: "5e6134b292f664f411114214", 
        name: "Alec Benjamin",
        __typename: "artist"
      },
      url: "hello",
      __typename: "album"
    }
  }
});

const client = new ApolloClient({
  cache,
  uri: uri,
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

//preload song 

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

// const httpLink = createHttpLink({
  //   uri,
  //   headers: {
    //     authorization: localStorage.getItem("auth-token")
    //   }
    // });