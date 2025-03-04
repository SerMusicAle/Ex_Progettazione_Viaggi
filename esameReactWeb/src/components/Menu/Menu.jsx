// components/Menu.jsx
import React from 'react';
import './Menu.css';

const Menu = ({ visible, onClose, onMenuItemClick }) => {
  if (!visible) return null;

  const menuItems = ['Hotel', 'Voli', 'Treni', 'Attività'];

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="menu-buttons">
          {menuItems.map((item, index) => (
            <button key={index} className="menu-button" onClick={() => onMenuItemClick(item)}>
              {item}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="close-button">X</button>
      </div>
    </div>
  );
};

export default Menu;