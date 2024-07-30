import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">HR Management</Link>
      </div>
      <div className="navbar-links">
        <Link to="/employees">Employees</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/job-categories">Job Categories</Link>
      </div>
    </nav>
  );
};

export default Navbar;
