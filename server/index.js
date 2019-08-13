const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const controllers = require('./controllers');
const models = require('../database/models');

app.use(express.static(path.join(__dirname, '../client/public/dist')));
app.use(express.json());

app.get('/api/tickers/:querytickers', controllers.searchTicker);
app.get('/api/portfolios/:portfolio', models.getPortfolio)
app.post('/api/portfolios', models.savePortfolio);

app.listen(port, () => console.log(`Listening on port ${port}`));