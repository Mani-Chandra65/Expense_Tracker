// utils/categories.js
export const DEFAULT_CATEGORIES = [
  { name: 'Food', icon: '🍽️', color: 'bg-orange-100 text-orange-800' },
  { name: 'Travel', icon: '✈️', color: 'bg-blue-100 text-blue-800' },
  { name: 'Shopping', icon: '🛍️', color: 'bg-pink-100 text-pink-800' },
  { name: 'Entertainment', icon: '🎬', color: 'bg-purple-100 text-purple-800' },
  { name: 'Health', icon: '🏥', color: 'bg-green-100 text-green-800' },
  { name: 'Education', icon: '📚', color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Utilities', icon: '💡', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Transportation', icon: '🚗', color: 'bg-gray-100 text-gray-800' },
  { name: 'Others', icon: '📦', color: 'bg-slate-100 text-slate-800' }
];

export const getCategoryIcon = (categoryName) => {
  const category = DEFAULT_CATEGORIES.find(cat => cat.name === categoryName);
  return category ? category.icon : '📦';
};

export const getCategoryColor = (categoryName) => {
  const category = DEFAULT_CATEGORIES.find(cat => cat.name === categoryName);
  return category ? category.color : 'bg-slate-100 text-slate-800';
};
