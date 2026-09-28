import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CONTACT, PROPERTIES } from "@/components/site/data";
import villa from "@/assets/villa.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Space Value — Hyderabad Real Estate Channel Partner" },
      {
        name: "description",
        content:
          "Call +91 86862 56748 or email info@spacevalue.co.in to book a site visit with Space Value in Hyderabad.",
      },
      { property: "og:title", content: "Contact Space Value" },
      {
        property: "og:description",
        content: "Book a site visit or request a curated shortlist of RERA approved homes.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const mailto = (subject: string) => `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a conversation."
        subtitle="Send us your requirement and we'll respond with a shortlist the same working day."
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
                  <a
                    href={`tel:+${CONTACT.phoneRaw}`}
                    className="text-lg text-ink hover:text-gold"
                  >
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

          <div className="bg-secondary/60 p-7 sm:p-10">
            <p className="eyebrow">Enquiry</p>
            <h3 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
              Tell us what you're looking for
            </h3>
            <form
              className="mt-8 space-y-5"
              action={`mailto:${CONTACT.email}`}
              method="post"
              encType="text/plain"
            >
              <Field label="Full name" name="name" placeholder="Your name" required />
              <Field label="Phone" name="phone" type="tel" placeholder={CONTACT.phoneDisplay} required />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" />
              <div>
                <label
                  htmlFor="project"
                  className="block text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase"
                >
                  Project of interest
                </label>
                <select
                  id="project"
                  name="project"
                  className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                >
                  <option>Not sure yet</option>
                  {PROPERTIES.map((p) => (
                    <option key={p.slug}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase"
                >
                  Requirement
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Budget, configuration, preferred locality, possession timeline…"
                  className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold px-7 py-4 text-xs tracking-[0.2em] text-ink uppercase transition-opacity hover:opacity-90"
              >
                Send enquiry
              </button>
              <p className="text-xs text-muted-foreground">
                Prefer instant? WhatsApp us on {CONTACT.phoneDisplay}.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border border-input bg-background px-4 py-3 text-sm text-ink placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none"
      />
    </div>
  );
}
