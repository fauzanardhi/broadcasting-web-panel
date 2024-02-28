import getUserSession from "@/data/user";


export default async function Home() {
  const session = await getUserSession()
  return (
    <main>
      <h1>{session ? session.name : "Anda Belum Login"}</h1>
      <section className="grid grid-cols-1 gap-3">
        <div className="p-3 bg-slate-200 rounded-md">
          <h2 className="text-sm font-semibold">Anggota</h2>
          <p className="text-lg font-bold">45 Orang</p>
        </div>
        <div className="p-3 bg-slate-200 rounded-md">
          <h2 className="text-sm font-semibold">Alunmi</h2>
          <p className="text-lg font-bold">103 Orang</p>
        </div>
        <div className="p-3 bg-slate-200 rounded-md">
          <h2 className="text-sm font-semibold">Dokumentasi</h2>
          <p className="text-lg font-bold">51 Link</p>
        </div>
      </section>
    </main>
  );
}
