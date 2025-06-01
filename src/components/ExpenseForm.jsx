// components/ExpenseForm.jsx
import { useState } from "react";

export default function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return;
    if (new Date(date) > new Date()) {
      alert("Date cannot be in the future");
      return;
    }
    onAdd({ amount: parseFloat(amount), category, date });
    setAmount("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 min-w-[90%]"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full"
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Others</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full"
        max={today}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
        Add Expense
      </button>
    </form>
  );
}