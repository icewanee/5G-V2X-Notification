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
    return localStorage.getItem("islogin");
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            {this.loggedIn() ? (
              <Route path="/home" component={Home} />
            ) : (
              <Route path="/home" component={Login} />
            )}
            {this.loggedIn() ? (
              <Route path="/accident" component={Accident} />
            ) : (
              <Route path="/accident" component={PageNotFound} />
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
/*{localStorage.getItem("islogin") ? (
              <Route exact path="/home" component={Home} />
            ) : (
              <Route exact path="/home" component={Login} />
            )}
            {localStorage.getItem("islogin") ? (
              <Route exact path="/accident" component={Accident} />
            ) : (
              <Route exact path="/accident" component={PageNotFound} />
            )}*/
