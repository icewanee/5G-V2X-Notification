import React, { Component } from "react";
import axios from "axios";
import { Layout, Menu, Row, Col } from "antd";
import { Table, Tag, Spaceม, notification, Typography, Space } from "antd";
import {
  FontSizeOutlined,
  PlayCircleOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import red from "../pictureNvideo/redd.png";
import confident from "../song/confident_demi.mp3";
import loveMyself from "../song/LoveMyself_Hailee.mp3";
import moneyOnMyMind from "../song/MoneyOnMyMind_Sam.mp3";
import wakeMeUp from "../song/WakeMeUp_Avicii.mp3";
import warmBlood from "../song/WarmBlood_Carly.mp3";
import Header from "../recomponent/Header";
import Sider from "../recomponent/Sider";

import "../App.css";
import history from "../history";

export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Footer, Content } = Layout;
    const { SubMenu } = Menu;
    const { Text, Link } = Typography;
    const openNotification = (text) => {
      notification.open({
        message: "Notification",
        description: "Alert sound is changed  ( using : " + text + " )",
        onClick: (text) => {
          console.log("Notification Clicked!");
          this.selectedSong(text);
        },
      });
    };

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
        render: (text) => (
          <Link onClick={() => openNotification(text)}>{text}</Link>
        ),
      },
      {
        title: "Artist",
        dataIndex: "Artist",
        key: "Artist",
        render: (text) =>
          text /*<a onClick={() => this.selectedSong(text)}></a>,*/,
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
        icon: warmBlood,
      },
      {
        key: "3",
        // picture: "red",
        Song: "Money On My Mind",
        Artist: "Sam Smith",
        icon: moneyOnMyMind,
      },
      {
        key: "4",
        // picture: "red",
        Song: "Love Myself",
        Artist: "Hailee Steinfeld",
        icon: loveMyself,
      },
      {
        key: "5",
        // picture: "red",
        Song: "Wake Me Up",
        Artist: "Avicii",
        icon: wakeMeUp,
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
              <br />
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
                  <Table
                    style={{ width: "60vw" }}
                    columns={columns}
                    dataSource={data}
                    title={() => (
                      <h4
                        style={{
                          // height: "100vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Music playlist
                      </h4>
                    )}
                    // scroll={{ x: 0, y: 350 }}
                    size={"Small"}
                    pagination={(true, { defaultPageSize: 4 })}
                  />
                </Col>
              </Row>
            </Content>
            <Sider />
          </Layout>
        </Layout>
      </div>
    );
  }

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
