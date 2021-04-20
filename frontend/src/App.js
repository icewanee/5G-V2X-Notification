import React, { Component, useRef } from "react";
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
import INeedYou from "../src/song/INeedYou_LiQWYD.mp3";
import confident from "../src/song/confident_demi.mp3";
import loveMyself from "../src/song/LoveMyself_Hailee.mp3";
import moneyOnMyMind from "../src/song/MoneyOnMyMind_Sam.mp3";
import wakeMeUp from "../src/song/WakeMeUp_Avicii.mp3";
import warmBlood from "../src/song/WarmBlood_Carly.mp3";
// import AudioPlayer from "react-audio-element";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { PauseOutlined } from "@ant-design/icons";
import { Form, Input, Button, Layout, Menu, Modal, message } from "antd";
import { config } from "./config/config";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setIsModalVisible: false,
      currentLat: 0,
      currentLng: 0,
      play: false,
      pause: true,
      auto: true,
      start: 0,
      // selectedsong: confident,
    };
    this.uploadcurrentlo = this.uploadcurrentlo.bind(this);
    this.socket = socketIOClient("http://" + config.baseURL + ":4000");
    this.audio = new Audio(localStorage.getItem("song"));
  }
  play = () => {
    this.setState({ play: true, pause: false });
    this.audio.play();
  };

  pause = () => {
    this.setState({ play: false, pause: true });
    this.audio.pause();
    this.handleOk();
  };

  // audio = new Audio(confident);
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

  // alertDrowsy() {
  //   var d = new Date();
  //   var start = d.getTime();
  //   this.showModal();

  //   var end = d.getTime();
  //   var response = start - end;
  //   return response;
  // }
  warning = (text) => {
    message.warning(text);
  };
  resetsong() {
    {
      // document.getElementById("player").load();
      console.log(document.getElementById("player"));
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Modal
            title={<h3>Drowsiness alert</h3>}
            visible={this.state.setIsModalVisible}
            onOk={() => this.pause}
            onCancel={() => this.pause}
            closable={false}
            // cancelButtonProps={{ style: { display: "none" } }}
            footer={null}
          >
            <br />
            <h4
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Click the button to stop the sound
            </h4>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                shape="circle"
                danger
                style={{
                  height: "20vh",
                  width: "10vw",
                  // boxShadow: "5px 8px 24px 5px rgba(50, 50, 93, 0.25)",
                  // borderColor: "gray",
                  // borderRadius: "20",
                  // backgroundColor: "#3277a8",
                }}
                onClick={this.pause}
                icon={
                  <PauseOutlined
                    style={{
                      fontSize: "70px",
                    }}
                    // color: "#08c"
                  />
                }
              >
                <h4 style={{ color: "white" }}>Pause</h4>
              </Button>
            </div>
          </Modal>

          <Switch>
            {this.loggedIn() ? (
              <Route
                path="/home"
                render={() => (
                  <Home
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
            ) : (
              <Route
                path="/home"
                render={() => (
                  <Home
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
              // <Route path="/home" component={Login} />
            )}
            {this.loggedIn() ? (
              <Route
                path="/accident"
                render={() => (
                  <Accident
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
            ) : (
              // <Route path="/accident" component={PageNotFound} />
              <Route
                path="/accident"
                render={() => (
                  <Accident
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
            )}
            {this.loggedIn() ? (
              <Route
                path="/playlist"
                render={() => (
                  <Playlist
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                  />
                )}
              />
            ) : (
              // <Route path="/playlist" component={PageNotFound} />
              <Route
                path="/playlist"
                render={() => (
                  <Playlist
                    currentLat={this.state.currentLat}
                    currentLng={this.state.currentLng}
                    // selectedsong={this.state.selectedsong}
                  />
                )}
              />
            )}
            <Route path="/test" component={Accident} />
            <Route path="/" component={Login} />
            <Route component={PageNotFound} />
          </Switch>
          <button onClick={() => this.showModal()}>sound test</button>
        </div>
      </Router>
    );
  }

  showModal = () => {
    this.setState({ setIsModalVisible: true });
    var d = new Date();
    var start = d.getTime();
    console.log(start);
    this.setState({ start: start });
    this.play();
  };
  handleOk = () => {
    this.setState({ setIsModalVisible: false });
    var d = new Date();
    var end = d.getTime();
    console.log(end);
    let totaltime = end - this.state.start;
    console.log("total", totaltime / 1000);

    axios({
      method: "POST",
      url: "http://" + config.baseURL + ":4000/newDrowsiness", // change
      headers: {},
      data: {
        username: "local username mock",
        response: totaltime / 1000,
      },
    })
      .then((res) => {
        // window.location.reload();
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  handleCancel() {
    this.setState({ setIsModalVisible: false });
  }

  response() {
    // const socket = socketIOClient("http://" + config.baseURL + ":4000");
    this.socket.on("alert_sound", (message) => {
      console.log("message", message);
      // if (message == "request to alert") {
      console.log("pop up");
      this.showModal();
    });
    this.socket.on("eyeNotFound", (message) => {
      console.log(message);
      this.warning("This system can't detect eye");
    });
    // const socket2 = socketIOClient("http://"+config.ddsURL+":4000");
    // socket2.on("eyes_not_found", (message) => {
    //    console.log(message);
    //    this.warning("This system can't detect eye");
    // });
  }

  componentDidMount() {
    this.uploadcurrentlo();
    this.response();
  }

  uploadcurrentlo() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        //   localStorage.setItem("currentLat", Number(position.coords.latitude));
        //   localStorage.setItem("currentLng", Number(position.coords.longitude));
        console.log(Number(position.coords.latitude));

        let response = {
          lat: Number(position.coords.latitude),
          lng: Number(position.coords.longitude),
        };
        console.log(this.state.currentLat);

        this.socket.emit("position", response);

        this.setState({
          currentLat: Number(position.coords.latitude),
          currentLng: Number(position.coords.longitude),
        });
      }.bind(this)
    );
    // const Socket = socketIOClient("http://" + config.baseURL + ":4000");
  }

  // componentDidUpdate() {
  //   setInterval(() => {
  //     console.log("didup");
  //     this.uploadcurrentlo();
  //   }, 30000);
  // }
}

export default App;
