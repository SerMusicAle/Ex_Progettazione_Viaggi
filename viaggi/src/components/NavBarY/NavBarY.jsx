import React from 'react';
import './NavBarY.css';
import menuItems from './NavBarYdata';

const NavBarY = ({ isAuthenticated }) => 
{
    return (
      <nav>
        <ul>
          {
            menuItems
              .filter(item => item.isVisible || (isAuthenticated && item.name.startsWith('Aggiungi')))
              .map((item, index) => (
                <li key={index}>
                  <a href={item.link}>{item.name}</a>
                </li>
            ))
          }
        </ul>
      </nav>
    );
};

export default NavBarY;