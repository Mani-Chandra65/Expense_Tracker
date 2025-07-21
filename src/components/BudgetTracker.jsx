// components/BudgetTracker.jsx
import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { isThisMonth, startOfMonth, endOfMonth } from 'date-fns';

export default function BudgetTracker({ expenses }) {
  const [monthlyBudget, setMonthlyBudget] = useLocalStorage('monthlyBudget', 0);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget);

  const currentMonthExpenses = expenses.filter(expense => 
    isThisMonth(new Date(expense.date))
  );
  
  const totalSpent = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = monthlyBudget - totalSpent;
  const percentageUsed = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  const handleSetBudget = (e) => {
    e.preventDefault();
    const budget = parseFloat(budgetInput);
    if (budget > 0) {
      setMonthlyBudget(budget);
      setShowBudgetForm(false);
    }
  };

  const getProgressColor = () => {
    if (percentageUsed <= 50) return 'bg-green-500';
    if (percentageUsed <= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusMessage = () => {
    if (monthlyBudget === 0) return "Set a monthly budget to track your spending";
    if (remaining > 0) return `₹${remaining.toFixed(2)} remaining this month`;
    if (remaining === 0) return "You've reached your budget limit";
    return `₹${Math.abs(remaining).toFixed(2)} over budget`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Monthly Budget</h2>
        <button
          onClick={() => setShowBudgetForm(!showBudgetForm)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {monthlyBudget > 0 ? 'Edit Budget' : 'Set Budget'}
        </button>
      </div>

      {showBudgetForm && (
        <form onSubmit={handleSetBudget} className="mb-4">
          <div className="flex gap-2">
            <input
              type="number"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              placeholder="Enter monthly budget"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="1"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Set
            </button>
            <button
              type="button"
              onClick={() => setShowBudgetForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {monthlyBudget > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Spent: ₹{totalSpent.toFixed(2)}</span>
            <span>Budget: ₹{monthlyBudget.toFixed(2)}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            ></div>
          </div>
          
          <div className="text-center">
            <p className={`text-sm font-medium ${remaining < 0 ? 'text-red-600' : 'text-gray-700'}`}>
              {getStatusMessage()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {percentageUsed.toFixed(1)}% of budget used
            </p>
          </div>

          {percentageUsed >= 90 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex items-center">
                <span className="text-red-500 text-xl mr-2">⚠️</span>
                <div>
                  <p className="text-red-800 font-medium text-sm">Budget Alert!</p>
                  <p className="text-red-600 text-xs">
                    You've used {percentageUsed.toFixed(1)}% of your monthly budget.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
