const _ = require("lodash");

module.exports = data => {
  const dataAry = data.toString().split("\n");
  return _(dataAry).drop(1).dropRight(1).map(strDayData => {
    const dayDataAry = strDayData.split(",");
    const [date, open, high, low, close, volume, adjClose] = dayDataAry;
    return {
      date, open, high, low, close, volume, adjClose
    };
  });
};
