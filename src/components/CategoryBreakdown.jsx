// components/CategoryBreakdown.jsx
import { getCategoryIcon, getCategoryColor } from '../utils/categories';

export default function CategoryBreakdown({ expenses }) {
  const breakdown = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const totalAmount = Object.values(breakdown).reduce((sum, amount) => sum + amount, 0);
  const sortedCategories = Object.entries(breakdown).sort(([,a], [,b]) => b - a);

  if (sortedCategories.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-3 text-gray-700">Category Breakdown</h2>
        <p className="text-gray-500 text-center py-4">No expenses to show</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-gray-700">Category Breakdown</h2>
      <div className="space-y-3">
        {sortedCategories.map(([category, amount]) => {
          const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
          return (
            <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{getCategoryIcon(category)}</span>
                <div>
                  <p className="font-medium text-gray-800 capitalize">{category}</p>
                  <p className="text-xs text-gray-500">{percentage.toFixed(1)}% of total</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">₹{amount.toFixed(2)}</p>
                <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Total Spent:</span>
          <span className="font-bold text-lg text-gray-900">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
