import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import AuthRoute from '../util/route_util';
import Nav from "./Nav";
import Player from "./Player";
import Splash from "./Splash";


const App = () => {
  return (
    <div>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
        <Route path="/" component={Nav} />
        {/* <Route exact path="/" component={Nav} /> */}
        <Route exact path="/" component={Splash} />
        <Route exact path="/player" component={Player} />
      </Switch>
    </div>
  );
};

export default App;
