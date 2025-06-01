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
    <div className="p-4 max-w-xl mx-auto">
      <ExpenseForm onAdd={addExpense} />
      <button
        onClick={clearAll}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Clear All
      </button>
      <Summary expenses={expenses} />
      <CategoryBreakdown expenses={expenses} />
      <ExpenseList
        expenses={expenses}
        highlightedIndices={highlightedIndices}
        onItemClick={handleItemClick}
      />
    </div>
  );
}