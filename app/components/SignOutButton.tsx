// components/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/login"
    });
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      Sign Out
    </button>
  );
}