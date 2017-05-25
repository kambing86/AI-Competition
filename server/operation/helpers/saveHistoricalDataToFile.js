const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const getPath = require("./getPath");
const historicalDataPath = require("./historicalDataPath");

(async () => {
  try { await fs.accessAsync(getPath(__dirname, historicalDataPath), fs.constants.R_OK); }
  catch (e) { await fs.mkdirAsync(getPath(__dirname, historicalDataPath)); }
})();

module.exports = async (symbol, data) => {
  await fs.writeFileAsync(getPath(__dirname, historicalDataPath, `${symbol}.csv`), data);
};
