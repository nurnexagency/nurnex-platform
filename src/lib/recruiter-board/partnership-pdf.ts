import { jsPDF } from "jspdf";

export function downloadPartnershipPdf(agencyName: string, agencyEmail: string) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 48;
  let y = margin;

  doc.setFontSize(18);
  doc.text("Nurnex · Recruiting partner agreement (summary)", margin, y);
  y += 36;

  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);

  const lines = [
    `Agency: ${agencyName}`,
    `Contact email: ${agencyEmail}`,
    `Date: ${new Date().toLocaleDateString()}`,
    "",
    "This document records that the recruiting agency named above and Nurnex Inc.",
    '("Nurnex") agree to operate as partners on the Nurnex hiring platform.',
    "",
    "Commission: For each successful hire facilitated through Nurnex, the agency",
    "agrees to pay Nurnex a minimum commission of USD $1,000 (one thousand dollars).",
    "The applicable fee may vary by sector, role, and candidate terms.",
    "",
    "Fee schedule: The exact commission for each role will be shown in the agency",
    "board when assignments are shared and may be updated there as engagements progress.",
    "",
    "This summary is for records only. Full legal terms may be provided separately.",
    "",
    "Nurnex",
    "MovlanAliyev@Nurnex.com",
  ];

  for (const line of lines) {
    const parts = doc.splitTextToSize(line, 520);
    doc.text(parts, margin, y);
    y += parts.length * 14 + (line === "" ? 6 : 0);
    if (y > 720) {
      doc.addPage();
      y = margin;
    }
  }

  doc.save(
    `nurnex-partnership-${agencyName.replace(/[^a-z0-9-_]/gi, "_").slice(0, 40)}.pdf`
  );
}
