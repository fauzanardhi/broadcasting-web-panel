import React from "react";
import { Toaster } from "sonner";

export default function ToastProvider({ children }) {
  return (
    <div>
      <Toaster position="top-right" />
      {children}
    </div>
  );
}
