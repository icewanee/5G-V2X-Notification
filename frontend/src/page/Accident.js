import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import Map from "../component/Map";

export default function Accident() {
  return (
    <div className="Card ">
      <div className="row">
        <div className="col-md-12" style={{ height: 150 }}></div>
      </div>
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
      <div className="row" style={{ paddingTop: 10 }}>
        <div className="col-md-2"></div>
        <div className="col-md-7"></div>
        <div className="col-md-3">
          <button
            type="button"
            class="btn btn-info btn-lg"
            style={{ paddingLeft: 22, paddingRight: 22 }}
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
}
