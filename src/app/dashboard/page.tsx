import clsx from "clsx";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { categoryList, getExpenses } from "@/lib/dashboard-data";
import formatDate from "@/lib/format-date";
import DashboardPaginationInterface from "@/app/interfaces/dashboard-pagination";
import ExpenseTotals from "./components/ExpenseTotals";
import UpdateExpenseModal from "./components/UpdateExpenseModal";
import DeleteExpenseModal from "./components/DeleteExpenseModal";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    category?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  const { page, category, from, to } = await searchParams;
  const currentPage = Number(page) || 1;

  const { totalPages, expenses } = await getExpenses({
    page,
    category,
    from,
    to,
  });

  const categories = await categoryList();

  const paginationData: DashboardPaginationInterface = {
    totalPages,
    currentPage,
    category,
    from,
    to,
  };

  return (
    <div className="p-10">
      <h1 className="text-center text-3xl font-bold mb-6">
        EXPENSES DASHBOARD
      </h1>
      <div className="relative">
        <ExpenseTotals />
        <Filters categoryList={categories} />
        <div className="absolute top-5 right-3">
          <a
            href="/expense/create"
            className="bg-white text-black hover:bg-blue-500 hover:text-white hover:outline-2 px-3 py-1 border border-white rounded cursor-pointer"
          >
            Add Record
          </a>
        </div>
      </div>

      <div className="border border-dashed rounded p-5">
        <h2 className="text-2xl font-bold mb-6">LIST OF EXPENSES</h2>
        {expenses.length ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-900">
                  <tr className="text-left text-sm text-zinc-400">
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="w-1 px-6 py-4 text-right font-medium">
                      Action
                    </th>
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
            <Pagination paginationData={paginationData} />
          </>
        ) : (
          <div className="italic text-center">No Record Found.</div>
        )}
      </div>
    </div>
  );
}
