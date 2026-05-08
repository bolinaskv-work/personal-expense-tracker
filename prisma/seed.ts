import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "password123",
    },
  });

  await prisma.expense.createMany({
    data: [
      {
        amount: 250,
        category: "Food",
        description: "Lunch",
        userId: user.id,
      },
      {
        amount: 1200,
        category: "Transport",
        description: "Gas",
        userId: user.id,
      },
      {
        amount: 499,
        category: "Entertainment",
        description: "Netflix",
        userId: user.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });