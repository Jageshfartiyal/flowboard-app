import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create demo user
  const hashedPassword = await bcrypt.hash("Pass@1234", 10);
  const user = await prisma.user.upsert({
    where: { email: "jagesh@yopmail.com" },
    update: {},
    create: {
      name: "Jagesh",
      email: "jagesh@yopmail.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Demo user created:", user.email);

  // Create projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: "seed-proj-1" },
      update: {},
      create: { id: "seed-proj-1", name: "Website Redesign", description: "Full overhaul of the marketing site with new branding.", color: "#6366f1", userId: user.id },
    }),
    prisma.project.upsert({
      where: { id: "seed-proj-2" },
      update: {},
      create: { id: "seed-proj-2", name: "Mobile App v2.0", description: "Next generation mobile app with offline support.", color: "#8b5cf6", userId: user.id },
    }),
    prisma.project.upsert({
      where: { id: "seed-proj-3" },
      update: {},
      create: { id: "seed-proj-3", name: "API Integration", description: "Connect third-party payment and analytics APIs.", color: "#ec4899", userId: user.id },
    }),
    prisma.project.upsert({
      where: { id: "seed-proj-4" },
      update: {},
      create: { id: "seed-proj-4", name: "Q2 Marketing Campaign", description: "Multi-channel campaign for product launch.", color: "#22c55e", userId: user.id },
    }),
  ]);

  console.log("✅ Projects created:", projects.length);

  // Create tasks
  const tasks = [
    { title: "Design new homepage hero", status: "DONE", priority: "HIGH", projectId: projects[0].id },
    { title: "Implement responsive navigation", status: "DONE", priority: "HIGH", projectId: projects[0].id },
    { title: "Write copy for features page", status: "IN_PROGRESS", priority: "MEDIUM", projectId: projects[0].id },
    { title: "Integrate analytics tracking", status: "TODO", priority: "MEDIUM", projectId: projects[0].id },
    { title: "Performance optimisation", status: "TODO", priority: "HIGH", projectId: projects[0].id },
    { title: "Set up offline data sync", status: "IN_PROGRESS", priority: "URGENT", projectId: projects[1].id },
    { title: "Push notification service", status: "IN_PROGRESS", priority: "HIGH", projectId: projects[1].id },
    { title: "Redesign onboarding flow", status: "TODO", priority: "MEDIUM", projectId: projects[1].id },
    { title: "Unit tests for auth module", status: "DONE", priority: "HIGH", projectId: projects[1].id },
    { title: "Stripe webhook handler", status: "DONE", priority: "URGENT", projectId: projects[2].id },
    { title: "Mixpanel event tracking", status: "IN_PROGRESS", priority: "MEDIUM", projectId: projects[2].id },
    { title: "API rate limiting middleware", status: "TODO", priority: "HIGH", projectId: projects[2].id },
    { title: "LinkedIn ad creatives", status: "DONE", priority: "HIGH", projectId: projects[3].id },
    { title: "Email drip sequence", status: "IN_PROGRESS", priority: "HIGH", projectId: projects[3].id },
    { title: "Landing page A/B test", status: "TODO", priority: "MEDIUM", projectId: projects[3].id },
  ] as const;

  for (const task of tasks) {
    await prisma.task.create({
      data: { ...task, userId: user.id },
    });
  }

  console.log("✅ Tasks created:", tasks.length);
  console.log("\n🎉 Seed complete!");
  console.log("   Login: jagesh@yopmail.com");
  console.log("   Password: Pass@1234");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
