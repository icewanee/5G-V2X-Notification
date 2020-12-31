import React, { Component } from "react";

export default function Home() {
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
          <div className="col-md-12 ">
            <h1
              className="card-title"
              style={{ fontFamily: "Courier New", paddingLeft: 30 }}
            >
              Welcome to 5G-V2X
            </h1>
          </div>
        </div>
        <br />

        <div
          className="Card box"
          style={{ width: 750, border: "thick solid black" }}
        >
          <br />
          <form className="needs-validation" noValidate>
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
                  style={{ fontFamily: "Courier New" }}
                >
                  Login
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-4">
                <br />
                <label className="text-dark">
                  Username
                  <br />
                  <input
                    type="text"
                    id="userName"
                    className="field"
                    style={{ width: 250 }}
                    /*onChange={(e) => {
                    this.setState({ userName: e.target.value });
                  }}*/
                    required
                  />
                </label>
              </div>
              <div className="col-md-4">
                <br />
                <label className="text-dark">
                  password
                  <br />
                  <input
                    type="password"
                    id="password"
                    className="field"
                    style={{ width: 250 }}
                    /*onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}*/
                    required
                  />
                </label>
              </div>
              <div className="col-md-2"></div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-5"></div>
              <div className="col-md-2">
                <button
                  type="submit"
                  id="submit"
                  className="btn btn-outline-dark"
                  /*onClick={() => this.onClick("/")}*/
                >
                  Sign in
                </button>
              </div>
              <div className="col-md-5"></div>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}
