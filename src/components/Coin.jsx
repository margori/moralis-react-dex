import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cell = styled.td`
  border: 1px solid #cccccc;
  width: 20vw;
`;

const Coin = ({ name, ticker, price, handleRefresh }) => (
  <tr>
    <Cell>{name}</Cell>
    <Cell>{ticker}</Cell>
    <Cell>{Math.round(price * 100) / 100} USD</Cell>
    <Cell>
      <button onClick={() => handleRefresh(ticker)}>Refresh</button>
    </Cell>
  </tr>
);

Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Coin;
