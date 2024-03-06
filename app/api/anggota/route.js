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
  const query = request.nextUrl.searchParams.get("q");
  const dataKelas12 = await prisma.member.findMany({
    where: {
      kelas: {
        contains: "12",
      },
      jabatan: "Anggota",
    },
    select: {
      slug: true,
      nama: true,
      kelas: true,
      image: true,
      gender: true,
      jabatan: true,
      divisi: true,
    },
    orderBy: {
      nama: "asc",
    },
  });

  const dataKelas11 = await prisma.member.findMany({
    where: {
      jabatan: "Anggota",
      kelas: {
        contains: "11",
      },
    },
    select: {
      slug: true,
      nama: true,
      kelas: true,
      image: true,
      gender: true,
      jabatan: true,
      divisi: true,
    },
    orderBy: {
      nama: "asc",
    },
  });

  const dataKelas10 = await prisma.member.findMany({
    where: {
      jabatan: "Anggota",
      kelas: {
        contains: "10",
      },
    },
    select: {
      slug: true,
      nama: true,
      kelas: true,
      image: true,
      gender: true,
      jabatan: true,
      divisi: true,
    },
    orderBy: {
      nama: "asc",
    },
  });

  const Kelas12OrangPenting = await prisma.member.findMany({
    where: {
      kelas: {
        contains: "12",
      },
      NOT: {
        jabatan: "Anggota",
      },
    },
    select: {
      slug: true,
      nama: true,
      kelas: true,
      image: true,
      gender: true,
      jabatan: true,
      divisi: true,
    },
    orderBy: {
      prioritas: "asc",
    },
  });

  const Kelas11OrangPenting = await prisma.member.findMany({
    where: {
      kelas: {
        contains: "11",
      },
      NOT: {
        jabatan: "Anggota",
      },
    },
    select: {
      slug: true,
      nama: true,
      kelas: true,
      image: true,
      gender: true,
      jabatan: true,
      divisi: true,
    },
    orderBy: {
      prioritas: "asc",
    },
  });

  const data = [
    ...Kelas12OrangPenting,
    ...dataKelas12,
    ...Kelas11OrangPenting,
    ...dataKelas11,
    ...dataKelas10,
  ];
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
  console.log("🚀 ~ POST ~ body:", body);
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
  } else {
    return NextResponse.json({
      status: 401,
      message: "Format Error",
    });
  }
}

export async function DELETE(request) {
  const body = await request.json();
  const id = body.id;
  const session = await getUserSession();
  if (session?.role !== "admin") {
    return NextResponse.json({
      status: 403,
      message: "Unautherize",
    });
  }
  console.log("🚀 ~ DELETE ~ id:", id);
  return NextResponse.json({
    status: 200,
    message: "OK",
  });
}

export async function PUT(request) {
  const body = await request.json();
  console.log("🚀 ~ POST ~ body:", body);
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
    // const newAnggota = prisma.member.update({
    //   where: {
    //     id: body.id
    //   }
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
  } else {
    return NextResponse.json({
      status: 401,
      message: "Format Error",
    });
  }
}
