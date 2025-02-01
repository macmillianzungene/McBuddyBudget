const API_URL = "http://localhost:5000";

// User Authentication
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.access_token); // Store token in localStorage
  }

  return data;
};

// Fetch Expenses (Protected)
export const fetchExpenses = async () => {
  const token = localStorage.getItem("token"); // Retrieve JWT token

  const response = await fetch(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

// Add Expense (Protected)
export const addExpense = async (expense) => {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense),
  });
};

// Delete Expense (Protected)
export const deleteExpense = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to delete expense");
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

