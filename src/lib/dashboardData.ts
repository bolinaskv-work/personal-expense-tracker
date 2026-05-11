"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const PAGE_SIZE = 2;

export const getExpenses = async (params: {
  page?: string;
  category?: string;
  from?: string;
  to?: string;
}) => {
  const currentPage = Number(params.page) || 1;
  const where: Prisma.ExpenseWhereInput = {};

  if (params.category) {
    where.category = params.category;
  }

  if (params.from || params.to) {
    where.createdAt = {};

    if (params.from) {
      where.createdAt.gte = new Date(params.from);
    }

    if (params.to) {
      where.createdAt.lte = new Date(params.to);
    }
  }

  const totalItems = await prisma.expense.count({ where });
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const expenses = await prisma.expense.findMany({
    where,
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    totalPages,
    expenses,
  };
};

export const totalExpenses = async () => await prisma.expense.count();

export const categoryList = async () => {
  const categories = await prisma.expense.findMany({
    select: {
      category: true,
    },
    distinct: ["category"],
  });

  return categories.map((item) => item.category);
};
