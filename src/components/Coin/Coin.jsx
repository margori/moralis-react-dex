import React, { useEffect, useState } from 'react';
import './Coin.css';
import PropTypes from 'prop-types';

const Coin = ({ name, ticker, price }) => {
  const [currentPrice, setCurrentPrice] = useState(price);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPrice(1);
      const randomPercentage = 0.995 + Math.random() * 0.01;
      const newPrice = currentPrice * randomPercentage;
      setCurrentPrice(newPrice);
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <tr className="coin-row">
      <td>{name}</td>
      <td>{ticker}</td>
      <td>{Math.round(currentPrice * 100) / 100} USD</td>
    </tr>
  );
};

Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Coin;
