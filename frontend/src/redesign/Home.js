import React, { Component } from "react";
// import { useState } from "react";
import axios from "axios";
import { Button, Layout, Menu, Modal } from "antd";
import { Row, Col } from "antd";
import red from "../pictureNvideo/redd.png";
import map from "../pictureNvideo/map.jpg";
import playlist from "../pictureNvideo/playlist.jpg";
import Header from "../recomponent/Header";
import Sider from "../recomponent/Sider";

import "../App.css";
import history from "../history";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Footer, Content } = Layout;
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
          <Header />
          <Layout
            className="site-layout-background"
            // style={{ padding: "24px 0" }}
          >
            <Content
              style={{
                height: "100vh",
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
                    <div style={{ color: "white" }}>Map</div>
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
                    }}
                    onClick={() => this.onClick("/playlist")}
                  >
                    <div style={{ color: "white" }}>Playlist</div>
                  </Button>
                </Col>
              </Row>
            </Content>
            <Sider
              currentLat={this.props.currentLat}
              currentLng={this.props.currentLng}
            />
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
    } else {
      history.push(page);
    }
  };
}
export default Home;
