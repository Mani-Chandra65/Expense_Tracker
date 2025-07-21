// components/FilterPanel.jsx
import { useState } from 'react';
import { DEFAULT_CATEGORIES } from '../utils/categories';

export default function FilterPanel({ expenses, onFilter, onReset }) {
  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
    searchText: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const filteredExpenses = expenses.filter(expense => {
      // Category filter
      if (newFilters.category && expense.category !== newFilters.category) {
        return false;
      }
      
      // Date range filter
      const expenseDate = new Date(expense.date);
      if (newFilters.dateFrom && expenseDate < new Date(newFilters.dateFrom)) {
        return false;
      }
      if (newFilters.dateTo && expenseDate > new Date(newFilters.dateTo)) {
        return false;
      }
      
      // Amount range filter
      if (newFilters.minAmount && expense.amount < parseFloat(newFilters.minAmount)) {
        return false;
      }
      if (newFilters.maxAmount && expense.amount > parseFloat(newFilters.maxAmount)) {
        return false;
      }
      
      // Search text filter
      if (newFilters.searchText) {
        const searchLower = newFilters.searchText.toLowerCase();
        const description = expense.description || '';
        if (!expense.category.toLowerCase().includes(searchLower) && 
            !description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      return true;
    });
    
    onFilter(filteredExpenses);
  };

  const handleReset = () => {
    setFilters({
      category: '',
      dateFrom: '',
      dateTo: '',
      minAmount: '',
      maxAmount: '',
      searchText: ''
    });
    onReset();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Filter Expenses</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {DEFAULT_CATEGORIES.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">From Date</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">To Date</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Min Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Min Amount</label>
          <input
            type="number"
            placeholder="₹0"
            value={filters.minAmount}
            onChange={(e) => handleFilterChange('minAmount', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Max Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Max Amount</label>
          <input
            type="number"
            placeholder="₹999999"
            value={filters.maxAmount}
            onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Search Text */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Search</label>
          <input
            type="text"
            placeholder="Search description..."
            value={filters.searchText}
            onChange={(e) => handleFilterChange('searchText', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
