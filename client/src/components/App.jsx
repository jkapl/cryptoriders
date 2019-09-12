import React, { useState, useEffect } from 'react';
import Coin from './Coin';
import axios from 'axios';
import Chart from 'chart.js';

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
    axios.get(`/api/portfolios/${e.target.value}`)
      .then( ({ data }) => {
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
    let intervalId = setInterval(()=> {
      axios.get(`/api/tickers/${queryString}`)
        .then(( { data } ) => {
          setCoin([...data]);
        })
    }, 15000);

    //clean up on componentWillUnmount (hooks style)
    return () => { clearInterval(intervalId) };
  }, [coinToGet]);

  useEffect(() => {
    const sampleChart = document.getElementById("sampleChart");
    const lineChart = new Chart(sampleChart, {
      type: "line",
        data: {
          labels: ["2018-08-15", "2018-08-16", "2018-08-17", "2018-08-18"],
          datasets: [
            {
              label: 'Bitcoin Price',
              data: [6270.0425, 6314.2413, 6583.2388, 6395.3525]
            }]
        }
      })
  });

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
      <div>
        <canvas style={{width: 800, height:300}} id="sampleChart" ></canvas>
      </div>
    </div>
  );  
}

export default App;