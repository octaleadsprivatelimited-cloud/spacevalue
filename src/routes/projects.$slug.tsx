import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { CONTACT, PROPERTIES, RERA, propertyWhatsAppUrl } from "@/components/site/data";
import { PropertyImage } from "@/components/site/PropertyImage";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { projectMetadata } from "@/lib/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const property = PROPERTIES.find((project) => project.slug === params.slug);
    if (!property) throw notFound();
    return property;
  },
  head: ({ loaderData }) => (loaderData ? projectMetadata(loaderData) : {}),
  component: ProjectLanding,
});

function ProjectLanding() {
  const property = Route.useLoaderData();
  const enquiry = propertyWhatsAppUrl(property);
  const visit = `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(`Hi Space Value, I would like to arrange a site visit for ${property.name} (${property.location}). Please share the available dates and confirm the project and phase.`)}`;
  return (
    <div data-project={property.slug}>
      <section className="mx-auto max-w-7xl px-5 pt-32 pb-14 sm:px-8 sm:pt-40 sm:pb-20">
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">Property enquiries · Space Value</p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-ink sm:text-6xl">
              {property.name}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-muted-foreground">
              <MapPin size={18} aria-hidden="true" />
              {property.location}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Find out whether {property.name} fits your next home. Speak with Space Value for the
              latest brochure, available options, current pricing and a site visit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={enquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-medium text-white hover:bg-ink/85"
              >
                <MessageCircle size={19} aria-hidden="true" />
                Get brochure & pricing
              </a>
              <a
                href={`tel:+${CONTACT.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-4 text-sm text-ink"
              >
                <Phone size={18} aria-hidden="true" />
                Call our team
              </a>
              <a href="#enquire" className="self-center px-2 text-sm underline">
                Share your requirements
              </a>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Space Value is a property channel partner. TG RERA agent: {RERA.number}. Enquiries are
              handled by Space Value, independently of the developer.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-lg">
            <PropertyImage image={property.image} priority />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-14 sm:px-8">
        <EnquiryForm property={property} />
      </section>
      <section className="border-y border-border bg-secondary/50 px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Before you decide</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            The details that matter for {property.name}.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [
                "Brochure & floor plans",
                `Request the current ${property.name} brochure, configurations and floor plans for your preferred home.`,
              ],
              [
                "Pricing & availability",
                "Check current unit availability, the full price breakdown and payment schedule with our team.",
              ],
              [
                "Project & RERA details",
                "Confirm the exact project, phase, project RERA registration and possession information before proceeding.",
              ],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-7">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-9 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow">See it for yourself</p>
          <h2 className="mt-3 font-display text-4xl">Plan your visit.</h2>
          <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
            Tell us your preferred day and what you are looking for in {property.location}. We will
            confirm the project, visit arrangements and available options with you.
          </p>
          <a
            href={visit}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-medium text-ink"
          >
            Request a site visit
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="rounded-3xl border border-border bg-white p-7 sm:p-9">
          <h2 className="font-display text-3xl">Your Space Value contact</h2>
          <a href={`tel:+${CONTACT.phoneRaw}`} className="mt-5 block text-lg text-ink">
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-2 block break-all text-muted-foreground"
          >
            {CONTACT.email}
          </a>
          <p className="mt-4 text-sm text-muted-foreground">{CONTACT.address}</p>
          <p className="mt-2 text-sm text-muted-foreground">{CONTACT.hours}</p>
          <Link to="/rera" className="mt-5 inline-block border-b border-gold text-sm">
            View agent registration
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <h2 className="font-display text-3xl">Questions about {property.name}</h2>
        <div className="mt-5 divide-y divide-border border-y border-border">
          {[
            [
              "How do I get the latest price?",
              `Use “Get brochure & pricing” to open WhatsApp with a ${property.name} enquiry already filled in. Our team will confirm availability and pricing for the specific unit and phase.`,
            ],
            [
              "Can I book a site visit?",
              "Yes. Request a site visit and share your preferred date. Our team will confirm the arrangements before you travel.",
            ],
            [
              "Is this the developer’s website?",
              "This is Space Value’s enquiry page. Developer images and logos identify the projects shown; renders are labelled. Ask for the official brochure and project RERA details. The agent registration is separate from a project registration.",
            ],
          ].map(([question, answer]) => (
            <details key={question} className="py-5">
              <summary className="cursor-pointer text-base font-medium text-ink">
                {question}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {answer}
              </p>
            </details>
          ))}
        </div>
        <Link to="/properties" className="mt-7 inline-block border-b border-gold text-sm">
          Browse all properties
        </Link>
      </section>
    </div>
  );
}
