/* eslint-disable react/function-component-definition */
import React from 'react';
import Nav from './Nav';
import Title from './Title';

const Mainpage = ({ children }) => {
  return (
    <div>
      <Title title="My-SHOW" subtitle="are you looking for a show or actor" />
      <Nav />
      {children}
    </div>
  );
};

export default Mainpage;
