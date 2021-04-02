import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import socketIOClient from "socket.io-client";
import history from "./history";
import Accident from "./page/Accident";
import Home from "./redesign/Home";
import PageNotFound from "./page/PageNotFound";
import Login from "./redesign/Login";
import MapN from "./component/MapN";
import Playlist from "./page/Playlist";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loggedIn() {
    //return true;
    if (localStorage.getItem("islogin") === "true") {
      console.log("hh");
      return true;
    } else {
      console.log("gg");
      return false;
    }
  }

  alertDrowsy() {
    var d = new Date();
    var start = d.getTime();
    var end = d.getTime();
    var response = start - end;
    return response;
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
            {this.loggedIn() ? (
              <Route path="/playlist" component={Playlist} />
            ) : (
              <Route path="/playlist" component={PageNotFound} />
            )}
            <Route path="/test" component={Home} />
            <Route path="/" component={Login} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
  componentDidMount() {
    const socket = socketIOClient("http://localhost:4000");
    socket.on("alert_sound", (message) => {
      console.log("message", message);
      if (message == "request to alert") {
        console.log("pop up");
        var response = this.alertDrowsy;
        axios({
          method: "POST",
          url: "http://127.0.0.1:4000/newDrowsiness", // change
          headers: {},
          data: {
            username: "local username",
            response: response,
          },
        })
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            console.log("error in request", err);
          });
      }
    });
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
