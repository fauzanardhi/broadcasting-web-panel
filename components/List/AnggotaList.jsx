"use client";

import React, { useEffect, useRef, useState } from "react";
import AnggotaCard from "../Card/AnggotaCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaUserPlus } from "react-icons/fa";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function AnggotaList() {
  const [data, setData] = useState([]);
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

  const searchData = async (e) => {
    query.current = e.target.value;
    e.preventDefault();
    try {
      const response = await fetch(`/api/anggota?q=${e.target.value}`, {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        // Lakukan sesuatu dengan data yang diterima
        setLoading(false);
        setData(data);
      } else {
        setData(undefined);
      }
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center">
        <input
          type="text"
          onChange={(e) => searchData(e)}
          placeholder="Cari Anggota"
          className="px-3 py-2 rounded-md"
        />
        <Dialog>
          <DialogTrigger>
            <FaUserPlus size={27} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Anggota</DialogTitle>
              <DialogDescription>
                Tambah Anggota. Jan Lupa Disave Ya Sayang ❤{" "}
              </DialogDescription>
            </DialogHeader>
            <form>
              <div className="flex flex-col gap-2">
                <Label htmlFor="nama_anggota">Nama Anggota</Label>
                <Input id="nama_anggota" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="kelas_anggota">Kelas</Label>
                <Input id="kelas_anggota" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="kelas_anggota">Kelas</Label>
                <Input id="kelas_anggota" />
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {!data ? (
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="text-gray-600">
              {query.current.toLowerCase() === "bilal" ? (
                <span className="font-extrabold">
                  Itu Orang Idiot Jangan Dicari Goblok, Numpang Nama Doang
                </span>
              ) : (
                <p>
                  Waduh, Data Dengan Hasil Pencarian{" "}
                  <span className="font-bold">{query.current}</span> Yang Kamu
                  Cari Tidak Ada!
                </p>
              )}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 mt-3">
          {data.data.map((anggota, index) => (
            <div key={index}>
              <AnggotaCard data={anggota} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
