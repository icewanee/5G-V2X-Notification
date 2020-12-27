import React from "react";
import { Player, ControlBar, ClosedCaptionButton } from "video-react";
import video from "../pictureNvideo/travel_car.mp4";

export default function Home() {
  return (
    <div className="Card ">
      <div className="row">
        <div className="col-md-5">
          <h1 className="card-title" style={{ fontFamily: "Courier New" }}>
            - Welcome to 5G-V2X -
          </h1>
        </div>
        <div className="col-md-7"></div>
      </div>
      <div className="row">
        <video />
        <a target="_blank" href="http://videezy.com">
          Free Broll provided by Videezy!
        </a>
      </div>
    </div>
  );
}
