const async = require("async");
const config = require("./config");
var http = require('http');
const axios = require('axios')

const time = config.TimeDisappearAcs;
const car_id = config.CarID
module.exports = (
  app,
  setid,
  getid,
  client_redis,
  pushDataToKafka,
  setFirstTime,
  getisFirstTime
) => {
  app.get("/map", function (req, res) {
    console.log(getisFirstTime(),"/map")
    if (getisFirstTime()) {
      setFirstTime();
      var options = {
        host : 'localhost',
        port : 8080,
        path : '/api/car/accident', // the rest of the url with parameters if needed
        method : 'GET' // do GET
      };
      var data = '';
      let json
      var request = http.request(options, function (res) {
          res.on('data', function (chunk) {
              data += chunk;
              // console.log("data", data)
          });
          res.on('end', function () {
              json = JSON.parse(data);
              if(!json.success){
                console.log(data.message)
                
              } else{
              if(json.data != []){
                let now = new Date()
                async.map(
                      json.data,
                      function (pos, cb) {
                        //console.log(pos, id);
                        let t = Math.ceil((now - new Date(pos.time))/1000)
                        console.log(t)
                        let value = {
                          "lat": Number(pos.lat),
                          "lng": Number(pos.lng),
                        };
                        if(t < time && t >0){
                        client_redis.setex(
                          JSON.stringify(value),
                          time-t,
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
      request.on('error', function (e) {
          console.log("error /map",e.message);
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

  app.post("/login", async (req, res) => {
    let username1 = req.body.username;
    let password1 = req.body.password;
    console.log(username1,password1);
    await axios({
      method: "POST",
      url: "http://127.0.0.1:8080/api/car/login",
      headers: {},
      data: { username: username1, password: password1, car_id: car_id },
    })
      .then((response) => {

        if(response && response.data && response.data.success){
            pushDataToKafka({
                      condition: "set_account",
                      username: username1,
                    });
            res.json({ islogin: true, username: username1 });
        }
        else{
          console.log(response.data.message)
          res.json({ islogin: false, message: response.data.message });
        }
        
      })
      .catch((err) => {
        console.log("error in request", err.response.data);
        res.json({ islogin: false, message: err.response.data.message });
      });

  });
};
