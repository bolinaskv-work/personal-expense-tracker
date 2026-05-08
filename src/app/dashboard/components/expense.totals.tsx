import ExpenseInterface from "@/app/interfaces/expense";

export default function ExpenseTotals({
  expenses,
}: {
  expenses: ExpenseInterface[];
}) {
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenseByCategory = Object.entries(
    expenses.reduce((result: Record<string, number>, e) => {
      if (!result[e.category]) {
        result[e.category] = 0;
      }

      result[e.category] += e.amount;

      return result;
    }, {}),
  ).map(([key, value]) => {
    return {
      category: key,
      total: value,
    };
  });

  return (
    <div className="border rounded p-5 my-5">
      <div>
        <span className="font-bold">Expenses Total:</span>
        <span> ₱{totalExpense}</span>
      </div>
      <div className="italic">
        <div className="font-medium">Expenses Total By Category</div>
        <ul className="px-5">
          {totalExpenseByCategory.map((item, index) => (
            <li key={index}>
              <span className="font-medium">{item.category}</span>
              <span> ₱{item.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
