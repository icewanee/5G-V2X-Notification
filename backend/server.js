const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");
const Kafka = require("kafka-node");
const config = require("./config");
var cors = require("cors");
const car_id = config.CarID;

// Set Port
const port = 4000;

// set isFirstTime
let isFirstTime = true;
let pos = {
  lat: 13.73826 ,
  lng: 100.532413,
}
let username = ""
const setFirstTime = () => {
  isFirstTime = false;
};
const getisFirstTime = () => {
  return isFirstTime;
};
const getPos = ()=>{
  return pos
}
const setPos = (p)=>{
  pos = p
}
const setUsername = (n)=>{
  username = n
}
//kafka
const time = config.TimeDisappearAcs;
// const Producer = Kafka.Producer;
// const client = new Kafka.KafkaClient({
//   // kafkaServer: 'localhost:2181',
//   kafkaHost: config.KafkaHost,
//   idleConnection: 24 * 60 * 60 * 1000,
//   sasl: {mechanism: 'plain', username:config.KafkaUsernameOnCln , password: config.KafkaPasswordOnCln},
// });
// const client_in_car = new Kafka.KafkaClient({
//   // kafkaServer: 'localhost:2181',
//   kafkaHost: config.KafkaHostInCar,
//   idleConnection: 24 * 60 * 60 * 1000,
//   sasl: {mechanism: 'plain', username:config.KafkaUsernameInCar , password: config.KafkaPasswordInCar},
// });
// const producer = new Producer(client_in_car, {
//   requireAcks: 1,
//   ackTimeoutMs: 100,
//   partitionerType: 2,
//   "enable.idempotence" : true,
// });

// producer.on("ready", async function () {
//   console.log("Kafka Producer is Ready");
// });

// producer.on("error", function (err) {
//   console.log(err);
//   console.log("Kafka Producer is error");
// });

const pushDataToKafka = (topic,dataToPush) => {
  let payloadToKafkaTopic = [
    { topic: topic, messages: JSON.stringify(dataToPush) },
  ];
  console.log(topic,payloadToKafkaTopic);
  // producer.send(payloadToKafkaTopic, (err, data) => {
  //   if (err) {
  //     console.log("kafka-producer failed");
  //     pushDataToKafka(topic,dataToPush)
  //   }
  //   else{
  //     console.log("kafka-producer success");
  //   }
  // });
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
client_redis.on("connect", function () {
  console.log("Connected to Redis...");
});

//socket
let server = require("http").Server(app);
let io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling", "flashsocket"],
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("sent_message", function (message) {
    console.log(message);
  });

  socket.on("position", function (message) {
    setPos(message)
    console.log(message);
  });
  // socket.on("")
});

// const Consumer = Kafka.Consumer;

// let consumer = new Consumer(
//   client,
//   [{ topic: config.KafkaActTopic, partition: 0 }],
//   {
//     autoCommit: true,
//     fetchMaxWaitMs: 1000,
//     fetchMaxBytes: 1024 * 1024,
//     encoding: "utf8",
//     fromOffset: false,
//   }
// );
// consumer.on("message", async function (message) {
//   const data = JSON.parse(message.value);
//   const condition = data.condition;
//   console.log(data);

//   if (!isFirstTime && condition) {
//     if (condition.trim() == "ACS") {
//       if(data.username == username && data.carID == car_id){
//         console.log("This driver accident")
//         io.emit('this_car_accident',{ data: "accident"})
//       }
//       let value = {
//         "lat": Number(data.lat),
//         "lng": Number(data.lng),
//       };
//       client_redis.setex(
//         JSON.stringify(value),
//         time,
//         "",
//         function (err, reply) {
//           if (err) {
//             console.log(err);
//           }
//           console.log(reply);
//         }
//       );
//     } else {
//       console.log("kafka not in condition", data);
//     }
//     //redis ice
//     client_redis.keys("*", function (err, keys) {
//       if (err) return console.log(err);
//       if (keys) {
//         console.log("soc");
//         io.emit("sent_message", { data: keys });
//         console.log("hey");
//         // res.json({ data: keys });
//       }
//     });
//   }
// });

// consumer.on("error", function (error) {
//   console.log("error kafka consumer", error);
// });

server.listen(port, function () {
  console.log("Server started on port " + port);
  require("./routes")(
    app,
    client_redis,
    pushDataToKafka,
    setFirstTime,
    getisFirstTime,
    getPos,
    setUsername,
    io,
  );
});