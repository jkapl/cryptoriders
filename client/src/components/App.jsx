import React, { useState, useEffect } from 'react';
import Coin from './Coin';
import axios from 'axios';

const App = () => {
  const [coins, setCoin] = useState([ ]);
  const [newCoin, setNewCoin] = useState({symbol: ''});
  const [coinToGet, getCoin] = useState('');

  const addCoin = (e) => {
    setCoin([...coins, { symbol: newCoin.symbol } ]);
    getCoin(newCoin.symbol);
    e.preventDefault();
  };

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
    }, 10000);
  }, [coinToGet]);

  return (
    <div>
      <h1>Add your crypto portfolio!</h1>
      <form>
        <label>
          Add coin by entering a ticker:
            <input type="text" name="coin" placeholder="coin" value={newCoin.symbol} onChange={e => setNewCoin({symbol: e.target.value})}></input>
        </label>
        <button onClick={ e => addCoin(e) }>
          Click here
        </button>
      </form>
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