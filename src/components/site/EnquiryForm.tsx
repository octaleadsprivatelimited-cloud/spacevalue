import { useState, type FormEvent } from "react";
import { CONTACT, PROPERTIES, type Property } from "./data";
import { enquiryReference, sourceLabel, trackEvent } from "@/lib/tracking";

export function EnquiryForm({ property }: { property?: Property }) {
  const [prepared, setPrepared] = useState<{
    url: string;
    reference: string;
    slug?: string | undefined;
  } | null>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("website")) return;
    const selected = property || PROPERTIES.find((p) => p.slug === data.get("project"));
    const reference = enquiryReference();
    const message = `Hi Space Value, I am enquiring about ${selected ? `${selected.name} (${selected.location})` : "Hyderabad properties"}.\nHome preference: ${data.get("configuration")}\nBudget preference: ${data.get("budget")}\nBuying timeframe: ${data.get("timeline")}\nRequirement: ${data.get("purpose")}\nPlease confirm suitable options, full pricing and project RERA details.\nReference: ${reference}\nSource: ${sourceLabel()}`;
    setPrepared({
      url: `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(message)}`,
      reference,
      slug: selected?.slug,
    });
    trackEvent("enquiry_prepared", {
      channel: "whatsapp",
      project_slug: selected?.slug,
      enquiry_id: reference,
      placement: "requirements_form",
    });
  }
  const inputClass =
    "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-ink";
  return (
    <div
      id="enquire"
      className="scroll-mt-28 rounded-3xl border border-border bg-white p-7 sm:p-9"
      data-clarity-mask="true"
      data-project={property?.slug}
    >
      <p className="eyebrow">Your home requirements</p>
      <h2 className="mt-3 font-display text-3xl">Get a more relevant response.</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Share your preferences so our team can check suitable options before arranging a visit.
      </p>
      <form onSubmit={prepare} onChange={() => setPrepared(null)} className="mt-6 space-y-4">
        <div aria-hidden="true" className="hidden">
          <label>
            Leave this empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        {!property && (
          <label className="block text-sm">
            Project
            <select name="project" className={inputClass}>
              <option value="">Help me choose</option>
              {PROPERTIES.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} · {p.group}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="block text-sm">
          Home preference
          <select name="configuration" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a preference
            </option>
            {[
              "Apartment — 2 bedrooms",
              "Apartment — 3 bedrooms",
              "Apartment — 4+ bedrooms",
              "Villa",
              "Help me choose",
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Budget preference
          <select name="budget" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a preference
            </option>
            {[
              "Below ₹1 crore",
              "₹1–2 crore",
              "₹2–3 crore",
              "₹3–5 crore",
              "Above ₹5 crore",
              "Discuss with an advisor",
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-muted-foreground">
            These are your preferences, not advertised project prices.
          </span>
        </label>
        <label className="block text-sm">
          Buying timeframe
          <select name="timeline" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a timeframe
            </option>
            {["Within 3 months", "3–6 months", "6–12 months", "Exploring for later"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Requirement
          <select name="purpose" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a requirement
            </option>
            {["Home purchase for own use", "Property investment", "Comparing options"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <input type="checkbox" name="permission" required className="mt-1" />I want to share these
          preferences with Space Value through WhatsApp for this enquiry.
        </label>
        <button type="submit" className="w-full rounded-full bg-ink px-6 py-4 text-sm text-white">
          Prepare WhatsApp enquiry
        </button>
        {prepared && (
          <div role="status" className="rounded-xl border border-border bg-secondary p-4">
            <p className="text-sm">
              Your enquiry is ready. Open WhatsApp and press Send to contact our team.
            </p>
            <p className="mt-2 text-xs">Reference: {prepared.reference}</p>
            <button
              type="button"
              onClick={() => {
                trackEvent("contact_click", {
                  channel: "whatsapp",
                  project_slug: prepared.slug,
                  enquiry_id: prepared.reference,
                  placement: "requirements_form",
                });
                window.open(prepared.url, "_blank", "noopener,noreferrer");
              }}
              className="mt-4 inline-flex rounded-full bg-[#147a3d] px-6 py-3 text-sm text-white"
            >
              Continue to WhatsApp ↗
            </button>
          </div>
        )}
        <p className="text-xs leading-relaxed text-muted-foreground">
          This form does not send a message automatically. Your preferences are included in the
          WhatsApp draft and are excluded from analytics event parameters.
        </p>
      </form>
    </div>
  );
}
