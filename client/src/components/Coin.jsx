import React from 'react';

const Coin = (props) => {
  const { coinName } = props;
  return <li>{coinName}</li>
}

export default Coin;