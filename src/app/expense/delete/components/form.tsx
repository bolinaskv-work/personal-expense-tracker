"use client";

import { useState } from "react";
import { deleteExpense } from "../action";
import ExpenseInterface from "@/app/interfaces/expense/model";

export default function DeleteForm({
  expense,
  setIsOpen,
}: {
  expense: ExpenseInterface;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteAction = async () => {
    setIsLoading(true);

    await deleteExpense(expense.id);

    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div className="w-full space-y-5 p-5">
      <button
        onClick={deleteAction}
        type="submit"
        disabled={isLoading}
        className="w-full border rounded px-4 py-2 cursor-pointer bg-white text-black hover:bg-blue-700 hover:text-white hover:outline-2 disabled:opacity-50"
      >
        {isLoading ? "Deleting ..." : "Confirm"}
      </button>
    </div>
  );
}
