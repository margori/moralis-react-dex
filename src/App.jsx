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

  const handleRefresh = async (id) => {
    const response = await axios.get(
      `https://api.coinpaprika.com/v1/tickers/${id}`
    );
    const coinPrice = response.data.quotes.USD.price;
    console.log(`New price ${coinPrice}`);

    const newCoins = currentAppData.coins.map((c) => {
      const newPrice = c.id === id ? coinPrice : c.price;
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
    id: coin.id,
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

      const coinIds = response.data
        .filter((coin) => coin.rank > 0 && coin.rank <= COIN_COUNT)
        .map((coin) => coin.id);

      const promises = coinIds.map((id) =>
        axios.get(`https://api.coinpaprika.com/v1/tickers/${id}`)
      );
      console.log('Getting prices...');
      const responses = await Promise.all(promises);
      console.log('... prices gotten');
      const newCoins = responses.map((response) =>
        paprikaCoinToOurCoin(response.data)
      );

      console.log(newCoins);
      setAppData({
        ...currentAppData,
        coins: newCoins,
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
