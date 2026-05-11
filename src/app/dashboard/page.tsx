import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { categoryList, getExpenses } from "@/lib/dashboard-data";
import DashboardPaginationInterface from "@/app/interfaces/dashboard-pagination";
import ExpenseTotals from "./components/ExpenseTotals";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";
import ExpensesTable from "./components/ExpensesTable";

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

  const { totalPages, expenses } = await getExpenses({
    page,
    category,
    from,
    to,
  });

  const categories = await categoryList();
  const currentPage = Number(page) || 1;

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
            <ExpensesTable expenses={expenses} />
            <Pagination paginationData={paginationData} />
          </>
        ) : (
          <div className="italic text-center">No Record Found.</div>
        )}
      </div>
    </div>
  );
}
