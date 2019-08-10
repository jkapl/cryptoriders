import React, { useState } from 'react';

const App = () => {
  const [coin, setCoin] = useState({ name: 'Bitcoin', price: 0, marketCap: 10 });
  return (
    <div>
      <h1>{coin.name}</h1>
      <button onClick={() => setCoin({name: 'Ethereum'})}>
        Click here
      </button>
    </div>
  );  
}

export default App;