import React from 'react';
import { useAuth } from '../context/authContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();



  return (
    <nav className="navbar">
      <div className="navbar-logo">Easynote</div>
      <div className="navbar-right">
        <span className="navbar-user">{currentUser?.email}</span>

      </div>
    </nav>
  );
};

export default Navbar;