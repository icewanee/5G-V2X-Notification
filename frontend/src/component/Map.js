import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

function location() {
  function success(position) {
    localStorage.setItem("currentLat", Number(position.coords.latitude));
    localStorage.setItem("currentLng", position.coords.longitude);
    console.log(localStorage);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
  }

  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{
        lat: Number(localStorage.getItem("currentLat")),
        lng: Number(localStorage.getItem("currentLng")),
      }}
    >
      <Marker
        position={{
          lat: Number(localStorage.getItem("currentLat")),
          lng: Number(localStorage.getItem("currentLng")),
        }}
        /* icon={{
          url: "https://www.flaticon.com/svg/static/icons/svg/3338/3338951.svg",
          scaledSize: new window.google.maps.Size(50, 50),
        }}*/
      >
        <InfoWindow position={{ lat: 13.746791, lng: 100.535458 }}>
          <div>current location</div>
        </InfoWindow>
      </Marker>
      <Marker
        position={{ lat: 13.740522160240175, lng: 100.53447914292413 }}
      ></Marker>
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(location));

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div style={{ width: "80vw", height: "65vh" }}>
        <WrappedMap
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          } // <-- put API key in here
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    );
  }
}
export default Map;
