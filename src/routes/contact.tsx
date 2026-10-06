import { pageMetadata } from "@/lib/site";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT } from "@/components/site/data";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import villa from "@/assets/villa.jpg";

export const Route = createFileRoute("/contact")({
  head: () => pageMetadata("/contact"),
  component: Contact,
});

function Contact() {
  const mailto = (subject: string) =>
    `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a conversation."
        subtitle="Share your home preferences, request project details or arrange a site visit with our team."
        image={villa}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Reach us</p>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Space Value</h2>
            <div className="hairline mt-6" />
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div className="min-w-0">
                  <p className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                    Phone & WhatsApp
                  </p>
                  <a href={`tel:+${CONTACT.phoneRaw}`} className="text-lg text-ink hover:text-gold">
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div className="min-w-0">
                  <p className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-lg break-all text-ink hover:text-gold"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div className="min-w-0">
                  <p className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                    Office
                  </p>
                  <p className="text-lg text-ink">{CONTACT.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div className="min-w-0">
                  <p className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                    Hours
                  </p>
                  <p className="text-lg text-ink">{CONTACT.hours}</p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${CONTACT.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink px-7 py-3.5 text-center text-xs tracking-[0.2em] text-ivory uppercase"
              >
                Chat on WhatsApp
              </a>
              <a
                href={mailto("Site visit request — Space Value")}
                className="border border-ink px-7 py-3.5 text-center text-xs tracking-[0.2em] text-ink uppercase transition-colors hover:bg-ink hover:text-ivory"
              >
                Email us
              </a>
            </div>
          </div>

          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
