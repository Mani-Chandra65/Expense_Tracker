// components/CategoryBreakdown.jsx
export default function CategoryBreakdown({ expenses }) {
  const breakdown = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

return (
    <div className="my-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-bold mb-3 text-gray-700">By Category</h2>
        <ul className="divide-y divide-gray-200">
            {Object.entries(breakdown).map(([cat, amt]) => (
                <li key={cat} className="flex justify-between py-2 text-gray-600">
                    <span className="capitalize">{cat}</span>
                    <span className="font-medium">${amt.toFixed(2)}</span>
                </li>
            ))}
        </ul>
    </div>
);
}
