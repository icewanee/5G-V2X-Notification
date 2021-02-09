require('dotenv').config();

const config = {
  KafkaHostInCar:process.env.KAFKA_HOST_CAR,
  KafkaHost:process.env.KAFKA_HOST,
  KafkaTopic: process.env.KAFKA_TOPIC,
  KafkaTopicInCar: process.env.TRANSACTIONS_TOPIC_IN_CAR,
  CloundSever: process.env.API_TO_CLOUND_SERVER,
  TimeDisappearAcs: 3600,
  KafkaUsernameInCar: process.env.USERNAME_KAFKA_IN_CAR,
  KafkaPasswordInCar: process.env.PASSWORD_KAFKA_IN_CAR,
  KafkaUsernameOnCln: process.env.USERNAME_KAFKA_ON_CLN,
  KafkaPasswordOnCln: process.env.PASSWORD_KAFKA_ON_CLN,
};

module.exports = config;

