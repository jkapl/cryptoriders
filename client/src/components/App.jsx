import React, { useState, useEffect } from 'react';
import Coin from './Coin';
import axios from 'axios';

const App = () => {
  const [coins, setCoin] = useState([ ]);
  const [newCoin, setNewCoin] = useState({symbol: ''});
  const [coinToGet, getCoin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [portfolios, addPortfolio] = useState([ ]);

  const addCoin = (e) => {
    setCoin([...coins, { symbol: newCoin.symbol } ]);
    getCoin(newCoin.symbol);
    e.preventDefault();
  };

  const showPortfolio = (e) => {
    console.log(e.target.value);
    axios.get(`/api/portfolios/${e.target.value}`)
      .then( ({ data }) => {
        console.log(data);
        setCoin([...data.coins]);
      });
    e.preventDefault();
  }

  const savePortfolio = (e) => {
    addPortfolio([...portfolios, {name: portfolio, coins: coins}]);
    axios({
      method: 'post',
      url: '/api/portfolios',
      data: {
        name: portfolio,
        coins: coins
      }
    });
    e.preventDefault();
  }

  useEffect(() => {
    if (coins.length === 0) {
      return
    }
    let queryString = coins.map(coin => coin.symbol).join(',');
    axios.get(`/api/tickers/${queryString}`)
      .then(( { data } ) => {
        setCoin([...data]);
      })
    for (var i = 0; i < 99999; i++) {
      clearInterval(i);
    }
    let updatePrices = setInterval(()=> {
      axios.get(`/api/tickers/${queryString}`)
        .then(( { data } ) => {
          setCoin([...data]);
        })
    }, 15000);
  }, [coinToGet]);

  return (
    <div>
      <h1>Add your crypto portfolio!</h1>
      <form>
        <label>
          <input type="text" name="portfolio" placeholder="portfolio" value={portfolio} onChange={e => setPortfolio(e.target.value)}></input>
        </label>
        <button onClick={e => savePortfolio(e)}>
          Save this portfolio
        </button>
      </form>
      <ul> {portfolios.map(portfolio => 
        <button value={portfolio.name} onClick={e => showPortfolio(e)}>{portfolio.name}</button>)}
      </ul>
      <form>
        <label>
          Add coin by entering a ticker:
            <input type="text" name="coin" placeholder="coin" value={newCoin.symbol} onChange={e => setNewCoin({symbol: e.target.value})}></input>
        </label>
        <button onClick={ e => addCoin(e) }>
          Click here
        </button>
      </form>
      <br></br>
      <table>
        <tbody>
          <tr> <td>Coin</td><td>Ticker</td><td>Current Price</td><td>Percent Change (1hr)</td> </tr>
        { coins.map ( coin => <Coin coin={coin} key={coin.symbol}/> ) }
        </tbody>
      </table>
    </div>
  );  
}

export default App;