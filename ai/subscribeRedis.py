import redis
import json
import learnStock


def run():
    redisInstance = redis.StrictRedis(host="redis", port=6379, db=0)
    pubsub = redisInstance.pubsub()

    def my_handler(message):
        data = json.loads(message['data'].decode('utf-8'))
        print(data)
        learnStock.run(data)

    pubsub.subscribe(**{'AAPL': my_handler})
    pubsub.run_in_thread(sleep_time=0.001)
