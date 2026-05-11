"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import ExpenseInterface from "@/app/interfaces/expense/model";
import CloseIcon from "@/assets/components/CloseIcon";
import UpdateForm from "@/app/expense/update/components/Form";

export default function UpdateExpenseModal({
  expense,
}: {
  expense: ExpenseInterface;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white text-black hover:bg-blue-500 hover:text-white hover:outline-3 px-3 py-1 rounded cursor-pointer"
      >
        Update
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="w-96 bg-gray-800 p-5 rounded outline">
            <DialogTitle className="mb-4">
              <div className="relative">
                <span
                  onClick={closeModal}
                  className="absolute right-0 rounded-full bg-white text-black hover:bg-blue-500 hover:text-white hover:outline-3 p-1 cursor-pointer"
                >
                  <CloseIcon className="w-6 h-6" />
                </span>
                <h1 className="font-bold text-center text-2xl">
                  UPDATE EXPENSE
                </h1>
              </div>
            </DialogTitle>

            <UpdateForm expense={expense} setIsOpen={setIsOpen} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
