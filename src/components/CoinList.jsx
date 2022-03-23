import React from 'react';
import Coin from './Coin';
import styled from 'styled-components';

const Table = styled.table`
  display: inline-block;
  margin: 50px auto 50px auto;
  font-size: 1.4rem;
`;

const CoinList = ({ cointData }) => (
  <Table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Ticker</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {cointData.coins.map(({ name, ticker, price }) => (
        <Coin key={ticker} name={name} ticker={ticker} price={price} />
      ))}
    </tbody>
  </Table>
);

export default CoinList;
