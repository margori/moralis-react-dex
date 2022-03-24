import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
  font-size: 2rem;
  text-align: left;
  padding: 1rem 0 1rem 5rem;
`;

const AccountBalance = ({ amount, showBalances, toggleBalances }) => (
  <Section>
    <button onClick={() => toggleBalances()}>
      {showBalances ? 'Hide' : 'Show'}
    </button>
    {showBalances && `Balance: ${amount} USD`}
  </Section>
);

AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default AccountBalance;
