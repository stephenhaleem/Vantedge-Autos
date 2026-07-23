import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      email: string;
      phone: string;
      country: string;
      interest: string;
      message: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY environment variable is not set");
      return { success: false, error: "Email service not configured" };
    }

    const resend = new Resend(RESEND_API_KEY);

    const subject = data.interest
      ? `New Enquiry: ${data.interest} — ${data.name}`
      : `New Enquiry from ${data.name}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: 'Inter', sans-serif; background: #f8f8f8; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 4px; overflow: hidden;">
          <div style="background: #0f0f0f; padding: 32px 40px;">
            <h1 style="color: #ffffff; font-family: 'Outfit', sans-serif; font-weight: 300; font-size: 24px; margin: 0;">
              Chrono Value Auto
            </h1>
            <p style="color: #a3a3a3; font-size: 12px; margin: 8px 0 0; text-transform: uppercase; letter-spacing: 2px;">
              New Contact Enquiry
            </p>
          </div>
          <div style="padding: 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #a3a3a3; width: 120px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #0f0f0f;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #a3a3a3;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #0f0f0f;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #a3a3a3;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #0f0f0f;">${data.phone || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #a3a3a3;">Country</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #0f0f0f;">${data.country || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #a3a3a3;">Interest</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #0f0f0f;">${data.interest || "—"}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #a3a3a3; margin: 0 0 8px;">Message</p>
              <p style="font-size: 14px; color: #0f0f0f; line-height: 1.6; margin: 0;">${data.message || "—"}</p>
            </div>
          </div>
          <div style="background: #f8f8f8; padding: 24px 40px; border-top: 1px solid #eee;">
            <p style="font-size: 11px; color: #a3a3a3; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
              Sent via Chrono Value Auto contact form
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      const { error, data: emailData } = await resend.emails.send({
        from: "Chrono Value Auto <onboarding@resend.dev>",
        to: ["sentinel19101910@gmail.com"],
        replyTo: data.email,
        subject,
        html: htmlContent,
      });

      if (error) {
        console.error("Resend error:", error);
        const message =
          typeof error === "object" && error !== null
            ? (error as { message?: string }).message || JSON.stringify(error)
            : JSON.stringify(error);
        return { success: false, error: `Email error: ${message}` };
      }

      console.log("Email sent successfully:", emailData);
      return { success: true };
    } catch (err) {
      console.error("Failed to send email:", err);
      const message = err instanceof Error ? err.message : "Unknown error";
      return { success: false, error: `Email error: ${message}` };
    }
  });
