"use server";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormStateError from "@/app/interfaces/expense/form-state-error";

type FormState = {
  errors?: FormStateError;
};

export async function createExpense(prevState: FormState, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;
  const amount = Number(formData.get("amount"));
  const category = String(formData.get("category"));
  const description = String(formData.get("description"));

  const errors: FormState["errors"] = {} as FormStateError;

  if (!amount || amount <= 0) {
    errors.amount = "Amount must be greater than 0.";
  }

  if (!category) {
    errors.category = "Category is required.";
  }

  if (!description) {
    errors.description = "Description is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await prisma.expense.create({
    data: {
      amount,
      category,
      description,
      userId,
    },
  });

  redirect("/dashboard");
}
