import React from "react";
import AuthProvider from "./AuthProvider";
import ToastProvider from "./ToastProvider";

export default function AllProviders({ children }) {
  return (
    <div>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </div>
  );
}
