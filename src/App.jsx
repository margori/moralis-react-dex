import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import AccountBalance from './components/AccountBalance';
import CoinList from './components/CoinList';
import styled from 'styled-components';
import axios from 'axios';

const COIN_COUNT = 10;

const AppData = {
  balance: 10000,
  showBalances: false,
  coins: [],
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

  const paprikaCoinToOurCoin = (coin) => ({
    key: coin.id,
    name: coin.name,
    ticker: coin.symbol,
    balance: -1,
    price: coin.quotes.USD.price,
  });

  useEffect(async () => {
    if (currentAppData.coins.length == 0) {
      console.log('Getting coins...');
      const response = await axios.get('https://api.coinpaprika.com/v1/coins');
      console.log('... coins gotten');

      const filteredCoins = response.data.filter(
        (coin) => coin.rank > 0 && coin.rank <= COIN_COUNT
      );

      const promises = filteredCoins.map((coin) =>
        axios.get(`https://api.coinpaprika.com/v1/tickers/${coin.id}`)
      );
      console.log('Getting prices...');
      Promise.all(promises).then((responses) => {
        console.log('... prices gotten');
        const newCoins = responses.map((response) =>
          paprikaCoinToOurCoin(response.data)
        );

        console.log(newCoins);
        setAppData({
          ...currentAppData,
          coins: newCoins,
        });
      });
    }
  });

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
