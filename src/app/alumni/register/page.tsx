"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterAlumniPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    passoutYear: "",
    linkedin: "",
    instagram: "",
    linktree: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/alumni", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/alumni");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register as Alumni</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type={key === "password" ? "password" : "text"}
            placeholder={key}
            value={(form as any)[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full border p-2 rounded"
            required={["name", "email", "passoutYear", "password"].includes(key)}
          />
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
