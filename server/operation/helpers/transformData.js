const _ = require("lodash");
const camelcase = require("camelcase");

module.exports = data => {
  const dataAry = data.toString().split("\n");
  const headers = _(dataAry).head().split(",").map(name => camelcase(name));
  return _(dataAry).drop(1).dropRight(1).map(strDayData => {
    const dayDataAry = strDayData.split(",");
    const pairData = [];
    for (const index in headers) {
      pairData.push([headers[index], dayDataAry[index]]);
    }
    return _.fromPairs(pairData);
  });
};
