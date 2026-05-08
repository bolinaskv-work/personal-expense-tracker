import clsx from "clsx";
import { prisma } from "@/lib/prisma";
import ExpenseTotals from "./components/expense.totals";

export default async function DashboardPage() {
  const expenses = await prisma.expense.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-10">
      <h1 className="text-center text-3xl font-bold mb-6">
        Expenses Dashboard
      </h1>
      <ExpenseTotals expenses={expenses} />

      <div className="border border-dashed rounded p-5">
        <h2 className="text-3xl font-bold mb-6">List of Expenses</h2>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="border p-4 rounded">
              <div>
                <span className="font-bold">Category:</span>
                <span className="px-1">{expense.category}</span>
              </div>

              <div>
                <span className="font-bold">Amount:</span>
                <span className="px-1">₱{expense.amount}</span>
              </div>

              <div>
                <span className="font-bold">Description:</span>
                <span className="px-1">{expense.description}</span>
              </div>

              <div>
                <span className="font-bold">Notes:</span>
                <span
                  className={clsx("base-class px-1", {
                    "italic font-thin": !expense.notes,
                  })}
                >
                  {expense.notes || "empty"}
                </span>
              </div>

              <div>
                <span className="font-bold">User:</span>
                <span className="px-1">{expense.user.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
