"use client";

import React from "react";
import { FaUserFriends, FaImages, FaUser, FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SidebarComponent({ children }) {
  const { status } = useSession();
  return (
    <div className="grid grid-cols-12">
      <aside className="bg-gray-100 sticky top-0 left-0 p-3 flex flex-col gap-3 col-span-2 h-screen">
        <Link
          href="/anggota"
          className="flex gap-2 p-3 items-center hover:text-gray-500"
        >
          <FaUserFriends size={23} />
          <p>Daftar Anggota</p>
        </Link>
        <Link
          href="/alumni"
          className="flex gap-2 p-3 items-center hover:text-gray-500"
        >
          <FaUsers size={23} />
          <p>Daftar Alumni</p>
        </Link>
        <Link
          href="/dokumentasi"
          className="flex gap-2 p-3 items-center hover:text-gray-500"
        >
          <FaImages size={23} />
          <p>Daftar Dokumentasi</p>
        </Link>
        <Link
          href="/setting"
          className="flex gap-2 p-3 items-center hover:text-gray-500"
        >
          <FaGear size={23} />
          <p>Pengaturan Website</p>
        </Link>
        {status === "authenticated" && (
          <>
            <Separator className="my-1 mx-2 " />
            <Link
              href="/user"
              className="flex gap-2 items-center p-3 hover:text-gray-500"
            >
              <FaUser size={23} />
              <p>Pengaturan Akun</p>
            </Link>
            <Link
              href="/auth/signout"
              className="flex gap-2 items-center p-3 rounded-md bg-red-400 hover:bg-red-500"
            >
              <PiSignOutBold size={23} />
              <p>Keluar</p>
            </Link>
          </>
        )}
      </aside>
      <div className="col-span-10 m-3">{children}</div>
    </div>
  );
}
