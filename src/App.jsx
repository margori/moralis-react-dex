import './App.css';
import AccountBalance from './components/AccountBalance';
import Coin from './components/Coin';
import logo from './logo.svg';

const AppData = {
  balance: 10000,
  coins: [
    { name: 'Bitcoin', ticker: 'BTC', price: 9999.99 },
    { name: 'Ethereum', ticker: 'ETH', price: 299.99 },
    { name: 'Tether', ticker: 'USDT', price: 1.0 },
    { name: 'Ripple', ticker: 'XRP', price: 0.2 },
  ],
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="React logo" className="App-logo" />
        <h1 className="App-title">Moralis React Dex</h1>
      </header>
      <AccountBalance amount={AppData.balance} />
      <table className="coin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {AppData.coins.map(({ name, ticker, price }) => (
            <Coin key={ticker} name={name} ticker={ticker} price={price} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
