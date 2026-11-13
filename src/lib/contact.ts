/** Public brand contact — shared mailbox (not a personal founder address). */
export const CONTACT_EMAIL = "consulting@nurnex.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Discovery%20Call%20Inquiry`;
export const CONTACT_PHONE = "(339) 206-8081";
export const CONTACT_TEL = "tel:+13392068081";
export const CATALOGUE_URL = "/nurnex-catalogue.pdf";

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/nurnex-consulting-agency/" },
  { name: "Instagram", href: "https://www.instagram.com/nurnexconsulting/" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61596599692737" },
] as const;

export type SocialName = (typeof SOCIAL_LINKS)[number]["name"];
