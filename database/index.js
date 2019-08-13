const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cryptoriders', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('Connected to database');
});

const portfolioSchema = new mongoose.Schema({
  name: String,
  coins: [{
    id: Number,
    name: String,
    symbol: String,
    price: Number,
    percent_change_1h: Number
  }]
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
