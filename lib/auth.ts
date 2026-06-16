import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret"
);

/**
 * Verifies the admin_token cookie. Returns the decoded payload if valid,
 * otherwise returns null. Use inside API route handlers to gate write access.
 */
export async function getAdminSession() {
  try {
    const token = (await cookies()).get("admin_token")?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId?: string; email?: string };
  } catch {
    return null;
  }
}

/** Throws-style guard — returns true when request is authenticated. */
export async function isAdmin() {
  const session = await getAdminSession();
  return !!session;
}
