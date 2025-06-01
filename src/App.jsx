// App.jsx
import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import CategoryBreakdown from "./components/CategoryBreakdown";

export default function App() {
  // Initialize from localStorage
  const [expenses, setExpenses] = useState(() => {
    try {
      const raw = localStorage.getItem("expenses");
      if (!raw) return [];
      const stored = JSON.parse(raw);
      return stored.map((e) => ({
        amount: e.amount,
        category: e.category,
        date: e.date ? new Date(e.date) : new Date(),
      }));
    } catch (err) {
      console.error("Failed to load or parse localStorage:", err);
      return [];
    }
  });
  const [highlightedIndices, setHighlightedIndices] = useState([]);

  // Save to localStorage on changes
  useEffect(() => {
    const toStore = expenses.map((e) => ({
      amount: e.amount,
      category: e.category,
      date: e.date instanceof Date ? e.date.toISOString() : e.date,
    }));
    localStorage.setItem("expenses", JSON.stringify(toStore));
  }, [expenses]);

  const addExpense = (expense) =>
    setExpenses((prev) => [
      ...prev,
      { amount: expense.amount, category: expense.category, date: new Date(expense.date) },
    ]);

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all expenses?")) {
      setExpenses([]);
      setHighlightedIndices([]);
    }
  };

  const handleItemClick = (index) => {
    const shouldDelete = window.confirm(
      "Delete this expense? OK = delete, Cancel = highlight"
    );
    if (shouldDelete) {
      setExpenses((prev) => prev.filter((_, i) => i !== index));
      setHighlightedIndices((prev) => prev.filter((i) => i !== index));
    } else {
      setHighlightedIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    }
  };

  return (
    <div>
      <h1 className="text-[4rem] font-black font-[Times_New_Roman] text-shadow-2xs sticky top-0 bg-amber-500 w-full text-center">Expense Tracker</h1>
      <div className="flex mt-[5rem] justify-around w-full">
        <div className="w-[40%]  border-2 border-amber-400 rounded-[10px] p-6 shadow-2xl shadow-gray-600 ">
        <ExpenseForm onAdd={addExpense} />
        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
        >
          Clear All
        </button>
        </div>
        <div className="w-[40%] border-2 border-amber-400 rounded-[10px] p-6 shadow-2xl shadow-gray-600 ">
        <Summary expenses={expenses} />
        <CategoryBreakdown expenses={expenses} />
        </div>
      </div>
      <div className="max-w-[80%] mx-auto mt-16">
        <ExpenseList
          expenses={expenses}
          highlightedIndices={highlightedIndices}
          onItemClick={handleItemClick}
        />
      </div>
      <footer className="text-center mt-8 mb-1 text-gray-800">
        <p>Made by Y Mani Chandra Reddy</p>
      </footer>
    </div>
  );
}