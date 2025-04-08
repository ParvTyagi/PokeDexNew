import React from 'react';
import NavBar from './Pages/NavBar';
import Footer from './Pages/Footer';
import { useLocation } from 'react-router-dom';
import './App.css'; // Import your CSS file
const App = ({ children }) => {
  const location=useLocation();
  const isLandingPage = location.pathname === '/';
  return (
    <>
      {!isLandingPage && <NavBar />}
      <main>{children}</main>
      {!isLandingPage && <Footer/>}
    </>
  );
};

export default App;