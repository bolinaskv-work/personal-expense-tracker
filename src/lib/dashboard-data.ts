"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import config from "@/config/config";

const PAGE_SIZE = config.pageSize;

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

  if (params.from && params.to) {
    const fromDate = new Date(params.from);
    const toDate = new Date(params.to);
    toDate.setHours(23, 59, 59, 999);

    where.createdAt = {
      gte: fromDate,
      lte: toDate,
    };
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
