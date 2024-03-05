import AnggotaList from "@/components/List/AnggotaList";
import getUserSession from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function AnggotaPage() {
  const session = await getUserSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h1>Daftar Anggota</h1>
      <AnggotaList session={session} />
    </div>
  );
}
