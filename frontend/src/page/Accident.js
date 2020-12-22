import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import Map from "../component/Map";

export default function Accident() {
  return (
    <div className="Card " style={{ paddingTop: 35 }}>
      <div className="row"></div>
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
          <Map />
        </div>
        <div className="col-md-2"></div>
      </div>
      <div className="row" style={{ paddingTop: 10 }}>
        <div className="col-md-2"></div>
        <div className="col-md-8 ">
          <div className="row">
            <div className="col-md-10">
              <div
                style={{
                  border: "thick solid black",
                  borderRadius: 10,
                  height: 50,
                }}
              ></div>
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
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}
