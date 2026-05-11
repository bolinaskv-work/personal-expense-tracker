import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import config from "@/config/config";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(config.defaultPassword, 10);
  const user = await prisma.user.create({
    data: {
      email: "bolinas.kv.work@gmail.com",
      password: hashedPassword,
      name: "Kurt",
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
      {
        amount: 300,
        category: "Food",
        description: "Dinner",
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
