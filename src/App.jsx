import './App.css';
import Coin from './components/Coin/Coin';
import logo from './logo.svg';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} alt="React logo" className="App-logo" />
                <h1 className="App-title">Moralis React Dex</h1>
            </header>
            <table className="coin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <Coin name="Bitcoin" ticker="BTC" price="40000 USD" />
                    <Coin name="Ethereum" ticker="ETH" price="3000 USD" />
                </tbody>
            </table>
        </div>
    );
}

export default App;
