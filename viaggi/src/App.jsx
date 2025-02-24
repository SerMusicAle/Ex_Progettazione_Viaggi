//app.jsx

import React, { useState } from 'react';

{/*-------------------- CONTEXT ---------------------------------*/}
import { UserProvider } from './context/UserContext';


{/*-------------------- COMPONENTS ---------------------------------*/}

import './App.css'; 


//FORM----------------------------------------------
import Form_login from './components/Form_login/Form_login';
import Form_signin_filiale from './components/Form_signin/Form_signin_filiale';
import Form_signin_user from './components/Form_signin/Form_signin_user'; 
import UserBar from './components/UserBar/UserBar'

//GUI----------------------------------------------
import NavbarY from './components/NavBarY/NavBarY';


//INTERFACE----------------------------------------------
import Card_offerta from './components/Cards_offerte/Offerte';



{/*-------------------- APP PRINCIPALE ---------------------------------*/}


const App = () => {

  {/*BODY DI AVVIO*/}
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bodyContent, setBodyContent] = useState(<Card_offerta/>);
  const [headerContent, setHeaderContent] = useState(null);
  const [token, setToken] = useState(null);

  {/*SOSTITUZIONE MENU*/}
  const showUser = () => {
    console.log('Showing User bar');
    setHeaderContent(<UserBar />);
  };
  
  {/*SOSTITUZIONE BODY */}
  const showSignInFiliale = () => {
    console.log('Showing sign in for filiale');
    setBodyContent(<Form_signin_filiale />);
  };

  const showSigninUser = () => {
    console.log('showSigninUser is called');
    setBodyContent(<Form_signin_user />);
  };

  const handleLoginSuccess = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    console.log('Login successful');
    setIsAuthenticated(true);
    showUser (); 
    setBodyContent(<Card_offerta />);
  };

  // const handleMenuClick = (content) => {
  //   setBodyContent(content); // Cambia il contenuto del corpo in base alla voce del menu cliccata
  // };

  React.useEffect(() => {
    setHeaderContent(
      <Form_login 
        onLoginSuccess={handleLoginSuccess}
        onShowSignInFiliale={showSignInFiliale} 
        onShowSignInUser ={showSigninUser }
      />
    );
  }, []); 

  return (
    <>
      <div className="app-container">


  {/*-------------------- HEADER ---------------------------------*/}

        <header className="app-header">
          {headerContent}
        </header>


  {/*-------------------- BODY ---------------------------------*/}

        <div className="main-content">
          {/* <NavbarY 
            isAuthenticated={isAuthenticated} 
            onMenuClick={handleMenuClick} 
          /> */}
          <NavbarY 
            isAuthenticated={isAuthenticated} 
            onMenuClick={(content) => setBodyContent(content)} 
          />

          <main className="body-content">
            {bodyContent}
          </main>

        </div>


  {/*-------------------- FOOTER ---------------------------------*/}

        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} - S viaggi - Tutti i diritti riservati.</p>
          <p>Informazioni di contatto: info@sviaggi.com | Telefono: 123-456-7890</p>
        </footer>
      </div>
    </>
  );
};

export default App;