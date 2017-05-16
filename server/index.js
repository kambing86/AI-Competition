const express = require("express");

const historicalData = require("./operation/historicalData");
const quote = require("./operation/quote");
const broadcastData = require("./operation/broadcastData");
const getHistoricalData = require("./operation/getHistoricalData");
const app = express();

const log4js = require("log4js");
log4js.configure({
  appenders: [
    { type: "console" },
    { type: "file", filename: "logs/server.log", category: "file" }
  ]
});

historicalData(app);
quote(app);
broadcastData(app);
getHistoricalData(app);

// require("./operation/populateData")(false);

app.listen(3001);
