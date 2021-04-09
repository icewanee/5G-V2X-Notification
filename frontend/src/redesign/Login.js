import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import "../App.css";
import history from "../history";
import { config } from "../config/config";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
    };
  }

  render() {
    const tailLayout = {
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          offset: 20,
          span: 4,
          // span: 24,
        },
      },
    };

    const onFinish = (values) => {
      console.log("Success:", values);
      this.onClickLogin(values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#c6d5ad",
        }}
      >
        <div
          className="Card box"
          style={{
            width: 750,
            // border: "solid black",
            paddingLeft: 50,
            paddingRight: 50,
            borderRadius: 30,
          }}
        >
          <br />
          <br />
          <h1>5G-V2X</h1>
          <br />
          <Form
            // onSubmit={(event) => this.onClickLogin(event)}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <h6 style={{ color: "#db1f2a" }}>{this.state.alert}</h6>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // alignSelf: "flex-end",
                  width: "100%",
                }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <br />
        </div>
      </div>
    );
  }
  onClickLogin = async (event) => {
    // console.log(event["username"]);
    // event.preventDefault();
    let username = event["username"];
    let password = event["password"];
    console.log(username);
    await axios({
      method: "POST",
      url:
        "http://" +
        config.baseURL +
        ":4000/login" /*"http://127.0.0.1:4000/login" */,
      headers: {},
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("islogin", res.data.islogin);
        localStorage.setItem("username", username);

        console.log(localStorage);
        if (localStorage.getItem("islogin") === "true") {
          console.log("this", localStorage.getItem("islogin"));
          this.setState({ alert: "" });
          history.push("/home");
          // window.location.reload();
        } else {
          // window.location.reload();
          this.setState({ alert: res.data.message });
        }
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };
}
export default Login;
