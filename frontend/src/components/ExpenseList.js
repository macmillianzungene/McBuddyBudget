import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function ExpenseList({ onDelete, onEdit }) {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from API on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/expenses") // Ensure the API route matches your backend
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExpenses(data);
        } else {
          console.error("Expected an array but got:", data);
          setExpenses([]); // Fallback to an empty array
        }
      })
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.name || "No Name"}</td>
                <td>${expense.amount || "No Amount"}</td>
                <td>{expense.category || "No Category"}</td>
                <td>
                  <FaEdit
                    onClick={() => onEdit && onEdit(expense)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <FaTrash
                    onClick={() => onDelete && onDelete(expense.id)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;

