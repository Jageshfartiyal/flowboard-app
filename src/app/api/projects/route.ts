import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/api-auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        _count: { select: { tasks: true } },
        tasks: { select: { id: true, status: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, description, color } = await req.json();
    if (!name) return NextResponse.json({ message: "Project name is required" }, { status: 400 });

    const project = await prisma.project.create({
      data: { name, description, color: color || "#6366f1", userId },
      include: { _count: { select: { tasks: true } } },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("[PROJECTS_POST]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
