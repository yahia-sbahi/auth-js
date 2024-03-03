import { getTwofactorTokenByEmail } from "./../data/two-factor-token";
import crypto from "crypto";
import { getverificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "./db";
import {
  getPasswordResetTokenByToken,
  getPasswordResetTokenByEmail,
} from "@/data/password-reset-token";

export const generateTwoFactorToken = async (email: string) => {
  const email_token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const existingToken = await getTwofactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      email_token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const email_token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      email_token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const email_token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getverificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      email_token,
      expires,
    },
  });

  return verficationToken;
};
