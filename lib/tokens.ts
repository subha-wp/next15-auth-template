// @ts-nocheck
import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { auth } from "./lucia";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
  const token = generateRandomString(40);
  await auth.createKey({
    userId,
    type: "email_verification",
    key: token,
    expiresIn: EXPIRES_IN,
  });
  return token;
};

export const validateEmailVerificationToken = async (token: string) => {
  const key = await auth.getKey("email_verification", token);
  await auth.invalidateKey(key.id);
  if (!isWithinExpiration(key.expires)) {
    throw new Error("Expired token");
  }
  return key.userId;
};

export const generatePasswordResetToken = async (userId: string) => {
  const token = generateRandomString(40);
  await auth.createKey({
    userId,
    type: "password_reset",
    key: token,
    expiresIn: EXPIRES_IN,
  });
  return token;
};

export const validatePasswordResetToken = async (token: string) => {
  const key = await auth.getKey("password_reset", token);
  await auth.invalidateKey(key.id);
  if (!isWithinExpiration(key.expires)) {
    throw new Error("Expired token");
  }
  return key.userId;
};
