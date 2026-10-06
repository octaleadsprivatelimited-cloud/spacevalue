import { pageMetadata } from "@/lib/site";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import heroTower from "@/assets/hero-tower.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import villa from "@/assets/villa.jpg";
import township from "@/assets/township.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => pageMetadata("/gallery"),
  component: Gallery,
});

const ITEMS = [
  { src: heroTower, title: "Residential towers", caption: "Illustrative architecture" },
  { src: interiorLiving, title: "Living spaces", caption: "Interior inspiration" },
  { src: villa, title: "Villa living", caption: "Illustrative exterior" },
  { src: township, title: "Community living", caption: "Illustrative township" },
];

function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Look before you love."
        subtitle="Illustrative architecture and interiors. These images are not photographs of the listed projects; contact us for official project brochures."
        image={villa}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <figure key={i} className="group relative overflow-hidden bg-ink">
              <img
                src={item.src}
                alt={`${item.title} — ${item.caption}`}
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
