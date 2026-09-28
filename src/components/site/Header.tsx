import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT, NAV, RERA } from "./data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <header
        className={`fixed inset-x-2 top-3 z-50 mx-auto h-[72px] max-w-7xl rounded-[24px] border border-white/15 shadow-xl backdrop-blur-xl transition-colors sm:inset-x-5 sm:top-4 sm:h-20 sm:rounded-full ${scrolled || open ? "bg-ink/95" : "bg-ink/85"}`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center gap-2 px-3 sm:gap-4 sm:px-6">
          <Link
            to="/"
            aria-label="Space Value home"
            className="order-1 flex min-w-0 shrink-0 items-center gap-2"
          >
            <img
              src="/images/space-value-logo-dark.png"
              alt="Space Value logo"
              width={1120}
              height={1400}
              className="h-9 w-auto shrink-0 object-contain sm:h-11"
            />
            <span className="leading-tight">
              <span className="block font-display text-base text-ivory sm:text-xl">
                Space Value
              </span>
              <span className="block text-[0.45rem] tracking-[0.12em] text-gold-soft uppercase sm:text-[0.6rem]">
                Channel Partner
              </span>
            </span>
          </Link>
          <Link
            to="/rera"
            aria-label={`TG RERA agent registration ${RERA.number}`}
            className="order-2 flex shrink-0 flex-col items-center gap-1"
          >
            <img
              src="/images/tg-rera.png"
              alt="TG RERA"
              width={640}
              height={270}
              className="h-auto w-[72px] rounded-md bg-white p-1 sm:w-[92px]"
            />
            <span className="text-[7px] tracking-wide text-gold-soft sm:text-[9px]">
              Agent: {RERA.number}
            </span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="order-3 ml-auto hidden items-center gap-1 lg:flex xl:gap-2"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3 py-2 text-sm text-ivory/80 transition-colors hover:bg-white/5 hover:text-gold"
                activeProps={{ className: "bg-white/10 text-gold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:+${CONTACT.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold px-4 py-3 text-xs text-gold hover:bg-gold hover:text-ink"
            >
              <Phone className="h-3.5 w-3.5" />
              Call now
            </a>
          </nav>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="order-3 ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ivory/25 text-ivory lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
        </div>
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-x-2 top-3 z-[70] max-h-[calc(100dvh-24px)] rounded-[24px] overflow-y-auto overscroll-contain border-b border-white/10 bg-ink px-5 pb-6 text-ivory shadow-2xl sm:px-8"
        >
          <div className="flex h-24 items-center justify-between">
            <Dialog.Title className="font-display text-2xl">Explore Space Value</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile navigation">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-3 font-display text-2xl text-ivory/90"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={`tel:+${CONTACT.phoneRaw}`}
            className="mt-5 flex items-center justify-center gap-2 bg-gold px-4 py-3 text-sm text-ink"
          >
            <Phone className="h-4 w-4" />
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-3 block text-center text-sm text-ivory/70"
          >
            {CONTACT.email}
          </a>
          <p className="mt-4 text-center text-xs text-gold-soft">TG RERA Agent: {RERA.number}</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
