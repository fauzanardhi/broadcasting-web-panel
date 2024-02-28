"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import SidebarMobile from "./SidebarMobile";

export default function Navbar({ children }) {
  return (
    <div>
      <nav className="sticky top-0 flex justify-between p-3 bg-slate-200 items-center z-50">
        <h1>Broadcasting Web Panel</h1>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <FaCircleUser size={24} />
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <p>Halo, User</p>
                <p>Keluar</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
      <div className="block md:hidden">
        <SidebarMobile>{children}</SidebarMobile>
      </div>
      <div className="hidden md:block"></div>
    </div>
  );
}
