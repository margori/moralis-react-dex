import React from 'react';
import './Coin.css';
import PropTypes from 'prop-types';

const Coin = ({ name, ticker, price }) => (
  <tr className="coin-row">
    <td>{name}</td>
    <td>{ticker}</td>
    <td>{price} USD</td>
  </tr>
);

Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Coin;
