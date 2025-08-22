"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<{ _id: string; name: string } | null>(null);
  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user));
  }, []);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/alumni" className="font-semibold text-gray-700">{process.env.NEXT_PUBLIC_APP_NAME}</Link>
        <div className="flex items-center gap-4">
          <Link href="/alumni" className="hover:underline text-gray-700">Alumni</Link>
          {user ? (
            <>
              

              <form action="/api/auth/logout" method="POST">
                <button className="px-3 py-1 rounded border text-gray-700 text-gray-700">Logout</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline text-gray-700">Login</Link>
              <Link href="/alumni/register" className="px-3 py-1 rounded border text-gray-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );

}