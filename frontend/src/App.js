import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import history from "./history";
import Accident from "./page/Accident";
import Home from "./page/Home";
import PageNotFound from "./page/PageNotFound";
import Login from "./page/Login";

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/accident" component={Accident} />
          <Route path="/" component={Login} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
