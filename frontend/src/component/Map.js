import React, { Component } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { getDistance } from "geolib";
import orange from "../pictureNvideo/orangeAcci.png";
import red from "../pictureNvideo/redAcci.png";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const location = (props) => {
  const success = (position) => {
    localStorage.setItem("currentLat", Number(position.coords.latitude));
    localStorage.setItem("currentLng", Number(position.coords.longitude));
  };

  const error = () => {
    console.log("Unable to retrieve your location");
  };

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
        lat: Number(
          props.currentLat
        ) /*Number(localStorage.getItem("currentLat"))*/,
        lng: Number(
          props.currentLng
        ) /*Number(localStorage.getItem("currentLng"))*/,
      }}
    >
      <Marker
        icon={{
          url: red,
          scaledSize: new window.google.maps.Size(40, 40),
        }}
        position={{
          lat: Number(
            props.currentLat
          ) /*Number(localStorage.getItem("currentLat"))*/,
          lng: Number(
            props.currentLng
          ) /*Number(localStorage.getItem("currentLng"))*/,
        }}
      ></Marker>
      <MarkerClusterer
        // averageCenter={false}
        // enableRetinaIcons={false}
        defaultMaxZoom={12}
        minimumClusterSize={0}
        ignoreHidden={true}
        // defaultMinimumClusterSize={1}
        // gridSize={1}
      >
        {props.accidentlocation.map((x) => (
          <Marker
            position={JSON.parse(x)}
            icon={{
              url: orange,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          ></Marker>
        ))}
      </MarkerClusterer>
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(location));
const ENDPOINT = "http://localhost:4000";
const socket = socketIOClient(ENDPOINT);

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accidentlocation: [],
      currentLat: "",
      currentLng: "",
      input: "",
      message: [],
    };
    this.uploadcurrentlo = this.uploadcurrentlo.bind(this);
  }

  geocode = async (inforAlert, locationDis) => {
    var lat = JSON.parse(locationDis)["lat"];
    var lng = JSON.parse(locationDis)["lng"];
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          latlng: String(lat) + "," + String(lng), //"13.740522160240175,100.53447914292413",
          key: "", // <-- put API key in hereprocess.env.REACT_APP_GOOGLE_KEY
        },
      })
      .then(function (response) {
        // console.log("tt", response.data.results);
        var str = response.data.results[0].formatted_address;
        var last = str.indexOf(",");
        var res = str.substr(0, last);
        var alert = "accident alert: ";
        if (res === "") {
          res = res;
        } else {
          res = alert.concat(res);
        }
        inforAlert(res);
        /*inforAlert(response.data.results[0].formatted_address);*/
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  around = (dataLocation) => {
    var min = 0;
    var ans = false;
    var distance = 0;
    let isnear = false;
    dataLocation
      .slice()
      .reverse()
      .forEach((element) => {
        var dis = getDistance(
          {
            latitude: Number(
              this.state.currentLat
            ) /*localStorage.getItem("currentLat")*/,
            longitude: Number(
              this.state.currentLng
            ) /*localStorage.getItem("currentLng")*/,
          },
          {
            latitude: Number(JSON.parse(element)["lat"]),
            longitude: Number(JSON.parse(element)["lng"]),
          }
        );
        distance = Number(dis) / 1000;
        if (!isnear) {
          if (distance <= 20 && !isnear) {
            {
              isnear = true;
              console.log("around", isnear, element, distance);

              ans = element;
            }
          } else if (min >= distance) {
            min = distance;
          }
        }
      });
    return ans;
  };

  /*displaylocation = (data) => {
    this.setState({ accidentlocation: data });
    console.log("dis", this.state);
  };*/

  response = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("sent-message", (message) => {
      this.setState({ accidentlocation: message.data });
      console.log(message);
      let locationDis = this.around(this.state.accidentlocation);
      //this.displaylocation(message.data);// not used
      console.log("h", this.state.accidentlocation);
      if (locationDis) {
        this.geocode(this.props.inforAlert, locationDis);
      }
    });
  };

  uploadcurrentlo = () => {
    var re = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      localStorage.setItem("currentLat", Number(position.coords.latitude));
      localStorage.setItem("currentLng", Number(position.coords.longitude));
      re.setState({
        currentLat: Number(position.coords.latitude),
        currentLng: Number(position.coords.longitude),
      });

      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };

  render() {
    return (
      /*<button
        onClick={() => {
          socket.emit("sent-message", "hello");
        }}
      >
        ff
      </button>*/
      <div style={{ width: "80vw", height: "65vh" }}>
        <WrappedMap /*googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`} // <-- put API key in here*/ // <-- put API key in here
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=&callback=initMap`} // add &libraries=geometry,drawing,places
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          accidentlocation={this.state.accidentlocation}
          currentLat={this.state.currentLat}
          currentLng={this.state.currentLng}
        />
      </div>
    );
  }
  componentDidMount() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:4000/map",
      headers: {},
      data: {},
    })
      .then((res) => {
        this.setState({ accidentlocation: res.data.data });
      })
      .catch((err) => {
        console.log("error in request", err);
      });

    this.response();
  }

  // componentDidUpdate() {
  //   setInterval(() => {
  //     this.uploadcurrentlo();
  //     console.log("haha");
  //   }, 4000);
  // }
}

export default Map;

/*{data.map((x) => {
          return <AccidentPos position={x} />;
        })}*/

/*<Marker
        position={{
          lat: Number(localStorage.getItem("currentLat")),
          lng: Number(localStorage.getItem("currentLng")),
          /*https://developers.google.com/maps/documentation/geolocation/overview?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_433453795362-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20~%20Places%20%7C%20BMM%20%7C%20Google%20Maps%20Geolocation%20API-KWID_43700045945677983-aud-563211326064%3Akwd-535957656381-userloc_9074765&utm_term=KW_%2Bgoogle%20%2Bgeolocation-ST_%2Bgoogle%20%2Bgeolocation&gclid=Cj0KCQiA0MD_BRCTARIsADXoopbaaYAhoz1wNEKL5Mvik8j9fcbsOxcNvXIfmL4_XdhRNZOEViP6pokaAmrPEALw_wcB*/
//}}
/* icon={{
          url: "https://www.flaticon.com/svg/static/icons/svg/3338/3338951.svg",
          scaledSize: new window.google.maps.Size(50, 50),
        }}*/
/*>
        <InfoWindow position={{ lat: 13.746791, lng: 100.535458 }}>
          <div>current location</div>
        </InfoWindow>
      </Marker>
      <Marker
        position={{ lat: 13.740522160240175, lng: 100.53447914292413 }}
      ></Marker>*/

/*{props.message.map((x) => (
        <Marker position={JSON.parse(x)}></Marker>
      ))}*/

// <Marker
//     icon={{
//       url: orange,
//       scaledSize: new window.google.maps.Size(40, 40),
//     }}
//     position={{
//       lat: 13.740522160240175,
//       lng: 100.53447914292413,
//     }}
//   ></Marker>
//   <Marker
//     icon={{
//       url: orange,
//       scaledSize: new window.google.maps.Size(40, 40),
//     }}
//     position={{
//       lat: 13.77,
//       lng: 100.55,
//     }}
//   ></Marker>
//   <Marker
//     icon={{
//       url: orange,
//       scaledSize: new window.google.maps.Size(40, 40),
//     }}
//     position={{
//       lat: 13.775,
//       lng: 100.555,
//     }}
//   ></Marker>
