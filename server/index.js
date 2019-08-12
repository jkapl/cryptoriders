const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');

const config = require('../config');

app.use(express.static(path.join(__dirname, '../client/public/dist')));

app.get('/api/:coin', (req, res)=>{
  axios({
    method: 'get',
    url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
    headers: { 'X-CMC_PRO_API_KEY': config.key },
    params: {
      slug: `${req.params.coin}`
    }
  })
    .then( (response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    })
});

app.listen(port, ()=>console.log(`Listening on port ${port}`));