import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import Register from "./Register";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
