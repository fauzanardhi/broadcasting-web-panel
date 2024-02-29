import React from "react";

export default function LoadingPage() {
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
