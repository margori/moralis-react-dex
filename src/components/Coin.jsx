import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fm, format } from '../formatter';

const Cell = styled.td`
  border: 1px solid #cccccc;
  width: 18vw;
`;

const Button = styled.button`
  margin: 5px;
`;

const Coin = ({
  id,
  name,
  ticker,
  price,
  balance,
  showBalances,
  handleRefresh,
  handleBuy,
  handleSell,
}) => (
  <tr>
    <Cell>{name}</Cell>
    <Cell>{ticker}</Cell>
    <Cell>{fm(price)}</Cell>
    {showBalances && (
      <Cell className={balance < 0 ? 'text-danger' : ''}>{`${balance} / ${fm(
        balance * price
      )}`}</Cell>
    )}
    <Cell>
      <Button className="btn btn-primary" onClick={() => handleRefresh(id)}>
        Refresh
      </Button>
      <Button className="btn btn-info" onClick={() => handleBuy(id, 1)}>
        Buy
      </Button>
      <Button className="btn btn-warning" onClick={() => handleSell(id, 1)}>
        Sell
      </Button>
    </Cell>
  </tr>
);

Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  showBalances: PropTypes.bool,
};

export default Coin;
