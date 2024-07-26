import client from "@sendgrid/mail";

type SendEmailBody = {
  to: string;
  subject: string;
  html: string;
};

export default defineEventHandler(async (event) => {
  try {
    const config = await useRuntimeConfig();
    const body: SendEmailBody = await readBody(event);

    const msg = {
      to: config.public.mailTo, // Change to your recipient
      from: config.public.mailTo, // Change to your verified sender
      subject: body.subject,
      html: body.html,
    };

    client.setApiKey(config.public.sendGridApiKey);
    const res = await client.send(msg);
    console.log("Email sent successfully", res);
    return res;
  } catch (e) {
    console.error("Error Response", e);
    return e;
  }
});
