import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fm } from '../formatter';

const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 2rem;
  padding: 1rem 0 1rem 5rem;
`;

const Button = styled.button`
  margin: 5px;
`;

const BalanceContainer = styled.div`
  flex-grow: 1;
`;

const AccountBalance = ({
  amount,
  coinData,
  showBalances,
  toggleBalances,
  printMoney,
}) => {
  const portfolio = coinData.reduce((acc, c) => acc + c.balance * c.price, 0);
  return (
    <Section>
      <Button
        className={`btn btn-${showBalances ? 'warning' : 'success'}`}
        onClick={() => toggleBalances()}
      >
        {showBalances ? 'Hide' : 'Show'} balances
      </Button>
      <Button className={`btn btn-primary`} onClick={() => printMoney()}>
        Print money
      </Button>
      {showBalances && (
        <BalanceContainer>
          <span className={amount < 0 ? 'text-danger' : ''}>
            Balance: {fm(amount)}
          </span>
          <br />
          <span className={portfolio < 0 ? 'text-danger' : ''}>
            Portfolio: {fm(portfolio)}
          </span>
        </BalanceContainer>
      )}
    </Section>
  );
};

AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default AccountBalance;
