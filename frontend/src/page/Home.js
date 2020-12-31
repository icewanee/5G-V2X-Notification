import React, { Component } from "react";
import { Player } from "video-react";
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
          <div className="col-md-8 ">
            <h1
              className="card-title"
              style={{ fontFamily: "Courier New", paddingLeft: 30 }}
            >
              - Welcome to 5G-V2X -
            </h1>
          </div>
          <div className="col-md-2 "></div>
          <div className="col-md-2 "></div>
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
