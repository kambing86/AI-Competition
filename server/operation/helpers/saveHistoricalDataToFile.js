const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const getPath = require("./getPath");
const historicalDataPath = require("./historicalDataPath");

module.exports = async (symbol, data) => {
  await fs.writeFileAsync(getPath(__dirname, historicalDataPath, `${symbol}.csv`), data);
};
