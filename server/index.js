const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const controllers = require('./controllers');

app.use(express.static(path.join(__dirname, '../client/public/dist')));

app.get('/api/tickers/:querytickers', controllers.searchTicker);

app.listen(port, () => console.log(`Listening on port ${port}`));