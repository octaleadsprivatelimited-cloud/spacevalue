import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT, NAV } from "./data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile menu so the hero stays exactly where it is.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "bg-ink/95 backdrop-blur-md border-b border-white/10"
          : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:py-5">
        <Link to="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold/60 font-display text-lg text-gold">
            S
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-xl text-ivory sm:text-2xl">
              Space Value
            </span>
            <span className="block truncate text-[0.6rem] tracking-[0.25em] text-gold-soft/80 uppercase">
              Channel Partner
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm tracking-wide text-ivory/75 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:+${CONTACT.phoneRaw}`}
            className="inline-flex items-center gap-2 border border-gold px-5 py-2.5 text-xs tracking-[0.18em] text-gold uppercase transition-colors hover:bg-gold hover:text-ink"
          >
            <Phone className="h-3.5 w-3.5" /> Call now
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center border border-ivory/25 text-ivory lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu: fixed overlay, floats above the hero without shifting it */}
      <div
        className={`fixed inset-x-0 top-[72px] bottom-0 z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          className={`absolute inset-x-0 top-0 max-h-full overflow-y-auto border-b border-white/10 bg-ink/98 px-5 pt-2 pb-8 shadow-2xl transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 py-4 font-display text-2xl text-ivory/90"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:+${CONTACT.phoneRaw}`}
            className="mt-6 flex items-center justify-center gap-2 bg-gold px-5 py-3.5 text-xs tracking-[0.18em] text-ink uppercase"
          >
            <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-3 block text-center text-sm text-ivory/60"
          >
            {CONTACT.email}
          </a>
        </nav>
      </div>
    </header>
  );
}
