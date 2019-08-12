import React from 'react';

const Coin = ( { coin } ) => {
  const { id, name, symbol, price, percent_change_1h } = coin;
  return (
  <tr>
    <td>{name}</td><td>{symbol}</td><td>{price}</td><td>{percent_change_1h}</td>
  </tr>
  )
}

export default Coin;