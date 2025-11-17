import prisma from "~/utils/script.prisma";
import { USER_EMAIL_Types } from "./modules/user.constant";
import { loginSchema } from "./modules/validateUser";
export default defineEventHandler(async (event) => {
  const { email, otpCode } = await readBody(event);

  const result = loginSchema.safeParse({ email, otpCode });
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
    const existingOtpCode = userExists.otpCode;
    if (parseInt(existingOtpCode) === parseInt(otpCode)) {
      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          isValidEmail: USER_EMAIL_Types.VALID_EMAIL,
        },
      });
      return {
        message: "Your email has been verified successfully",
        redirect: true,
      };
    }
  } else {
    throw createError({ statusCode: 400, message: "Invalid E-mail address" });
  }
});
