import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

function ExpenseChart({ expenses = [] }) {
  console.log("Chart Data:", expenses); // Debugging log

  if (!Array.isArray(expenses)) {
    console.error("Expected expenses to be an array, but got:", expenses);
    expenses = []; // Fallback to an empty array
  }

  if (expenses.length === 0) {
    console.warn("No expenses to display."); // Warning log
    return <p>No expenses to display.</p>;
  }

  // Convert expenses into chart data
  const categories = {};
  expenses.forEach((expense) => {
    if (expense && typeof expense.amount === "number" && expense.category) {
      categories[expense.category] =
        (categories[expense.category] || 0) + expense.amount;
    } else {
      console.warn("Invalid expense entry:", expense);
    }
  });

  const data = {
    labels: Object.keys(categories), // Expense categories
    datasets: [
      {
        label: "Expenses",
        data: Object.values(categories), // Expense amounts
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4365", "#3391DB", "#FFB733"],
      },
    ],
  };

  return (
    <div>
      <h2>Expense Chart</h2>
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;
