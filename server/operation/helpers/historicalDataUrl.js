const config = require("../../config");
const sourceUrl = config.sourceUrl[config.source];

function getUrl(options) {
  var returnString = sourceUrl;
  for (const key in options) {
    returnString = returnString.replace(new RegExp(`{{${key}}}`, "g"), options[key]);
  }
  return returnString;
}

module.exports = symbol => {
  const currentYear = new Date().getFullYear();
  return getUrl({
    symbol,
    currentYear
  });
};
