import React, { Component } from "react";
// import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Layout, Menu, Modal } from "antd";
import { Row, Col } from "antd";
import red from "../pictureNvideo/redd.png";
import map from "../pictureNvideo/map.jpg";
import playlist from "../pictureNvideo/playlist.jpg";

import "../App.css";
import history from "../history";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.username,
      setIsModalVisible: false,
    };
  }

  render() {
    const { Header, Footer, Sider, Content } = Layout;
    const { SubMenu } = Menu;

    return (
      <div
        style={{
          height: "100vh",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          backgroundColor: "#c6d5ad",
        }}
      >
        <Layout>
          <Header
            style={{
              // height: "100vh",
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#c6d5ad",
            }}
          >
            <h3
              style={{ color: "white" }}
              onClick={() => this.onClick("/home")}
            >
              Welcome to 5G-V2X {this.state.username}
            </h3>
          </Header>
          <Layout
            className="site-layout-background"
            // style={{ padding: "24px 0" }}
          >
            <Content
              style={{
                height: "100%",
                backgroundColor: "#c6d5ad",
              }}
            >
              <Row>
                <Col
                  span={12}
                  style={{
                    height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => this.onClick("/accident")}
                    style={{
                      height: "60vh",
                      width: "35vw",
                      fontSize: "30px",
                      fontWeight: "bold",
                      // backgroundImage: "url(../pictureNvideo/map.jpg)",
                      backgroundImage: `url(${map})`,
                      backgroundSize: "cover",
                    }}
                  >
                    {/* <img src={map} style={{ width: "100%", height: "100%" }} /> */}
                    Map
                  </Button>
                </Col>
                <Col
                  span={12}
                  style={{
                    height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      height: "60vh",
                      width: "35vw",
                      fontSize: "30px",
                      fontWeight: "bold",
                      backgroundImage: `url(${playlist})`,

                      backgroundSize: "cover",
                      color: "white",
                    }}
                    onClick={() => this.onClick("/playlist")}
                  >
                    Playlist
                  </Button>
                </Col>
              </Row>
            </Content>
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
                <Menu.Item key="1" onClick={() => this.onClick("/home")}>
                  Home
                </Menu.Item>
                <Menu.Item key="2" onClick={() => this.showModal()}>
                  SOS
                </Menu.Item>
                <Modal
                  title="Emergency accident report"
                  visible={this.state.setIsModalVisible}
                  onOk={() => this.handleOk()}
                  onCancel={() => this.handleCancel()}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
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
                <Menu.Item key="5" onClick={() => this.onClick("/")}>
                  Logout
                </Menu.Item>
                {/* <Footer>Footer</Footer> */}
              </Menu>
            </Sider>
          </Layout>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </div>
    );
  }

  showModal = () => {
    this.setState({ setIsModalVisible: true });
    console.log("showmo");
    console.log(this.state.setIsModalVisible);
  };
  handleOk = () => {
    this.setState({ setIsModalVisible: false });
    //  (page == "accidentAlert") {
    //   axios({
    //     method: "POST",
    //     url: "http://127.0.0.1:4000/newAccident", // change
    //     headers: {},
    //     data: {
    //       username: "local username",
    //       location: "retrieve but do on app.js",
    //     },
    //   })
    //     .then((res) => {
    //       window.location.reload();
    //     })
    //     .catch((err) => {
    //       console.log("error in request", err);
    //     });
  };

  handleCancel = () => {
    this.setState({ setIsModalVisible: false });
  };

  onClick = async (page) => {
    //page.preventDefault();
    if (page == "/") {
      console.log(localStorage);
      localStorage.setItem("islogin", false);
      console.log(localStorage);
      history.push(page);
    } else {
      history.push(page);
    }
  };
}
export default Home;
