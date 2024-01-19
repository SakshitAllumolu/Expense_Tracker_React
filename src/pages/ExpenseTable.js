import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './expenseTableStyles.css';
import "@fontsource/inter"; 
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';

const ExpenseTable = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchAmount, setSearchAmount] = useState('');

  useEffect(() => {
    const isFirstTime = localStorage.getItem('isFirstTime');

    if (isFirstTime) {
      localStorage.removeItem('expenses');
      localStorage.removeItem('isFirstTime');
    }

    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  const caseInsensitiveIncludes = (text, searchTerm) =>
    text.toLowerCase().includes(searchTerm.toLowerCase());

  const filteredExpenses = expenses.filter((expense) => {
    return (
      caseInsensitiveIncludes(expense.date, searchDate) &&
      caseInsensitiveIncludes(expense.type, searchType) &&
      expense.amount.toString().includes(searchAmount)
    );
  });

  const handleDelete = (index, amount) => {
    const shouldAddToWallet = window.confirm(
      `Do you want to add ₹${amount} back to the wallet?`
    );

    if (shouldAddToWallet) {
      const updatedExpenses = [...expenses];
      updatedExpenses.splice(index, 1);
      setExpenses(updatedExpenses);

      
      const currentBalance = localStorage.getItem('balance') || 0;
      const newBalance = parseFloat(currentBalance) + parseFloat(amount);
      localStorage.setItem('balance', newBalance);

      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      alert(`₹${amount} added successfully`);
    } else {
      
      const updatedExpenses = [...expenses];
      updatedExpenses.splice(index, 1);
      setExpenses(updatedExpenses);

      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    }
  };

  return (
    <div>
      <Nav />
      <div className="expense-table-container">
        <h1>Expense Table</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <input
            type="number"
            placeholder="Search by Amount"
            value={searchAmount}
            onChange={(e) => setSearchAmount(e.target.value)}
          />
        </div>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type of expense</th>
              <th>Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.date}</td>
                <td>{expense.type}</td>
                <td>{expense.amount}</td>
                <td>
                  <button onClick={() => handleDelete(index, expense.amount)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ExpenseTable;
