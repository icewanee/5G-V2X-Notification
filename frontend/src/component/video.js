import React, { Component } from "react";
import { Player } from "video-react";
import VideoPlayer from "react-video-js-player";
import player from "../pictureNvideo/travel_car.mp4";

export default function Video() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80vw",
        height: "80vh",
      }}
    >
      <VideoPlayer
        src={player}
        muted={true}
        loop={true}
        style={{
          width: "80vw",
          height: "80vh",
        }}
      />
    </div>
  );
}
