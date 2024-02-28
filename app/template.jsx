import Navbar from "@/components/Layout/Navbar";
import React from "react";

export default function Template({ children }) {
  return (
    <div>
      <Navbar>{children}</Navbar>
    </div>
  );
}
