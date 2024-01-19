import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <table>
        <thead>
          <tr>
            <th>Expense</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
