import React from "react";

async function getAnggota() {
  const res = await fetch("https://broadcasting-panel.vercel.app/api/anggota", {
    cache: "no-store",
  });
  if (res.ok) {
    return res.json();
  }
  return;
}

async function getArsip() {
  const res = await fetch("https://broadcasting-panel.vercel.app/api/arsip", {
    cache: "no-store",
  });
  if (res.ok) {
    return res.json();
  }
  return;
}

async function StatisticList() {
  const anggota = await getAnggota();
  const arsip = await getArsip();
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      <div className="p-3 bg-slate-200 rounded-md">
        <h2 className="text-sm font-semibold">Anggota</h2>
        <p className="text-lg font-bold">
          {anggota ? `${anggota.data.length} Orang` : "Error"}
        </p>
      </div>
      <div className="p-3 bg-slate-200 rounded-md">
        <h2 className="text-sm font-semibold">Alunmi</h2>
        <p className="text-lg font-bold">103 Orang</p>
      </div>
      <div className="p-3 bg-slate-200 rounded-md">
        <h2 className="text-sm font-semibold">Dokumentasi</h2>
        <p className="text-lg font-bold">
          {arsip ? `${arsip.data.length} Link` : "Error"}
        </p>
      </div>
    </section>
  );
}

export default StatisticList;
