import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/job-categories">Job Categories</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
