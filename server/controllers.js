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
    let tickersForApi = marketCapIDs.join(',');
    //coinmarketcap api for current data
    axios({
      method: 'get',
      url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
      headers: { 'X-CMC_PRO_API_KEY': config.cmc },
      params: {
        id: `${tickersForApi}`
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
    //nomics api for historical data
    axios({
      method: 'get',
      url: `https://api.nomics.com/v1/currencies/ticker?key=${config.nomics}&ids=${tickersForApi}&interval=1d,30d`
    })
    .then( ({ data }) => {
      console.log(data);
    })
  },
};
