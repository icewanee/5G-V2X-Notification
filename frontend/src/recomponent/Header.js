import React, { Component } from "react";
import { Layout } from "antd";

import "../App.css";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.username,
    };
  }

  render() {
    const { Header } = Layout;

    return (
      <Header
        style={{
          // height: "100vh",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#c6d5ad",
        }}
      >
        <h3 style={{ color: "white" }} onClick={() => this.onClick("/home")}>
          Welcome to 5G-V2X {this.state.username}
        </h3>
      </Header>
    );
  }
}
export default Header;