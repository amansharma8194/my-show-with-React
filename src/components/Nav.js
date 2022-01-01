/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { NavList, LinkStyled } from './Nav.styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];
function Nav() {
  const location = useLocation();
  return (
    <NavList>
      {LINKS.map(item => (
        <li key={item.text}>
          <LinkStyled
            to={item.to}
            className={item.to === location.pathname ? 'active' : ''}
          >
            {item.text}
          </LinkStyled>
        </li>
      ))}
    </NavList>
  );
}

export default memo(Nav);
