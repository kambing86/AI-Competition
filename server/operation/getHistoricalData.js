const mongo = require("./helpers/mongo");

module.exports = app => {
  app.get("/get/:symbol", async (req, res) => {
    const { symbol } = req.params;
    const db = await mongo;
    const data = await db.collection("historicalData").find({ symbol }).toArray();
    res.json(data);
  });
};
