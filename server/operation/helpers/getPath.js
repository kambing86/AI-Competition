const path = require("path");

module.exports = (from, ...rest) => {
  return path.join(from, path.relative(from, path.join(...rest)));
};
