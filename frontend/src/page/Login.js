import React, { Component } from "react";
import axios from "axios";
import history from "../history";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  render() {
    return (
      <div
        className="Card "
        style={{
          paddingTop: 85,
          paddingBottom: 85,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0da8db",
        }}
      >
        <div
          className="Card "
          style={{
            paddingTop: 40,
            backgroundColor: "#55cbf2",
            borderRadius: 30,
            paddingBottom: 40,
          }}
        >
          <div className="row">
            <div className="col-md-7 ">
              {/* <h1
                className="card-title"
                style={{
                  fontFamily: "Courier New",
                  fontSize: 45,
                  fontWeight: "bold",
                  paddingLeft: 30,
                }}
              >
                Logo here
              </h1> */}
              <br />
            </div>
            <div className="col-md-5 "></div>
          </div>
          <br />
          <div className="Card box" style={{ width: "87vw", height: "60vh" }}>
            <br />
            <form
              className="needs-validation"
              onSubmit={(event) => this.onClickLogin(event)}
            >
              <div className="row">
                <div
                  className="col-md-12 "
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2
                    className="card-title"
                    style={{
                      fontFamily: "Courier New",
                      fontSize: 45,
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2"></div>
                <div
                  className="col-md-8"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label
                    className="text"
                    style={{ fontFamily: "Courier New", fontSize: 30 }}
                  >
                    Username
                    <br />
                    <input
                      type="text"
                      id="username"
                      className="field"
                      style={{
                        width: 600,
                        height: 50,
                        borderRadius: 20,
                        border: " solid white",
                      }}
                      onChange={(e) => {
                        this.setState({ username: e.target.value });
                      }}
                      required
                    />
                  </label>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-2"></div>
                <div
                  className="col-md-8"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label
                    className="text"
                    style={{
                      fontFamily: "Courier New",
                      fontSize: 30,
                    }}
                  >
                    password
                    <br />
                    <input
                      type="password"
                      id="password"
                      className="field"
                      style={{
                        width: 600,
                        height: 50,
                        borderRadius: 20,
                        border: " solid white",
                      }}
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                      required
                    />
                  </label>
                </div>
                <div className="col-md-2"></div>
              </div>
              <br />
              <div className="row">
                <div
                  className="col-md-12"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="submit"
                    id="submit"
                    className="btn"
                    style={{
                      paddingLeft: 30,
                      paddingRight: 30,
                      paddingTop: 15,
                      paddingBottom: 15,
                      borderRadius: 50,
                      fontSize: 20,
                      backgroundColor: "#078ab5",
                      border: " solid white",
                      color: "white",
                    }}
                    /*onClick={() => this.onClick("/")}*/
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  }

  onClickLogin = async (event) => {
    event.preventDefault();
    localStorage.clear();
    localStorage.setItem("islogin", "true");
    console.log("hi");
    history.push("/home");
    //window.location.reload();
  };

  /*onClickLogin = async (event) => {
    event.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    console.log(this.state);
    await axios({
      method: "POST",
      url: "http://127.0.0.1:4000/login",
      headers: {},
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        localStorage.setItem("islogin", res.data.islogin);
        console.log(res);
        console.log(localStorage);
        if (localStorage.getItem("islogin") === "true") {
          console.log("this", localStorage.getItem("islogin"));
          history.push("/home");
          window.location.reload();
        } else window.location.reload();
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  componentDidMount() {
    localStorage.clear();
    console.log("first", localStorage);
  }*/
}
export default Login;
