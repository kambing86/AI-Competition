const MongoClient = require("mongodb").MongoClient;

module.exports = (async () => {
  const db = await MongoClient.connect("mongodb://mongodb:27017/stock");
  const collections = await db.collections();
  const toCreateIndexAry = {
    historicalData: {
      symbol: 1
    }
  };
  for (const collection of collections) {
    toCreateIndexAry[collection.collectionName] = false;
  }
  for (const collectionName in toCreateIndexAry) {
    if (toCreateIndexAry[collectionName] !== false) {
      const collection = await db.collection(collectionName);
      await collection.createIndex({
        "symbol": 1
      });
      await collection.createIndex({
        "symbol": 1,
        "data.date": 1
      });
    }
  }
  return db;
})();
