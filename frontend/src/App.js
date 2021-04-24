import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import socketIOClient from "socket.io-client";
import history from "./history";
import Accident from "./redesign/Accident";
import Home from "./redesign/Home";
import Login from "./redesign/Login";
import Playlist from "./redesign/Playlist";
import axios from "axios";
import INeedYou from "../src/song/INeedYou_LiQWYD.mp3";
import confident from "../src/song/confident_demi.mp3";
import loveMyself from "../src/song/LoveMyself_Hailee.mp3";
import moneyOnMyMind from "../src/song/MoneyOnMyMind_Sam.mp3";
import wakeMeUp from "../src/song/WakeMeUp_Avicii.mp3";
import warmBlood from "../src/song/WarmBlood_Carly.mp3";
import Avalon from "../src/song/Avalon.mp3";
import "react-h5-audio-player/lib/styles.css";
import { PauseOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
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
      song: confident,
    };
    this.uploadcurrentlo = this.uploadcurrentlo.bind(this);
    this.socket = socketIOClient("http://" + config.baseURL + ":4000");
    this.audio = new Audio(this.state.song);
  }

  play = (songsrc) => {
    this.setState({ play: true, pause: false });

    this.audio.src = songsrc;
    this.audio.play();
  };

  pause = () => {
    this.setState({ play: false, pause: true });

    this.audio.pause();
    this.handleOk();
  };

  loggedIn() {
    if (localStorage.getItem("islogin") === "true") {
      return true;
    } else {
      return false;
    }
  }

  warning = (text) => {
    message.warning(text);
  };

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
                  height: "100px",
                  width: "100px",
                }}
                onClick={this.pause}
                icon={
                  <PauseOutlined
                    style={{
                      fontSize: "70px",
                    }}
                  />
                }
              ></Button>
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
              <Route path="/home" component={Login} />
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
              <Route path="/accident" component={Login} />
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
              <Route path="/playlist" component={Login} />
            )}

            <Route path="/" component={Login} />
            <Route component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }

  showModal = (text) => {
    const playlist = {
      Confident: {
        number: "1",
        src: confident,
      },
      "Warm Blood": {
        number: "2",
        src: warmBlood,
      },
      "Money On My Mind": {
        number: "3",
        src: moneyOnMyMind,
      },
      "Love Myself": {
        number: "4",
        src: loveMyself,
      },
      "Wake Me Up": {
        number: "5",
        src: wakeMeUp,
      },
      "I Need You": {
        number: "6",
        src: INeedYou,
      },
      Avalon: {
        number: "7",
        src: Avalon,
      },
    };
    this.setState({ setIsModalVisible: true });
    var d = new Date();
    var start = d.getTime();

    this.setState({ start: start });
    if (playlist[text] !== undefined) {
      this.setState({ song: playlist[text].src });
      localStorage.setItem("songnumber", playlist[text].number);
      this.play(playlist[text].src);
    } else {
      this.play(this.state.song);
    }
  };
  handleOk = () => {
    this.setState({ setIsModalVisible: false });
    var d = new Date();
    var end = d.getTime();

    let totaltime = end - this.state.start;

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
      this.showModal(message.data);
    });
    this.socket.on("eyeNotFound", (message) => {
      this.warning("This system can't detect eye");
    });
    this.socket.on("this_car_accident", (message) => {
      this.warning("This car has an accident");
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
        let response = {
          lat: Number(position.coords.latitude),
          lng: Number(position.coords.longitude),
        };

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
