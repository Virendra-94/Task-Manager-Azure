import React from 'react';
import { useAuth } from '../AuthContext';
import '../styles/Logout.css';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <i className="fas fa-sign-out-alt"></i> Logout
    </button>
  );
};

export default Logout;