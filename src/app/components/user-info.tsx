"use client";

import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div>
      <div>
        <span className="font-bold">Email :</span>
        <span> {session?.user?.email}</span>
      </div>
      <div>
        <span className="font-bold">Name :</span>
        <span> {session?.user?.name}</span>
      </div>
    </div>
  );
}
