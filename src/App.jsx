import React, { useState } from 'react';
import Header from './components/Header';
import AccountBalance from './components/AccountBalance';
import CoinList from './components/CoinList';
import styled from 'styled-components';

const AppData = {
  balance: 10000,
  showBalances: false,
  coins: [
    { name: 'Bitcoin', ticker: 'BTC', price: 9999.99, balance: 1.2 },
    { name: 'Ethereum', ticker: 'ETH', price: 299.99, balance: 2.3 },
    { name: 'Tether', ticker: 'USDT', price: 1.0, balance: 350 },
    { name: 'Ripple', ticker: 'XRP', price: 0.2, balance: 230 },
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

  const toggleBalances = () => {
    setAppData({
      ...currentAppData,
      showBalances: !currentAppData.showBalances,
    });
  };

  return (
    <Container>
      <Header />
      <AccountBalance
        amount={currentAppData.balance}
        showBalances={currentAppData.showBalances}
        toggleBalances={toggleBalances}
      />
      <CoinList
        showBalances={currentAppData.showBalances}
        cointData={currentAppData}
        handleRefresh={handleRefresh}
      />
    </Container>
  );
};

export default App;
