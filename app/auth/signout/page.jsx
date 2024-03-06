import SignOut from "@/components/Auth/SignOut";
import React from "react";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center">
      <div className="rounded-lg bg-white text-center shadow-xl">
        <SignOut />
      </div>
    </div>
  );
}
