import React from "react";
import Nav from "./Nav";
import AlbumShow from "./AlbumShow";
import Player from "./Player";
import Feed from "./Feed";
import { Switch, Route } from "react-router-dom";


class Main extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="player"><Player /></div>
        <Switch>
          <Route path="/album/:id" component={AlbumShow} />
          <Feed />
          {/* <Route path="/search" component={}/> */}
        </Switch>
      </div>
    )
  }
}

export default Main;