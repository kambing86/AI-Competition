const moment = require("moment");

const mongo = require("./mongo");
const transformData = require("./transformData");
const config = require("../../config");

module.exports = async (symbol, data) => {
  const object = {
    symbol,
    data: transformData(data).filter(dayData => moment(dayData.date).isSameOrBefore(config.endTrainingDate)).value()
  };
  const db = await mongo;
  const collection = db.collection("historicalData");
  await collection.update(
    { symbol },
    object,
    { upsert: true }
  );
};
