import prisma from "~/utils/script.prisma";
import { hashPassword } from "./modules/bcrypt";
import { generateOtpCode } from "./modules/generateOtpCode";
import { sendEmailVerification } from "./modules/send-email-verification";
import { USER_EMAIL_Types } from "./modules/user.constant";
import { loginSchema } from "./modules/validateUser";
export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation Failed",
      data: result.error.flatten(),
    });
  }
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userExists) {
    throw createError({ statusCode: 400, message: "User already exists" });
  }
  const hashPwd = await hashPassword(password);
  const otpCode = generateOtpCode();
  const user = await prisma.user.create({
    data: {
      email,
      isValidEmail: USER_EMAIL_Types.INVALID_EMAIL,
      otpCode,
      password: hashPwd,
    },
  });
  await sendEmailVerification(email, otpCode);
  return { message: "User created successfully", user, redirect: true };
});
