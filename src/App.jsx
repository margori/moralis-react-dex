import React, { useState } from 'react';
import Header from './components/Header';
import AccountBalance from './components/AccountBalance';
import CoinList from './components/CoinList';
import styled from 'styled-components';

const AppData = {
  balance: 10000,
  coins: [
    { name: 'Bitcoin', ticker: 'BTC', price: 9999.99 },
    { name: 'Ethereum', ticker: 'ETH', price: 299.99 },
    { name: 'Tether', ticker: 'USDT', price: 1.0 },
    { name: 'Ripple', ticker: 'XRP', price: 0.2 },
  ],
};

const Container = styled.div`
  text-align: center;
  background-color: rgb(20, 56, 97);
  color: #cccccc;
`;

const App = () => {
  const [currentAppData, setAppData] = useState(AppData);

  const handleRefresh = (ticker) => {
    const newCoins = currentAppData.coins.map((c) => {
      let newPrice = c.price;
      if (c.ticker === ticker) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newPrice = newPrice * randomPercentage;
      }
      return { ...c, price: newPrice };
    });
    setAppData({
      ...currentAppData,
      coins: newCoins,
    });
  };

  return (
    <Container>
      <Header />
      <AccountBalance amount={currentAppData.balance} />
      <CoinList cointData={currentAppData} handleRefresh={handleRefresh} />
    </Container>
  );
};

export default App;
