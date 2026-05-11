"use server";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";

const expenseSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0."),
  category: z.string().min(1, "Category is required."),
  description: z.string().min(1, "Description is required."),
});

export async function updateExpense(id: number, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const validatedFields = expenseSchema.safeParse({
    amount: formData.get("amount"),
    category: formData.get("category"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { amount, category, description } = validatedFields.data;

  await prisma.expense.update({
    where: { id },
    data: {
      amount,
      category,
      description,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}
