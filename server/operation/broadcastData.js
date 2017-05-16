const Promise = require("bluebird");
const redis = require("redis");
const moment = require("moment");
const fs = Promise.promisifyAll(require("fs"));

const getPath = require("./helpers/getPath");
const historicalDataPath = require("./helpers/historicalDataPath");
const transformData = require("./helpers/transformData");
const config = require("../config");

const redisUrl = "redis://redis:6379";
const sub = redis.createClient(redisUrl);
const pub = redis.createClient(redisUrl);

const log4js = require("log4js");
const logger = log4js.getLogger();

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startBroadcast(symbol, data) {
  const actionChannel = `${symbol}_action`;
  sub.on("message", (channel, message) => {
    logger.info(channel, message);
  });
  sub.on("subscribe", (channel, count) => {
    logger.info(channel, count);
    if (channel === actionChannel) {
      (async () => {
        const dataAry =
          transformData(data)
            .sortBy(dayData => dayData.date)
            .filter(dayData => moment(dayData.date).isAfter(config.endTrainingDate)).value();
        for (const dayData of dataAry) {
          await timeout(1000);
          pub.publish(symbol, JSON.stringify(dayData));
        }
      })();
    }
  });
  sub.subscribe(actionChannel);
  sub.subscribe(symbol);
}

module.exports = app => {
  app.get("/broadcastData/:symbol", async (req, res) => {
    const { symbol } = req.params;
    const filePath = getPath(__dirname, historicalDataPath, symbol + ".csv");
    try {
      const data = await fs.readFileAsync(filePath);
      startBroadcast(symbol, data);
      res.end("Done");
    }
    catch (e) {
      res.end("Symbol not found");
    }
  });
};
