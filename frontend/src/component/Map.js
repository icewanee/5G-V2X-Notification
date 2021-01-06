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
          /*https://developers.google.com/maps/documentation/geolocation/overview?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_433453795362-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20~%20Places%20%7C%20BMM%20%7C%20Google%20Maps%20Geolocation%20API-KWID_43700045945677983-aud-563211326064%3Akwd-535957656381-userloc_9074765&utm_term=KW_%2Bgoogle%20%2Bgeolocation-ST_%2Bgoogle%20%2Bgeolocation&gclid=Cj0KCQiA0MD_BRCTARIsADXoopbaaYAhoz1wNEKL5Mvik8j9fcbsOxcNvXIfmL4_XdhRNZOEViP6pokaAmrPEALw_wcB*/
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

/*{data.map((x) => {
          return <AccidentPos position={x} />;
        })}*/
