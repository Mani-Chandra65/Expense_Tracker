// App.jsx
import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import CategoryBreakdown from "./components/CategoryBreakdown";
import BudgetTracker from "./components/BudgetTracker";
import FilterPanel from "./components/FilterPanel";
import DataManagement from "./components/DataManagement";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  // Initialize from localStorage with better error handling
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: '', index: null });

  // Update filtered expenses when expenses change
  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      date: new Date(expense.date),
      id: Date.now() + Math.random()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const importExpenses = (importedExpenses) => {
    const processedImports = importedExpenses.map(expense => ({
      ...expense,
      date: new Date(expense.date),
      id: Date.now() + Math.random()
    }));
    setExpenses(prev => [...processedImports, ...prev]);
  };

  const clearAll = () => {
    setDeleteModal({
      isOpen: true,
      type: 'clearAll',
      index: null
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.type === 'clearAll') {
      setExpenses([]);
      setHighlightedIndices([]);
      setFilteredExpenses([]);
    } else if (deleteModal.type === 'expense' && deleteModal.index !== null) {
      setExpenses(prev => prev.filter((_, i) => i !== deleteModal.index));
      setHighlightedIndices(prev => prev.filter(i => i !== deleteModal.index));
    }
  };

  const handleItemClick = (index) => {
    setDeleteModal({
      isOpen: true,
      type: 'expense',
      index: index
    });
  };

  const handleFilter = (filtered) => {
    setFilteredExpenses(filtered);
  };

  const handleResetFilter = () => {
    setFilteredExpenses(expenses);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'expenses', label: 'Expenses', icon: '📝' },
    { id: 'budget', label: 'Budget', icon: '💰' },
    { id: 'data', label: 'Data', icon: '📁' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">💰 Expense Tracker</h1>
            <div className="text-sm text-gray-600">
              Total: <span className="font-bold text-lg">₹{expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Add Expense */}
            <div className="lg:col-span-1">
              <ExpenseForm onAdd={addExpense} />
            </div>
            
            {/* Right Columns - Summary and Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              <Summary expenses={expenses} />
              <CategoryBreakdown expenses={expenses} />
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-6">
            <FilterPanel 
              expenses={expenses} 
              onFilter={handleFilter} 
              onReset={handleResetFilter} 
            />
            <ExpenseList
              expenses={filteredExpenses}
              highlightedIndices={highlightedIndices}
              onItemClick={handleItemClick}
            />
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BudgetTracker expenses={expenses} />
            <div className="space-y-6">
              <Summary expenses={expenses} />
              <CategoryBreakdown expenses={expenses} />
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DataManagement 
              expenses={expenses} 
              onImport={importExpenses} 
              onClearAll={clearAll} 
            />
            <div className="space-y-6">
              <Summary expenses={expenses} />
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4 text-gray-700">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Oldest expense:</span>
                    <span className="font-medium">
                      {expenses.length > 0 
                        ? new Date(Math.min(...expenses.map(e => new Date(e.date)))).toLocaleDateString() 
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most expensive:</span>
                    <span className="font-medium">
                      ₹{expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average expense:</span>
                    <span className="font-medium">
                      ₹{expenses.length > 0 ? (expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length).toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>Made by Y Mani Chandra Reddy</p>
            <p className="text-xs mt-1">© 2025 Expense Tracker. Keep track of your finances efficiently.</p>
          </div>
        </div>
      </footer>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: '', index: null })}
        onConfirm={handleDeleteConfirm}
        title={deleteModal.type === 'clearAll' ? 'Clear All Expenses' : 'Delete Expense'}
        message={
          deleteModal.type === 'clearAll' 
            ? `Are you sure you want to delete all ${expenses.length} expenses? This will permanently remove all your expense data.`
            : 'Are you sure you want to delete this expense? This action cannot be undone.'
        }
        type={deleteModal.type}
      />
    </div>
  );
}
