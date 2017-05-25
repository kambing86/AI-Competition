module.exports = {
  developerMode: true,
  endTrainingDate: "2010-12-31",
  sourceUrl: {
    quandl: "https://www.quandl.com/api/v3/datasets/WIKI/{{symbol}}.csv",
    yahoo: "http://ichart.finance.yahoo.com/table.csv?s={{symbol}}&a=00&b=01&c=1900&d=11&e=31&f={{currentYear}}&g=d&ignore=.csv"
  },
  source: "quandl",
  symbols: ["AAPL", "AMZN", "BA", "CSCO", "DIS", "FB", "GOOG", "INTC", "KO", "MCD", "MSFT", "NFLX", "NKE", "TSLA", "V", "XOM"]
};
