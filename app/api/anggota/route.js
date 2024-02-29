import getUserSession from "@/data/user";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  const session = await getUserSession();
  if (!session)
    return NextResponse.json(
      { status: 403, message: "Unautherize" },
      { status: 403 }
    );

  const query = request.nextUrl.searchParams.get("q");
  const data = await prisma.member.findMany({});
  if (!query) {
    return NextResponse.json({
      status: 200,
      message: "OK",
      data: data,
    });
  }
  const selectedData = data.filter((data) =>
    data.nama.toLowerCase().includes(query.toLowerCase())
  );
  if (selectedData.length > 0) {
    return NextResponse.json({
      status: 200,
      message: "OK",
      data: selectedData,
    });
  } else {
    return NextResponse.json(
      { status: 404, message: "Not Found" },
      { status: 404 }
    );
  }
}
