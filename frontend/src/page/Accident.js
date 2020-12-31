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
          paddingTop: 40,
          backgroundColor: "#55cbf2",
          borderRadius: 30,
          paddingBottom: 40,
        }}
      >
        <div className="row">
          <div className="col-md-1"></div>
          <div
            className="col-md-10"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Map />
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row" style={{ paddingTop: 10 }}>
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
                  class="btn btn-dark"
                  style={{
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginLeft: "auto",
                  }}
                >
                  back
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
