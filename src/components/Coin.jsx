import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cell = styled.td`
  border: 1px solid #cccccc;
  width: 18vw;
`;

const Coin = ({
  name,
  ticker,
  price,
  balance,
  showBalances,
  handleRefresh,
}) => (
  <tr>
    <Cell>{name}</Cell>
    <Cell>{ticker}</Cell>
    <Cell>{Math.round(price * 100) / 100} USD</Cell>
    {showBalances && <Cell>{balance}</Cell>}
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
