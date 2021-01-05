const async = require("async");
const config  = require('./config');

const time = config.TimeDisappearAcs

module.exports = (app,setid,getid,client_redis,pushDataToKafka,setFirstTime,getisFirstTime) => {
    
    app.get('/map',function(req,res) {
    
        //console.log(client_redis.hgetall())
        if(getisFirstTime){
          //const url = `${config('CloundSever')}/accident`
          //const res = await axios.get(url) //
          let res = [{"lat": 123,"lng":123},{"lat":12,"lng":1}]
          let id = getid()
          async.map(res, function(pos, cb) {
            console.log(pos,id)
            client_redis.setex(JSON.stringify(pos),time,"", function(err, reply){
              if(err) return cb(err);
              cb(null, "success 1st map");
            });
            id = id +1;
         }, function (error, results) {
            if (error) return console.log(error);
            console.log(results);
            setFirstTime()
            setid(id)
         });
        }
        client_redis.keys('*', function (err, keys) {
          if (err) return console.log(err);
          if(keys){
              // async.map(keys, function(key, cb) {
              //     client_redis.get(key, function (error, value) {
              //         if (error) return cb(error); 
              //         cb(null, JSON.parse(value));
              //     }); 
              // }, function (error, results) {
              //     if (error) return console.log(error);
              //     console.log(results);
              //     res.json({data:results});
              // });
              res.json({data:keys});
      
          }
        });   
      });
      // //for test only
      // app.get('/user', function(req, res, next){
      //   pushDataToKafka({
      //       'condition': 'set_account',
      //       'username': "driver"
      //   })
      // });
      
    app.post('/user', function(req,res) {
        let username = req.body.username;
        pushDataToKafka({
            'condition': 'set_account',
            'username': username,
        })
      });

        

 

}