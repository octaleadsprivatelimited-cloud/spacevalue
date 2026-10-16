import { Phone } from "lucide-react";
import { CONTACT } from "./data";

export function CallButton() {
  return (
    <a
      href={`tel:+${CONTACT.phoneRaw}`}
      data-placement="floating_call"
      aria-label={`Call Space Value on ${CONTACT.phoneDisplay}`}
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-medium text-white shadow-lg transition-colors hover:bg-ink/85 sm:right-6 sm:bottom-6"
    >
      <Phone size={20} aria-hidden="true" /> Call Now
    </a>
  );
}
