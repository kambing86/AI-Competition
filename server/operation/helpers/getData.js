const request = require("request");

module.exports = async (url, response) => {
  const body = await new Promise((resolve, reject) => {
    var requestObj = request.get(url,
      (err, response, body) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(body);
        }
      });
    if (response) {
      requestObj.on("response", res => {
        res.pipe(response);
      });
    }
  });
  return body;
};
