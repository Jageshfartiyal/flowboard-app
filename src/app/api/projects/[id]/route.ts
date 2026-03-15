import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/api-auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const project = await prisma.project.findFirst({
      where: { id: params.id, userId },
      include: {
        tasks: { orderBy: { createdAt: "desc" } },
        _count: { select: { tasks: true } },
      },
    });

    if (!project) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_GET]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, description, color } = await req.json();

    const existing = await prisma.project.findFirst({ where: { id: params.id, userId } });
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const updated = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(color && { color }),
      },
      include: { _count: { select: { tasks: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PROJECT_PATCH]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const existing = await prisma.project.findFirst({ where: { id: params.id, userId } });
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("[PROJECT_DELETE]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
