"use client";

import { useActionState } from "react";
import { createExpense } from "../action";
import { redirect } from "next/navigation";
import FormStateError from "@/app/interfaces/expense/form-state-error";
import NoticeIcon from "@/assets/components/NoticeIcon";
import BackIcon from "@/assets/components/BackIcon";

const initialState = {
  errors: {} as FormStateError,
};

export default function CreateForm() {
  const [state, formAction, pending] = useActionState(
    createExpense,
    initialState,
  );

  const backToDashboard = () => redirect("/dashboard");

  return (
    <div className="w-full h-screen justify-items-center content-center">
      <div className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 bg-gray-800 border rounded space-y-5 p-5">
        <div className="relative">
          <span
            onClick={backToDashboard}
            className="
              absolute rounded-full bg-white text-black
              hover:bg-blue-500 hover:text-white hover:outline-3
              p-1 cursor-pointer
            "
          >
            <BackIcon className="w-6 h-6" />
          </span>
          <h1 className="font-bold text-center text-2xl">CREATE EXPENSE</h1>
        </div>
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
              />
            </div>

            {state.errors?.amount && (
              <div className="flex gap-x-1 w-full rounded bg-gray-300 text-sm text-red-700 p-1 mt-1">
                <NoticeIcon className="w-5 h-5" /> {state.errors?.amount}
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
              />
            </div>

            {state.errors?.category && (
              <div className="flex gap-x-1 w-full rounded bg-gray-300 text-sm text-red-700 p-1 mt-1">
                <NoticeIcon className="w-5 h-5" /> {state.errors?.category}
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
            />

            {state.errors?.description && (
              <div className="flex gap-x-1 w-full rounded bg-gray-300 text-sm text-red-700 p-1">
                <NoticeIcon className="w-5 h-5 text-red-700" />{" "}
                {state.errors?.description}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="
              w-full border rounded px-4 py-2 cursor-pointer bg-white text-black
              hover:bg-blue-700 hover:text-white hover:outline-2 disabled:opacity-50
            "
          >
            {pending ? "Saving ..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
