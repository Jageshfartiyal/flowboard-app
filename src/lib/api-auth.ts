import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

/**
 * Fast auth: reads the JWT from the cookie — no database call.
 * Use this in API routes instead of getServerSession().
 */
export async function getUserId(req: NextRequest): Promise<string | null> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return (token?.id as string) ?? null;
}
