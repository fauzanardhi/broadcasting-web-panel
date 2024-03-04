import React, { useEffect, useRef } from "react";
import { TableCell, TableRow } from "../ui/table";
import { MdMoreHoriz } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function AnggotaTable({ data }) {
  const nama = useRef("");
  const kelas = useRef("");
  const jabatan = useRef("");
  const gender = useRef("");

  useEffect(() => {
    const initializeData = () => {
      nama.current = data.nama;
      kelas.current = data.kelas;
      jabatan.current = data.jabatan;
      gender.current = data.jabatan;
    };
    initializeData();
  }, []);

  return (
    <TableRow>
      <TableCell>{data.nama}</TableCell>
      <TableCell>{data.kelas}</TableCell>
      <TableCell>
        {data.jabatan === "Wakil_Ketua" ? "Wakil Ketua" : data.jabatan}
      </TableCell>
      <TableCell>
        {data.gender === "Laki_Laki" ? "Laki Laki" : data.gender}
      </TableCell>
      <TableCell className="flex gap-2">
        {data.divisi.map((divisi, index) => (
          <div key={index}>
            <p>
              {divisi.divisi === "Tim_Kreatif" ? "Tim Kreatif" : divisi.divisi}
            </p>
          </div>
        ))}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdMoreHoriz size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger>
                <p className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  Ubah Data
                </p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ubah Data Anggota</DialogTitle>
                  <DialogDescription>
                    Ubah Data Anggota. Jan Lupa Disave Ya Sayang ❤{" "}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="nama_anggota">Nama Anggota</Label>
                    <Input
                      id="nama_anggota"
                      defaultValue={nama.current ? nama.current : data.nama}
                      onChange={(e) => nama.current === e.target.value}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="kelas_anggota">Kelas</Label>
                    <Input
                      id="kelas_anggota"
                      onChange={(e) => kelas.current === e.target.value}
                      defaultValue={kelas.current ? kelas.current : data.kelas}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="gender_anggota">Gender</Label>
                    <Select
                      id="gender_anggota"
                      defaultValue={
                        gender.current ? gender.current : data.gender
                      }
                      onChange={(e) => gender.current === e.target.value}
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
                    <Label htmlFor="divisi_anggota">Divisi</Label>
                    <Input id="divisi_anggota" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <DropdownMenuItem>Hapus Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
