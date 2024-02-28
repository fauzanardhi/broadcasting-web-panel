"use client";

import React, { useEffect } from "react";
import AnggotaCard from "../Card/AnggotaCard";

export default function AnggotaList() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/anggota", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          // Lakukan sesuatu dengan data yang diterima
          console.log(data);
        } else {
          throw new Error('Gagal mengambil data');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-2">
        <AnggotaCard />
      </div>
    </div>
  );
}
