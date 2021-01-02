require('dotenv').config();

const config = {
  KafkaHostInCar:process.env.KAFKA_HOST_CAR,
  KafkaHost:process.env.KAFKA_HOST,
  KafkaTopic: process.env.KAFKA_TOPIC,
  KafkaTopicInCar: process.env.TRANSACTIONS_TOPIC_IN_CAR,
  CloundSever: process.env.API_TO_CLOUND_SERVER,
  TimeDisappearAcs: 3600
};

module.exports = config;

