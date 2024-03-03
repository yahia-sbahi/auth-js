import { db } from "../lib/db";

export const getverificationTokenByToken = async (token: string) => {
  try {
    const verifcationToken = await db.verificationToken.findUnique({
      where: { email_token: token },
    });
    return verifcationToken;
  } catch {
    return null;
  }
};

export const getverificationTokenByEmail = async (email: string) => {
  try {
    const verifcationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verifcationToken;
  } catch {
    return null;
  }
};
