import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import socketIOClient from "socket.io-client";
import history from "./history";
import Accident from "./redesign/Accident";
import Home from "./redesign/Home";
import PageNotFound from "./page/PageNotFound";
import Login from "./redesign/Login";
import MapN from "./component/MapN";
import Playlist from "./redesign/Playlist";
import axios from "axios";
import confident from "../src/song/confident_demi.mp3";
import { Form, Input, Button, Layout, Menu, Modal } from "antd";
import { config } from "./config/config";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { setIsModalVisible: false, audioPlay: false };
  }

  audio = new Audio(confident);
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
    // let audio = new Audio(confident);
    this.setState({ audioPlay: true });
    this.showModal();
    var end = d.getTime();
    var response = start - end;
    return response;
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Modal
            title="Drowsiness alert"
            visible={this.state.setIsModalVisible}
            onOk={() => this.handleOk()}
            onCancel={() => this.handleCancel()}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
          {/* <audio
            ref="audio_tag"
            autoPlay={this.state.audioPlay}
            controls={true}
          >
            <source type="audio/mp3" src={confident} />
          </audio> */}
          <Switch>
            {this.loggedIn() ? (
              <Route path="/home" component={Home} />
            ) : (
              <Route path="/home" component={Home} />
              // <Route path="/home" component={Login} />
            )}
            {this.loggedIn() ? (
              <Route path="/accident" component={Accident} />
            ) : (
              // <Route path="/accident" component={PageNotFound} />
              <Route path="/accident" component={Accident} />
            )}
            {this.loggedIn() ? (
              <Route path="/playlist" component={Playlist} />
            ) : (
              // <Route path="/playlist" component={PageNotFound} />
              <Route path="/playlist" component={Playlist} />
            )}
            <Route path="/test" component={Home} />
            <Route path="/" component={Login} />
            <Route component={PageNotFound} />
          </Switch>
          {/* <button onClick={() => this.showModal()}>sound test</button> */}
        </div>
      </Router>
    );
  }
  showModal = () => {
    this.setState({ setIsModalVisible: true });
    console.log("showmo");
    console.log(this.state.setIsModalVisible);
  };
  handleOk = () => {
    // this.audio.pause();
    this.setState({ audioPlay: false });
    this.setState({ setIsModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ audioPlay: false });
    this.setState({ setIsModalVisible: false });
  };

  componentDidMount() {
    const socket = socketIOClient("http://"+config.baseURL+":4000");
    socket.on("alert_sound", (message) => {
      console.log("message", message);
      if (message == "request to alert") {
        console.log("pop up");
        var response = this.alertDrowsy();
        axios({
          method: "POST",
          url: "http://"+config.baseURL+":4000/newDrowsiness", // change
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
      socket.on("eyeNotFound",(message) =>{
        
      })
    });
    // const socket2 = socketIOClient("http://"+config.ddsURL+":4000");
    // socket2.on("eyes_not_found", (message) => {
    //   console.log("message", message);
    //   if (message == "request to alert") {
    //     console.log("pop up");
      
    //   }
    // });
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
