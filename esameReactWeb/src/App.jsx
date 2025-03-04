// App.jsx
import { useState } from 'react';
import logo from './assets/img/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './components/Home/Home';
import Utente from './components/Utente/Utente';
import Menu from './components/Menu/Menu';
import Hotel from './components/Hotel/Hotel';
import Voli from './components/Voli/Voli';
import Treni from './components/Treni/Treni';
import Attività from './components/Attività/Attività';
import Login from './components/Login/Login';

function App() {
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [isHotelModalVisible, setHotelModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userData, setUserData] = useState(null); 

  const openUserModal = () => {
    setUserModalVisible(true);
  };

  const closeUserModal = () => {
    setUserModalVisible(false);
  };

  const openMenuModal = () => {
    setMenuModalVisible(true);
  };

  const closeMenuModal = () => {
    setMenuModalVisible(false);
  };

  const openHotelModal = () => {
    setHotelModalVisible(true);
  };

  const closeHotelModal = () => {
    setHotelModalVisible(false);
  };

  const handleMenuItemClick = (page) => {
    setCurrentPage(page);
    closeMenuModal();
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true); 
    setUserData(user); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null); 
    closeUserModal(); 
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'Hotel':
        return <Hotel />;
      case 'Voli':
        return <Voli />;
      case 'Treni':
        return <Treni />;
      case 'Attività':
        return <Attività />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src={logo} alt="Logo" style={styles.logoImage} />
          <h2 className="m-0 d-none d-md-block">S Travel - viaggiamo sereni</h2>
        </div>
        <div style={styles.searchBar}></div>
        <div style={styles.navIcons}>
          {isLoggedIn && ( 
            <>
              <button style={styles.iconButton} aria-label="User  Profile" onClick={openUserModal}>
                <i className="fas fa-user"></i>
              </button>
              <button style={styles.iconButton} aria-label="Menu" onClick={openMenuModal}>
                <i className="fas fa-bars"></i>
              </button>
            </>
          )}
        </div>
      </header>

      <div style={styles.bodyContent}>
        <div style={styles.modalContainer}>
          {renderPage()} 
        </div>
      </div>

      <footer style={styles.footer}>
        <div className="d-flex flex-column flex-md-row justify-content-center">
          <p className="m-0">© S management & S Travel</p>
          <p className="m-0 d-md-none"> Developer: Alessandro Sereni</p>
          <p className="m-0 d-none d-md-block">  - Developer: Alessandro Sereni</p>
        </div>
      </footer>
      <Utente visible={isUserModalVisible} onClose={closeUserModal} userData={userData} onLogout={handleLogout} /> 
      <Menu visible={isMenuModalVisible} onClose={closeMenuModal} onMenuItemClick={handleMenuItemClick} />
      {isHotelModalVisible && (
        <Hotel visible={isHotelModalVisible} onClose={closeHotelModal} />
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundImage: `url(${logo})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '0px',
    width: '100vw',
  },
  modalContainer: {
    flex: 1,
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    margin: 0,
    borderRadius: '4px',
  },
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
  horizontalBar: {
    height: '5px',
    width: '100%',
    marginTop: '60px',
    zIndex: 999,
    border: '5px solid #87CEEB',
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
  searchInput: {
    width: '60%',
    padding: '10px',
    border: '1px solid lightgray',
    borderRadius: '4px',
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
  bodyContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: '60px',
    marginBottom: '40px',
    width: '100%',
    border: '2px solid #007BFF',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    textAlign: 'center',
    padding: '10px 0',
    borderTop: '1px solid lightgray',
    backgroundColor: '#87CEEB',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
};

export default App;