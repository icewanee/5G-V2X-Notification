import React, { Component } from "react";
import { Modal } from "antd";
import { config } from "../config/config";
import axios from "axios";
import "../App.css";
import history from "../history";

import { Layout, Menu, Button } from "antd";
import {
  AlertOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  SoundOutlined,
} from "@ant-design/icons";

export class MySider extends Component {
  constructor(props) {
    super(props);
    this.state = { setIsModalVisible: false, collapsed: false };
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { Sider } = Layout;
    const { collapsed } = this.state;
    return (
      <Sider
        reverseArrow={true}
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />

        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          // style={{ height: "90vh" }}
        >
          <Menu.Item
            icon={<HomeOutlined style={{ fontSize: "25px" }} />}
            key="6"
            onClick={() => this.onClick("/home")}
          >
            Home
          </Menu.Item>
          <Menu.Item
            icon={<AlertOutlined style={{ fontSize: "25px" }} />}
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
            footer={null}
          >
            <p>Police (General Emergency Call) 191</p>
            <p>Ambulance and Rescue 1554</p>
            <p>Medical Emergency Call 1669</p>
            <br />
            <h3
              style={{
                color: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              report accident now{" "}
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                danger
                icon={<AlertOutlined style={{ fontSize: "70px" }} />}
                shape="circle"
                style={{
                  height: "100px",
                  width: "100px",
                }}
                onClick={() => this.handleOk()}
              ></Button>
            </div>
          </Modal>
          <Menu.Item
            icon={<EnvironmentOutlined style={{ fontSize: "25px" }} />}
            key="3"
            onClick={() => this.onClick("/accident")}
          >
            Map
          </Menu.Item>
          <Menu.Item
            icon={<SoundOutlined style={{ fontSize: "25px" }} />}
            key="4"
            onClick={() => this.onClick("/playlist")}
          >
            Playlist
          </Menu.Item>

          <Menu.Item
            icon={<LogoutOutlined style={{ fontSize: "25px" }} />}
            key="5"
            onClick={() => this.onClick("/")}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

  onClick = async (page) => {
    //page.preventDefault();
    if (page === "/") {
      console.log(localStorage);
      localStorage.setItem("islogin", false);
      console.log(localStorage);
      localStorage.clear();

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

    axios({
      method: "POST",
      url: "http://127.0.0.1:4000/newAccident",
      headers: {},
      data: {
        username: localStorage.getItem("username"),
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
export default MySider;
