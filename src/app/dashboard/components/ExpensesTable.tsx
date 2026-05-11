"use client";

import clsx from "clsx";
import formatDate from "@/lib/format-date";
import ExpenseInterface from "@/app/interfaces/expense/model";
import UpdateExpenseModal from "./UpdateExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";

export default function ExpensesTable({
  expenses,
}: {
  expenses: ExpenseInterface[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-zinc-900">
          <tr className="text-left text-sm text-zinc-400">
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium">Amount</th>
            <th className="px-6 py-4 font-medium">Description</th>
            <th className="px-6 py-4 font-medium">Date</th>
            <th className="w-1 px-6 py-4 text-right font-medium">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800 text-sm text-zinc-300">
          {expenses.map((expense, index) => (
            <tr key={index} className="transition hover:bg-zinc-900">
              <td className="px-6 py-5">
                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                  {expense.category}
                </span>
              </td>

              <td className="px-6 py-5 font-semibold text-red-400">
                {expense.amount}
              </td>

              <td
                className={clsx(
                  "base-class px-1 px-6 py-5 font-medium text-white",
                  { "italic font-thin": !expense.description },
                )}
              >
                {expense.description || "empty"}
              </td>

              <td className="px-6 py-5 text-zinc-400">
                {formatDate(expense.createdAt)}
              </td>

              <td className="px-6 py-5 text-right">
                <div className="flex justify-end gap-2">
                  <UpdateExpenseModal expense={expense} />
                  <DeleteExpenseModal expense={expense} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
