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
let position = {
  lat: "13.73826" ,
  lng: "100.532413",
}
let username = "" 
//kafka
const time = config.TimeDisappearAcs;
const car_id = config.CarID;

const Producer = Kafka.Producer;

const client = new Kafka.KafkaClient({
  kafkaHost: config.KafkaHost,
  idleConnection: 24 * 60 * 60 * 1000,
  sasl: {mechanism: 'plain', username:config.KafkaUsernameOnCln , password: config.KafkaPasswordOnCln},
});
const client_in_car = new Kafka.KafkaClient({
  kafkaHost: config.KafkaHostInCar,
  idleConnection: 24 * 60 * 60 * 1000,
  sasl: {mechanism: 'plain', username:config.KafkaUsernameInCar , password: config.KafkaPasswordInCar},
});

const producer = new Producer(client_in_car, {
  partitionerType: 2,
});

producer.on("ready", async function () {
  console.log("Kafka Producer is Ready");
});

producer.on("error", function (err) {
  console.log(err);
  console.log("Kafka Producer is error");
  
});

const producer1 = new Producer(client, {
  partitionerType: 2,
});

producer1.on("ready", async function () {
  console.log("Kafka Producer is Ready");
});

producer1.on("error", function (err) {
  console.log(err);
  console.log("Kafka Producer is error");
  
});

const pushDataToKafka = (topic,dataToPush) => {
  let payloadToKafkaTopic = [
    { topic: topic, messages: JSON.stringify(dataToPush) },
  ];
  console.log(payloadToKafkaTopic);
  producer.send(payloadToKafkaTopic, (err, data) => {
    if (err) {
      console.log("kafka-producer failed",err);
      pushDataToKafka(topic,dataToPush)
    }
    console.log("kafka-producer success");
  });
};


const pushDataToKafkaOnCln = (topic,dataToPush) => {
  dataToPush["lat"] = position.lat.toString();
  dataToPush["lng"] = position.lng.toString();
  dataToPush["username"] = username
  let payloadToKafkaTopic = [
    { topic: topic, messages: JSON.stringify(dataToPush) },
  ];
  console.log(payloadToKafkaTopic);
  producer1.send(payloadToKafkaTopic, (err, data) => {
    if (err) {
      console.log("kafka-producer failed");
      pushDataToKafkaOnCln(topic,dataToPush)
    }

    console.log("kafka-producer success");
  });
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


const setFirstTime = () => {
  isFirstTime = false;
};
const getisFirstTime = () => {
  return isFirstTime;
};
const setUsername = (name) => {
  username = name;
};


client_redis.on("connect", function () {
  console.log("Connected to Redis...");
  require("./route1")(
    app,
    client_redis,
    pushDataToKafka,
    setFirstTime,
    getisFirstTime,
    pushDataToKafkaOnCln,
    setUsername,
  );
});

//socket
let server = require("http").Server(app);
let io = require("socket.io")(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling", "flashsocket"],
});

server.listen(port, function () {
  console.log("Server started on port " + port);
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("sent-message", function (message) {
    console.log(message);
  });
  socket.on("position",function (message) {
    position.lng = message.lng ;
    position.lat = message.lat;
  })
});

const Consumer = Kafka.Consumer;

let consumer = new Consumer(
  client,
  [{ topic: config.KafkaActTopic, partition: 0 }],
  {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "utf8",
    fromOffset: false,
  }
);
consumer.on("message", async function (message) {
  const data = JSON.parse(message.value);
  const condition = data.condition;
  console.log(data);

  if (!isFirstTime && condition) {
    if (condition.trim() == "ACS") {
      // if(data.username == username ){
      //   return
      // }
      let value = {
        "lat": Number(data.lat),
        "lng": Number(data.lng),
      };
      client_redis.setex(
        JSON.stringify(value),
        time,
        "",
        function (err, reply) {
          if (err) {
            console.log(err);
          }
          console.log(reply);
        }
      );
    } else {
      console.log("kafka not in condition", data);
    }

    client_redis.keys("*", function (err, keys) {
      if (err) return console.log(err);
      if (keys) {
        console.log("soc");
        io.emit("sent-message", { data: keys });
        console.log("hey");
        
      }
    });
  }
});

consumer.on("error", function (error) {
  console.log("error kafka consumer", error);
});

let consumer1 = new Consumer(
  client_in_car,
  [{ topic: config.KafkaMusicTopic, partition: 0 },{ topic: config.KafkaAICTopic, partition: 0 }],
  {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "utf8",
    fromOffset: false,
  }
);
consumer1.on("message", async function (message) {
  const data = JSON.parse(message.value);
  const condition = data.condition;
  console.log(data);

  if (condition) {
    if (condition.trim() == "AIC") {
      //try sth
      io.emit("warning",{data:"accident"})
      pushDataToKafkaOnCln(config.KafkaActTopic,{
        username: username,
        carID: car_id,
        condition: 'ACS',
        time: (new Date()).toISOString(),
      })
    } else if(condition.trim() == "Sound"){
      //try sth
      socket.emit("Sound",{data: data.response_time})
    }
      else if(condition.trim() == "hs"){
        console.log("kafka start connection", data);
      }
      else {
        console.log("kafka not in condition", data);
      }
    }
    else {
      console.log("kafka dont have condition key", data);
    }
    //redis ice
    
  
});

consumer1.on("error", function (error) {
  console.log("error kafka consumer", error);
});