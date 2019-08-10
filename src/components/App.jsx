import React, { useState } from 'react';

const App = () => {
  const [coin, setCoin] = useState({ name: 'Bitcoin', price: 0, marketCap: 10 });
  return <h1>{coin.price}</h1>
}

export default App;