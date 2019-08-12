import React, { useState, useEffect } from 'react';
import Coin from './Coin';
import axios from 'axios';

const App = () => {
  const [coins, setCoin] = useState([ ]);
  const [newCoin, setNewCoin] = useState({symbol: ''});
  const [url, setUrl] = useState('');

  const addCoin = (e) => {
    setCoin([...coins, { symbol: newCoin.symbol } ]);
    setUrl(newCoin.symbol);
    e.preventDefault();
  };

  useEffect(() => {
    console.log(coins.length)
    if (coins.length === 0) {
      return
    }
    let queryString = coins.map(coin => coin.symbol).join(',');
    console.log(coins);
    axios.get(`/api/tickers/${queryString}`)
      .then(( { data } ) => {
        setCoin([...data]);
      })
  }, [url]);

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
        { coins.map ( coin => <Coin coin={coin} key={coin.symbol}/> ) }
        </tbody>
      </table>
    </div>
  );  
}

export default App;