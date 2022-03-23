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

const App = () => (
  <Container>
    <Header />
    <AccountBalance amount={AppData.balance} />
    <CoinList cointData={AppData} />
  </Container>
);

export default App;
