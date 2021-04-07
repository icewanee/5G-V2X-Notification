import React, { Component } from "react";
import red from "../pictureNvideo/redd.png";
import history from "../history";
import alertPic from "../pictureNvideo/alert.png";
import alertBPic from "../pictureNvideo/alertB.png";
import sos from "../pictureNvideo/sos.png";
import axios from "axios";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  accidentAlert() {}

  render() {
    return (
      <div
        className="Card "
        style={{
          paddingTop: 65,
          paddingBottom: 65,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0da8db",
        }}
      >
        <div
          className="Card "
          style={{
            paddingTop: 20,
            backgroundColor: "#55cbf2",
            borderRadius: 30,
            paddingBottom: 20,
          }}
        >
          <div className="row">
            <div className="col-md-9 ">
              <h1
                className="card-title"
                style={{
                  fontFamily: "Courier New",
                  fontSize: 45,
                  fontWeight: "bold",
                  paddingLeft: 30,
                }}
              >
                Welcome to 5G-V2X
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9 ">
              <button
                type="button"
                class="btn "
                onClick={() => this.onClick("/accident")}
                style={{
                  paddingLeft: 85,
                  paddingRight: 85,
                  paddingTop: 15,
                  paddingBottom: 15,
                  borderRadius: 50,
                  marginLeft: 30,
                  marginRight: 25,
                  fontSize: 20,
                  backgroundColor: "#078ab5",
                  border: " solid white",
                  color: "white",
                }}
              >
                Map
              </button>
              <button
                /*type="button"*/
                /*class="btn"*/
                onClick={() => this.onClick("/")}
                style={{
                  paddingLeft: 75,
                  paddingRight: 75,
                  paddingTop: 15,
                  paddingBottom: 15,
                  borderRadius: 50,
                  fontSize: 20,
                  backgroundColor: "#078ab5",
                  border: " solid white",
                  color: "white",
                  marginRight: "auto",
                }}
              >
                Playlist
              </button>
              <button
                type="button"
                class="btn btn-danger"
                style={{
                  // paddingLeft: 75,
                  // paddingRight: 75,
                  // paddingTop: 15,
                  // paddingBottom: 15,
                  border: " solid black",
                  marginRight: "auto",
                  marginLeft: 30,
                }}
                onClick={() => this.onClick("accidentAlert")}
                //class="btn btn-danger dim btn-large-dim" //"btn btn-warning dimbtn-large-dim"
              >
                <img src={sos} style={{ width: "5vw", height: "7vh" }} />
              </button>
            </div>
            <div className="col-md-3" style={{ paddingLeft: 50 }}>
              <button
                /*type="button"*/
                /*class="btn"*/
                onClick={() => this.onClick("/")}
                style={{
                  paddingLeft: 30,
                  paddingRight: 30,
                  paddingTop: 15,
                  paddingBottom: 15,
                  borderRadius: 50,
                  fontSize: 20,
                  backgroundColor: "#078ab5",
                  border: " solid white",
                  color: "white",
                  marginRight: "auto",
                }}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-10"
              style={{ width: "90vw", height: "60vh", paddingTop: 0 }}
            >
              <img src={red} style={{ width: "87vw", height: "59vh" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  onClick = async (page) => {
    //page.preventDefault();
    if (page == "/") {
      console.log(localStorage);
      localStorage.setItem("islogin", false);
      console.log(localStorage);
      history.push(page);
    }
    if (page == "accidentAlert") {
      axios({
        method: "POST",
        url: "http://127.0.0.1:4000/newAccident", // change
        headers: {},
        data: {
          username: "local username",
          location: "retrieve but do on app.js",
        },
      })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log("error in request", err);
        });
    }
  };
}
export default Home;
