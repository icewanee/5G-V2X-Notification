import React, { Component } from "react";
import red from "../pictureNvideo/redd.png";

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
          <div className="col-md-7 ">
            <h1
              className="card-title"
              style={{
                fontFamily: "Courier New",
                fontSize: 45,
                fontWeight: "bold",
                paddingLeft: 30,
              }}
            >
              Welcome to 5G-V2X
            </h1>
          </div>
          <div className="col-md-5 ">
            <button
              type="button"
              class="btn "
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
            >
              Map
            </button>{" "}
            <button
              type="button"
              class="btn "
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
                marginRight: "auto",
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10" style={{ width: "90vw", height: "60vh" }}>
            <img src={red} style={{ width: "87vw", height: "60vh" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
