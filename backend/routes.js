const async = require("async");
const config = require("./config");
const express = require("express");

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
      //const url = `${config('CloundSever')}/accident`
      //const res = await axios.get(url) //
      let res = [
        { lat: 123, lng: 123 },
        { lat: 12, lng: 1 },
      ];
      let id = getid();
      async.map(
        res,
        function (pos, cb) {
          console.log(pos, id);
          client_redis.setex(
            JSON.stringify(pos),
            time,
            "",
            function (err, reply) {
              if (err) return cb(err);
              cb(null, "success 1st map");
            }
          );
          id = id + 1;
        },
        function (error, results) {
          if (error) return console.log(error);
          console.log(results);
          setFirstTime();
          setid(id);
        }
      );
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
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    console.log(password);
    //Tan
    //if canlogin
    pushDataToKafka({
      condition: "set_account",
      username: username,
    });
    res.json({ islogin: true, username: username });
  });
};
