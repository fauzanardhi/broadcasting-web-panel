import React from "react";
import { Toaster } from "sonner";

export default function ToastProvider({ children }) {
  return (
    <div>
      <Toaster position="bottom-left" />
      {children}
    </div>
  );
}
