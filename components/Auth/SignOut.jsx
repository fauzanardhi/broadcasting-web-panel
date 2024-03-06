"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  if (typeof window !== "undefined") {
    return (
      <div className="text-center p-3 py-5">
        <h1 className="font-semibold text-xl">Kamu Yakin?</h1>
        <p>Kamu Harus Login Lagi Loh</p>
        <div className="flex p-3 flex-grow">
          <Link href="/">
            <Button variant="outline">Nga Jadi Ah</Button>
          </Link>
          <Link href="/api/auth/signout">
            <Button>Yakin Lah</Button>
          </Link>
        </div>
      </div>
    );
  }
}
