import { pageMetadata } from "@/lib/site";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { RERA } from "@/components/site/data";
import interiorLiving from "@/assets/interior-living.jpg";

export const Route = createFileRoute("/rera")({
  head: () => pageMetadata("/rera"),
  component: Rera,
});

function Rera() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title="Registered. Transparent. Accountable."
        subtitle={`TG RERA agent registration ${RERA.number}. View our registration details and original certificate below.`}
        image={interiorLiving}
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="min-w-0">
          <p className="eyebrow">Agent registration</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">Our TG RERA certificate</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Registration details as shown on the Telangana Real Estate Regulatory Authority
            certificate.
          </p>
          <dl className="mt-8 divide-y divide-border border-y border-border text-sm">
            {[
              ["Registration number", RERA.number],
              ["Registered name", RERA.registeredName],
              ["Valid from", RERA.validFrom],
              ["Valid until", RERA.validUntil],
            ].map(([label, value]) => (
              <div key={label} className="py-4">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            This is a real estate agent registration. Each development has its own separate project
            registration.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/rera-certificate.pdf"
              target="_blank"
              rel="noreferrer"
              className="border border-ink bg-ink px-5 py-3 text-sm text-ivory"
            >
              Open original PDF
            </a>
            <a
              href={RERA.portal}
              target="_blank"
              rel="noreferrer"
              className="border border-ink px-5 py-3 text-sm"
            >
              Visit TG RERA
            </a>
          </div>
        </div>
        <figure className="min-w-0">
          <a
            href="/images/rera-certificate.png"
            target="_blank"
            rel="noreferrer"
            aria-label="View full size RERA registration certificate"
            className="block border border-border bg-white p-2 shadow-lg sm:p-4"
          >
            <img
              src="/images/rera-certificate.png"
              alt={`TG RERA registration certificate for ${RERA.registeredName}, number ${RERA.number}, valid ${RERA.validFrom} to ${RERA.validUntil}`}
              width={1414}
              height={2000}
              className="h-auto w-full"
            />
          </a>
          <figcaption className="mt-4 text-center text-xs text-muted-foreground">
            Select the certificate to view the full-size image.
          </figcaption>
        </figure>
      </section>

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
            <p className="eyebrow">Project registration verification</p>
            <h2 className="mt-4 font-display text-3xl text-ink">
              Verify the exact project and phase.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Request the developer's project registration number and brochure when enquiring. Match
              the project name, phase and registration details on the official TG RERA portal before
              booking.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The agent certificate above does not replace an individual project's registration.
              Project registration numbers will be listed once confirmed.
            </p>
            <a
              href={RERA.portal}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block text-sm underline underline-offset-4"
            >
              Verify on TG RERA
            </a>
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
