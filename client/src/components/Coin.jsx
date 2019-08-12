import React from 'react';

const Coin = ( { coin } ) => {
  const { coinName, price } = coin;
  return <li>{coinName} | {price}</li>
}

export default Coin;