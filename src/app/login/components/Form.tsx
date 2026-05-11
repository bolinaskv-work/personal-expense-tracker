"use client";

import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import NoticeIcon from "@/assets/components/NoticeIcon";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrorMessage("");

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setErrorMessage("Invalid Credentials.");
        setTimeout(() => setErrorMessage(""), 2500);
        return;
      }

      redirect("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen justify-items-center content-center">
      <div className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 border rounded space-y-5 p-5">
        <h1 className="font-bold text-center text-2xl">LOGIN</h1>
        <form onSubmit={handleLogin} className="justify-items-center space-y-4">
          <div className="w-full border rounded">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full border rounded">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full border rounded px-4 py-2 cursor-pointer bg-white text-black hover:bg-blue-700 hover:text-white hover:outline-2 disabled:opacity-50"
          >
            {isLoading ? "Logging in ..." : "Submit"}
          </button>

          {errorMessage && (
            <div className="flex gap-x-1 w-full rounded bg-gray-300 text-sm text-red-700 justify-center p-2">
              <NoticeIcon className="w-5 h-5" /> {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
