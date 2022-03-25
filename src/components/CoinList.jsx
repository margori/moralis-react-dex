import React from 'react';
import Coin from './Coin';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
`;

const Table = styled.table`
  font-size: 1.4rem;
  vertical-align: middle;
`;

const CoinList = ({
  showBalances,
  coinData,
  handleRefresh,
  handleBuy,
  handleSell,
}) => (
  <Container>
    <Table className="table table-striped">
      <thead>
        <tr className="table-dark">
          <th>Name</th>
          <th>Ticker</th>
          <th>Price</th>
          {showBalances && <th>Quantity/Balance</th>}
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
            handleBuy={handleBuy}
            handleSell={handleSell}
          />
        ))}
      </tbody>
    </Table>
  </Container>
);

export default CoinList;
