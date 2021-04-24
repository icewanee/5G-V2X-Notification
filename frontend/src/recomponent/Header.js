import React, { Component } from "react";
import { Layout } from "antd";

import "../App.css";
import history from "../history";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          height: "10vh",
        }}
      >
        <h1 style={{ color: "white" }} onClick={() => this.onClick("/home")}>
          Welcome {localStorage.getItem("username")} to 5G-V2X
        </h1>
      </Header>
    );
  }
  onClick = async (page) => {
    //page.preventDefault();
    if (page === "/") {
      console.log(localStorage);
      localStorage.setItem("islogin", false);
      console.log(localStorage);
      history.push(page);
    } else {
      history.push(page);
    }
  };
}
export default Header;
