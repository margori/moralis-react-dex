import React from 'react';
import './Coin.css';

const Coin = ({ name, ticker, price }) => (
    <tr className="coin-row">
        <td>{name}</td>
        <td>{ticker}</td>
        <td>{price}</td>
    </tr>
);

export default Coin;
