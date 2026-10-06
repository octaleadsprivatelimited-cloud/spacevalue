import { pageMetadata } from "@/lib/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Handshake, KeyRound, ShieldCheck } from "lucide-react";
import heroTower from "@/assets/hero-tower.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import villa from "@/assets/villa.jpg";
import township from "@/assets/township.jpg";
import { CONTACT, PROPERTIES } from "@/components/site/data";

export const Route = createFileRoute("/")({
  head: () => pageMetadata("/"),
  component: Home,
});

const images = {
  tower: heroTower,
  interior: interiorLiving,
  villa,
  township,
};

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92svh] pt-36 items-end overflow-hidden bg-ink">
        <img
          src={heroTower}
          alt="Luxury residential tower at dusk"
          fetchPriority="high"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
          <p className="eyebrow">Authorised Channel Partner · Hyderabad</p>
          <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] leading-[1.02] text-ivory sm:text-7xl">
            Address the life you have
            <span className="block text-gold italic">worked for.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/75 sm:text-lg">
            We represent a curated shelf of RERA approved luxury residences — sky apartments,
            private villas and integrated townships — and walk with you from first site visit to
            final registration.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 text-xs tracking-[0.2em] text-ink uppercase transition-opacity hover:opacity-90"
            >
              View Properties <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-ivory/35 px-8 py-4 text-xs tracking-[0.2em] text-ivory uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Book a Site Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {[
            ["12+", "Years in the market"],
            ["40+", "Developer tie-ups"],
            ["1,800+", "Families settled"],
            ["100%", "RERA registered stock"],
          ].map(([value, label]) => (
            <div key={label} className="bg-background px-6 py-10 text-center">
              <p className="font-display text-4xl text-ink">{value}</p>
              <p className="mt-2 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={interiorLiving}
              alt="Luxury apartment living room"
              width={1408}
              height={1008}
              loading="lazy"
              className="w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-4 hidden bg-ink px-8 py-6 sm:block">
              <p className="font-display text-3xl text-gold">Zero</p>
              <p className="text-[0.65rem] tracking-[0.2em] text-ivory/70 uppercase">
                Brokerage for buyers
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-5xl">
              A channel partner, not a broker.
            </h2>
            <div className="hairline mt-6" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Space Value is an authorised marketing partner for leading Hyderabad developers. Being
              on the developer panel means you get the same inventory, the same launch pricing and
              the same offers as the builder's own sales desk — plus an advisor who represents your
              interest through documentation, home loan and handover.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [ShieldCheck, "Only RERA registered projects"],
                [Handshake, "Direct developer pricing"],
                [KeyRound, "Loan & registration support"],
                [BadgeCheck, "Legal title verification"],
              ].map(([Icon, text]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <li key={text as string} className="flex items-start gap-3">
                    <I className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <span className="text-sm text-ink">{text as string}</span>
                  </li>
                );
              })}
            </ul>
            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-ink uppercase underline-offset-8 hover:text-gold hover:underline"
            >
              More about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="bg-secondary/60 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0">
              <p className="eyebrow">Featured</p>
              <h2 className="mt-4 font-display text-3xl text-ink sm:text-5xl">
                Signature residences
              </h2>
            </div>
            <Link
              to="/properties"
              className="text-xs tracking-[0.2em] text-ink uppercase underline-offset-8 hover:text-gold hover:underline"
            >
              All properties
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[PROPERTIES[0]!, PROPERTIES[8]!, PROPERTIES[13]!, PROPERTIES[17]!].map((p) => (
              <article key={p.slug} className="group bg-card">
                <div className="overflow-hidden">
                  <img
                    src={images[p.image]}
                    alt="Illustrative residential architecture"
                    width={1408}
                    height={1008}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start gap-3">
                    <h3 className="min-w-0 font-display text-2xl text-ink">{p.name}</h3>
                    <span className="shrink-0 border border-gold/50 px-3 py-1 text-[0.6rem] tracking-[0.15em] text-gold uppercase">
                      {p.group}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Illustrative image. Contact us for project brochures and current availability.
                  </p>
                  <Link
                    to="/properties"
                    hash={p.slug}
                    className="mt-5 inline-flex text-sm text-ink underline underline-offset-4"
                  >
                    View project enquiry
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-4 font-display text-3xl text-ink sm:text-5xl">Four unhurried steps</h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Understand", "Budget, locality, possession timeline and the way you live."],
            ["02", "Shortlist", "A tight list of 3–4 RERA approved projects that actually fit."],
            [
              "03",
              "Site visits",
              "Chauffeured visits, floor plan walk-through, honest comparison.",
            ],
            ["04", "Close", "Price negotiation, home loan, agreement and registration."],
          ].map(([n, t, d]) => (
            <div key={n} className="border-t border-border pt-6">
              <span className="font-display text-4xl text-gold-soft">{n}</span>
              <h3 className="mt-3 text-lg text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={township}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <h2 className="font-display text-3xl text-ivory sm:text-5xl">
            Let's find the right address.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ivory/70 sm:text-base">
            Tell us what you're looking for and we'll send a curated shortlist the same day.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`tel:+${CONTACT.phoneRaw}`}
              className="bg-gold px-8 py-4 text-xs tracking-[0.2em] text-ink uppercase"
            >
              {CONTACT.phoneDisplay}
            </a>
            <Link
              to="/contact"
              className="border border-ivory/35 px-8 py-4 text-xs tracking-[0.2em] text-ivory uppercase transition-colors hover:border-gold hover:text-gold"
            >
              Enquire now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
