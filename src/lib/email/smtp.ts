import nodemailer from "nodemailer"

export function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM
  )
}

export function createSmtpTransport() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP no configurado. Completa SMTP_HOST, SMTP_USER y SMTP_PASS en .env"
    )
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export async function sendMail(options: {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}) {
  const from =
    process.env.SMTP_FROM ||
    `"BOGA Ingeniería Portátil" <${process.env.SMTP_USER}>`

  const transport = createSmtpTransport()
  return transport.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
  })
}
