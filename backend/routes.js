const async = require("async");
const config = require("./config");
const axios = require("axios");

const time = config.TimeDisappearAcs;
const car_id = config.CarID;
const dds_topic = config.KafkaDdsTopic;
const acd_topic = config.KafkaAICTopic;
const username_topic = config.KafkaUsernameTopic;
let islogin = false;
let musicName = "I Need You";
// test only
// let lat = 13.66422;
// let lng = 100.695135;
//13.3621 100.9837
let lat = 13.3621;
let lng = 100.9837;
//13.861358, 13.73826
module.exports = (
  app,
  client_redis,
  pushDataToKafka,
  setFirstTime,
  getisFirstTime,
  getPos,
  setUsername,
  io
) => {
  app.get("/map", async function (req, res) {
    console.log(getisFirstTime(), "/map");
    if (getisFirstTime()) {
      setFirstTime();
      await axios({
        method: "GET",
        url: "http://" + config.CloundSever + "/api/car/accident",
        headers: {},
        data: {},
      })
        .then((response) => {
          if (
            response &&
            response.data &&
            response.data.success &&
            response.data.data
          ) {
            let now = new Date();
            async.map(
              response.data.data,
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
              }
            );
            client_redis.keys("*", function (err, keys) {
              if (err) return console.log(err);
              if (keys) {
                res.json({ successful: true ,message:"success to get data",data: keys });
              }
            });
          } else {
            console.log(response.data.message);
            res.json({ successful: false, message: response.data.message });
          }
        })
        .catch((err) => {
          console.log("error in request /api/car/accident", err.response);
          res.json({ successful: false, message:"Promblem with internet"});
        });
    }
  else{    
    client_redis.keys("*", function (err, keys) {
      if (err) return console.log(err);
      if (keys) {
        res.json({ successful: true ,message:"success to get data",data: keys });
      }
    });
  }
  });

  app.post("/", function (req, res) {
    // do something w/ req.body or req.files
  });
  app.post("/newAccident", function (req, res) {
    console.log("new Accident");
    if(islogin) {
      pushDataToKafka(acd_topic, {
        condition: "AIC",
        carID: car_id,
      });
      res.json({ successful: true ,message:"success to post newAccident"});
    }
    else{
      console.log("Driver isn't login")
      res.json({ successful: false ,message:"Driver isn't login"})
    }
  });
  app.post("/dds", function (req, res) {
    if(islogin){
      res_start = new Date();
      io.emit("alert_sound", { data: musicName });
      console.log("DDS_post");
      res.json({ successful: true, message:"success to post drowsiness" });
    }
    else{
      console.log("Driver isn't login")
      res.json({successful:false,  message:"Driver isn't login"})
    }
  });
  app.post("/eyeNotFound", function (req, res) {
    if(islogin){
    io.emit("eyeNotFound", {
      data: "Drowsiness detection system : not found eye",
    });
    console.log("eyeNotFound");
    res.json({ successful: true,  message:"success to post when can't datect eye"});
    }
    else{
      console.log("Driver isn't login")
      res.json({successful:false,  message:"Driver isn't login"})
    }
  });
  // app.post("/test/newAccident", function (req, res) {
  //   let new_lat = lat + 0.0000088;
  //   let new_lng = lng + 0.0200054;
  //   let value = {
  //     lat: new_lat,
  //     lng: new_lng,
  //   };
  //   client_redis.setex(JSON.stringify(value), time, "", function (err, reply) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(reply);
  //   });
  //   client_redis.keys("*", function (err, keys) {
  //     if (err) return console.log(err);
  //     if (lat == 14.73826) {
  //       io.emit("this_car_accident", { data: "this_car_accident" });
  //     }
  //     if (keys) {
  //       console.log("soc");
  //       io.emit("sent_message", { data: keys });
  //       console.log("hey");
  //       // res.json({ data: keys });
  //     }
  //   });
  //   res.json({ successful: true });
  // });
  app.post("/selectedSong", function (req, res) {
    let name = req.body.musicName;
    console.log("selected song: " + name);
    musicName = name;
    if (musicName == null || musicName == "") {
      res.json({ successful: false ,message:"Your reqest isn't correct"});
    }
    res.json({ successful: true, message:"success to change your selected song "});
  });
  app.get("/selectedSong", function (req, res) {
    res.json({ successful: true, message:"success to get your selected song ", data: musicName });
  });
  app.post("/newDrowsiness", function (req, res) {
    console.log("new Drowsiness");
    if(islogin) {
      let response_time = req.body.response;
      pushDataToKafka(dds_topic, {
        condition: "DIC",
        carID: car_id,
        response_time: response_time,
      });
      res.json({ successful: true });
      }
    else{
      res.json({ successful: false ,message:"Driver isn't login"})
    }
  });
  app.get("/position", function (req, res) {
    // do something w/ req.body or req.files
    console.log("get position");
    pos = getPos();
    if (
      pos["lat"] == undefined ||
      pos["lat"] == 0 ||
      pos["lng"] == undefined ||
      pos["lng"] == 0
    ) {
      res.json({ successful: false,message:"system have an error", data: null });
    }
    res.json({ successful: true ,message:"success to get data", data: pos });
  });
  app.post("/login", async (req, res) => {
    let username1 = req.body.username;
    let password1 = req.body.password;
    console.log(username1, password1);
    await axios({
      method: "POST",
      url: "http://" + config.CloundSever + "/api/car/login",
      headers: {},
      data: { username: username1, password: password1, car_id: car_id },
    })
      .then((response) => {
        if (response && response.data && response.data.success) {
          pushDataToKafka(username_topic, {
            condition: "set_account",
            username: username1,
            carID: car_id,
          });
          islogin = true
          res.json({
            successful: true,
            islogin: true,
            message:"Login",
            username: username1,
            selectedsong: musicName,
          });
        } else {
          console.log(response.data.message);
          res.json({ successful: false, islogin: false, username: null,
            selectedsong: null, message: response.data.message });
        }
      })
      .catch((err) => {
        console.log("error in request", err.response.data.message);
        res.json({ successful: false, islogin: false, username: null,
          selectedsong: null, message: err.response&&err.response.data.message});
      });
  });
  app.get("/isLogin", async (req, res) => {
    res.json({ successful: true, data: islogin });
  });
  app.post("/logout", async (req, res) => {
    console.log("user logout");
    islogin = false;
    setUsername("");
    pushDataToKafka(username_topic, {
      condition: "set_account",
      username: "",
      carID: car_id,
    });
    res.json({ successful: true, islogin: false, message: "logout" });
  });
};
