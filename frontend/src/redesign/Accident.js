import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Layout, Menu, Modal } from "antd";
import MapN from "../component/MapN";
import { Row, Col } from "antd";

import "../App.css";
import history from "../history";

export class Accident extends Component {
  constructor(props) {
    super(props);
    this.state = { username: localStorage.username, setIsModalVisible: false };
  }

  setAlert = (infor) => {
    this.setState({ alert: infor });
    console.log(infor);
  };

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
                  span={24}
                  style={{
                    // height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MapN inforAlert={this.setAlert} />
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
                <Menu.Item key="1" onClick={() => this.onClick("/home")}>
                  Home
                </Menu.Item>
                <Menu.Item key="3" onClick={() => this.onClick("/playlist")}>
                  Playlist
                </Menu.Item>
                <Menu.Item key="4" onClick={() => this.onClick("/")}>
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
export default Accident;
