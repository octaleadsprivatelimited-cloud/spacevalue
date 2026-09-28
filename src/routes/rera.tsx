import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { PROPERTIES } from "@/components/site/data";
import interiorLiving from "@/assets/interior-living.jpg";

export const Route = createFileRoute("/rera")({
  head: () => ({
    meta: [
      { title: "RERA Approved Projects — Registration Numbers | Space Value" },
      {
        name: "description",
        content:
          "TS RERA registration numbers for every project Space Value represents, plus how to verify a project on the official Telangana RERA portal.",
      },
      { property: "og:title", content: "RERA Approved Projects — Space Value" },
      {
        property: "og:description",
        content: "Verify TS RERA registration numbers for all our Hyderabad projects.",
      },
    ],
  }),
  component: Rera,
});

function Rera() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title="RERA approved. Every single one."
        subtitle="We only market projects registered with the Telangana Real Estate Regulatory Authority."
        image={interiorLiving}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Why it matters</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Registration is your protection.
            </h2>
            <div className="hairline mt-6" />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              A RERA registered project has filed its approved plans, land title, timeline and
              escrow arrangement with the authority. Carpet areas are defined, possession dates are
              committed and deviations are actionable. If a project is not registered, no amount of
              marketing should convince you otherwise.
            </p>
            <div className="mt-8 flex items-start gap-3 border border-gold/40 bg-secondary/60 p-6">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <p className="text-sm leading-relaxed text-ink">
                Always verify the registration number yourself at the official Telangana RERA
                portal: <span className="break-all">rera.telangana.gov.in</span>
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Registration numbers</p>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {PROPERTIES.map((p) => (
                <div key={p.slug} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="min-w-0">
                    <p className="font-display text-xl text-ink">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.location}</p>
                  </div>
                  <p className="text-sm tracking-[0.1em] text-gold sm:text-right">
                    TS RERA {p.rera}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Registration numbers shown are as disclosed by the respective developers. Space Value
              is a marketing channel partner and does not own or develop these projects.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="eyebrow">Buyer checklist</p>
          <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
            Before you pay a booking amount
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Verify RERA ID", "Match the number on the portal with the one on the brochure."],
              ["Check carpet area", "RERA defines carpet area; compare it, not super built-up."],
              ["Read the timeline", "Committed possession date is filed with the authority."],
              ["Confirm the account", "Pay only into the developer's declared project account."],
            ].map(([t, d], i) => (
              <div key={t} className="border-t border-border pt-6">
                <span className="font-display text-4xl text-gold-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg text-ink">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
