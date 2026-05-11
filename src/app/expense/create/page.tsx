import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CreateForm from "./components/form";

export default async function ExpenseCreatePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <CreateForm />;
}
