import React, { Component } from "react";
import axios from "axios";
import { Layout, Menu, Row, Col, Card, Radio } from "antd";
import {
  Table,
  Tag,
  notification,
  Typography,
  Space,
  Popconfirm,
  message,
} from "antd";
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
import INeedYou from "../song/INeedYou_LiQWYD.mp3";
import warmBlood from "../song/WarmBlood_Carly.mp3";
import Avalon from "../song/Avalon.mp3";
import Header from "../recomponent/Header";
import Sider from "../recomponent/MySider";
import { config } from "../config/config";

import "../App.css";
import history from "../history";

export class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible:false,
      value: 1,
    };
  }

  render() {
    const { Footer, Content } = Layout;
    const { SubMenu } = Menu;
    const { Text, Link } = Typography;
    // const confirm = (text)=> {
    //   console.log(text);
    //   this.selectedSong(text);
    //   message.success('Alert sound:'+text);
    // }
    // const showPopconfirm = () => {
    //   this.setState(visible,);
    // };
    // const openNotification = (text) => {
    // notification.open({
    //   message: "Notification",
    //   description: "Alert sound is changed  ( using : " + text + " )",
    //   onClick: () => {
    //     console.log("Notification Clicked!");
    //     this.selectedSong(text);
    //   },
    // });
    // };
    // const [value, setValue] = React.useState(1);

    const onChange = (e) => {
      let selected = "";
      if (e.target.value == "1") {
        selected = "Confident";
        localStorage.setItem("songnumber", "1");
      } else if (e.target.value == "2") {
        selected = "Warm blood";
        localStorage.setItem("songnumber", "2");
      } else if (e.target.value == "3") {
        selected = "Money on my mind";
        localStorage.setItem("songnumber", "3");
      } else if (e.target.value == "4") {
        selected = "Love my self";
        localStorage.setItem("songnumber", "4");
      } else if (e.target.value == "5") {
        selected = "Wake me up";
        localStorage.setItem("songnumber", "5");
      } else if (e.target.value == "6") {
        selected = "I need you";
        localStorage.setItem("songnumber", "6");
      } else if (e.target.value == "7") {
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
      // setValue(e.target.value);
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
        render: (text) => text,
        align: "center",
        // <Popconfirm
        //   title={"Are you sure to change alert song to " + text + " ?"}
        //   onConfirm={() => this.selectedSong(text)}
        //   okText="Yes"
        //   cancelText="No"
        // >
        //   <a href="#">{text}</a>
        // </Popconfirm>
      },
      {
        title: (
          <div style={{ fontSize: "20px", width: "100%", textAlign: "center" }}>
            Artist
          </div>
        ),
        dataIndex: "Artist",
        key: "Artist",
        render: (text) =>
          text /*<a onClick={() => this.selectedSong(text)}></a>,*/,
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
              // ref="audio_tag"
              autoPlay={this.state.audioPlay}
              controls={true}
              controlslist="nodownload"
            >
              <source type="audio/mp3" src={icon} />
            </audio>
          </div>
          // <div onClick={() => this.review(text)}>
          //   <PlayCircleOutlined />
          // </div>
        ),
        width: "35%",
      },
      {
        title: (
          <div style={{ fontSize: "20px", width: "100%", textAlign: "center" }}>
            Status
          </div>
        ),
        // <div style={{ fontSize: "20px" }}>Select</div>
        dataIndex: "number",
        key: "number",
        render: (number) => (
          <div>
            <Radio.Group
              size="large"
              onChange={onChange}
              value={this.state.value}
              style={{
                // height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              buttonStyle="solid"
            >
              <Radio.Button style={{ borderRadius: 30 }} value={number}>
                {number == localStorage.getItem("songnumber") ? (
                  <div style={{ color: "#3277a8", fontWeight: "bold" }}>
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
        key: "1",
        picture: `url(${red})`,
        Song: "Confident",
        Artist: "Demi Lovato",
        icon: confident,
        number: "1",
      },
      {
        key: "2",
        // picture: "red",
        Song: "Warm Blood",
        Artist: "Carly Rae Jepsen",
        icon: warmBlood,
        number: "2",
      },
      {
        key: "3",
        // picture: "red",
        Song: "Money On My Mind",
        Artist: "Sam Smith",
        icon: moneyOnMyMind,
        number: "3",
      },
      {
        key: "4",
        // picture: "red",
        Song: "Love Myself",
        Artist: "Hailee Steinfeld",
        icon: loveMyself,
        number: "4",
      },
      {
        key: "5",
        // picture: "red",
        Song: "Wake Me Up",
        Artist: "Avicii",
        icon: wakeMeUp,
        number: "5",
      },
      {
        key: "6",
        // picture: "red",
        Song: "I Need You",
        Artist: "LiQWYD",
        icon: INeedYou,
        number: "6",
      },
      {
        key: "7",
        // picture: "red",
        Song: "Avalon",
        Artist: "Scandinavianz",
        icon: Avalon,
        number: "7",
      },
    ];
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "#c6d5ad",
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
                  <Card
                    hoverable
                    className="Card box"
                    style={{
                      // width: 900,
                      // border: "solid black",
                      // paddingLeft: 50,
                      // paddingRight: 50,
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
                            // height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Music playlist
                        </h3>
                      )}
                      // scroll={{ x: 0, y: 350 }}
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
    if (text == "Confident" || text == "1") {
      localStorage.setItem("song", "Confident");
      return "Confident";
    } else if (text == "Warm Blood" || text == "2") {
      localStorage.setItem("song", "Warm Blood");
      return "Warm Blood";
    } else if (text == "Money On My Mind" || text == "3") {
      localStorage.setItem("song", "Money On My Mind");
      return "Money On My Mind";
    } else if (text == "Love Myself" || text == "4") {
      localStorage.setItem("song", "Love Myself");
      return "Love Myself";
    } else if (text == "Wake Me Up" || text == "5") {
      localStorage.setItem("song", "Wake Me Up");
      return "Wake Me Up";
    } else if (text == "I Need You" || text == "6") {
      localStorage.setItem("song", "I Need You");
      return "I Need You";
    } else if (text == "Avalon" || text == "7") {
      localStorage.setItem("song", "Avalon");
      return "Avalon";
    }
  };

  selectedSong = async (text) => {
    let name = this.setSong(text);

    console.log("selected: " + name);
    await axios({
      method: "POST",
      url: "http://" + config.baseURL + ":4000/selectedSong", // change
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
