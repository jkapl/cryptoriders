const portfolio = require('./index');

module.exports = {

  savePortfolio: (req, res) => {
    console.log(req.body)
    const newPortfolio = new portfolio(req.body);
    newPortfolio.save((err, doc) => {
      if (err) {
        console.log(err)
      } else {
        console.log('saved to database')
        res.sendStatus(200);
      }
    })
  },

  getPortfolio: (req, res) => {
    console.log(req.params.portfolio);
    portfolio.findOne({
      name: req.params.portfolio
    }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result);
        res.send(result);
      }
    })
  }

};
