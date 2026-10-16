import { Phone } from "lucide-react";
import { CONTACT, type Property } from "./data";

export function CallPanel({ property }: { property?: Property }) {
  return (
    <div id="enquire" className="scroll-mt-28 rounded-3xl border border-border bg-white p-7 sm:p-9">
      <p className="eyebrow">Speak with Space Value</p>
      <h2 className="mt-3 font-display text-3xl">Your next step is a call.</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {property ? `Ask about ${property.name}: ` : "Discuss your preferred property: "}
        current pricing, suitable options, the official brochure and site visit arrangements. Our
        team will confirm the exact project, phase and project RERA details with you.
      </p>
      <a
        href={`tel:+${CONTACT.phoneRaw}`}
        data-placement="call_panel"
        className="mt-6 inline-flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-ink px-5 py-5 text-white transition-colors hover:bg-ink/85 sm:w-auto sm:px-9"
      >
        <span className="inline-flex items-center gap-2 text-base font-medium">
          <Phone size={20} aria-hidden="true" /> Call Now
        </span>
        <span className="text-lg">{CONTACT.phoneDisplay}</span>
      </a>
      <p className="mt-4 text-sm text-muted-foreground">{CONTACT.hours}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        No form needed. Call to discuss your requirements directly.
      </p>
    </div>
  );
}
