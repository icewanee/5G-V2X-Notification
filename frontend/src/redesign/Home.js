import React, { Component } from "react";
// import { useState } from "react";
import axios from "axios";
import { Button, Layout, Menu, Modal } from "antd";
import { Row, Col } from "antd";
import red from "../pictureNvideo/redd.png";
import map from "../pictureNvideo/map.jpg";
// import playlist from "../pictureNvideo/playlist.jpg";
import Header from "../recomponent/Header";
import Sider from "../recomponent/MySider";
// import playlisticon from "../pictureNvideo/playlistIcon.png";
import "../App.css";
import history from "../history";
import {
  AlertOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  BellOutlined,
  SoundOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Footer, Content } = Layout;
    const { SubMenu } = Menu;

    return (
      <div>
        <Layout>
          <Header />
          <Layout
            className="site-layout-background"
            // style={{ padding: "24px 0" }}
          >
            <Content
              style={{
                height: "90vh",
                // backgroundColor: "#c6d5ad",
              }}
            >
              <Row
                gutter={[48, 48]}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Col
                  span={8}
                  style={{
                    // height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() => this.onClick("/home")}
                    icon={<HomeOutlined style={{ fontSize: "100px" }} />}
                    style={{
                      height: "30vh",
                      width: "30vw",
                      fontSize: "30px",
                      boxShadow: "5px 8px 24px 5px rgba(50, 50, 93, 0.25)",
                      backgroundColor: "#3277a8",
                      border: "white",
                    }}
                  >
                    <div>Home</div>
                  </Button>{" "}
                </Col>
                <Col
                  span={8}
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
                        style={{ fontSize: "100px" }}
                        // color: "#08c"
                      />
                    }
                    shape="round"
                    style={{
                      height: "30vh",
                      width: "30vw",
                      fontSize: "30px",
                      boxShadow: "5px 8px 24px 5px rgba(50, 50, 93, 0.25)",
                    }}
                    onClick={() => this.showModal()}
                  >
                    <div>SOS</div>
                  </Button>{" "}
                </Col>
                <Col
                  span={8}
                  style={{
                    // height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    shape="round"
                    icon={<LogoutOutlined style={{ fontSize: "100px" }} />}
                    style={{
                      height: "30vh",
                      width: "30vw",
                      fontSize: "30px",
                      boxShadow: "5px 8px 24px 5px rgba(50, 50, 93, 0.25)",
                      backgroundColor: "#3277a8",
                      border: "white",
                    }}
                    onClick={() => this.onClick("/")}
                  >
                    <div>Logout</div>
                  </Button>
                </Col>

                <Col
                  span={12}
                  style={{
                    // height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    shape="round"
                    icon={<SoundOutlined style={{ fontSize: "100px" }} />}
                    style={{
                      height: "30vh",
                      width: "30vw",
                      fontSize: "30px",
                      boxShadow: "5px 8px 24px 5px rgba(50, 50, 93, 0.25)",
                      backgroundColor: "#3277a8",
                      border: "white",
                    }}
                    onClick={() => this.onClick("/playlist")}
                  >
                    <div>Playlist</div>
                  </Button>{" "}
                </Col>
                <Col
                  span={12}
                  style={{
                    // height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    shape="round"
                    icon={<EnvironmentOutlined style={{ fontSize: "100px" }} />}
                    style={{
                      height: "30vh",
                      width: "30vw",
                      fontSize: "30px",
                      boxShadow: "5px 8px 24px 5px rgba(50, 50, 93, 0.25)",
                      backgroundColor: "#3277a8",
                      border: "white",
                    }}
                    onClick={() => this.onClick("/accident")}
                  >
                    <div>Map</div>
                  </Button>
                </Col>
              </Row>
            </Content>
            <Modal
              title={<h3>Emergency accident report</h3>}
              visible={this.state.setIsModalVisible}
              onOk={() => this.handleOk()}
              onCancel={() => this.handleCancel()}
              footer={null}
            >
              {/* <p>Police (General Emergency Call) 191</p> */}
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
                      style={{ fontSize: "70px" }}
                      // color: "#08c"
                    />
                  }
                  shape="circle"
                  style={{
                    height: "100px",
                    width: "100px",
                    // fontSize: "30px",
                    // boxShadow: "5px 8px 24px 5px rgba(50, 50, 93, 0.25)",
                  }}
                  onClick={() => this.handleOk()}
                ></Button>
              </div>
            </Modal>
          </Layout>
          {/* <Footer>Footer</Footer> */}
        </Layout>
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
      localStorage.clear();
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
    console.log("handleok");
    this.setState({ setIsModalVisible: false });
    //  (page == "accidentAlert") {
    axios({
      method: "POST",
      url: "http://127.0.0.1:4000/newAccident", // change
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
export default Home;

// <Button
//                     shape="round"
//                     onClick={() => this.onClick("/accident")}
//                     style={{
//                       height: "60vh",
//                       width: "35vw",
//                       fontSize: "30px",

//                       // fontWeight: "bold",
//                       // backgroundImage: "url(../pictureNvideo/map.jpg)",
//                       // backgroundImage: `url(${map})`,
//                       // backgroundSize: "cover",
//                     }}
//                   >
//                     {/* <img src={map} style={{ width: "100%", height: "100%" }} /> */}
//                     {/* style={{ color: "white" }} */}
//                     <div>Map</div>
//                   </Button>
//                 </Col>
//                 <Col
//                   span={12}
//                   style={{
//                     height: "80vh",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Button
//                     // shape="circle"
//                     style={{
//                       height: "45vh",
//                       width: "35vw",
//                       // backgroundRepeat: "no-repeat",
//                       // fontSize: "30px",
//                       // fontWeight: "bold",
//                       // backgroundImage: `url(${playlisticon})`,
//                       backgroundSize: "60%",
//                     }}
//                     onClick={() => this.onClick("/playlist")}
//                   >
//                     {/* <divstyle={{ color: "white" }}> </div>*/}s
//                   </Button>
