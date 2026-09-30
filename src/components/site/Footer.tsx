import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, NAV, RERA } from "./data";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <Link to="/" className="inline-flex items-center gap-3" aria-label="Space Value home">
            <img
              src="/images/space-value-logo.png"
              alt="Space Value logo"
              width={453}
              height={564}
              className="h-20 w-auto rounded-lg bg-white p-2 object-contain"
            />
            <span className="font-display text-2xl text-ivory">Space Value</span>
          </Link>
          <Link to="/rera" className="mt-3 block text-xs text-gold">
            TG RERA Agent: {RERA.number}
          </Link>
          <p className="mt-1 text-[0.6rem] tracking-[0.25em] text-gold uppercase">
            Real Estate Channel Partner
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            An authorised channel partner for RERA registered luxury developments across Hyderabad.
            Zero brokerage for buyers — we are paid by the developer.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] text-ivory uppercase">Navigate</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] text-ivory uppercase">Reach us</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:+${CONTACT.phoneRaw}`} className="hover:text-gold">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-gold">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{CONTACT.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-6 text-xs sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Space Value. All rights reserved.</p>
            <p>
              Developed by{" "}
              <a
                href="https://www.octaleads.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold transition-colors hover:text-ivory"
              >
                Octaleads
              </a>
            </p>
          </div>
          <p className="mt-2 leading-relaxed text-ivory/45">
            Disclaimer: Space Value is a marketing channel partner and not the developer. All
            project information, pricing and approvals shown are indicative and subject to change by
            the respective developer. Please verify RERA details before booking.
          </p>
        </div>
      </div>
    </footer>
  );
}
