// home.js

import React, { useState, useEffect } from 'react';
import "@fontsource/montserrat";
import ExpenseForm from '../components/ExpenseForm';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have a separate CSS file for Home styles
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [addAmount, setAddAmount] = useState(0);

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    const storedBalance = parseFloat(localStorage.getItem('balance')) || 0;

    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }

    setBalance(storedBalance);
  }, []);

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);

    const expenseAmount = parseFloat(expense.amount);
    setBalance((prevBalance) => prevBalance - expenseAmount);

    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    localStorage.setItem('balance', (balance - expenseAmount).toString());
  };

  const handleAddBalance = () => {
    setBalance((prevBalance) => prevBalance + addAmount);
    setAddAmount(0);
    localStorage.setItem('balance', (balance + addAmount).toString());
  };

  const addBalance = (amountAdd) => {
    setBalance((prevBalance) => prevBalance + amountAdd);
    setAddAmount(0);
    localStorage.setItem('balance', (balance + amountAdd).toString());
  };

  return (
    <div>
      <Nav />
      <div className='home-container'>
        <div className="left-column">
          <h2 className="title">Expense Tracker</h2>
          <br></br>
          <p className="wallet-info">
            <b>Amount in Wallet: {balance}</b>
            <br />
            <br />
            <br />
            <input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(parseFloat(e.target.value))}
              placeholder="Add Amount"
              className="add-amount"
            />
            <button onClick={handleAddBalance} className="add-balance-button">
              Add Balance to wallet
            </button>
          </p><br></br><br></br>
          <i><p>An ultimate expense tracker which <br></br>helps you have a log of all your expenses , so<br></br>that you can manage them very well and be financially responsible</p></i>
        </div>
        <div className="right-column">
          <h1>Add New Expense Here</h1>
          <center>
            <div className="expense-form-container">
              <ExpenseForm addExpense={addExpense} balance={balance} />
            </div>
          </center>
        
      <br />
      <Link to={{ pathname: "/expense", state: { addBalance : addBalance } }} className="show-expenses-link">
        <button className="show-expenses-button">Show Expenses</button>
      </Link>
      </div>
      <br></br>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
