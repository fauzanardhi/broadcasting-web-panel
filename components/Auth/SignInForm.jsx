"use client";

import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "../ui/input";
import Image from "next/image";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function SignInForm() {
  const username = useRef("");
  const password = useRef("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleSetPass = () => {
    setShowPass(!showPass);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ SignInForm ~ username:", username)
      console.log("🚀 ~ SignInForm ~ password:", password)
    try {
      setLoadingAuth(true);
      const res = await signIn("credentials", {
        redirect: false,
        username: username.current,
        password: password.current,
        callbackUrl,
      });
      setLoadingAuth(false);
      console.log("🚀 ~ handleSignIn ~ res:", res)

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        toast.warning("Username Atau Password Yang Salah");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Ada Sesuatu Yang Salah");
    }
  };
  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-grow items-center justify-center ">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold">Loading</h1>
          <p className="text-gray-600">
            <span className="loading loading-bars loading-lg"></span>
          </p>
        </div>
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <h1>
          Anda Sudah Login, Silahkan ke{" "}
          <Link href="/" className="text-blue-400">
            Halaman Utama
          </Link>
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="p-3 rounded-md text-center shadow-lg">
          <div className="flex flex-col items-center">
            <Image src="/logo.ico" width={60} height={60} alt="logo"/>
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
          </div>
          <div className="p-4 flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-3 text-left">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                required
                onChange={(e) => (username.current = e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 text-left">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <div onClick={handleSetPass}>
                  {showPass ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                </div>
              </div>
              <Input
                id="password"
                required
                type={showPass ? "text" : "password"}
                onChange={(e) => (password.current = e.target.value)}
              />
            </div>
            <Button type="submit" className="mt-2" onClick={handleSignIn}>
              {loadingAuth ? "Loading" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInForm;
