// components/Summary.jsx
import { isThisWeek, isThisMonth, isToday } from "date-fns";

export default function Summary({ expenses }) {
  // Filter by Date objects or parsable date strings
  const todayExpenses = expenses.filter((e) => isToday(new Date(e.date)));
  const weekExpenses = expenses.filter((e) => isThisWeek(new Date(e.date)));
  const monthExpenses = expenses.filter((e) => isThisMonth(new Date(e.date)));

  const todayTotal = todayExpenses.reduce((acc, e) => acc + e.amount, 0);
  const weekTotal = weekExpenses.reduce((acc, e) => acc + e.amount, 0);
  const monthTotal = monthExpenses.reduce((acc, e) => acc + e.amount, 0);
  const allTimeTotal = expenses.reduce((acc, e) => acc + e.amount, 0);

  const stats = [
    { label: 'Today', amount: todayTotal, count: todayExpenses.length, color: 'bg-blue-100 text-blue-800' },
    { label: 'This Week', amount: weekTotal, count: weekExpenses.length, color: 'bg-green-100 text-green-800' },
    { label: 'This Month', amount: monthTotal, count: monthExpenses.length, color: 'bg-purple-100 text-purple-800' },
    { label: 'All Time', amount: allTimeTotal, count: expenses.length, color: 'bg-gray-100 text-gray-800' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Expense Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-lg ${stat.color}`}>
            <div className="text-center">
              <p className="text-sm font-medium opacity-75">{stat.label}</p>
              <p className="text-lg font-bold">₹{stat.amount.toFixed(2)}</p>
              <p className="text-xs opacity-60">{stat.count} expense{stat.count !== 1 ? 's' : ''}</p>
            </div>
          </div>
        ))}
      </div>
      
      {expenses.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Average per day this month:</span>
            <span className="font-medium">₹{(monthTotal / new Date().getDate()).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
