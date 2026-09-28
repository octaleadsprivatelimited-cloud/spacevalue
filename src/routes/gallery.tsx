import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import heroTower from "@/assets/hero-tower.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import villa from "@/assets/villa.jpg";
import township from "@/assets/township.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Luxury Homes & Communities | Space Value" },
      {
        name: "description",
        content:
          "A visual walk through the towers, interiors, villas and gated communities Space Value represents across Hyderabad.",
      },
      { property: "og:title", content: "Gallery — Space Value" },
      {
        property: "og:description",
        content: "Towers, interiors, villas and townships from our Hyderabad portfolio.",
      },
    ],
  }),
  component: Gallery;
});

const ITEMS = [
  { src: heroTower, title: "Aurora Heights", caption: "Kokapet · Tower elevation" },
  { src: interiorLiving, title: "The Meridian", caption: "Financial District · Living room" },
  { src: villa, title: "Casa Verde Villas", caption: "Tellapur · Pool deck" },
  { src: township, title: "Greenwood County", caption: "Shankarpally Road · Aerial" },
  { src: interiorLiving, title: "Show residence", caption: "Fitted interiors · 3 BHK" },
  { src: heroTower, title: "Arrival lobby", caption: "Double height porte-cochère" },
];

function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Look before you love."
        subtitle="Elevations, interiors and amenity decks from the projects currently on our shelf."
        image={villa}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <figure key={i} className="group relative overflow-hidden bg-ink">
              <img
                src={item.src}
                alt={item.title}
                width={1408}
                height={1008}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-5">
                <p className="font-display text-xl text-ivory">{item.title}</p>
                <p className="text-xs tracking-[0.12em] text-gold-soft/80 uppercase">
                  {item.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
