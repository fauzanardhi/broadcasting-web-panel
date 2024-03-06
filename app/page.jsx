import StatisticList from "@/components/List/StatisticList";
import getUserSession from "@/data/user";

export default async function Home() {
  const session = await getUserSession();
  return (
    <main>
      <h1>{session ? `Halo, ${session.name}` : "Anda Belum Login"}</h1>
      <StatisticList />
    </main>
  );
}
