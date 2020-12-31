import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

function location() {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 13.746791, lng: 100.535458 }}
    >
      <Marker
        position={{ lat: 13.746791, lng: 100.535458 }}
        /* icon={{
          url: "https://www.flaticon.com/svg/static/icons/svg/3338/3338951.svg",
          scaledSize: new window.google.maps.Size(50, 50),
        }}*/
      >
        <InfoWindow position={{ lat: 13.746791, lng: 100.535458 }}>
          <div>Siam</div>
        </InfoWindow>
      </Marker>
      <Marker
        position={{ lat: 13.740522160240175, lng: 100.53447914292413 }}
      ></Marker>
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(location));

export default function Map() {
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
