// components/Header.jsx
import React from 'react';
import logo from './../../assets/img/logo.png'; 

const Header = ({ openUserModal, openMenuModal }) => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img src={logo} alt="Logo" style={styles.logoImage} />
        <h2 className="m-0 d-none d-md-block">S Travel - viaggiamo sereni</h2>
      </div>
      <div style={styles.searchBar}></div>
      <div style={styles.navIcons}>
        <button style={styles.iconButton} aria-label="User  Profile" onClick={openUserModal}>
          <i className="fas fa-user"></i>
        </button>
        <button style={styles.iconButton} aria-label="Menu" onClick={openMenuModal}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid lightgray',
    backgroundColor: '#87CEEB',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: '40px',
    marginRight: '10px',
  },
  searchBar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    margin: '0 20px',
  },
  navIcons: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    marginLeft: '15px',
    cursor: 'pointer',
  },
};

export default Header;