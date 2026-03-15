import { Project, Task } from "@/types";

const now = new Date();
const d = (daysOffset: number) => new Date(now.getTime() + daysOffset * 86400000);

export const DEMO_PROJECTS: Project[] = [
  {
    id: "demo-1",
    name: "Website Redesign",
    description: "Full overhaul of the company marketing site with new branding and improved UX.",
    color: "#6366f1",
    userId: "demo",
    createdAt: d(-20),
    updatedAt: d(-1),
    tasks: [],
    _count: { tasks: 8 },
  },
  {
    id: "demo-2",
    name: "Mobile App v2.0",
    description: "Next generation mobile app with offline support and push notifications.",
    color: "#8b5cf6",
    userId: "demo",
    createdAt: d(-15),
    updatedAt: d(-2),
    tasks: [],
    _count: { tasks: 12 },
  },
  {
    id: "demo-3",
    name: "API Integration",
    description: "Connect third-party payment and analytics APIs to the main platform.",
    color: "#ec4899",
    userId: "demo",
    createdAt: d(-10),
    updatedAt: d(-3),
    tasks: [],
    _count: { tasks: 5 },
  },
  {
    id: "demo-4",
    name: "Q2 Marketing Campaign",
    description: "Multi-channel campaign for product launch targeting enterprise clients.",
    color: "#22c55e",
    userId: "demo",
    createdAt: d(-7),
    updatedAt: d(-1),
    tasks: [],
    _count: { tasks: 6 },
  },
  {
    id: "demo-5",
    name: "Security Audit",
    description: "Comprehensive review of authentication, data handling, and infrastructure.",
    color: "#f97316",
    userId: "demo",
    createdAt: d(-5),
    updatedAt: d(0),
    tasks: [],
    _count: { tasks: 4 },
  },
  {
    id: "demo-6",
    name: "Data Pipeline",
    description: "Build real-time ETL pipeline for processing customer analytics data.",
    color: "#06b6d4",
    userId: "demo",
    createdAt: d(-3),
    updatedAt: d(0),
    tasks: [],
    _count: { tasks: 7 },
  },
];

export const DEMO_TASKS: Task[] = [
  // Website Redesign tasks
  { id: "t1", title: "Design new homepage hero section", description: "Create Figma mockups for the hero with gradient animations", status: "DONE", priority: "HIGH", dueDate: d(-5), projectId: "demo-1", userId: "demo", createdAt: d(-18), updatedAt: d(-5), project: DEMO_PROJECTS[0] },
  { id: "t2", title: "Implement responsive navigation", description: "Mobile-first navigation with smooth animations", status: "DONE", priority: "HIGH", dueDate: d(-3), projectId: "demo-1", userId: "demo", createdAt: d(-17), updatedAt: d(-3), project: DEMO_PROJECTS[0] },
  { id: "t3", title: "Write copy for features page", description: "SEO-optimised content for all feature sections", status: "IN_PROGRESS", priority: "MEDIUM", dueDate: d(3), projectId: "demo-1", userId: "demo", createdAt: d(-16), updatedAt: d(-1), project: DEMO_PROJECTS[0] },
  { id: "t4", title: "Integrate analytics tracking", description: "Set up GA4 events for all CTAs and conversions", status: "TODO", priority: "MEDIUM", dueDate: d(7), projectId: "demo-1", userId: "demo", createdAt: d(-15), updatedAt: d(-15), project: DEMO_PROJECTS[0] },
  { id: "t5", title: "Performance optimisation pass", description: "Lighthouse score target: 95+ on all metrics", status: "TODO", priority: "HIGH", dueDate: d(5), projectId: "demo-1", userId: "demo", createdAt: d(-14), updatedAt: d(-14), project: DEMO_PROJECTS[0] },

  // Mobile App tasks
  { id: "t6", title: "Set up offline data sync", description: "Implement IndexedDB caching with background sync", status: "IN_PROGRESS", priority: "URGENT", dueDate: d(2), projectId: "demo-2", userId: "demo", createdAt: d(-13), updatedAt: d(-1), project: DEMO_PROJECTS[1] },
  { id: "t7", title: "Push notification service", description: "FCM integration for iOS and Android", status: "IN_PROGRESS", priority: "HIGH", dueDate: d(4), projectId: "demo-2", userId: "demo", createdAt: d(-12), updatedAt: d(-2), project: DEMO_PROJECTS[1] },
  { id: "t8", title: "Redesign onboarding flow", description: "5-step guided onboarding with progress indicators", status: "TODO", priority: "MEDIUM", dueDate: d(10), projectId: "demo-2", userId: "demo", createdAt: d(-11), updatedAt: d(-11), project: DEMO_PROJECTS[1] },
  { id: "t9", title: "Write unit tests for auth module", description: "Jest tests for login, signup, token refresh", status: "DONE", priority: "HIGH", dueDate: d(-8), projectId: "demo-2", userId: "demo", createdAt: d(-10), updatedAt: d(-8), project: DEMO_PROJECTS[1] },
  { id: "t10", title: "App store screenshots", description: "Produce 6.7\" and 5.5\" screenshots for all stores", status: "TODO", priority: "LOW", dueDate: d(14), projectId: "demo-2", userId: "demo", createdAt: d(-9), updatedAt: d(-9), project: DEMO_PROJECTS[1] },

  // API Integration
  { id: "t11", title: "Stripe payment webhook handler", description: "Handle charge.succeeded, failed, and refund events", status: "DONE", priority: "URGENT", dueDate: d(-6), projectId: "demo-3", userId: "demo", createdAt: d(-9), updatedAt: d(-6), project: DEMO_PROJECTS[2] },
  { id: "t12", title: "Mixpanel event tracking", description: "Track 20 key events across the funnel", status: "IN_PROGRESS", priority: "MEDIUM", dueDate: d(5), projectId: "demo-3", userId: "demo", createdAt: d(-8), updatedAt: d(-1), project: DEMO_PROJECTS[2] },
  { id: "t13", title: "API rate limiting middleware", description: "Implement token bucket algorithm for all endpoints", status: "TODO", priority: "HIGH", dueDate: d(8), projectId: "demo-3", userId: "demo", createdAt: d(-7), updatedAt: d(-7), project: DEMO_PROJECTS[2] },

  // Marketing Campaign
  { id: "t14", title: "LinkedIn ad creatives", description: "5 variations of carousel and single-image ads", status: "DONE", priority: "HIGH", dueDate: d(-4), projectId: "demo-4", userId: "demo", createdAt: d(-6), updatedAt: d(-4), project: DEMO_PROJECTS[3] },
  { id: "t15", title: "Email drip sequence (7 emails)", description: "Nurture sequence for trial signups", status: "IN_PROGRESS", priority: "HIGH", dueDate: d(3), projectId: "demo-4", userId: "demo", createdAt: d(-5), updatedAt: d(-1), project: DEMO_PROJECTS[3] },
  { id: "t16", title: "Landing page A/B test", description: "Test 3 headline variants with 500 visitor split", status: "TODO", priority: "MEDIUM", dueDate: d(12), projectId: "demo-4", userId: "demo", createdAt: d(-4), updatedAt: d(-4), project: DEMO_PROJECTS[3] },

  // Security Audit
  { id: "t17", title: "Penetration testing", description: "Engage external firm for black-box pentest", status: "IN_PROGRESS", priority: "URGENT", dueDate: d(1), projectId: "demo-5", userId: "demo", createdAt: d(-4), updatedAt: d(-1), project: DEMO_PROJECTS[4] },
  { id: "t18", title: "Fix SQL injection vulnerabilities", description: "Parameterise all raw DB queries found in audit", status: "TODO", priority: "URGENT", dueDate: d(2), projectId: "demo-5", userId: "demo", createdAt: d(-3), updatedAt: d(-3), project: DEMO_PROJECTS[4] },
  { id: "t19", title: "Enable MFA for all admin accounts", description: "TOTP setup with backup codes", status: "TODO", priority: "HIGH", dueDate: d(6), projectId: "demo-5", userId: "demo", createdAt: d(-2), updatedAt: d(-2), project: DEMO_PROJECTS[4] },

  // Data Pipeline
  { id: "t20", title: "Design Kafka topic schema", description: "Define Avro schemas for all event types", status: "DONE", priority: "HIGH", dueDate: d(-2), projectId: "demo-6", userId: "demo", createdAt: d(-3), updatedAt: d(-2), project: DEMO_PROJECTS[5] },
  { id: "t21", title: "Build Flink streaming job", description: "Real-time aggregation of user session data", status: "IN_PROGRESS", priority: "HIGH", dueDate: d(5), projectId: "demo-6", userId: "demo", createdAt: d(-2), updatedAt: d(-1), project: DEMO_PROJECTS[5] },
  { id: "t22", title: "Set up monitoring dashboards", description: "Grafana dashboards for pipeline health metrics", status: "TODO", priority: "MEDIUM", dueDate: d(9), projectId: "demo-6", userId: "demo", createdAt: d(-1), updatedAt: d(-1), project: DEMO_PROJECTS[5] },
];
