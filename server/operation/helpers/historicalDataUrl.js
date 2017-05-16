module.exports = symbol => {
  const currentYear = new Date().getFullYear();
  return `http://ichart.finance.yahoo.com/table.csv?s=${symbol}&a=00&b=01&c=1900&d=11&e=31&f=${currentYear}&g=d&ignore=.csv`;
};
