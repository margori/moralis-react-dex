import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import AccountBalance from './components/AccountBalance';
import CoinList from './components/CoinList';
import styled from 'styled-components';
import axios from 'axios';

const COIN_COUNT = 10;

const Container = styled.div`
  text-align: center;
  background-color: rgb(20, 56, 97);
  color: #cccccc;
`;

const App = () => {
  const [balance, setBalance] = useState(10000);
  const [showBalances, setShowBalances] = useState(false);
  const [coins, setCoins] = useState([]);

  const handleRefresh = async (id) => {
    const response = await axios.get(
      `https://api.coinpaprika.com/v1/tickers/${id}`
    );
    const coinPrice = response.data.quotes.USD.price;
    console.log(`New price ${coinPrice}`);

    const newCoins = coins.map((c) => {
      const newPrice = c.id === id ? coinPrice : c.price;
      return { ...c, price: newPrice };
    });
    setCoins(newCoins);
  };

  const toggleBalances = () => {
    setShowBalances(!showBalances);
  };

  const paprikaCoinToOurCoin = (coin) => ({
    id: coin.id,
    name: coin.name,
    ticker: coin.symbol,
    balance: -1,
    price: coin.quotes.USD.price,
  });

  const initializeCoins = async () => {
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
    setCoins(newCoins);
  };

  useEffect(async () => {
    if (coins.length == 0) {
      initializeCoins();
    }
  });

  return (
    <Container>
      <Header />
      <AccountBalance
        amount={balance}
        showBalances={showBalances}
        toggleBalances={toggleBalances}
      />
      {coins.length == 0 ? (
        <p>Loading...</p>
      ) : (
        <CoinList
          showBalances={showBalances}
          coinData={coins}
          handleRefresh={handleRefresh}
        />
      )}
    </Container>
  );
};

export default App;
