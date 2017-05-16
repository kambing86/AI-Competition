const getData = require("./helpers/getData");
const historicalDataUrl = require("./helpers/historicalDataUrl");
const saveHistoricalDataToFile = require("./helpers/saveHistoricalDataToFile");
const saveHistoricalDataToMongoDB = require("./helpers/saveHistoricalDataToMongoDB");
const config = require("../config");

module.exports = app => {
  app.get("/historicalData/:symbol", async (req, res) => {
    if (!config.developerMode) {
      res.end();
      return;
    }
    const { symbol } = req.params;
    const data = await getData(historicalDataUrl(symbol), res);
    await saveHistoricalDataToFile(symbol, data);
    await saveHistoricalDataToMongoDB(symbol, data);
  });
};
