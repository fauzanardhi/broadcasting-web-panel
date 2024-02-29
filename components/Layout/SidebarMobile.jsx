"use client";

import Link from "next/link";
import React from "react";
import { FaUserFriends, FaImages, FaUser, FaUsers } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";

export default function SidebarMobile({ children }) {
  const { status } = useSession();
  return (
    <div className="grid grid-cols-7 sm:grid-cols-11">
      <aside className="flex flex-col pt-2 gap-2 h-screen items-center bg-slate-100 sm:col-span-2 sticky top-0 right-0">
        <Link
          href="/anggota"
          className="p-2 m-2 rounded-md flex flex-col gap-1 items-center hover:bg-slate-400"
        >
          <FaUserFriends size={24} />
          <p className="text-sm text-center hidden sm:block">Daftar Anggota</p>
        </Link>
        <Link
          href="/alumni"
          className="p-2 m-2 rounded-md flex flex-col gap-1 items-center hover:bg-slate-400"
        >
          <FaUsers size={24} />
          <p className="text-sm text-center hidden sm:block">Daftar Alumni</p>
        </Link>
        <Link
          href="/dokumentasi"
          className="p-2 m-2 rounded-md flex flex-col gap-1 items-center hover:bg-slate-400"
        >
          <FaImages size={24} />
          <p className="text-sm text-center hidden sm:block">
            Daftar Dokumentasi
          </p>
        </Link>
        <Link
          href="/setting"
          className="p-2 m-2 rounded-md flex flex-col gap-1 items-center hover:bg-slate-400"
        >
          <FaGear size={24} />
          <p className="text-sm text-center hidden sm:block">
            Pengaturan Website
          </p>
        </Link>
        {status === "authenticated" && (
          <>
            <Separator className="my-1 mx-2 " />
            <Link
              href="/user"
              className="p-2 m-2 rounded-md flex flex-col gap-1 items-center hover:bg-slate-400"
            >
              <FaUser size={24} />
              <p className="text-sm text-center hidden sm:block">
                Pengaturan Akun
              </p>
            </Link>
            <Link
              href="/auth/signout"
              className="p-2 m-2 rounded-md flex flex-col gap-1 items-center bg-red-400 hover:bg-red-500"
            >
              <PiSignOutBold size={24} />
              <p className="text-sm text-center hidden sm:block">Keluar</p>
            </Link>
          </>
        )}
      </aside>
      <div className="col-span-6 m-3 sm:col-span-9">{children}</div>
    </div>
  );
}
