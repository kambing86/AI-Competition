const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const config = require("../config");
const getData = require("./helpers/getData");
const getPath = require("./helpers/getPath");
const historicalDataPath = require("./helpers/historicalDataPath");
const historicalDataUrl = require("./helpers/historicalDataUrl");
const saveHistoricalDataToFile = require("./helpers/saveHistoricalDataToFile");
const saveHistoricalDataToMongoDB = require("./helpers/saveHistoricalDataToMongoDB");

module.exports = async update => {
  for (const symbol of config.symbols) {
    var data;
    if (update) {
      data = await getData(historicalDataUrl(symbol));
      await saveHistoricalDataToFile(symbol, data);
    }
    else {
      const filePath = getPath(__dirname, historicalDataPath, `${symbol}.csv`);
      data = await fs.readFileAsync(filePath);
    }
    await saveHistoricalDataToMongoDB(symbol, data);
  }
};
