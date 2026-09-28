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
  { to: "/rera", label: "RERA Approved" },
  { to: "/contact", label: "Contact" },
] as const;

export type Property = {
  slug: string;
  name: string;
  location: string;
  config: string;
  size: string;
  price: string;
  status: string;
  rera: string;
  image: "tower" | "interior" | "villa" | "township";
  highlights: string[];
};

export const PROPERTIES: Property[] = [
  {
    slug: "aurora-heights",
    name: "Aurora Heights",
    location: "Kokapet, Hyderabad",
    config: "3 & 4 BHK Sky Residences",
    size: "2,180 – 3,640 sq.ft",
    price: "₹ 2.640 Cr onwards",
    status: "Under construction",
    rera: "P02400007312",
    image: "tower",
    highlights: ["42-storey twin towers", "Infinity edge sky deck", "70% open landscape"],
  },
  {
    slug: "the-meridian",
    name: "The Meridian",
    location: "Financial District, Hyderabad",
    config: "3 BHK Premium Apartments",
    size: "1,860 – 2,420 sq.ft",
    price: "₹ 1.780 Cr onwards",
    status: "Ready to move",
    rera: "P02400005188",
    image: "interior",
    highlights: ["Fully fitted interiors", "Podium clubhouse", "Walk to ORR exit"],
  },
  {
    slug: "casa-verde-villas",
    name: "Casa Verde Villas",
    location: "Tellapur, Hyderabad",
    config: "4 BHK Independent Villas",
    size: "3,900 – 4,750 sq.ft",
    price: "₹ 4.250 Cr onwards",
    status: "Few units left",
    rera: "P02400004907",
    image: "villa",
    highlights: ["Private plunge pool", "Triple height foyer", "Gated 96-villa enclave"],
  },
  {
    slug: "greenwood-county",
    name: "Greenwood County",
    location: "Shankarpally Road, Hyderabad",
    config: "2 & 3 BHK Township Homes",
    size: "1,240 – 1,910 sq.ft",
    price: "₹ 92.5 L onwards",
    status: "New launch",
    rera: "P02400008441",
    image: "township",
    highlights: ["18-acre integrated township", "40,000 sq.ft clubhouse", "Cricket & tennis courts"],
  },
];
