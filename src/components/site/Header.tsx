import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT, NAV, RERA } from "./data";

export function Header() {
  const reduceMotion = useReducedMotion();
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
        className={`fixed inset-x-2 top-3 z-50 mx-auto h-[72px] max-w-7xl rounded-[24px] border border-black/10 bg-white transition-shadow sm:inset-x-5 sm:top-4 sm:h-20 sm:rounded-full ${scrolled || open ? "shadow-xl" : "shadow-lg"} ${open ? "rounded-b-none sm:rounded-b-none" : ""}`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center gap-2 px-3 sm:gap-4 sm:px-6">
          <Link
            to="/"
            aria-label="Space Value home"
            className="order-1 flex min-w-0 shrink-0 items-center gap-2"
          >
            <img
              src="/images/space-value-logo.png"
              alt="Space Value logo"
              width={453}
              height={564}
              className="h-9 w-auto shrink-0 object-contain sm:h-11"
            />
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
            <span className="text-[7px] tracking-wide text-slate-600 sm:text-[9px]">
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
                className="rounded-full px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
                activeProps={{ className: "bg-sky-50 text-sky-700" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:+${CONTACT.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full border border-sky-700 bg-sky-700 px-4 py-3 text-xs text-white hover:bg-sky-800"
            >
              <Phone className="h-3.5 w-3.5" />
              Call now
            </a>
          </nav>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="order-3 ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
                className="fixed inset-x-0 bottom-0 top-[84px] z-[60] bg-ink/40 backdrop-blur-sm sm:top-24"
              />
            </Dialog.Overlay>
            <Dialog.Content
              forceMount
              asChild
              aria-describedby={undefined}
              className="fixed inset-x-2 top-[84px] z-[70] max-h-[calc(100dvh-96px)] rounded-b-[24px] overflow-y-auto overscroll-contain border border-t-0 border-slate-200 bg-white px-5 pb-6 text-ink shadow-2xl sm:inset-x-5 sm:top-24 sm:max-h-[calc(100dvh-112px)] sm:rounded-b-[32px] sm:px-8"
            >
              <motion.div
                initial={{
                  opacity: reduceMotion ? 1 : 0,
                  clipPath: reduceMotion ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                exit={{
                  opacity: 0,
                  clipPath: reduceMotion ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top center" }}
              >
                <Dialog.Title className="sr-only">Main navigation</Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="absolute right-5 top-2 z-10 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white sm:right-8"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
                <nav aria-label="Mobile navigation">
                  {NAV.map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.2,
                        delay: reduceMotion ? 0 : 0.05 + index * 0.035,
                      }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="block border-b border-slate-200 py-3 pr-12 font-display text-2xl text-slate-700"
                        activeProps={{ className: "text-sky-700" }}
                        activeOptions={{ exact: item.to === "/" }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <a
                  href={`tel:+${CONTACT.phoneRaw}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-sky-700 px-4 py-3 text-sm text-white"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-3 block text-center text-sm text-slate-600"
                >
                  {CONTACT.email}
                </a>
                <p className="mt-4 text-center text-xs text-slate-600">
                  TG RERA Agent: {RERA.number}
                </p>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
