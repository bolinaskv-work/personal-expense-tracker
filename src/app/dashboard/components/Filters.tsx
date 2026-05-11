"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Filters({ categoryList }: { categoryList: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams?.get("category") ?? "";
  const fromParam = searchParams?.get("from") ?? "";
  const toParam = searchParams?.get("to") ?? "";

  const [category, setCategory] = useState(categoryParam);
  const [from, setFrom] = useState(fromParam);
  const [to, setTo] = useState(toParam);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());

    if (category) params.set("category", category);
    else params.delete("category");

    if (from && to) {
      params.set("from", from);
      params.set("to", to);
    } else {
      params.delete("from");
      params.delete("to");
    }

    // reset pagination when filtering
    params.set("page", "1");

    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="lg:flex gap-2 border rounded p-2 space-y-2 lg:space-y-0 mb-4">
      <div className="flex">
        <label className="border border-white bg-white text-black rounded-s-lg p-2 shrink-0">
          Filter By Category
        </label>
        <select
          className="flex-1 border rounded-e-lg p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          {categoryList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
          <option value="empty">Empty Record - For Testing</option>
        </select>
      </div>

      <div className="flex">
        <label className="border border-white bg-white text-black rounded-s-lg p-2 shrink-0">
          Filter By Date Range
        </label>
        <div className="flex-1 border rounded-e-lg p-2">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      <button
        className="
          w-full lg:w-fit
          border rounded px-4 py-2 cursor-pointer bg-white text-black
          hover:bg-blue-700 hover:text-white hover:outline-2
        "
        onClick={applyFilters}
      >
        Apply
      </button>
    </div>
  );
}
