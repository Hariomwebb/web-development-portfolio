const { Queue } = require("bullmq");
const IORedis = require("ioredis");
const config = require("./config");

const connection = new IORedis(config.redisUrl, {
  maxRetriesPerRequest: null,
});

const deploymentQueue = new Queue(config.queueName, { connection });

module.exports = { connection, deploymentQueue };
