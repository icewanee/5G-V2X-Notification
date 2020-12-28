import React, { Component } from "react";
import { Player } from "video-react";
import video from "../pictureNvideo/travel_car.mp4";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50vw",
        height: "50vh",
      }}
    >
      <Player State={{ autoPlay: true }}>
        <source src={video} />
      </Player>
    </div>
  );
  this.Player.autoPlay = true;
}
