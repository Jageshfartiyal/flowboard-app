import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/api-auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const task = await prisma.task.findFirst({
      where: { id: params.id, userId },
      include: { project: true },
    });

    if (!task) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(task);
  } catch (error) {
    console.error("[TASK_GET]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const existing = await prisma.task.findFirst({ where: { id: params.id, userId } });
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const updated = await prisma.task.update({
      where: { id: params.id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.priority !== undefined && { priority: body.priority }),
        ...(body.dueDate !== undefined && { dueDate: body.dueDate ? new Date(body.dueDate) : null }),
        ...(body.projectId !== undefined && { projectId: body.projectId }),
      },
      include: {
        project: { select: { id: true, name: true, color: true } },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[TASK_PATCH]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserId(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const existing = await prisma.task.findFirst({ where: { id: params.id, userId } });
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    await prisma.task.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("[TASK_DELETE]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
