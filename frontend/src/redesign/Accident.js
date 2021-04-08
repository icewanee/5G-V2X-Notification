import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Layout, Menu, Modal } from "antd";
import MapN from "../component/MapN";
import { Row, Col } from "antd";
import Header from "../recomponent/Header";
import Sider from "../recomponent/Sider";

import "../App.css";
import history from "../history";

export class Accident extends Component {
  constructor(props) {
    super(props);
    this.state = { username: localStorage.username };
  }

  setAlert = (infor) => {
    this.setState({ alert: infor });
    console.log(infor);
  };

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
            <Sider />
          </Layout>

          {/* <Footer>Footer</Footer> */}
        </Layout>
      </div>
    );
  }
}
export default Accident;
