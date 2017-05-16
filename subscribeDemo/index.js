const redis = require("redis");
const redisUrl = "redis://redis:6379";
const sub = redis.createClient(redisUrl);
const pub = redis.createClient(redisUrl);

sub.on("message", (channel, message) => {
  console.log(channel, message);
  pub.publish(`${channel}_action`, "buy");
});

sub.subscribe("AAPL");