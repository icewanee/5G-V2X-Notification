import React, { Component } from "react";
import { Player } from "video-react";
import Video from "../component/Video";

export default function Home() {
  return (
    <div className="Card ">
      <br />
      <div className="row">
        <div className="col-md-5">
          <h1 className="card-title" style={{ fontFamily: "Courier New" }}>
            - Welcome to 5G-V2X -
          </h1>
          <br />
        </div>
        <div className="col-md-7"></div>

        <div
          className="col-md-12"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Video />
          </div>
        </div>
        <div
          className="col-md-12"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            target="_blank"
            href="http://videezy.com"
            style={{ color: "white" }}
          >
            Free Broll provided by Videezy!
          </a>
        </div>
      </div>
    </div>
  );
}
