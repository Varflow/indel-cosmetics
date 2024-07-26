type SendMailOptions = {
  apiKey: string;
};

type SendEmailAttrs = {
  to: string;
  subject: string;
  html: string;
  options: SendMailOptions;
};

export const sendEmail = async ({
  to,
  subject,
  html,
  options,
}: SendEmailAttrs) => {
  const { apiKey } = options;
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ContentType: "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: to },
      subject: subject,
      content: [
        {
          type: "text/html",
          value: html,
        },
      ],
    }),
  });

  return await response.json();
};
