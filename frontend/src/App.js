import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseChart from "./components/ExpenseChart";
import ExpenseList from "./components/ExpenseList";
import { fetchExpenses, addExpense, deleteExpense } from "./services/api";
import "./styles/App.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses().then(setExpenses);
  }, []);

  const handleAddExpense = async (expense) => {
    await addExpense(expense);
    fetchExpenses().then(setExpenses);
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleEditExpense = (expense) => {
    console.log("Edit expense:", expense);
    // You can implement an edit modal or form pre-filled with expense data
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/expenses/new" element={<ExpenseForm onAddExpense={handleAddExpense} />} />
      <Route path="/expenses/chart" element={<ExpenseChart expenses={expenses} />} />
      <Route
        path="/expenses/list"
        element={<ExpenseList expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditExpense} />}
      />
    </Routes>
  );
};

export default App;

