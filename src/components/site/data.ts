import type { ProjectMediaKey } from "./project-media";

export const RERA = {
  number: "A02500000572",
  registeredName: "SV CONSULTANCE",
  validFrom: "29 August 2026",
  validUntil: "28 August 2031",
  portal: "https://rera.telangana.gov.in/",
};

export const CONTACT = {
  email: "info@spacevalue.co.in",
  phoneDisplay: "+91 86862 56748",
  phoneRaw: "918686256748",
  address: "Gachibowli, Hyderabad, Telangana 500032",
  hours: "Mon – Sat, 9:30 AM – 7:30 PM",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/properties", label: "Properties" },
  { to: "/gallery", label: "Gallery" },
  { to: "/rera", label: "RERA" },
  { to: "/contact", label: "Contact" },
] as const;

export const PROPERTY_GROUPS = [
  "Neopolis",
  "Financial District",
  "Tellapur",
  "Prestige projects",
  "Osman Nagar villas",
  "Kokapet",
] as const;
export type Property = {
  slug: string;
  name: string;
  location: string;
  group: (typeof PROPERTY_GROUPS)[number];
  image: ProjectMediaKey;
};

export const PROPERTIES: Property[] = [
  {
    slug: "yula-neo",
    name: "Yula Neo",
    location: "Neopolis, Hyderabad",
    group: "Neopolis",
    image: "yula-neo",
  },
  {
    slug: "brigade",
    name: "Brigade",
    location: "Neopolis, Hyderabad",
    group: "Neopolis",
    image: "brigade",
  },
  {
    slug: "msn-reality",
    name: "MSN Realty",
    location: "Neopolis, Hyderabad",
    group: "Neopolis",
    image: "msn-reality",
  },
  {
    slug: "ghr-cascade",
    name: "GHR Cascade",
    location: "Neopolis, Hyderabad",
    group: "Neopolis",
    image: "ghr-cascade",
  },
  {
    slug: "sattva-lake-ridge",
    name: "Sattva Lake Ridge",
    location: "Neopolis, Hyderabad",
    group: "Neopolis",
    image: "sattva-lake-ridge",
  },
  {
    slug: "sattva-logo",
    name: "Sattva Lago",
    location: "Neopolis, Hyderabad",
    group: "Neopolis",
    image: "sattva-logo",
  },
  {
    slug: "godrej-property",
    name: "Godrej Property",
    location: "Neopolis, Hyderabad",
    group: "Neopolis",
    image: "godrej-property",
  },
  {
    slug: "rajapushpa",
    name: "Rajapushpa",
    location: "Neopolis, Hyderabad",
    group: "Neopolis",
    image: "rajapushpa",
  },
  {
    slug: "asbl-broadway",
    name: "ASBL Broadway",
    location: "Financial District, Hyderabad",
    group: "Financial District",
    image: "asbl-broadway",
  },
  {
    slug: "asbl-loft",
    name: "ASBL Loft",
    location: "Financial District, Hyderabad",
    group: "Financial District",
    image: "asbl-loft",
  },
  {
    slug: "myscape-songs-of-the-sun",
    name: "Myscape Songs of the Sun",
    location: "Financial District, Hyderabad",
    group: "Financial District",
    image: "myscape-songs-of-the-sun",
  },
  {
    slug: "myscape-palma",
    name: "Myscape Palma",
    location: "Financial District, Hyderabad",
    group: "Financial District",
    image: "myscape-palma",
  },
  {
    slug: "raghava-cinq",
    name: "Raghava Cinq",
    location: "Financial District, Hyderabad",
    group: "Financial District",
    image: "raghava-cinq",
  },
  {
    slug: "gamya",
    name: "Gamya",
    location: "Tellapur, Hyderabad",
    group: "Tellapur",
    image: "gamya",
  },
  {
    slug: "muppa-projects",
    name: "Muppa Projects",
    location: "Tellapur, Hyderabad",
    group: "Tellapur",
    image: "muppa-projects",
  },
  {
    slug: "tridasa",
    name: "Tridasa",
    location: "Tellapur, Hyderabad",
    group: "Tellapur",
    image: "tridasa",
  },
  {
    slug: "prestige-projects",
    name: "Prestige Projects",
    location: "Hyderabad",
    group: "Prestige projects",
    image: "prestige-projects",
  },
  {
    slug: "hallmark-villas",
    name: "Hallmark Villas",
    location: "Osman Nagar, Hyderabad",
    group: "Osman Nagar villas",
    image: "hallmark-villas",
  },
  {
    slug: "muppa-villas",
    name: "Muppa Villas",
    location: "Osman Nagar, Hyderabad",
    group: "Osman Nagar villas",
    image: "muppa-villas",
  },
  {
    slug: "alekhya-homes",
    name: "Alekhya Homes",
    location: "Kokapet, Hyderabad",
    group: "Kokapet",
    image: "alekhya-homes",
  },
];

export function propertyWhatsAppUrl(property: Property) {
  const message = `Hi Space Value, I am interested in ${property.name} (${property.location}). Please share the brochure, current availability, pricing, project RERA registration and site visit details.`;
  return `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(message)}`;
}
