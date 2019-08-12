import React from 'react';

const Coin = ( { coin } ) => {
  const { id, name, symbol, price, percent_change_1h } = coin;
  return <li>{name}  |  {symbol}  |  {price}  |  {percent_change_1h}</li>
}

export default Coin;