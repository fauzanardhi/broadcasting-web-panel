import React from "react";

export default function AnggotaCard({ data }) {
  console.log(data);
  return (
    <div className="bg-slate-200 p-2 rounded-md">
      <h3>{data.nama}</h3>
      <h4>{data.jabatan}</h4>
      <p>{data.kelas}</p>
    </div>
  );
}
