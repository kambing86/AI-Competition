const fs = require("fs");

const getPath = require("./helpers/getPath");
const getData = require("./helpers/getData");
const config = require("../config");

module.exports = app => {
  app.get("/quote/:symbol", async (req, res) => {
    if (!config.developerMode) {
      res.end();
      return;
    }
    const { symbol } = req.params;
    const data = await getData(`http://download.finance.yahoo.com/d/quotes.csv?s=${symbol}&f=aa2bb2b3b4cc1c3c4c6c8dd1d2ee1e7e8e9ghjkg1g3g4g5g6ii5j1j3j4j5j6k1k2k4k5ll1l2l3mm2m3m4m5m6m7m8nn4opp1p2p5p6qrr1r2r5r6r7ss1s7t1t7t8vv1v7ww1w4xy`, res);
    await fs.writeFileSync(getPath(__dirname, "../data/quote", `${symbol}.csv`), data);
  });
};
