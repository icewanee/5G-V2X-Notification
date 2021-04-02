import React, { Component } from "react";
import axios from "axios";
import { Button } from "antd";
import "../App.css";

export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="Card "
        style={{
          paddingTop: 85,
          paddingBottom: 85,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0da8db",
        }}
      >
        <div
          className="Card "
          style={{
            paddingTop: 0,
            backgroundColor: "#55cbf2",
            borderRadius: 30,
            width: 800,
            paddingBottom: 25,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="primary">Button</Button>
          <br />
          <table striped bordered hover>
            <thead
              style={{
                border: " solid black",
              }}
            >
              <tr>
                <th>#</th>
                <th>Playlist</th>
                <th>Artist</th>
              </tr>
            </thead>
            <tbody
              style={{
                border: " solid black",
              }}
            >
              <tr>
                <td>1</td>
                <td>
                  <a
                    // id="myLink"
                    // title="Click to do something"
                    href="#"
                    onClick={() => this.onClick("Confident")}
                  >
                    Confident
                  </a>
                </td>
                <td>Demi Lovato</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <a
                    // id="myLink"
                    // title="Click to do something"
                    href="#"
                    onClick={() => this.onClick("Warm Blood")}
                  >
                    Warm Blood
                  </a>
                </td>
                <td>Carly Rae Jepsen</td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <a
                    // id="myLink"
                    // title="Click to do something"
                    href="#"
                    onClick={() => this.onClick("Money On My Mind")}
                  >
                    Money On My Mind
                  </a>
                </td>
                <td>Sam Smith</td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  <a
                    // id="myLink"
                    // title="Click to do something"
                    href="#"
                    onClick={() => this.onClick("Love Myself")}
                  >
                    Love Myself
                  </a>
                </td>
                <td>Hailee Steinfeld</td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  <a
                    // id="myLink"
                    // title="Click to do something"
                    href="#"
                    onClick={() => this.onClick("Wake Me Up")}
                  >
                    Wake Me Up
                  </a>
                </td>
                <td>Avicii</td>
                {/* <td colSpan="2">Larry the Bird</td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  onClick = async (song) => {
    console.log("selected song");
    axios({
      method: "POST",
      url: "http://127.0.0.1:4000/selectedSong", // change
      headers: {},
      data: {
        musicName: song,
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };
}
export default Playlist;
