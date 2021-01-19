const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");
const Kafka = require("kafka-node");
const config = require("./config");
var cors = require("cors");

// Set Port
const port = 4000;

// set isFirstTime
let isFirstTime = true;

//kafka
// const Producer = Kafka.Producer;
// const client = new Kafka.KafkaClient({kafkaHost: config.KafkaHost, idleConnection: 24 * 60 * 60 * 1000});
// const client_in_car = new Kafka.KafkaClient({kafkaHost: config.KafkaHostInCar, idleConnection: 24 * 60 * 60 * 1000});
// const producer = new Producer(client_in_car,  {requireAcks: 0, partitionerType: 2});
// const Consumer = Kafka.Consumer;
// const time = config.TimeDisappearAcs

// let consumer = new Consumer(
//   client,
//   [{ topic: config.KafkaTopic, partition: 0 }],
//   {
//     autoCommit: true,
//     fetchMaxWaitMs: 1000,
//     fetchMaxBytes: 1024 * 1024,
//     encoding: 'utf8',
//     // fromOffset: false
//   }
// );
// consumer.on('message', async function(message) {
//   const data = JSON.parse(message.value);
//   const condition = data.condition;
//   console.log(data);
//   if(!isFirstTime && condition){
//     if(condition.trim() == "ACS"){
//       let value = {
//         'lat' : data.lat,
//         "lng" : data.lng
//       }
//       client_redis.setex(JSON.stringify(value),time,"", function(err, reply){
//         if(err){
//           console.log(err);
//         }
//         id = id +1;
//         console.log(reply);
//       });
//     }
//     else {
//       console.log('kafka not in condition', data );
//     }
//   }
// })

// consumer.on('error', function(error) {
//   console.log('error kafka consumer', error);
// });

// producer.on('ready',async function() {

//   console.log('Kafka Producer is Ready');
// })

// producer.on('error', function(err) {
//   console.log(err);
//   console.log('Kafka Producer is error');
//   throw err;
// })

const pushDataToKafka = (dataToPush) => {
  let payloadToKafkaTopic = [
    { topic: config.KafkaTopicInCar, messages: JSON.stringify(dataToPush) },
  ];
  console.log(payloadToKafkaTopic);
  // producer.send(payloadToKafkaTopic,(err,data) => {
  //   if(err) {
  //       console.log('kafka-producer failed')
  //   }

  //   console.log('kafka-producer success');
  // })
};

// Init app
const app = express();

// View Engine\
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(cors());

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// methodOverride
app.use(methodOverride("_method"));
// Create Redis Client
let client_redis = redis.createClient();
let id = 0;
const getid = () => {
  return id;
};
const setid = (newID) => {
  id = newID;
};
const setFirstTime = () => {
  isFirstTime = false;
};
const getisFirstTime = () => {
  return isFirstTime;
};

client_redis.on("connect", function () {
  console.log("Connected to Redis...");
  require("./routes")(
    app,
    setid,
    getid,
    client_redis,
    pushDataToKafka,
    setFirstTime,
    getisFirstTime
  );
});

app.listen(port, function () {
  console.log("Server started on port " + port);
});

const http = require("http").Server(app);
const io = require("socket.io")(http);
//const soc = require("socket.io");
//var io = soc.connect("http://localhost:3000");
// รอการ connect จาก client

io.on("connection", (socket) => {
  console.log("user connected");

  // เมื่อ Client ตัดการเชื่อมต่อ
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
  socket.on("sent-message", function (message) {
    io.sockets.emit("new-message", message);
  });
});

var t = 2;
var test = [{ lat: 13.746791, lng: 100.535458 }];
app.get("/uu", function (req, res) {
  if (t == 2) {
    test = [{ lat: 13, lng: 100 }];
    t = 1;
  } else {
    test = [{ lat: 8, lng: 4 }];
    t = 2;
  }
});
