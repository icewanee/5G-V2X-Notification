import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Layout, Menu, Row, Col, Modal } from "antd";
import { Table, Tag, Space } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import red from "../pictureNvideo/redd.png";
import confident from "../song/confident_demi.mp3";

import "../App.css";
import history from "../history";

export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = { username: localStorage.username, setIsModalVisible: false };
  }

  render() {
    const { Header, Footer, Sider, Content } = Layout;
    const { SubMenu } = Menu;
    const columns = [
      {
        title: "",
        dataIndex: "picture",
        key: "picture",
        render: (pic) => {
          <div>
            <img src={pic} />
          </div>;
        },
      },
      {
        title: "Song",
        dataIndex: "Song",
        key: "Song",
        render: (text) => <a onClick={() => this.selectedSong(text)}>{text}</a>,
      },
      {
        title: "Artist",
        dataIndex: "Artist",
        key: "Artist",
        render: (text) => <a onClick={() => this.selectedSong(text)}>{text}</a>,
      },
      {
        title: "",
        dataIndex: "icon",
        key: "icon",
        render: (icon) => (
          <div>
            <audio
              // ref="audio_tag"
              autoPlay={this.state.audioPlay}
              controls={true}
            >
              <source type="audio/mp3" src={icon} />
            </audio>
          </div>
          // <div onClick={() => this.review(text)}>
          //   <PlayCircleOutlined />
          // </div>
        ),
      },
    ];

    const data = [
      {
        key: "1",
        picture: `url(${red})`,
        Song: "Confident",
        Artist: "Demi Lovato",
        icon: confident,
      },
      {
        key: "2",
        // picture: "red",
        Song: "Warm Blood",
        Artist: "Carly Rae Jepsen",
        icon: "Warm Blood",
      },
      {
        key: "3",
        // picture: "red",
        Song: "Money On My Mind",
        Artist: "Sam Smith",
        icon: "Money On My Mind",
      },
      {
        key: "4",
        // picture: "red",
        Song: "Love Myself",
        Artist: "Hailee Steinfeld",
        icon: "Love Myself",
      },
      {
        key: "5",
        // picture: "red",
        Song: "Wake Me Up",
        Artist: "Avicii",
        icon: "Wake Me Up",
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
              <br />
              <Row>
                {/* <Col
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
                </Col> */}
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
                    style={{ width: "70vw" }}
                    columns={columns}
                    dataSource={data}
                    title={() => "Music playlist"}
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
                <Menu.Item key="1" onClick={() => this.onClick("/home")}>
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
                  title="Emergency accident report"
                  visible={this.state.setIsModalVisible}
                  onOk={() => this.handleOk()}
                  onCancel={() => this.handleCancel()}
                >
                  <p>Emergency call</p>
                  <p>Police (General Emergency Call) 191</p>
                  {/* <p>Some contents...</p> */}
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
                <Menu.Item key="5" onClick={() => this.onClick("/")}>
                  Logout
                </Menu.Item>
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

  review = (text) => {
    console.log(text);
  };

  selectedSong = (text) => {
    console.log(text);
    axios({
      method: "POST",
      url: "http://127.0.0.1:4000/selectedSong", // change
      headers: {},
      data: {
        musicName: text,
      },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("error in request", err);
      });
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
export default Playlist;
