import { pageMetadata } from "@/lib/site";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { PROPERTIES, PROPERTY_GROUPS, propertyWhatsAppUrl } from "@/components/site/data";
import { PropertyImage } from "@/components/site/PropertyImage";
import township from "@/assets/township.jpg";

export const Route = createFileRoute("/properties")({
  head: () => pageMetadata("/properties"),
  component: Properties,
});

function Properties() {
  return (
    <>
      <PageHero
        eyebrow="Explore Hyderabad"
        title="Projects & villa enquiries in Hyderabad."
        subtitle="Explore Neopolis, Financial District and Tellapur projects, Prestige enquiries, and villas in Osman Nagar."
        image={township}
      />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Find your preferred project or developer below. Ask our team for the exact project and
          phase, current availability, configuration, pricing and project RERA details.
        </p>
        <nav aria-label="Property locations" className="mt-8 flex flex-wrap gap-3">
          {PROPERTY_GROUPS.map((group, i) => (
            <a
              key={group}
              href={`#location-${i}`}
              className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-ink hover:text-ivory"
            >
              {group}
            </a>
          ))}
        </nav>
        <div className="mt-14 space-y-16">
          {PROPERTY_GROUPS.map((group, i) => (
            <section
              id={`location-${i}`}
              key={group}
              className="scroll-mt-28"
              aria-labelledby={`heading-${i}`}
            >
              <p className="eyebrow">
                {group === "Osman Nagar villas" ? "Villa enquiries" : "Project enquiries"}
              </p>
              <h2 id={`heading-${i}`} className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                {group}
              </h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {PROPERTIES.filter((p) => p.group === group).map((p) => (
                  <a
                    id={p.slug}
                    href={propertyWhatsAppUrl(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Enquire about ${p.name} in ${p.location} on WhatsApp`}
                    key={p.slug}
                    className="group flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <PropertyImage image={p.image} />
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-xs text-muted-foreground">{p.location}</p>
                      <h3 className="mt-3 font-display text-2xl text-ink">{p.name}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        Request project details, availability and a site visit with Space Value.
                      </p>
                      <span className="mt-6 inline-flex self-start border-b border-gold pb-1 text-sm text-ink">
                        Enquire on WhatsApp ↗
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
