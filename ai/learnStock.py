import tensorflow as tf


def run(data):
    # Model parameters
    a = tf.Variable([1.], tf.float32)
    b = tf.Variable([1.], tf.float32)
    c = tf.Variable([1.], tf.float32)
    # Model input and output
    openPrice = tf.placeholder(tf.float32)
    highPrice = tf.placeholder(tf.float32)
    lowPrice = tf.placeholder(tf.float32)
    totalVolume = tf.placeholder(tf.float32)
    closePrice = tf.placeholder(tf.float32)

    # linear_model = a * openPrice * \
    # b * ((highPrice + lowPrice) / 2) * totalVolume + c
    linear_model = a * openPrice + c

    # loss
    # sum of the squares
    loss = tf.reduce_sum(tf.square(linear_model - closePrice))
    # optimizer
    optimizer = tf.train.GradientDescentOptimizer(0.01)
    train = optimizer.minimize(loss)

    # training loop
    init = tf.global_variables_initializer()
    sess = tf.Session()
    sess.run(init)  # reset values to wrong

    for i in range(1000):
        # sess.run(train, {openPrice: float(data["open"]),
        #                  highPrice: float(data["high"]),
        #                  lowPrice: float(data["low"]),
        #                  totalVolume: float(data["volume"]),
        #                  closePrice: float(data["close"])})
        sess.run(train, {openPrice: float(data["open"]),
                         closePrice: float(data["close"])})

    # cur_a, cur_b, cur_c, cur_loss = \
    #     sess.run([a, b, c, loss], {openPrice: float(data["open"]),
    #                                highPrice: float(data["high"]),
    #                                lowPrice: float(data["low"]),
    #                                totalVolume: float(data["volume"]),
    #                                closePrice: float(data["close"])})
    cur_a, curr_loss = sess.run([a, loss], {openPrice: float(data["open"]),
                                            closePrice: float(data["close"])})

    # evaluate training accuracy
    print("a: %s loss: %s" % (cur_a, curr_loss))
