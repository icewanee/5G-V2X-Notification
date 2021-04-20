import React, { Component } from "react";
// import { Layout } from "antd";
import { Modal } from "antd";
// Menu,
import { config } from "../config/config";
import axios from "axios";
import "../App.css";
import history from "../history";

import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  AlertOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  BellOutlined,
  LogoutOutlined,
  SoundOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
    const { Footer, Sider, Content } = Layout;
    const { collapsed } = this.state;
    return (
      // <Sider
      //   className="site-layout-background"
      //   width={200}
      //   style={{
      //     //   display: "flex",
      //     //   justifyContent: "center",
      //     //   alignItems: "center",
      //     backgroundColor: "white",
      //     height: "100%",
      //   }}
      // >
      //   <Menu
      //     mode="inline"
      //     defaultSelectedKeys={["1"]}
      //     defaultOpenKeys={["sub1"]}
      //     style={{ height: "100%" }}
      //   >
      //     <Menu.Item key="6" onClick={() => this.onClick("/home")}>
      //       Home
      //     </Menu.Item>
      //     <Menu.Item
      //       style={{ background: "#e03d4d" }}
      //       key="2"
      //       onClick={() => this.showModal()}
      //     >
      //       SOS
      //     </Menu.Item>
      //     <Modal
      //       title={<h3>Emergency accident report</h3>}
      //       visible={this.state.setIsModalVisible}
      //       onOk={() => this.handleOk()}
      //       onCancel={() => this.handleCancel()}
      //     >
      //       <p>Police (General Emergency Call) 191</p>
      //       <p>Ambulance and Rescue 1554</p>
      //       <p>Medical Emergency Call 1669</p>
      //       <br />
      //       <h4 style={{ color: "red" }}>report accident now </h4>
      //       <p>
      //         location Latitude, Longitude : ( {this.props.currentLat},{" "}
      //         {this.props.currentLng} )
      //       </p>
      //     </Modal>
      //     <Menu.Item key="3" onClick={() => this.onClick("/accident")}>
      //       Map
      //     </Menu.Item>
      //     <Menu.Item key="4" onClick={() => this.onClick("/playlist")}>
      //       Playlist
      //     </Menu.Item>
      //     <Footer></Footer>
      //     <Footer></Footer>
      //     <Footer></Footer>
      //     <Footer></Footer>
      //     <Footer></Footer>
      //     <Footer></Footer>
      //     {/* <Footer></Footer> */}
      //     <Menu.Item
      //       key="5"
      //       // style={{ background: "#609cbf" }}
      //       onClick={() => this.onClick("/")}
      //     >
      //       Logout
      //     </Menu.Item>
      //     {/* <Footer>Footer</Footer> */}
      //   </Menu>
      // </Sider>

      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        {/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>

          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
          
        </Menu> */}
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
            {/* <p>
                location Latitude, Longitude : ( {this.props.currentLat},{" "}
                {this.props.currentLng} )
              </p> */}
            <div
              style={{
                // height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                danger
                icon={
                  <AlertOutlined
                    style={{ fontSize: "90px" }}
                    // color: "#08c"
                  />
                }
                shape="circle"
                style={{
                  height: "20vh",
                  width: "10vw",
                  // fontSize: "30px",
                  // boxShadow: "5px 8px 24px 5px rgba(50, 50, 93, 0.25)",
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
            // style={{ background: "#609cbf" }}
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
    if (page == "/") {
      console.log(localStorage);
      localStorage.setItem("islogin", false);
      console.log(localStorage);
      localStorage.clear();
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
export default MySider;
