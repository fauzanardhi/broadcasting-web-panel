"use client";

import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

function SignInForm() {
  const email = useRef("");
  const password = useRef("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleSetPass = () => {
    setShowPass(!showPass);
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: email.current,
        password: password.current,
        callbackUrl,
      });
      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        toast.warning("Email Atau Password Yang Salah");
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
            Homepage
          </Link>
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Masuk Ke Coding Store
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => (email.current = e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 flex gap-3">
                <input
                  id="password"
                  name="password"
                  type={showPass ? "password" : "text"}
                  autoComplete="current-password"
                  onChange={(e) => (password.current = e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span onClick={handleSetPass} className="flex items-center">
                  {showPass ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
                </span>
              </div>
            </div>

            <div>
              {loading ? (
                <button className="flex w-full justify-center cursor-not-allowed rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Masuk
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Loading
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignInForm;
