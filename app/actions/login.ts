// @ts-nocheck
"use server";

import { auth } from "@/lib/lucia";
import { LuciaError } from "lucia";

export async function login(email: string, password: string) {
  try {
    const key = await auth.useKey("email", email, password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    return { success: true, session };
  } catch (error) {
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      return { success: false, error: "Incorrect email or password" };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}
