type ContactPayload = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; companyWebsite?: unknown };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL || "ethan.a.mm98@gmail.com";
  if (!apiKey || !from) return Response.json({ error: "Contact form is not configured." }, { status: 503 });

  let payload: ContactPayload;
  try { payload = (await request.json()) as ContactPayload; }
  catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }

  if (clean(payload.companyWebsite, 200)) return Response.json({ ok: true });
  const name = clean(payload.name, 80);
  const email = clean(payload.email, 160);
  const subject = clean(payload.subject, 140);
  const message = clean(payload.message, 4000);
  if (!name || !emailPattern.test(email) || !subject || message.length < 10) return Response.json({ error: "Please complete every field." }, { status: 400 });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio: ${subject}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.65;color:#171717"><h2>New portfolio message</h2><p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><hr/><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p></div>`,
    }),
  });
  if (!response.ok) return Response.json({ error: "Email provider rejected the request." }, { status: 502 });
  return Response.json({ ok: true });
}
