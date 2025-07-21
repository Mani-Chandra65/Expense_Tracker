// components/DataManagement.jsx
import { useState } from 'react';
import { exportToCSV, importFromCSV } from '../utils/dataExport';

export default function DataManagement({ expenses, onImport, onClearAll }) {
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    if (expenses.length === 0) {
      alert('No expenses to export!');
      return;
    }
    exportToCSV(expenses);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const importedExpenses = await importFromCSV(file);
      if (importedExpenses.length > 0) {
        const confirmImport = window.confirm(
          `Found ${importedExpenses.length} expenses to import. This will add to your existing expenses. Continue?`
        );
        if (confirmImport) {
          onImport(importedExpenses);
          alert(`Successfully imported ${importedExpenses.length} expenses!`);
        }
      } else {
        alert('No valid expenses found in the file.');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('Error importing file. Please check the format and try again.');
    } finally {
      setIsImporting(false);
      event.target.value = ''; // Reset file input
    }
  };

  const handleClearAll = () => {
    if (expenses.length === 0) {
      alert('No expenses to clear!');
      return;
    }
    
    onClearAll();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 text-gray-700">Data Management</h2>
      
      <div className="space-y-4">
        {/* Export Data */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Export Data</h3>
          <button
            onClick={handleExport}
            disabled={expenses.length === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <span>📁</span>
            <span>Export to CSV</span>
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Download your expenses as a CSV file for backup or analysis
          </p>
        </div>

        {/* Import Data */}
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Import Data</h3>
          <div className="flex items-center space-x-2">
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer transition-colors flex items-center space-x-2">
              <span>📤</span>
              <span>{isImporting ? 'Importing...' : 'Import CSV'}</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleImport}
                disabled={isImporting}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Import expenses from a CSV file (Date, Amount, Category, Description)
          </p>
        </div>

        {/* Clear All Data */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">Danger Zone</h3>
          <button
            onClick={handleClearAll}
            disabled={expenses.length === 0}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <span>🗑️</span>
            <span>Clear All Data</span>
          </button>
          <p className="text-xs text-gray-500 mt-1">
            Permanently delete all expense data (cannot be undone)
          </p>
        </div>

        {/* Data Statistics */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-gray-600">Total Expenses</p>
              <p className="font-bold text-lg">{expenses.length}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-gray-600">Data Size</p>
              <p className="font-bold text-lg">
                {(JSON.stringify(expenses).length / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
