const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const Kafka = require('kafka-node');
const config  = require('./config');
const async = require("async");


// Set Port
const port = 4000;
// Create Redis Client
let client_redis = redis.createClient();
let id = 0;

client_redis.on('connect', function(){
  console.log('Connected to Redis...');
});

// set isFirstTime
let isFirstTime = true

//kafka
const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({kafkaHost: config.KafkaHost, idleConnection: 24 * 60 * 60 * 1000});
const client_in_car = new Kafka.KafkaClient({kafkaHost: config.KafkaHostInCar, idleConnection: 24 * 60 * 60 * 1000});
const producer = new Producer(client_in_car,  {requireAcks: 0, partitionerType: 2});
const Consumer = Kafka.Consumer;
const time = config.TimeDisappearAcs

let consumer = new Consumer(
  client,
  [{ topic: config.KafkaTopic, partition: 0 }],
  {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8',
    // fromOffset: false
  }
);
consumer.on('message', async function(message) {
  const data = JSON.parse(message.value);
  const condition = data.condition;
  console.log(data);
  if(!isFirstTime && condition){
    if(condition.trim() == "ACS"){
      let value = {
        'lat' : data.lat,
        "lng" : data.lng
      }
      client_redis.setex(JSON.stringify(value),time,"", function(err, reply){
        if(err){
          console.log(err);
        }
        id = id +1;
        console.log(reply);
      });
    }  
    else {
      console.log('kafka not in condition', data );
    }
  }
})
consumer.on('error', function(error) {
  console.log('error kafka consumer', error);
});


producer.on('ready',async function() {

  console.log('Kafka Producer is Ready');
})

producer.on('error', function(err) {
  console.log(err);
  console.log('Kafka Producer is error');
  throw err;
})


const pushDataToKafka =(dataToPush) => {
  let payloadToKafkaTopic = [{topic: config.KafkaTopicInCar, messages: JSON.stringify(dataToPush) }];
  console.log(payloadToKafkaTopic);
  producer.send(payloadToKafkaTopic,(err,data) => {
    if(err) {
        console.log('kafka-producer failed')
    }

    console.log('kafka-producer success');
  })
};

 

// Init app
const app = express();

// View Engine\
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// methodOverride
app.use(methodOverride('_method'));

app.get('/map', function(req, res, next){
  //console.log(client_redis.hgetall())
  if(isFirstTime){
    //const url = `${config('CloundSever')}/accident`
    //const res = await axios.get(url) //
    let res = [{"lat": 123,"lng":123},{"lat":12,"lng":1}]
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
      isFirstTime = false
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

app.post('/user', function(req, res, next){
  let username = req.body.username;
  pushDataToKafka({
      'condition': 'set_account',
      'username': username,
  })
});



app.listen(port, function(){
  console.log('Server started on port '+port);
});