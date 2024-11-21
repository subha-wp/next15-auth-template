"use server";

import { auth } from "@/lib/lucia";
import { validatePasswordResetToken } from "@/lib/tokens";

export async function resetPassword(token: string, newPassword: string) {
  try {
    const userId = await validatePasswordResetToken(token);
    await auth.updateKeyPassword("email", userId, newPassword);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Invalid or expired token" };
  }
}
