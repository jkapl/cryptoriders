const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');

const config = require('../config');
const coinmap = require('../coinmap.js');

app.use(express.static(path.join(__dirname, '../client/public/dist')));

app.get('/api/tickers/:querytickers', (req, res) => {
  let ids = []
  let upperCaseTickers = req.params.querytickers.toUpperCase();
  let commaSepTickers = upperCaseTickers.split(',');
  commaSepTickers.forEach(ticker => {
    for (let i = 0; i < coinmap.data.length; i++) {
      if (coinmap.data[i].symbol === ticker) {
        ids.push(coinmap.data[i].id)
      }
    }
  });
  let idString = ids.join(',');
  axios({
    method: 'get',
    url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
    headers: { 'X-CMC_PRO_API_KEY': config },
    params: {
      id: `${idString}`
    }
  })
  .then(({ data }) => {
    console.log('hit coinmarketcap')
    let result = []
    let coinIds = Object.keys(data.data)
    for (let i = 0; i < coinIds.length; i++) {
      let { id, name, symbol } = data.data[coinIds[i]];
      let { price, percent_change_1h } = data.data[coinIds[i]].quote.USD;
      result.push({ id, name, symbol, price, percent_change_1h });
    }
    res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));