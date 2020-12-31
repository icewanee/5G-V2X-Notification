import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import Map from "../component/Map";

export default function Accident() {
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
          paddingTop: 0,
          backgroundColor: "#55cbf2",
          borderRadius: 30,
          paddingBottom: 25,
        }}
      >
        <div className="row">
          <div
            className="col-md-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Map />
          </div>
        </div>
        <div className="row" style={{ paddingTop: 25 }}>
          <div className="col-md-1"></div>
          <div className="col-md-10 ">
            <div className="row">
              <div className="col-md-10">
                <div
                  style={{
                    border: "thick solid ",
                    borderRadius: 20,
                    height: 50,
                    backgroundColor: "#c1e8f5",
                  }}
                >
                  <h3
                    className="card-title"
                    style={{ fontFamily: "Courier New" }}
                  ></h3>
                </div>
              </div>
              <div className="col-md-2" style={{ display: "flex" }}>
                <button
                  type="button"
                  class="btn "
                  style={{
                    paddingLeft: 30,
                    paddingRight: 30,
                    borderRadius: 30,
                    fontSize: 18,
                    backgroundColor: "#078ab5",
                    border: " solid black",
                    color: "white",
                    marginLeft: "auto",
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}
