"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditAlumniPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/alumni/${params.id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/alumni/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push(`/alumni/${params.id}`);
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Alumni</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "email", "passoutYear", "linkedin", "instagram", "linktree"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={form[field] || ""}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full border p-2 rounded"
          />
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
