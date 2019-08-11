import React, { useState, useEffect } from 'react';
import Coin from './Coin';

const App = () => {
  const [coins, setCoin] = useState([{ coinName: 'Bitcoin', price: 11000 }]);
  const [newCoin, setNewCoin] = useState({coinName: ''});
  const addCoin = (e) => {
    e.preventDefault();
    setCoin([...coins, { coinName: newCoin.coinName } ])
  };
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
        { coins.map ( coin => <Coin coinName={coin.coinName} key={coin.coinName}/> ) }
      </ul>
    </div>
  );  
}

export default App;