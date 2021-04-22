const async = require("async");
const config = require("./config");
var http = require("http");
const axios = require("axios");

const time = config.TimeDisappearAcs;
const car_id = config.CarID;
const dds_topic = config.DdsTopic;
const acd_topic = config.ActTopic;
let timeLogin;
let islogin = false;
module.exports = (
  app,
  client_redis,
  pushDataToKafka,
  setFirstTime,
  getisFirstTime,
  pushDataToKafkaOnCln,
  setUsername
) => {
  app.get("/map", function (req, res) {
    console.log(getisFirstTime(), "/map");
    if (getisFirstTime()) {
      setFirstTime();
      var options = {
        host: "localhost",
        port: 8080,
        path: "/api/car/accident", // the rest of the url with parameters if needed
        method: "GET", // do GET
      };
      var data = "";
      let json;
      var request = http.request(options, function (res) {
        res.on("data", function (chunk) {
          data += chunk;
          // console.log("data", data)
        });
        res.on("end", function () {
          json = JSON.parse(data);
          if (!json.success) {
            console.log(data.message);
          } else {
            if (json.data != []) {
              let now = new Date();
              async.map(
                json.data,
                function (pos, cb) {
                  //console.log(pos, id);
                  let t = Math.ceil((now - new Date(pos.detail.time)) / 1000);
                  console.log(t);
                  let value = {
                    lat: Number(pos.coordinate.lat),
                    lng: Number(pos.coordinate.lng),
                  };
                  if (t < time && t > 0) {
                    client_redis.setex(
                      JSON.stringify(value),
                      time - t,
                      "",
                      function (err, reply) {
                        if (err) return cb(err);
                        cb(null, "success 1st map");
                      }
                    );
                  }
                },
                function (error, results) {
                  if (error) return console.log(error);
                  console.log(results);
                  // setid(id);
                }
              );
            }
          }
        });
      });
      request.on("error", function (e) {
        console.log("error /map", e.message);
      });
      request.end();
    }
    client_redis.keys("*", function (err, keys) {
      if (err) return console.log(err);
      if (keys) {
        res.json({ data: keys });
      }
    });
  });

  app.post("/", function (req, res) {
    // do something w/ req.body or req.files
  });

  app.post("/newAccident", function (req, res) {
    if (!islogin) {
      return;
    }
    pushDataToKafkaOnCln(acd_topic, {
      carID: car_id,
      condition: "ACS",
      time: new Date().toISOString(),
    });
  });

  app.post("/newDrowsiness", function (req, res) {
    if (!islogin) {
      return;
    }
    let d = new Date();
    let response_time = req.body.res_time;
    let response_time1 = Math.abs(new Date(response_time) - d);
    let work_sec = Math.abs(d - timeLogin);
    pushDataToKafkaOnCln(dds_topic, {
      carID: car_id,
      condition: "DDS",
      time: d.toISOString(),
      response_time: response_time1,
      working_time: Math.ceil(work_sec / 3600000),
    });
  });

  app.post("/selectMusic", function (req, res) {
    let no = req.body.music;
    pushDataToKafka("select_music", {
      username: username1,
      carID: car_id,
      lat: lat1,
      lng: lng1,
      condition: "select",
    });
  });

  app.post("/login", async (req, res) => {
    let username1 = req.body.username;
    let password1 = req.body.password;
    console.log(username1, password1);
    await axios({
      method: "POST",
      url: "http://127.0.0.1:8080/api/car/login",
      headers: {},
      data: { username: username1, password: password1, car_id: car_id },
    })
      .then((response) => {
        if (response && response.data && response.data.success) {
          setUsername(username1);
          timeLogin = new Date();
          islogin = true;
          console.log("Login at", timeLogin.toISOString());
          res.json({ islogin: true, username: username1 });
        } else {
          console.log(response.data.message);
          res.json({ islogin: false, message: response.data.message });
        }
      })
      .catch((err) => {
        console.log("error in request", err.response.data);
        res.json({ islogin: false, message: err.response.data.message });
      });
  });

  app.post("/logout", async (req, res) => {
    let username1 = req.body.username;
    console.log(username1, ": logout");
    islogin = false;
    setUsername("");
    res.json({ islogin: false, message: "logout" });
  });
};
