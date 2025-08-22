"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alumni } from "@/types/alumni";

export default function AlumniListPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (!data.user) {
        router.push("/login");
      } else {
        // setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchAlumni = async () => {
      const res = await fetch(`/api/alumni?search=${search}&page=${page}`);
      const data = await res.json();
      setAlumni(data.alumni);
      setTotalPages(data.totalPages);
    };
    fetchAlumni();
  }, [search, page]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Alumni Directory</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full border p-2 mb-4 rounded"
      />
      <ul>
        {alumni.map((a) => (
          <li key={a._id} className="p-3 border-b flex justify-between items-center">
            <span>{a.name} ({a.passoutYear})</span>
            <Link href={`/alumni/${a._id}`} className="text-blue-600">View</Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 text-gray-700"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 text-gray-700"
        >
          Next
        </button>
      </div>
      <Link href="/alumni/register" className="block mt-6 text-blue-600">
        + Register as Alumni
      </Link>
    </div>
  );
}
