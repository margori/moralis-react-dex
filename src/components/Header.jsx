import React from 'react';
import logo from '../logo.svg';
import styled from 'styled-components';

const Container = styled.header`
  background-color: #282c34;
  min-height: 20vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: white;
`;

const Logo = styled.img`
  height: 6rem;
  pointer-events: none;
`;

const Title = styled.h1`
  font-size: 3rem;
`;

const Header = () => (
  <Container>
    <Logo src={logo} alt="React logo" />
    <Title className="App-title">School React Exchange</Title>
  </Container>
);

export default Header;
