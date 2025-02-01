import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; //styles

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to Budget Buddy 🎉</h1>
      <p className="text-xl text-center mb-6">Track your expenses and manage your budget with ease!</p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md text-lg">Add Expense</button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md text-lg">View Chart</button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md text-lg">View Expenses</button>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md text-lg">Sign Up</button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md text-lg">Sign In</button>
      </div>

      <div className="mt-12 p-8 bg-white text-gray-800 rounded-lg shadow-lg max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">About Budget Buddy</h2>
        <p className="text-lg">Budget Buddy is your go-to app for tracking expenses, managing budgets, and gaining insights into your spending habits. Our intuitive design makes financial management simple and effective!</p>
      </div>

      <div className="mt-8 p-8 bg-white text-gray-800 rounded-lg shadow-lg max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Budget Buddy?</h2>
        <ul className="text-lg list-disc list-inside">
          <li>📊 Easy-to-use expense tracking</li>
          <li>💰 Smart budget management</li>
          <li>📈 Visual insights with charts</li>
          <li>🔒 Secure & private</li>
          <li>🚀 Fast and user-friendly</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
