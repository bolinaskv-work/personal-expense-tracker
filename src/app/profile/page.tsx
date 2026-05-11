import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserInfo from "@/app/components/user-info";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <h1 className="text-center text-3xl font-bold mb-6">PROFILE PAGE</h1>
      <div className="border border-dashed rounded p-5">
        <h2 className="text-xl font-bold mb-5">User Information</h2>
        <UserInfo />
      </div>
    </div>
  );
}
