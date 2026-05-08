import UserInterface from "./user";

export default interface ExpenseInterface {
  id: number;
  amount: number;
  category: string;
  description: string;
  income: number;
  notes: string;
  createdAt: Date;
  user: UserInterface
}