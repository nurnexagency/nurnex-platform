import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const NURNEX_ADMIN = "MovlanAliyev@Nurnex.com";

type Body = {
  companyName: string;
  email: string;
  employeeCount: number;
  focusArea: string;
  address: string;
  weeklyJobLimit: number;
  agreedAt: string;
};

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    companyName,
    email,
    employeeCount,
    focusArea,
    address,
    weeklyJobLimit,
    agreedAt,
  } = body;

  if (
    !companyName?.trim() ||
    !email?.trim() ||
    typeof employeeCount !== "number" ||
    !focusArea?.trim() ||
    !address?.trim() ||
    typeof weeklyJobLimit !== "number" ||
    !agreedAt
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const summary = {
    to: [NURNEX_ADMIN, email.trim()],
    subject: `[Nurnex] Partner agreement accepted — ${companyName}`,
    text: [
      `Company: ${companyName}`,
      `Email: ${email}`,
      `Employees: ${employeeCount}`,
      `Focus: ${focusArea}`,
      `Address: ${address}`,
      `Weekly job limit: ${weeklyJobLimit}`,
      `Accepted at: ${agreedAt}`,
      "",
      "Partner agrees to minimum USD $1,000 commission per successful hire to Nurnex;",
      "exact fees per assignment to be reflected in the agency board.",
    ].join("\n"),
  };

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.RESEND_FROM ||
            "Nurnex <onboarding@resend.dev>",
          to: [NURNEX_ADMIN, email.trim()],
          subject: summary.subject,
          text: summary.text,
        }),
      });
    } catch (e) {
      console.error("Resend error", e);
    }
  } else {
    console.info("[recruiter/agreement] Email not sent (set RESEND_API_KEY). Payload:", summary);
  }

  return NextResponse.json({ ok: true, emailed: Boolean(process.env.RESEND_API_KEY) });
}
