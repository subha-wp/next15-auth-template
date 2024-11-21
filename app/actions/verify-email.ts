"use server";

import { auth } from "@/lib/lucia";
import { validateEmailVerificationToken } from "@/lib/tokens";

export async function verifyEmail(token: string) {
  try {
    const userId = await validateEmailVerificationToken(token);
    const user = await auth.getUser(userId);
    await auth.updateUserAttributes(userId, {
      email_verified: true,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Invalid or expired token" };
  }
}
