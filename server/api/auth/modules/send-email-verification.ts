export async function sendEmailVerification(
  receiverEmail: string,
  optCode: string
) {
  const nodeMailer = useNodeMailer();

  await nodeMailer.sendMail({
    subject: "Email Verification",
    text: "Hello use this code to verify your email address : " + optCode,
    to: receiverEmail,
  });
}
