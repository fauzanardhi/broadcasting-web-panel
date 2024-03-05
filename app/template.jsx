import Navbar from "@/components/Layout/Navbar";
import getUserSession from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function Template({ children }) {
  const session = await getUserSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <Navbar session={session}>{children}</Navbar>
    </div>
  );
}
