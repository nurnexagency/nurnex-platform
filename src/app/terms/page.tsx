import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Terms of Use — Nurnex Consulting",
  description: "Terms governing use of the Nurnex Consulting website.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-ink-navy pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Terms of Use</h1>
          <p className="text-muted text-sm mb-10">Last updated: September 26, 2026</p>

          <div className="space-y-6 text-muted text-sm leading-relaxed">
            <p>
              By using nurnex.com, you agree to these terms. If you do not agree, please do not
              use the site.
            </p>
            <h2 className="text-white font-semibold text-lg pt-2">Informational site</h2>
            <p>
              Content on this website describes Nurnex Consulting services for general information.
              It is not a binding offer, quote, or contract. Engagements begin only after a written
              agreement (for example a statement of work) is accepted by both parties.
            </p>
            <h2 className="text-white font-semibold text-lg pt-2">No warranties</h2>
            <p>
              The site is provided &quot;as is.&quot; We do not warrant that it will be uninterrupted
              or error-free. Service timelines and outcomes on the site are estimates and examples.
            </p>
            <h2 className="text-white font-semibold text-lg pt-2">Intellectual property</h2>
            <p>
              Branding, text, and design on this site belong to Nurnex Consulting or its licensors.
              You may not copy or reuse them without permission, except for fair personal use of
              publicly available pages.
            </p>
            <h2 className="text-white font-semibold text-lg pt-2">Third-party links</h2>
            <p>
              Links to client products (for example App Store listings or client websites) are
              provided for reference. We are not responsible for third-party sites or apps.
            </p>
            <h2 className="text-white font-semibold text-lg pt-2">Contact</h2>
            <p>
              Questions about these terms:{" "}
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
