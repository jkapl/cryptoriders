import React, { useState, useEffect } from 'react';
import Coin from './Coin';
import axios from 'axios';

const App = () => {
  const [coins, setCoin] = useState([ ]);
  const [newCoin, setNewCoin] = useState({coinTicker: ''});

  const addCoin = (e) => {
    e.preventDefault();
    setCoin([...coins, { coinTicker: newCoin.coinTicker } ])
  };

  useEffect(() => {
    if (coins.length === 0) {
      return
    }
    let queryString = coins.map(coin => {
      return coin.coinTicker
    }).join(',');
    axios.get(`/api/tickers/${queryString}`)
      .then(( { data } ) => {
        setCoin([...data]);
      })
  }, [coins]);

  return (
    <div>
      <h1>Add your crypto portfolio!</h1>
      <form>
        <label>
          Add coin by entering a ticker:
            <input type="text" name="coin" placeholder="coin" value={newCoin.coinTicker} onChange={e => setNewCoin({coinTicker: e.target.value})}></input>
        </label>
        <button onClick={ e => addCoin(e) }>
          Click here
        </button>
      </form>
      <ul>
        { coins.map ( coin => <Coin coin={coin} key={coin.name}/> ) }
      </ul>
    </div>
  );  
}

export default App;