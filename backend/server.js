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
const time = config.TimeDisappearAcs;
const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({
  kafkaHost: config.KafkaHost,
  idleConnection: 24 * 60 * 60 * 1000,
  // sasl: {mechanism: 'plain', username:config.UsernameOnCln , password: config.PasswordOnCln},
});
const client_in_car = new Kafka.KafkaClient({
  kafkaHost: config.KafkaHostInCar,
  idleConnection: 24 * 60 * 60 * 1000,
  // sasl: {mechanism: 'plain', username:config.UsernameOnCln , password: config.PasswordOnCln}
});
const producer = new Producer(client_in_car, {
  requireAcks: 0,
  partitionerType: 2,
});

producer.on("ready", async function () {
  console.log("Kafka Producer is Ready");
});

producer.on("error", function (err) {
  console.log(err);
  console.log("Kafka Producer is error");
  throw err;
});

const pushDataToKafka = (dataToPush) => {
  let payloadToKafkaTopic = [
    { topic: config.KafkaTopicInCar, messages: JSON.stringify(dataToPush) },
  ];
  console.log(payloadToKafkaTopic);
  producer.send(payloadToKafkaTopic, (err, data) => {
    if (err) {
      console.log("kafka-producer failed");
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

//socket
let server = require("http").Server(app);
let io = require("socket.io")(server, {
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
});

const Consumer = Kafka.Consumer;

let consumer = new Consumer(
  client,
  [{ topic: config.KafkaTopic, partition: 0 }],
  {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "utf8",
    // fromOffset: false,
  }
);
consumer.on("message", async function (message) {
  const data = JSON.parse(message.value);
  const condition = data.condition;
  console.log(data);
  if (!isFirstTime && condition) {
    if (condition.trim() == "ACS") {
      let value = {
        lat: Number(data.lat),
        lng: Number(data.lng),
      };
      client_redis.setex(
        JSON.stringify(value),
        time,
        "",
        function (err, reply) {
          if (err) {
            console.log(err);
          }
          id = id + 1;
          console.log(reply);
        }
      );
      //redis ice
      client_redis.keys("*", function (err, keys) {
        if (err) return console.log(err);
        if (keys) {
          io.emit("sent-message", { data: keys });
          console.log("hey");
          // res.json({ data: keys });
        }
      });
    } else {
      console.log("kafka not in condition", data);
    }
  }
});

consumer.on("error", function (error) {
  console.log("error kafka consumer", error);
});
