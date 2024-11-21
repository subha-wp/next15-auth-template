"use server";

import { auth } from "@/lib/lucia";
import { cookies } from "next/headers";

export async function logout() {
  const authRequest = auth.handleRequest({ cookies });
  const session = await authRequest.validate();
  if (!session) {
    return { success: false, error: "No active session" };
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return { success: true };
}
