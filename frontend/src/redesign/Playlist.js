import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Layout, Menu, Row, Col } from "antd";
import { Table, Tag, Space } from "antd";

import "../App.css";
import history from "../history";

export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Header, Footer, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    const columns = [
      {
        title: "Song",
        dataIndex: "Song",
        key: "Song",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Artist",
        dataIndex: "Artist",
        key: "Artist",
        render: (text) => <a>{text}</a>,
      },
    ];

    const data = [
      {
        key: "1",
        Song: "Confident",
        Artist: "Demi Lovato",
      },
      {
        key: "2",
        Song: "Warm Blood",
        Artist: "Carly Rae Jepsen",
      },
      {
        key: "3",
        Song: "Money On My Mind",
        Artist: "Sam Smith",
      },
      {
        key: "4",
        Song: "Love Myself",
        Artist: "Hailee Steinfeld",
      },
      {
        key: "5",
        Song: "Wake Me Up",
        Artist: "Avicii",
      },
    ];
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
            <h3 style={{ color: "white" }}>Welcome to 5G-V2X (add username)</h3>
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
                  <br /> <br /> <br />
                  <br />
                  <h4
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Music playlist
                  </h4>
                </Col>
                <Col
                  span={24}
                  style={{
                    // height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Table
                    style={{ width: "50vw" }}
                    columns={columns}
                    dataSource={data}
                  />
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
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">SOS</Menu.Item>
                <Menu.Item key="3">Playlist</Menu.Item>
                <Menu.Item key="4">Logout</Menu.Item>
                {/* <Footer>Footer</Footer> */}
              </Menu>
            </Sider>
          </Layout>

          {/* <Footer>Footer</Footer> */}
        </Layout>
      </div>
    );
  }
}
export default Playlist;
