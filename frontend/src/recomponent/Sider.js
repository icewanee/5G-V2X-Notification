import React, { Component } from "react";
import { Layout } from "antd";
import { Menu, Modal } from "antd";
import { config } from "../config/config";
import axios from "axios";
import "../App.css";
import history from "../history";

export class Sider extends Component {
  constructor(props) {
    super(props);
    this.state = { setIsModalVisible: false };
  }

  render() {
    const { Footer, Sider, Content } = Layout;

    return (
      <Sider
        className="site-layout-background"
        width={200}
        style={{
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <Menu.Item key="6" onClick={() => this.onClick("/home")}>
            Home
          </Menu.Item>
          <Menu.Item
            style={{ background: "#e03d4d" }}
            key="2"
            onClick={() => this.showModal()}
          >
            SOS
          </Menu.Item>
          <Modal
            title={<h3>Emergency accident report</h3>}
            visible={this.state.setIsModalVisible}
            onOk={() => this.handleOk()}
            onCancel={() => this.handleCancel()}
          >
            <p>Police (General Emergency Call) 191</p>
            <p>Ambulance and Rescue 1554</p>
            <p>Medical Emergency Call 1669</p>
            <br />
            <h4 style={{ color: "red" }}>report accident now </h4>
            <p>
              location Latitude, Longitude : ( {this.props.currentLat},{" "}
              {this.props.currentLng} )
            </p>
          </Modal>
          <Menu.Item key="3" onClick={() => this.onClick("/accident")}>
            Map
          </Menu.Item>
          <Menu.Item key="4" onClick={() => this.onClick("/playlist")}>
            Playlist
          </Menu.Item>
          <Footer></Footer>
          <Footer></Footer>
          <Footer></Footer>
          <Footer></Footer>
          <Footer></Footer>
          <Footer></Footer>
          {/* <Footer></Footer> */}
          <Menu.Item
            key="5"
            // style={{ background: "#609cbf" }}
            onClick={() => this.onClick("/")}
          >
            Logout
          </Menu.Item>
          {/* <Footer>Footer</Footer> */}
        </Menu>
      </Sider>
    );
  }

  onClick = async (page) => {
    //page.preventDefault();
    if (page == "/") {
      console.log(localStorage);
      localStorage.setItem("islogin", false);
      console.log(localStorage);
      // delete all data
      axios({
        method: "POST",
        url: "http://" + config.baseURL + ":4000/logout", // change
        headers: {},
        data: {
          username: "ee",
        },
      })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log("error in request", err);
        });
      history.push(page);
    } else {
      history.push(page);
    }
  };

  showModal = () => {
    this.setState({ setIsModalVisible: true });
    console.log("showmo");
    console.log(this.state.setIsModalVisible);
  };
  handleOk = () => {
    this.setState({ setIsModalVisible: false });
    //  (page == "accidentAlert") {
    axios({
      method: "POST",
      url: "http://127.0.0.1:4000/newAccident", // change
      headers: {},
      data: {
        username: "mock test" /*localStorage.getItem("username")*/,
        lat: this.props.currentLat,
        lng: this.props.currentLng,
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  handleCancel = () => {
    this.setState({ setIsModalVisible: false });
  };
}
export default Sider;
