import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import AuthRoute from '../util/route_util';
import Main from "./Main";
import Player from "./Player";
import Splash from "./Splash";
import AlbumShow from "./AlbumShow";

const App = () => {
  return (
    <div>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
        <AuthRoute exact path="/splash" component={Splash} routeType="auth" />
        <AuthRoute path="/" component={Main} />

      </Switch>
    </div>
  );
};

export default App;
