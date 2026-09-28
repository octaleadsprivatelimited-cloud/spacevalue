import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PROPERTIES } from "@/components/site/data";
import heroTower from "@/assets/hero-tower.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import villa from "@/assets/villa.jpg";
import township from "@/assets/township.jpg";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties — RERA Approved Luxury Homes in Hyderabad | Space Value" },
      {
        name: "description",
        content:
          "Browse RERA approved luxury apartments, villas and township homes in Kokapet, Tellapur, Financial District and Shankarpally Road.",
      },
      { property: "og:title", content: "Luxury Properties in Hyderabad — Space Value" },
      {
        property: "og:description",
        content: "Sky residences, private villas and integrated townships, all RERA registered.",
      },
    ],
  }),
  component: Properties,
});

const images = { tower: heroTower, interior: interiorLiving, villa, township };

function Properties() {
  return (
    <>
      <PageHero
        eyebrow="Current inventory"
        title="Properties on our shelf."
        subtitle="Every project below is RERA registered and available at direct developer pricing."
        image={township}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="space-y-16">
          {PROPERTIES.map((p, i) => (
            <article
              key={p.slug}
              className="grid gap-8 border-b border-border pb-16 last:border-0 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              <img
                src={images[p.image]}
                alt={p.name}
                width={1408}
                height={1008}
                loading="lazy"
                className={`aspect-[4/3] w-full object-cover ${i % 2 ? "lg:order-2" : ""}`}
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-gold/50 px-3 py-1 text-[0.6rem] tracking-[0.15em] text-gold uppercase">
                    {p.status}
                  </span>
                  <span className="text-[0.65rem] tracking-[0.15em] text-muted-foreground uppercase">
                    Project RERA {p.rera}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">{p.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                  <div>
                    <dt className="text-[0.65rem] tracking-[0.15em] text-muted-foreground uppercase">
                      Configuration
                    </dt>
                    <dd className="mt-1 text-sm text-ink">{p.config}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] tracking-[0.15em] text-muted-foreground uppercase">
                      Sizes
                    </dt>
                    <dd className="mt-1 text-sm text-ink">{p.size}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] tracking-[0.15em] text-muted-foreground uppercase">
                      Price
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-gold">{p.price}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] tracking-[0.15em] text-muted-foreground uppercase">
                      Highlights
                    </dt>
                    <dd className="mt-1 space-y-1 text-sm text-ink">
                      {p.highlights.map((h) => (
                        <span key={h} className="block">
                          · {h}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex bg-ink px-7 py-3.5 text-xs tracking-[0.2em] text-ivory uppercase"
                >
                  Request details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
