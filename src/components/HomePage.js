import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Expense Tracker</h1>
      <Link to="/expenses">View Expenses</Link>
    </div>
  );
};

export default HomePage;
