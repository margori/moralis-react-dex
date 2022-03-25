import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import AccountBalance from './components/AccountBalance';
import CoinList from './components/CoinList';
import styled from 'styled-components';
import axios from 'axios';
import 'bootswatch/dist/darkly/bootstrap.min.css';

const INITIAL_BALANCE = 10000;
const COIN_COUNT = 10;
const Directions = {
  BUY: +1,
  SELL: -1,
};

const Container = styled.div`
  text-align: center;
  background-color: rgb(20, 56, 97);
  color: #cccccc;
`;

const App = () => {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
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

  const doExchange = (coinId, coinAmont, direction) => {
    let newBalance = balance;
    const newCoins = coins.map((c) => {
      let newCoinBalance = c.balance;
      if (c.id === coinId) {
        newCoinBalance += coinAmont * direction;
        newBalance -= c.price * coinAmont * direction;
      }

      return { ...c, balance: newCoinBalance };
    });
    setCoins(newCoins);
    setBalance(newBalance);
  };

  const handleBuy = (coinId, coinAmont) => {
    console.log('buy', coinId, coinAmont);
    doExchange(coinId, coinAmont, Directions.BUY);
  };

  const handleSell = (coinId, coinAmont) => {
    console.log('sell', coinId, coinAmont);
    doExchange(coinId, coinAmont, Directions.SELL);
  };

  const toggleBalances = () => {
    setShowBalances(!showBalances);
  };

  const printMoney = () => {
    const newBalance = balance + Math.random() * 5000 + 1000;
    setBalance(newBalance);
  };

  const paprikaCoinToOurCoin = (coin) => ({
    id: coin.id,
    name: coin.name,
    ticker: coin.symbol,
    balance: 0,
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
        coinData={coins}
        showBalances={showBalances}
        toggleBalances={toggleBalances}
        printMoney={printMoney}
      />
      {coins.length == 0 ? (
        <p>Loading...</p>
      ) : (
        <CoinList
          showBalances={showBalances}
          coinData={coins}
          handleRefresh={handleRefresh}
          handleBuy={handleBuy}
          handleSell={handleSell}
        />
      )}
    </Container>
  );
};

export default App;
