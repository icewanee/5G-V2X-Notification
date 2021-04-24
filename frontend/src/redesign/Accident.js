import React, { Component } from "react";
import { Layout, notification } from "antd";
import MapN from "../component/MapN";
import { Row, Col } from "antd";
import Header from "../recomponent/Header";
import Sider from "../recomponent/MySider";

import "../App.css";

export class Accident extends Component {
  constructor(props) {
    super(props);
    this.state = { username: localStorage.username };
  }

  setAlert = (infor) => {
    this.setState({ alert: infor });
    console.log(infor);
    // this.openNotification(infor);
    notification.open({
      message: "Accident alert",
      description: "New accident at" + infor,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  render() {
    const { Content } = Layout;

    // const openNotification = (infor) => {
    //   notification.open({
    //     message: "Accident alert",
    //     description: "New accident at" + infor,
    //     onClick: () => {
    //       console.log("Notification Clicked!");
    //     },
    //   });
    // };
    return (
      <div>
        <Layout>
          <Header />
          <Layout className="site-layout-background">
            <Content
              style={{
                height: "90vh",
              }}
            >
              <Row>
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3277a8",
                    color: "white",
                  }}
                >
                  * The marks of accident location show the accident that has
                  been occurred within an hour *
                </Col>
                <Col
                  span={24}
                  style={{
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
              currentLat={this.props.currentLat}
              currentLng={this.props.currentLng}
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default Accident;
