"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getverificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getverificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token dose not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const exisitingUser = await getUserByEmail(existingToken.email);

  if (!exisitingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: exisitingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
