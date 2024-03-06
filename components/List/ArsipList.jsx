"use client";

import React from "react";

export default function ArsipList({ session }) {
  const [loading, setLoading] = useState(true);
  const query = useRef("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/anggota", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          // Lakukan sesuatu dengan data yang diterima
          setLoading(false);
          setData(data);
        } else {
          throw new Error("Gagal mengambil data");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-grow items-center justify-center ">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold">Loading</h1>
          <p className="text-gray-600">
            <span className="loading loading-bars loading-lg"></span>
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <h1>Daftar Arsip</h1>
    </>
  );
}
