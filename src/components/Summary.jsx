// components/Summary.jsx
import { isThisWeek, isThisMonth } from "date-fns";

export default function Summary({ expenses }) {
  // Filter by Date objects or parsable date strings
  const weekTotal = expenses
    .filter((e) => isThisWeek(new Date(e.date)))
    .reduce((acc, e) => acc + e.amount, 0);

  const monthTotal = expenses
    .filter((e) => isThisMonth(new Date(e.date)))
    .reduce((acc, e) => acc + e.amount, 0);

return (
    <div>
        <h2 className="text-xl font-semibold text-center mb-[10px]">Summary</h2>
        <div className="flex justify-between text-center p-4 border rounded-lg w-full">
            <span className="mx-4">This Week: ₹{weekTotal.toFixed(2)}</span>
            <span className="mx-4">This Month: ₹{monthTotal.toFixed(2)}</span>
        </div>
    </div>
);
}
