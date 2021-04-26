import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import supercluster from "points-cluster";
import Marker, { Here } from "./Marker";
import ClusterMarker from "./ClusterMarker";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { getDistance } from "geolib";

import { config } from "../config/config";
import { LoadingOutlined } from "@ant-design/icons";

const MAP = {
  defaultZoom: 15,
  //   defaultCenter: {
  //     lat: 13.736717,
  //     lng: 100.523186,
  //   },
  options: {
    maxZoom: 19,
    panControl: false,
    mapTypeControl: false,
    scrollwheel: true,
    zoomControl: false,
    fullscreenControl: false,
    mapTypeId: "roadmap",
  },
};
export class ClusterMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mapOptions: {
        center: { lat: this.props.currentLat, lng: this.props.currentLng },
        zoom: MAP.defaultZoom,
      },
      clusters: [],
    };
  }

  getClusters = () => {
    console.log("check", this.props.accidentlocation);
    const clusters = supercluster(this.props.accidentlocation, {
      minZoom: 0,
      maxZoom: 19,
      radius: 60,
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = (props) => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => {
            // console.log(wx, wy, numPoints, points);
            return {
              lat: wy,
              lng: wx,
              numPoints,
              //   id: `${numPoints}_${points[0].id}`,
              points,
            };
          })
        : [],
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  render() {
    return (
      <GoogleMapReact
        defaultZoom={MAP.defaultZoom}
        defaultCenter={{
          lat: 13.736717,
          lng: 100.523186,
        }}
        center={{ lat: this.props.currentLat, lng: this.props.currentLng }}
        options={MAP.options}
        onChange={this.handleMapChange}
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{
          key: config.googleMapAPI,
          libraries: ["visualization"],
          // config.googleMapAPI
        }}
      >
        {this.props.isShownHere && (
          <Here lat={this.props.currentLat} lng={this.props.currentLng} />
        )}
        {this.state.clusters.map((item) => {
          if (item.numPoints === 1) {
            return (
              <Marker
                key={item.id}
                lat={item.points[0].lat}
                lng={item.points[0].lng}
              />
            );
          }

          return (
            <ClusterMarker
              key={item.id}
              lat={item.lat}
              lng={item.lng}
              points={item.points}
            />
          );
        })}
      </GoogleMapReact>
    );
  }
}
const ENDPOINT = "http://" + config.baseURL + ":4000";
// const socket = socketIOClient(ENDPOINT);
export class MapN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accidentlocation: "",
      currentLat: props.currentLat,
      currentLng: props.currentLng,
      input: "",
      message: [],
      loading: false,
    };
    // this.uploadcurrentlo = this.uploadcurrentlo.bind(this);
  }

  geocode = async (inforAlert, locationDis) => {
    // async
    var lat = locationDis["lat"];
    var lng = locationDis["lng"];
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          latlng: String(lat) + "," + String(lng), //"13.740522160240175,100.53447914292413",
          key: config.googleMapAPI, // <-- put API key in hereprocess.env.REACT_APP_GOOGLE_KEY
        },
      })
      .then(function (response) {
        console.log("tt", response.data.results);
        console.log("res", response);
        var str = response.data.results[0].formatted_address;
        var last = str.indexOf(",");
        var res = str.substr(0, last);
        var alert = "accident alert: ";
        // if (res === "") {
        //   res = res;
        // } else
        if (res !== "") {
          res = alert.concat(res);
        }
        console.log("res", res);
        inforAlert(res);
        /*inforAlert(response.data.results[0].formatted_address);*/
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  around = (dataLocation) => {
    // var min = 0;
    console.log("around");
    var ans = false;
    var distance = 0;
    let isnear = false;
    dataLocation.reverse().forEach((element) => {
      // .toString()
      // .slice()
      console.log(element);

      var dis = getDistance(
        {
          latitude: Number(
            this.props.currentLat
          ) /*localStorage.getItem("currentLat")this.state.currentLat*/,
          longitude: Number(
            this.props.currentLng
          ) /*localStorage.getItem("currentLng")this.state.currentLng*/,
        },
        {
          latitude: Number(element["lat"]),
          longitude: Number(element["lng"]),
        }
      );

      distance = Number(dis) / 1000;
      console.log("distance", distance, dis);
      if (!isnear) {
        if (distance <= 20 && !isnear) {
          isnear = true;
          console.log("around", isnear, element, distance);
          ans = element;
          console.log("ans", ans);
        }
        // else if (min >= distance) {
        //   min = distance;
        // }
      }
    });
    return ans;
  };

  response = () => {
    console.log("message");
    const socket = socketIOClient(ENDPOINT);
    socket.on("sent_message", (message) => {
      console.log("message", message);
      var modMessage = [];
      this.setState({ loading: true });
      message.data.forEach((element) => {
        modMessage.push(JSON.parse(element));
      });

      // modMessage.push({
      //   lat: 13.877647,
      //   lng: 100.4,
      // });
      this.setState({ accidentlocation: modMessage, loading: false });
      // message.data.push(`{
      //   "lat": 13.877647,
      //   "lng": 100.4,
      // }`);
      console.log("this", this.state.accidentlocation);
      var locationDis = this.around(this.state.accidentlocation); // message.data
      console.log(locationDis);
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
      //   localStorage.setItem("currentLat", Number(position.coords.latitude));
      //   localStorage.setItem("currentLng", Number(position.coords.longitude));
      re.setState({
        currentLat: Number(position.coords.latitude),
        currentLng: Number(position.coords.longitude),
        loading: false,
      });

      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
    });
  };
  Loading = () => {
    return (
      <div>
        <div
          style={{
            paddingTop: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingOutlined style={{ fontSize: "60px" }} />
        </div>
        <div
          style={{
            paddingTop: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Loading...</h3>
        </div>{" "}
      </div>
    );
  };
  render() {
    return (
      <div style={{ width: "100vw", height: "calc(90vh - 20px)" }}>
        {/* height: "90vh" */}
        {this.state.loading && false ? (
          <div></div>
        ) : (
          <ClusterMap
            accidentlocation={this.state.accidentlocation || []}
            here={{ lat: this.state.currentLat, lng: this.state.currentLng }}
            isShownHere
            currentLat={this.props.currentLat}
            currentLng={this.props.currentLng}
          />
        )}
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
        // this.setState({ accidentlocation: res.data.data });
        var modMessage = [];
        res.data.data.forEach((element) => {
          modMessage.push(JSON.parse(element));
        });
        this.setState({ accidentlocation: modMessage });
      })
      .catch((err) => {
        console.log("error in request", err);
      });
    // this.setState({
    //   accidentlocation: [
    //     {
    //       lat: 13.77,
    //       lng: 100.55,
    //     },
    //     {
    //       lat: 13.75,
    //       lng: 100.55,
    //     },
    //     {
    //       lat: 13.74,
    //       lng: 100.55,
    //     },
    //   ],
    // });
    this.response();
  }

  // componentDidUpdate() {
  //   setInterval(() => {
  //     this.uploadcurrentlo();
  //   }, 300000);
  // }
}

export default MapN;
