// components/ExpenseList.jsx
import { getCategoryIcon, getCategoryColor } from '../utils/categories';

export default function ExpenseList({ expenses, highlightedIndices, onItemClick, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h3 className="text-gray-600 text-lg font-medium">No expenses yet</h3>
        <p className="text-gray-500 text-sm">Add your first expense to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Expenses</h2>
        <span className="text-sm text-gray-500">{expenses.length} expenses</span>
      </div>
      
      <div className="space-y-2">
        {expenses.map((expense, index) => {
          const isHighlighted = highlightedIndices.includes(index);
          return (
            <div
              key={expense.id || index}
              className={`bg-white border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isHighlighted ? "ring-2 ring-yellow-400 bg-yellow-50" : "hover:bg-gray-50"
              }`}
              onClick={() => onItemClick && onItemClick(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <span className="text-2xl">{getCategoryIcon(expense.category)}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">₹{expense.amount.toFixed(2)}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                        {expense.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600">
                        {new Date(expense.date).toLocaleDateString('en-GB', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      {expense.description && (
                        <p className="text-xs text-gray-500 italic">{expense.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(index);
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                      title="Edit expense"
                    >
                      ✏️
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(index);
                      }}
                      className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                      title="Delete expense"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
