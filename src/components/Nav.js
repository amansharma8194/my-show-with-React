/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];
function Nav() {
  return (
    <ul>
      {LINKS.map(item => (
        <li key={item.text}>
          <Link to={item.to}>{item.text}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Nav;
