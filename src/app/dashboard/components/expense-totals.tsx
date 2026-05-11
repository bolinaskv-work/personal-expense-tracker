"use server";

import { prisma } from "@/lib/prisma";

type ResultByCategory = {
  category: string;
  total: number;
};

export default async function ExpenseTotals() {
  const expenses = await prisma.expense.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenseByCategory = Object.values(
    expenses.reduce((result: Record<string, ResultByCategory>, e) => {
      if (!result[e.category]) {
        result[e.category] = {
          category: e.category,
          total: 0,
        };
      }

      result[e.category].total += e.amount;

      return result;
    }, {}),
  );

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
