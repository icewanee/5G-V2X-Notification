import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
//uninstall yet
//import axios from "axios";
import history from "./history";
import Accident from "./page/Accident";
import Home from "./page/Home";
import PageNotFound from "./page/PageNotFound";
import Login from "./page/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loggedIn() {
    return localStorage.getItem("isLogin");
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            {this.loggedIn() ? (
              <Route exact path="/home" component={Login} />
            ) : (
              <Route exact path="/home" component={Home} />
            )}
            {this.loggedIn() ? (
              <Route exact path="/accident" component={PageNotFound} />
            ) : (
              <Route exact path="/accident" component={Accident} />
            )}
            <Route path="/" component={Login} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
