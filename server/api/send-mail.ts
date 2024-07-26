type SendEmailBody = {
  to: string;
  subject: string;
  html: string;
};

export default defineEventHandler(async (event) => {
  const config = await useRuntimeConfig();
  const body: SendEmailBody = await readBody(event);

  const response = await $fetch("https://api.sendgrid.com/v3/mail/send", {
    headers: {
      Authorization: `Bearer ${config.public.sendGridApiKey}`,
      ContentType: "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      personalizations: [{ to: [{ email: config.public.to }] }],
      from: { email: config.public.to },
      subject: body.subject,
      content: [
        {
          type: "text/html",
          value: body.html,
        },
      ],
    }),
  });

  return response;
});
