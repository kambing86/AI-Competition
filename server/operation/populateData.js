const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

const getData = require("./helpers/getData");
const getPath = require("./helpers/getPath");
const historicalDataPath = require("./helpers/historicalDataPath");
const historicalDataUrl = require("./helpers/historicalDataUrl");
const saveHistoricalDataToFile = require("./helpers/saveHistoricalDataToFile");
const saveHistoricalDataToMongoDB = require("./helpers/saveHistoricalDataToMongoDB");

module.exports = async update => {
  const files = await fs.readdirAsync(getPath(__dirname, historicalDataPath));
  for (const file of files) {
    const filePath = getPath(__dirname, historicalDataPath, file);
    const symbol = path.basename(filePath, path.extname(filePath));
    var data;
    if (update) {
      data = await getData(historicalDataUrl(symbol));
      await saveHistoricalDataToFile(symbol, data);
    }
    else {
      data = await fs.readFileAsync(filePath);
    }
    await saveHistoricalDataToMongoDB(symbol, data);
  }
};
