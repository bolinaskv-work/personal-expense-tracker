"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="
        w-full block px-4 py-2 text-left text-sm text-white
        hover:bg-white hover:text-blue-500 hover:outline-hidden cursor-pointer
      "
    >
      Logout
    </button>
  );
}
