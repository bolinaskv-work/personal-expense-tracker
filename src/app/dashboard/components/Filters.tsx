"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SelectOptionComponent from "@/app/components/Select";
import DateRangePickerComponent from "@/app/components/DateRangePicker";

export default function Filters({ categoryList }: { categoryList: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams?.get("category") ?? "";
  const fromParam = searchParams?.get("from") ?? "";
  const toParam = searchParams?.get("to") ?? "";

  const parseDate = (value: string) => (value ? new Date(value) : null);
  const formatDate = (date: Date | null) =>
    date ? date.toISOString().split("T")[0] : "";

  const [category, setCategory] = useState<string>(categoryParam);
  const [from, setFrom] = useState<Date | null>(parseDate(fromParam));
  const [to, setTo] = useState<Date | null>(parseDate(toParam));

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());

    if (category) params.set("category", category);
    else params.delete("category");

    if (from && to) {
      params.set("from", formatDate(from));
      params.set("to", formatDate(to));
    } else {
      params.delete("from");
      params.delete("to");
    }

    params.set("page", "1");

    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="lg:flex gap-2 border rounded p-2 space-y-2 lg:space-y-0 mb-4">
      <SelectOptionComponent
        label="Filter By Category"
        labelClasses="rounded-s-lg"
        selected={category}
        selectClasses="rounded-e-lg"
        options={categoryList}
        setOption={setCategory}
      />

      <DateRangePickerComponent
        label="Filter By Date Range"
        labelClasses="rounded-s-lg"
        rangeClasses="rounded-e-lg"
        from={from}
        to={to}
        setFrom={setFrom}
        setTo={setTo}
      />

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
