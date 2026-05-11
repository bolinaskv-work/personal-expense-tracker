"use server";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function deleteExpense(id: number) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  await prisma.expense.delete({ where: { id } });

  revalidatePath("/dashboard");
}
