import nodemailer from "nodemailer";

/**
 * Fire-and-forget mailer. NEVER throws — if SMTP credentials are wrong or the
 * mail server rejects (e.g. Gmail 535 BadCredentials), we log it server-side and
 * return false, but the caller's request still succeeds. Form submissions are
 * already persisted in the DB before this runs, so the user must always get a
 * success response regardless of email delivery.
 */
export async function sendMailSafe(messages: nodemailer.SendMailOptions[]) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    console.warn("[mailer] EMAIL_USER / EMAIL_PASS not set — skipping email send");
    return false;
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    for (const msg of messages) {
      await transporter.sendMail({ from: user, ...msg });
    }
    return true;
  } catch (err) {
    // Swallow — never surface email failures to the visitor.
    console.error("[mailer] send failed (ignored):", (err as Error).message);
    return false;
  }
}
