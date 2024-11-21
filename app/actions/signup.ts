"use server";

import { auth } from "@/lib/lucia";
import { sendVerificationEmail } from "@/lib/email";
import { generateEmailVerificationToken } from "@/lib/tokens";

export async function signUp(email: string, password: string) {
  try {
    const user = await auth.createUser({
      key: {
        providerId: "email",
        providerUserId: email,
        password,
      },
      attributes: {
        email,
        email_verified: false,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const token = await generateEmailVerificationToken(user.userId);
    await sendVerificationEmail(email, token);

    return { success: true, session };
  } catch (error) {
    return { success: false, error: "An error occurred during signup." };
  }
}
