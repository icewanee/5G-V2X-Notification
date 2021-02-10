const async = require("async");
const config = require("./config");
var http = require('http');
http.post = require('http-post');

const time = config.TimeDisappearAcs;

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
      // var options = {
      //     host: config.CloundSever,
      //     path: '/api/car/accident'
      // }
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
                          "lat": Number(pos.latitude),
                          "lng": Number(pos.longitude),
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
    // http.post(`${config.CloundSever}/api/car/login`, { username: username1, password: password1 }, function(res){
    //   response.setEncoding('utf8');
    //   res.on('data', function(chunk) {
    //     console.log(chunk);
    //     if(chunk.success){
    //       pushDataToKafka({
    //         condition: "set_account",
    //         username: username1,
    //       });
    //       res.json({ islogin: true, username: username });
    //     }
    //     else{
    //       res.json({ islogin: false, username: username });
    //     }
    //   });
    // });
    pushDataToKafka({
              condition: "set_account",
              username: username1,
            });
    res.json({ islogin: true, username: username1 });
  });
};
