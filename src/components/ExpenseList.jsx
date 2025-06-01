// components/ExpenseList.jsx
export default function ExpenseList({ expenses, highlightedIndices, onItemClick }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-4 mb-2">Expenses</h2>
      <ul className="space-y-1">
        {expenses.map((e, i) => {
          const isHighlighted = highlightedIndices.includes(i);
          return (
            <li
              key={i}
              onClick={() => onItemClick(i)}
              className={
                `border p-2 cursor-pointer ${
                  isHighlighted ? "bg-yellow-100" : ""
                }`
              }
            >
              {new Date(e.date).toLocaleDateString()} - ${e.amount.toFixed(2)} ({e.category})
            </li>
          );
        })}
      </ul>
    </div>
  );
}
