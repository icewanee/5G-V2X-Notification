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
    //console.log(client_redis.hgetall())
    if (getisFirstTime()) {
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
              console.log("data");

          });
          res.on('end', function () {
              json = JSON.parse(data);
              console.log(data,json);
              if(!json.success){
                console.log(data.message)
                
              } else{
              if(json.data != []){
                let now = new Date()
                async.map(
                      json.data,
                      function (pos, cb) {
                        //console.log(pos, id);
                        let t = Math.ceil((now - new Date(pos.detail.time))/1000)
                        console.log(t)
                        if(t < time && t >0){
                        client_redis.setex(
                          JSON.stringify(pos.coordinate),
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
                        setFirstTime();
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
    console.log(username);
    console.log(password);
    http.post(`${config.CloundSever}/api/car/login`, { username: username1, password: password1 }, function(res){
      response.setEncoding('utf8');
      res.on('data', function(chunk) {
        console.log(chunk);
        if(chunk.success){
          pushDataToKafka({
            condition: "set_account",
            username: username,
          });
          res.json({ islogin: true, username: username });
        }
        else{
          res.json({ islogin: false, username: username });
        }
      });
    });
   
  });
};
