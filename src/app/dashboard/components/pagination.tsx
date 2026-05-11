"use client";

import Link from "next/link";
import DashboardPaginationInterface from "@/app/interfaces/dashboard-pagination";

export default function Pagination({
  paginationData,
}: {
  paginationData: DashboardPaginationInterface;
}) {
  const { currentPage, totalPages, category, from, to } = paginationData;

  let params: string = "";

  if (category) {
    params += `&category=${category}`;
  }

  if (from && to) {
    params += `&from=${from}&to=${to}`;
  }

  return (
    <div className="mt-6 flex-row justify-items-end space-y-2">
      {/* Info */}
      <p className="text-sm text-white">
        Page {currentPage} of {totalPages}
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* First */}
        <Link
          href={`/dashboard?page=1${params}`}
          className={`
            rounded-lg border border-white bg-white
            px-3 py-2 text-sm text-black transition
            hover:bg-blue-500 hover:text-white hover:outline-3
            ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          `}
        >
          First
        </Link>

        {/* Prev */}
        <Link
          href={`/dashboard?page=${currentPage - 1}${params}`}
          className={`
            rounded-lg border border-white bg-white
            px-3 py-2 text-sm text-black transition
            hover:bg-blue-500 hover:text-white hover:outline-3
            ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          `}
        >
          Prev
        </Link>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <Link
              key={page}
              href={`/dashboard?page=${page}${params}`}
              className={`
                rounded-lg border px-3 py-2 text-sm transition
                ${
                  currentPage === page
                    ? "border-blue-500 bg-blue-500 text-white font-bold"
                    : "border-white bg-white text-black hover:bg-blue-500 hover:text-white hover:outline-3"
                }
              `}
            >
              {page}
            </Link>
          );
        })}

        {/* Next */}
        <Link
          href={`/dashboard?page=${currentPage + 1}${params}`}
          className={`
            rounded-lg border border-white bg-white
            px-3 py-2 text-sm text-black transition
            hover:bg-blue-500 hover:text-white hover:outline-3
            ${
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          `}
        >
          Next
        </Link>

        {/* Last */}
        <Link
          href={`/dashboard?page=${totalPages}${params}`}
          className={`
            rounded-lg border border-white bg-white
            px-3 py-2 text-sm text-black transition
            hover:bg-blue-500 hover:text-white hover:outline-3
            ${
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          `}
        >
          Last
        </Link>
      </div>
    </div>
  );
}
