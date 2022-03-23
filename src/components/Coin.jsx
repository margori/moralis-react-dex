import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cell = styled.td`
  border: 1px solid #cccccc;
  width: 20vw;
`;

const Coin = ({ name, ticker, price }) => {
  const [currentPrice, setCurrentPrice] = useState(price);

  const handleClick = (e) => {
    const randomPercentage = 0.995 + Math.random() * 0.01;
    const newPrice = currentPrice * randomPercentage;
    setCurrentPrice(newPrice);
  };

  return (
    <tr>
      <Cell>{name}</Cell>
      <Cell>{ticker}</Cell>
      <Cell>{Math.round(currentPrice * 100) / 100} USD</Cell>
      <Cell>
        <button onClick={handleClick}>Refresh</button>
      </Cell>
    </tr>
  );
};

Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Coin;
