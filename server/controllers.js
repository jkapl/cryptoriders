const axios = require('axios');
const marketcapIDMap = require('../coinmap');
const config = require('../config');

module.exports = {
  searchTicker: (req, res) => {
    let marketCapIDs = [];
    let tickers = req.params.querytickers.toUpperCase().split(',');
    tickers.forEach(ticker => {
      for (let i = 0; i < marketcapIDMap.data.length; i++) {
        if (marketcapIDMap.data[i].symbol === ticker) {
          marketCapIDs.push(marketcapIDMap.data[i].id)
        }
      }
    });
    let idString = marketCapIDs.join(',');
    axios({
      method: 'get',
      url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
      headers: { 'X-CMC_PRO_API_KEY': config.cmc },
      params: {
        id: `${idString}`
      }
    })
    .then(({ data }) => {
      console.log('hit coinmarketcap')
      let quotes = []
      let coinIds = Object.keys(data.data)
      for (let i = 0; i < coinIds.length; i++) {
        let { id, name, symbol } = data.data[coinIds[i]];
        let { price, percent_change_1h } = data.data[coinIds[i]].quote.USD;
        quotes.push({ id, name, symbol, price, percent_change_1h });
      }
      res.send(JSON.stringify(quotes));
    })
    .catch((err) => {
      console.log(err);
    });
  },
};
