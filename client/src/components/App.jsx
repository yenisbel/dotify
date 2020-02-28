import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import AuthRoute from '../util/route_util';
import Nav from "./Nav";

const App = () => {
  return (
    <div>
      <h1>Dotify</h1>
      
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
        <Route path="/" component={Nav} />
      </Switch>
    </div>
  );
};

export default App;
