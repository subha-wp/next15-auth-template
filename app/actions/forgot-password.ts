"use server";

import { auth } from "@/lib/lucia";
import { sendPasswordResetEmail } from "@/lib/email";
import { generatePasswordResetToken } from "@/lib/tokens";

export async function forgotPassword(email: string) {
  try {
    const user = await auth.getUserByEmail(email);
    const token = await generatePasswordResetToken(user.userId);
    await sendPasswordResetEmail(email, token);
    return { success: true };
  } catch (error) {
    return { success: false, error: "An error occurred" };
  }
}
