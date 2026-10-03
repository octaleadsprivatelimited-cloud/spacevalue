import { CONTACT } from "@/components/site/data";

export const SITE_URL = "https://www.spacevalue.co.in";

const PAGES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Space Value | Real Estate Channel Partner in Hyderabad",
    description:
      "Explore apartments, villas and townships in Hyderabad with Space Value. Contact our real estate channel partner team to discuss your requirements and site visits.",
  },
  "/about": {
    title: "About Space Value | Hyderabad Property Advisors",
    description:
      "Meet Space Value, a real estate channel partner in Hyderabad. Learn about our property advisory, site visits and support through the home-buying process.",
  },
  "/properties": {
    title: "Hyderabad Apartments & Villas | Space Value Properties",
    description:
      "Browse apartments, villas and township homes in Kokapet, Tellapur and Hyderabad. Contact Space Value for current availability, pricing and project details.",
  },
  "/gallery": {
    title: "Hyderabad Property Gallery | Space Value",
    description:
      "Explore the Space Value property gallery featuring residential towers, villa exteriors, interiors and communities in Hyderabad. Contact us to arrange a site visit.",
  },
  "/rera": {
    title: "TG RERA Certificate A02500000572 | Space Value",
    description:
      "View TG RERA agent certificate A02500000572 issued to SV CONSULTANCE, valid from 29 August 2026 to 28 August 2031, and the original registration document.",
  },
  "/contact": {
    title: "Contact Space Value | Hyderabad Property Enquiries",
    description:
      "Contact Space Value in Hyderabad on +91 86862 56748 or info@spacevalue.co.in. Share your budget and preferred locality or request a property site visit.",
  },
};

export function pageMetadata(path: string) {
  const page = PAGES[path];
  if (!page) throw new Error(`Missing page metadata: ${path}`);
  const url = new URL(path, SITE_URL).href;
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "Space Value" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: `${SITE_URL}/images/space-value-logo.png` },
      { property: "og:image:width", content: "453" },
      { property: "og:image:height", content: "564" },
      { property: "og:image:alt", content: "Space Value logo" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: `${SITE_URL}/images/space-value-logo.png` },
      { name: "twitter:image:alt", content: "Space Value logo" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "Space Value",
              url: `${SITE_URL}/`,
              logo: `${SITE_URL}/images/space-value-logo.png`,
              telephone: `+${CONTACT.phoneRaw}`,
              email: CONTACT.email,
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: "Space Value",
              inLanguage: "en-IN",
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type":
                path === "/contact" ? "ContactPage" : path === "/about" ? "AboutPage" : "WebPage",
              "@id": `${url}#webpage`,
              url,
              name: page.title,
              description: page.description,
              isPartOf: { "@id": `${SITE_URL}/#website` },
              inLanguage: "en-IN",
            },
          ],
        }).replace(/</g, "\\u003c"),
      },
    ],
  };
}
