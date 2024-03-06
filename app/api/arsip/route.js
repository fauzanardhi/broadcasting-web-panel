import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const data = await prisma.dokumentasi.findMany();
  if (data.length < 0) {
    return NextResponse.json({
      status: 404,
      message: "Not Found",
    });
  }
  const query = request.nextUrl.searchParams.get("q");
  if (!query) {
    return NextResponse.json({
      status: 200,
      message: "OK",
      data: data,
    });
  }
  const selectedData = data.filter((data) =>
    data.name.toLowerCase().includes(query.toLowerCase())
  );
  if (selectedData.length > 0) {
    return NextResponse.json({
      status: 200,
      message: "OK",
      data: selectedData,
    });
  } else {
    return NextResponse.json({
      status: 404,
      message: "Not Found",
    });
  }
}

