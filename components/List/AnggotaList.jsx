"use client";

import React, { useEffect, useRef, useState } from "react";
import AnggotaCard from "../Card/AnggotaCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaUserPlus } from "react-icons/fa";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AnggotaTable from "../Table/AnggotaTable";
import { toast } from "sonner";
import { Button } from "../ui/button";
import useSound from "use-sound";

export default function AnggotaList({ session }) {
  const [play, { stop, isPlaying }] = useSound("/cincin.mp3");
  const [data, setData] = useState([]);
  const nama = useRef("");
  const kelas = useRef("");
  const jabatan = useRef("");
  const gender = useRef("");
  const image = useRef("");
  const divisi = useRef("");

  const handlePlay = () => {
    if (!isPlaying) {
      play();
      toast.success("Achivement Unlock, Semoga Hidup Kitaaaa!");
    }
  };

  const handleStop = () => {
    if (!isPlaying) {
      stop();
    }
  };

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

  const addData = async (e) => {
    e.preventDefault();
    if (
      nama.current &&
      kelas.current &&
      image.current &&
      gender.current &&
      jabatan.current &&
      divisi.current
    ) {
      try {
        const res = await fetch("/api/anggota", {
          method: "POST",
          body: JSON.stringify({
            nama: nama.current,
            kelas: kelas.current,
            image: image.current,
            gender: gender.current,
            jabatan: jabatan.current,
            divisi: divisi.current,
          }),
        });

        if (!res.ok) {
          toast.error("Something went wrong");
        }

        toast.success("Data has been added successfully");
      } catch {
        toast.error("Something went wrong");
      }
    } else {
      toast.warning("Isi Data Dengan Format Yang Benar");
    }
  };

  const searchData = async (e) => {
    console.log("🚀 ~ AnggotaList ~ isPlaying:", isPlaying);
    query.current = e.target.value;
    e.preventDefault();
    if (e.target.value.toLowerCase() === "cincin") {
      handlePlay();
    } else {
      handleStop();
    }
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

  function changeGender(e) {
    gender.current = e;
  }

  function changeJabatan(e) {
    jabatan.current = e;
  }

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center">
        <input
          type="text"
          onChange={(e) => searchData(e)}
          placeholder="Cari Anggota"
          className="px-3 py-2 rounded-lg bg-white"
        />
        {session.role === "Admin" && (
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
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="nama_anggota">Nama Anggota</Label>
                  <Input
                    id="nama_anggota"
                    onChange={(e) => (nama.current = e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="kelas_anggota">Kelas</Label>
                  <Input
                    id="kelas_anggota"
                    onChange={(e) => (kelas.current = e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="image_anggota">Link Gambar</Label>
                  <Input
                    id="image_anggota"
                    onChange={(e) => (image.current = e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="jabatan_anggota">Jabatan</Label>
                  <Select
                    id="jabatan_anggota"
                    onValueChange={(e) => changeJabatan(e)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ketua">Ketua</SelectItem>
                      <SelectItem value="Wakil_Ketua">Wakil Ketua</SelectItem>
                      <SelectItem value="Sekertaris">Sekertaris</SelectItem>
                      <SelectItem value="Bendahara">Bendahara</SelectItem>
                      <SelectItem value="Anggota">Anggota</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="gender_anggota">Gender</Label>
                  <Select
                    id="gender_anggota"
                    onValueChange={(e) => changeGender(e)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laki_Laki">Laki Laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="kelas_anggota">Divisi</Label>
                  <Input
                    id="kelas_anggota"
                    onChange={(e) => (divisi.current = e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addData}>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {!data ? (
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <h1 className="mb-4 text-4xl font-bold">Data Tidak Ditemukan</h1>
            <p className="text-gray-600">
              {query.current.toLowerCase() === "bilal" ? (
                <span className="font-extrabold">
                  Itu Orang Idiot Jangan Dicari Goblok, Numpang Nama Doang
                </span>
              ) : (
                <p>
                  Waduh, Data Dengan Hasil Pencarian{" "}
                  <span className="font-bold">
                    {query.current === "cincin" ? (
                        <button onClick={handleStop}>cincin</button>
                    ) : (
                      query.current
                    )}
                  </span>{" "}
                  Yang Kamu Cari Tidak Ada!
                </p>
              )}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-3 gap-3 lg:hidden">
            {data.data.map((anggota, index) => (
              <div key={index}>
                <AnggotaCard data={anggota} session={session} />
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableHead>Nama Anggota</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Divisi</TableHead>
                {session.role === "Admin" && (
                  <TableHead className="text-right">Aksi</TableHead>
                )}
              </TableHeader>
              <TableBody>
                {data.data.map((anggota) => (
                  <AnggotaTable
                    data={anggota}
                    session={session}
                    key={anggota.id}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
