import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/api-auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        ...(projectId && { projectId }),
        ...(status && { status: status as any }),
      },
      include: {
        project: { select: { id: true, name: true, color: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("[TASKS_GET]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { title, description, status, priority, dueDate, projectId } = await req.json();
    if (!title || !projectId) {
      return NextResponse.json({ message: "Title and projectId are required" }, { status: 400 });
    }

    const project = await prisma.project.findFirst({ where: { id: projectId, userId } });
    if (!project) return NextResponse.json({ message: "Project not found" }, { status: 404 });

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId,
        userId,
      },
      include: {
        project: { select: { id: true, name: true, color: true } },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("[TASKS_POST]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
