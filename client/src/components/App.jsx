import React, { useState, useEffect } from 'react';
import Coin from './Coin';
import axios from 'axios';

const App = () => {
  const [coins, setCoin] = useState([ ]);
  const [newCoin, setNewCoin] = useState({coinName: ''});

  const addCoin = (e) => {
    e.preventDefault();
    setCoin([...coins, { coinName: newCoin.coinName } ])
  };

  useEffect(() => {
    if (coins.length === 0) {
      return
    }
    let queryString = coins.map(coin => {
      return coin.coinName
    }).join(',');
    axios.get(`/api/${queryString}`)
      .then(response => {
        coins.filter(coin => {
          coin.coinName === 
        });
        setCoin([{coinName: 'bitcoin', price: response.data}]);
      })
  }, [coins]);

  return (
    <div>
      <h1>Ride the crypto dragon!</h1>
      <form>
        <label>
          Add coin:
            <input type="text" name="coin" placeholder="coin" value={newCoin.coinName} onChange={e => setNewCoin({coinName: e.target.value})}></input>
        </label>
        <button onClick={ e => addCoin(e) }>
          Click here
        </button>
      </form>
      <ul>
        { coins.map ( coin => <Coin coin={coin} key={coin.coinName}/> ) }
      </ul>
    </div>
  );  
}

export default App;