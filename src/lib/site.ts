import { CONTACT, PROPERTIES, type Property } from "@/components/site/data";
import { PROJECT_MEDIA } from "@/components/site/project-media";

export const SITE_URL = "https://www.spacevalue.co.in";

const PAGES: Record<string, { title: string; description: string }> = {
  "/privacy": {
    title: "Privacy & Cookie Choices | Space Value",
    description:
      "How Space Value handles property enquiries, optional analytics and cookie choices. Contact us with privacy questions or change your tracking preferences.",
  },
  "/": {
    title: "Space Value | Real Estate Channel Partner in Hyderabad",
    description:
      "Explore Neopolis, Financial District and Tellapur projects, Prestige properties and Osman Nagar villas with Space Value. Enquire about details and site visits.",
  },
  "/about": {
    title: "About Space Value | Hyderabad Property Advisors",
    description:
      "Meet Space Value, a real estate channel partner in Hyderabad. Learn about our property advisory, site visits and support through the home-buying process.",
  },
  "/properties": {
    title: "Hyderabad Projects & Osman Nagar Villas | Space Value",
    description:
      "Browse Neopolis, Financial District and Tellapur projects, Prestige enquiries and Osman Nagar villas. Contact Space Value for pricing, brochures and site visits.",
  },
  "/gallery": {
    title: "Hyderabad Property Gallery | Space Value",
    description:
      "Browse illustrative residential architecture, villa exteriors and interiors with Space Value. Request official project brochures and arrange a Hyderabad site visit.",
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
            ...(path === "/properties"
              ? [
                  {
                    "@type": "ItemList",
                    "@id": `${SITE_URL}/properties#projects`,
                    name: "Hyderabad project and villa enquiries",
                    numberOfItems: PROPERTIES.length,
                    itemListElement: PROPERTIES.map((property, index) => ({
                      "@type": "ListItem",
                      position: index + 1,
                      name: `${property.name} — ${property.location}`,
                      url: `${SITE_URL}/projects/${property.slug}`,
                    })),
                  },
                ]
              : []),
            {
              "@type": "RealEstateAgent",
              "@id": `${SITE_URL}/#organization`,
              name: "Space Value",
              url: `${SITE_URL}/`,
              logo: `${SITE_URL}/images/space-value-logo.png`,
              telephone: `+${CONTACT.phoneRaw}`,
              email: CONTACT.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                postalCode: "500032",
                streetAddress: "Gachibowli",
                addressCountry: "IN",
              },
              areaServed: { "@type": "City", name: "Hyderabad" },
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

export function projectMetadata(property: Property) {
  const title = `${property.name} | Call Space Value | Property Enquiries`;
  const description = `Call Space Value about ${property.name} in ${property.location}. Discuss pricing, the official brochure, project details and a site visit. No form needed.`;
  const url = `${SITE_URL}/projects/${property.slug}`;
  const media = PROJECT_MEDIA[property.image];
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: `${SITE_URL}${media.src}` },
      { property: "og:image:alt", content: media.alt },
      { property: "og:image:width", content: String(media.width) },
      { property: "og:image:height", content: String(media.height) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${SITE_URL}${media.src}` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Properties",
              item: `${SITE_URL}/properties`,
            },
            { "@type": "ListItem", position: 3, name: property.name, item: url },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          url,
          name: title,
          description,
          image: `${SITE_URL}${media.src}`,
          inLanguage: "en-IN",
          publisher: {
            "@type": "Organization",
            name: "Space Value",
            url: `${SITE_URL}/`,
            telephone: `+${CONTACT.phoneRaw}`,
          },
        }).replace(/</g, "\\u003c"),
      },
    ],
  };
}
