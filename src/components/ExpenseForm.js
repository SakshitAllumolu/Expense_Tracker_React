import React, { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ addExpense, balance }) => {
  const [formData, setFormData] = useState({
    date: '',
    type: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseAmount = parseFloat(formData.amount);
    if (expenseAmount > balance) {
      alert('Expense amount exceeds the available balance. Please adjust the amount.');
      return; 
    }

    
    addExpense(formData);
    setFormData({
      date: '',
      type: '',
      amount: ''
    });

    alert('Expense added successfully');
  };

  return (
    <form className='expense-form' onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Date of expense :</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Type of expense :</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="form-field"
        />
      </div>
      <button type="submit" className="submit-button">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
