"use client";

import { useState } from "react";
import { updateExpense } from "../action";
import ExpenseInterface from "@/app/interfaces/expense/model";
import NoticeIcon from "@/assets/icons/notice-icon.svg";

export default function UpdateForm({
  expense,
  setIsOpen,
}: {
  expense: ExpenseInterface;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{
    amount?: string[];
    category?: string[];
    description?: string[];
  }>({});

  const formAction = async (formData: FormData) => {
    setIsLoading(true);

    const result = await updateExpense(expense.id, formData);

    if (result?.errors) {
      setErrors(result.errors);
      setIsLoading(false);
      return;
    }

    setErrors({});
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div className="w-full space-y-5 p-5">
      <form action={formAction} className="justify-items-center space-y-4">
        <div className="w-full">
          <div className="w-full flex">
            <label className="border border-white bg-white text-black rounded-s-lg p-2 shrink-0">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="flex-1 border rounded-e-lg p-2"
              defaultValue={expense.amount}
            />
          </div>

          {errors?.amount && (
            <div className="flex gap-x-1 w-full rounded bg-gray-300 text-sm text-red-700 p-1 mt-1">
              <NoticeIcon className="size-5 text-red-700" /> {errors?.amount}
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="w-full flex">
            <label className="border border-white bg-white text-black rounded-s-lg p-2 shrink-0">
              Category
            </label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="flex-1 border rounded-e-lg p-2"
              defaultValue={expense.category}
            />
          </div>

          {errors?.category && (
            <div className="flex gap-x-1 w-full rounded bg-gray-300 text-sm text-red-700 p-1 mt-1">
              <NoticeIcon className="size-5 text-red-700" /> {errors?.category}
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="border border-white bg-white text-black rounded-t-lg py-1 px-2">
            Description
          </div>
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2"
            defaultValue={expense.description}
          />

          {errors?.description && (
            <div className="flex gap-x-1 w-full rounded bg-gray-300 text-sm text-red-700 p-1">
              <NoticeIcon className="size-5 text-red-700" />{" "}
              {errors?.description}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full border rounded px-4 py-2 cursor-pointer bg-white text-black hover:bg-blue-700 hover:text-white hover:outline-2 disabled:opacity-50"
        >
          {isLoading ? "Saving ..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
