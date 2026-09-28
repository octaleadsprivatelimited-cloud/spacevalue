import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import heroTower from "@/assets/hero-tower.jpg";
import interiorLiving from "@/assets/interior-living.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Space Value — Hyderabad Real Estate Channel Partner" },
      {
        name: "description",
        content:
          "Space Value is an authorised channel partner working with 40+ Hyderabad developers, offering RERA approved homes with zero brokerage for buyers.",
      },
      { property: "og:title", content: "About Space Value" },
      {
        property: "og:description",
        content: "12 years, 40+ developer tie-ups and 1,800+ families settled in Hyderabad.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Advisors first, agents second."
        subtitle="We built Space Value because buying a luxury home in Hyderabad should feel considered, not pressured."
        image={heroTower}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              A decade of walking buyers through Hyderabad's growth corridors.
            </h2>
            <div className="hairline mt-6" />
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Space Value began in 2014 with a single mandate in Gachibowli. Since then the city
                has grown outward — Kokapet, Tellapur, Financial District, Shankarpally — and we
                have grown with it, adding developer panels one relationship at a time.
              </p>
              <p>
                As a channel partner we are compensated by the developer, never by you. That single
                fact shapes how we work: there is no incentive to push a unit that doesn't suit your
                family, and every project on our shelf is RERA registered before it is shown.
              </p>
              <p>
                Our team handles the unglamorous parts too — title scrutiny, sanction plan checks,
                home loan comparisons, agreement drafting and registration — so your involvement
                ends at the decision, not the paperwork.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <img
              src={interiorLiving}
              alt="Luxury interiors"
              width={1408}
              height={1008}
              loading="lazy"
              className="w-full object-cover"
            />
            <div className="bg-ink p-8 text-ivory">
              <h3 className="font-display text-2xl text-gold">Our promise</h3>
              <ul className="mt-5 space-y-3 text-sm text-ivory/75">
                <li>· Only RERA registered inventory</li>
                <li>· Developer price, zero buyer brokerage</li>
                <li>· Written comparison before every decision</li>
                <li>· Support until keys are handed over</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Services</h2>
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Project advisory", "Corridor-by-corridor comparison of price, builder and timeline."],
              ["Site visits", "Chauffeured visits across shortlisted projects in a single day."],
              ["Price negotiation", "Launch pricing, inventory holds and developer offers."],
              ["Home loan assistance", "Rate comparison across banks and NBFCs, sanction follow-up."],
              ["Legal & documentation", "Title scrutiny, agreement review, registration coordination."],
              ["NRI desk", "Remote video tours, POA guidance and repatriation basics."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-8">
                <h3 className="font-display text-2xl text-ink">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-12 inline-flex bg-ink px-8 py-4 text-xs tracking-[0.2em] text-ivory uppercase"
          >
            Talk to an advisor
          </Link>
        </div>
      </section>
    </>
  );
}
