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
  DialogFooter,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function AnggotaTable({ data, session }) {
  const nama = useRef("");
  const kelas = useRef("");
  const jabatan = useRef("");
  const gender = useRef("");
  const image = useRef("");
  const divisi = useRef([]);

  useEffect(() => {
    const initializeData = () => {
      nama.current = data.nama;
      kelas.current = data.kelas;
      jabatan.current = data.jabatan;
      gender.current = data.gender;
      image.current = data.image;
      divisi.current = data.divisi.map((item) =>
        item.divisi === "Tim_Kreatif" ? "Tim Kreatif" : item.divisi
      );
    };
    initializeData();
  }, []);

  const handleEditData = async (e) => {
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
          method: "PUT",
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

        toast.success("Data Berhasi Di Ubah");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch {
        toast.error("Something went wrong");
      }
    } else {
      toast.warning("Isi Data Dengan Format Yang Benar");
    }
  };

  const handleDeleteData = async () => {
    try {
      const res = await fetch("/api/anggota", {
        method: "DELETE",
        body: JSON.stringify({
          id: data.id,
        }),
      });

      if (!res.ok) {
        toast.error("Something went wrong");
      }
      toast.success("Data Berhasi Di Ubah");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch {
      toast.error("Something went wrong");
    }
  };

  function changeGender(e) {
    gender.current = e;
  }

  function changeJabatan(e) {
    jabatan.current = e;
  }

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
      {session.role === "Admin" && (
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MdMoreHoriz size={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-1">
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
                        defaultValue={data.nama}
                        onChange={(e) => (nama.current = e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="kelas_anggota">Kelas</Label>
                      <Input
                        id="kelas_anggota"
                        defaultValue={data.kelas}
                        onChange={(e) => (kelas.current = e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="image_anggota">Link Gambar</Label>
                      <Input
                        id="image_anggota"
                        defaultValue={data.image}
                        onChange={(e) => (image.current = e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="jabatan_anggota">Jabatan</Label>
                      <Select
                        id="jabatan_anggota"
                        defaultValue={data.jabatan}
                        onValueChange={(e) => changeJabatan(e)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Jabatan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ketua">Ketua</SelectItem>
                          <SelectItem value="Wakil_Ketua">
                            Wakil Ketua
                          </SelectItem>
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
                        defaultValue={data.gender}
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
                      <Label htmlFor="divisi_anggota">Divisi</Label>
                      <Input
                        id="divisi_anggota"
                        defaultValue={data.divisi.map((item) =>
                          item.divisi === "Tim_Kreatif"
                            ? "Tim Kreatif"
                            : item.divisi
                        )}
                        onChange={(e) => (divisi.current = e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleEditData}>Simpan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <p className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    Hapus Data
                  </p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Yakin Deck?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Data {data.nama} Akan Terhapus Di Server Dan Di Website
                      Selamanya
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Males Ah</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteData}>
                      Gasken, Bodoamat Aing
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  );
}
