"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import SidebarMobile from "./SidebarMobile";
import SidebarComponent from "./Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar({ children, session }) {
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) {
    return <div>{children}</div>;
  }
  return (
    <div>
      <nav className="sticky top-0 flex justify-between p-3 px-3 bg-slate-200 items-center z-50">
        <h1>Broadcasting Web Panel</h1>
        <div>
          {session ? (
            <Popover>
              <PopoverTrigger>
                <FaCircleUser size={24} />
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <p>Halo, {session.name}</p>
                  <Link href="/auth/signout">
                    <p>Keluar</p>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href="/auth/login"
              className="px-3 py-2 bg-black rounded-md text-white"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <div className="block lg:hidden">
        <SidebarMobile>{children}</SidebarMobile>
      </div>
      <div className="hidden lg:block">
        <SidebarComponent>{children}</SidebarComponent>
      </div>
    </div>
  );
}
