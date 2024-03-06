import Navbar from "@/components/Layout/Navbar";
import getUserSession from "@/data/user";
import React from "react";

export default async function Template({ children }) {
  const session = await getUserSession();
  return (
    <div>
      <Navbar session={session}>{children}</Navbar>
    </div>
  );
}
