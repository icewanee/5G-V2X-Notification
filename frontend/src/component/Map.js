import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function location() {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 15.870032, lng: 100.992538 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(location));

export default function Map() {
  return (
    <div style={{ width: "60vw", height: "60vh" }}>
      <WrappedMap
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        }
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
