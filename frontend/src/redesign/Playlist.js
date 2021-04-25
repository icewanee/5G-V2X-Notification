import React, { Component } from "react";
import axios from "axios";
import { Layout, Row, Col, Card, Radio } from "antd";
import { Table, notification } from "antd";
import confident from "../song/confident_demi.mp3";
import loveMyself from "../song/LoveMyself_Hailee.mp3";
import moneyOnMyMind from "../song/MoneyOnMyMind_Sam.mp3";
import wakeMeUp from "../song/WakeMeUp_Avicii.mp3";
import INeedYou from "../song/INeedYou_LiQWYD.mp3";
import warmBlood from "../song/WarmBlood_Carly.mp3";
import Avalon from "../song/Avalon.mp3";
import Header from "../recomponent/Header";
import Sider from "../recomponent/MySider";
import { config } from "../config/config";

import "../App.css";

export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible:false,
      value: 1,
    };
  }

  render() {
    const { Content } = Layout;

    const onChange = (e) => {
      let selected = "";
      if (e.target.value === "1") {
        selected = "Confident";
        localStorage.setItem("songnumber", "1");
      } else if (e.target.value === "2") {
        selected = "Warm Blood";
        localStorage.setItem("songnumber", "2");
      } else if (e.target.value === "3") {
        selected = "Money On My Mind";
        localStorage.setItem("songnumber", "3");
      } else if (e.target.value === "4") {
        selected = "Love Myself";
        localStorage.setItem("songnumber", "4");
      } else if (e.target.value === "5") {
        selected = "Wake Me Up";
        localStorage.setItem("songnumber", "5");
      } else if (e.target.value === "6") {
        selected = "I Need You";
        localStorage.setItem("songnumber", "6");
      } else if (e.target.value === "7") {
        selected = "Avalon";
        localStorage.setItem("songnumber", "7");
      }

      this.selectedSong(e.target.value);
      console.log("radio checked");
      this.setState({ value: e.target.value });
      notification.open({
        message: <h4>Notification</h4>,
        description: "Alert sound is changed to " + selected,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };

    const columns = [
      {
        title: (
          <div style={{ fontSize: "20px", width: "100%", textAlign: "center" }}>
            Song
          </div>
        ),
        dataIndex: "Song",
        key: "Song",
        render: (text) =>
          text === "I Need You" || text === "Avalon" ? (
            <div>
              <div>{text}</div>
              <div style={{ fontSize: 7 }}>( No copyright )</div>
            </div>
          ) : (
            text
          ),

        align: "center",
      },
      {
        title: (
          <div style={{ fontSize: "20px", width: "100%", textAlign: "center" }}>
            Artist
          </div>
        ),
        dataIndex: "Artist",
        key: "Artist",
        render: (text) => text,
        align: "center",
      },
      {
        title: (
          <div style={{ fontSize: "20px", width: "100%", textAlign: "center" }}>
            Player
          </div>
        ),
        dataIndex: "icon",
        key: "icon",
        render: (icon) => (
          <div>
            <audio
              style={{ width: "100%" }}
              autoPlay={this.state.audioPlay}
              controls={true}
              controlsList="nodownload"
            >
              <source type="audio/mp3" src={icon} />
            </audio>
          </div>
        ),
        width: "35%",
      },
      {
        title: (
          <div style={{ fontSize: "20px", width: "100%", textAlign: "center" }}>
            Status
          </div>
        ),

        dataIndex: "number",
        key: "number",
        render: (number) => (
          <div>
            <Radio.Group
              size="large"
              onChange={onChange}
              value={this.state.value}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              buttonStyle="solid"
            >
              <Radio.Button
                style={{ borderRadius: 30, backgroundColor: "white" }}
                value={number}
              >
                {number === localStorage.getItem("songnumber") ? (
                  <div style={{ color: "black", fontWeight: "bold" }}>
                    selected
                  </div>
                ) : (
                  "select"
                )}
              </Radio.Button>
            </Radio.Group>
          </div>
        ),
      },
    ];

    const data = [
      {
        key: "6",
        Song: "I Need You",
        Artist: "LiQWYD",
        icon: INeedYou,
        number: "6",
      },
      {
        key: "7",

        Song: "Avalon",
        Artist: "Scandinavianz",
        icon: Avalon,
        number: "7",
      },
      {
        key: "1",
        picture: "",
        // `url(${red})`
        Song: "Confident",
        Artist: "Demi Lovato",
        icon: confident,
        number: "1",
      },
      {
        key: "2",

        Song: "Warm Blood",
        Artist: "Carly Rae Jepsen",
        icon: warmBlood,
        number: "2",
      },
      {
        key: "3",

        Song: "Money On My Mind",
        Artist: "Sam Smith",
        icon: moneyOnMyMind,
        number: "3",
      },
      {
        key: "4",

        Song: "Love Myself",
        Artist: "Hailee Steinfeld",
        icon: loveMyself,
        number: "4",
      },
      {
        key: "5",

        Song: "Wake Me Up",
        Artist: "Avicii",
        icon: wakeMeUp,
        number: "5",
      },
    ];
    return (
      <div>
        <Layout>
          <Header />
          <Layout className="site-layout-background">
            <Content
              style={{
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Row>
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card
                    hoverable
                    className="Card box"
                    style={{
                      borderRadius: 30,
                      fontWeight: "#2749a8",
                      boxShadow: "5px 8px 24px 5px rgba(50, 50, 93, 0.25)",
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    <Table
                      style={{
                        width: "70vw",
                      }}
                      columns={columns}
                      dataSource={data}
                      title={() => (
                        <h3
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Music playlist
                        </h3>
                      )}
                      size={"middle"}
                      scroll={{ y: "350px" }}
                      pagination={false}
                    />
                  </Card>
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

  review = (text) => {
    console.log(text);
  };

  setSong = (text) => {
    if (text === "Confident" || text === "1") {
      localStorage.setItem("song", "Confident");
      return "Confident";
    } else if (text === "Warm Blood" || text === "2") {
      localStorage.setItem("song", "Warm Blood");
      return "Warm Blood";
    } else if (text === "Money On My Mind" || text === "3") {
      localStorage.setItem("song", "Money On My Mind");
      return "Money On My Mind";
    } else if (text === "Love Myself" || text === "4") {
      localStorage.setItem("song", "Love Myself");
      return "Love Myself";
    } else if (text === "Wake Me Up" || text === "5") {
      localStorage.setItem("song", "Wake Me Up");
      return "Wake Me Up";
    } else if (text === "I Need You" || text === "6") {
      localStorage.setItem("song", "I Need You");
      return "I Need You";
    } else if (text === "Avalon" || text === "7") {
      localStorage.setItem("song", "Avalon");
      return "Avalon";
    }
  };

  selectedSong = async (text) => {
    let name = this.setSong(text);

    console.log("selected: " + name);
    await axios({
      method: "POST",
      url: "http://" + config.baseURL + ":4000/selectedSong",
      headers: {},
      data: {
        musicName: name,
      },
    })
      .then((res) => {
        // window.location.reload();
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };
}
export default Playlist;
