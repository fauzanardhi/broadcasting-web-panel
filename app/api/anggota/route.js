import getUserSession from "@/data/user";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

const toSlug = (str) => {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

function stringToArray(str) {
  return str.split(",");
}

export async function GET(request, response) {
  const session = await getUserSession();
  if (!session)
    return NextResponse.json(
      { status: 403, message: "Unautherize" },
      { status: 403 }
    );

  const query = request.nextUrl.searchParams.get("q");
  const data = await prisma.member.findMany({
    include: {
      divisi: true,
    },
  });
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

export async function POST(request) {
  const body = await request.json();
  const session = await getUserSession();
  if (session?.role !== "admin") {
    return NextResponse.json({
      status: 403,
      message: "Unautherize",
    });
  }
  if (
    body.nama &&
    body.kelas &&
    body.image &&
    body.gender &&
    body.jabatan &&
    body.divisi
  ) {
    const newDivisi = stringToArray(body.divisi);
    console.log(newDivisi);
    console.log(body);
    // const newAnggota = prisma.member.create({
    //   data: {
    //     nama: body.nama,
    //     slug: toSlug(body.nama),
    //     kelas: body.kelas,
    //     image: body.image ? body.image : null,
    //     gender: body.gender,
    //     jabatan: body.jabatan,
    //     divisi: {
    //       create: [

    //       ],
    //     },
    //   },
    // });
  }
}
