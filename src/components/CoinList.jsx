import React from 'react';
import Coin from './Coin';
import styled from 'styled-components';

const Table = styled.table`
  display: inline-block;
  margin: 50px auto 50px auto;
  font-size: 1.4rem;
`;

const CoinList = ({ showBalances, coinData, handleRefresh }) => (
  <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Ticker</th>
        <th>Price</th>
        {showBalances && <th>Balance</th>}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {coinData.map((c) => (
        <Coin
          key={c.id}
          {...c}
          showBalances={showBalances}
          handleRefresh={handleRefresh}
        />
      ))}
    </tbody>
  </Table>
);

export default CoinList;
