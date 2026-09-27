import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy — Nurnex Consulting",
  description: "How Nurnex Consulting handles information you share with us.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-ink-navy pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-muted text-sm mb-10">Last updated: September 26, 2026</p>

          <div className="space-y-6 text-muted text-sm leading-relaxed">
            <p>
              Nurnex Consulting (&quot;we&quot;, &quot;us&quot;) respects your privacy. This page
              explains what information we collect when you use nurnex.com or contact us, and how
              we use it.
            </p>
            <h2 className="text-white font-semibold text-lg pt-2">Information we collect</h2>
            <p>
              When you email us at {CONTACT_EMAIL}, call us, or otherwise contact us, we receive
              the information you choose to send (such as your name, email address, phone number,
              company, and project details).
            </p>
            <p>
              Our website is primarily informational. We do not sell personal data. Standard web
              server and hosting logs may record technical data such as IP address, browser type,
              and pages visited for security and reliability.
            </p>
            <h2 className="text-white font-semibold text-lg pt-2">How we use information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to inquiries and schedule discovery conversations</li>
              <li>To deliver consulting and digital product services under agreement</li>
              <li>To improve our site and operations</li>
              <li>To comply with legal obligations</li>
            </ul>
            <h2 className="text-white font-semibold text-lg pt-2">Client products</h2>
            <p>
              For client websites and applications we build (for example enrollment or billing
              flows), each client&apos;s own privacy policy and processors (such as hosting,
              Firebase, or Stripe) govern that product. Ask the product owner for details.
            </p>
            <h2 className="text-white font-semibold text-lg pt-2">Contact</h2>
            <p>
              Privacy questions:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-copper hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
