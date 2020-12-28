import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import history from "./history";
import Accident from "./page/Accident";
import Home from "./page/Home";
import video from "./component/video";
import PageNotFound from "./page/PageNotFound";

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/accident" component={Accident} />
          <Route path="/test" component={video} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
