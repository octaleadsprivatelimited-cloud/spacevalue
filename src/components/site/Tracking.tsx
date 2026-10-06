import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  DENIED,
  initialiseTracking,
  observeContactClicks,
  readConsent,
  setConsent,
  trackPage,
  type Consent,
} from "@/lib/tracking";

export function Tracking() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<Consent>(DENIED);
  useEffect(() => {
    let active = true;
    const saved = readConsent();
    setChoice(saved || DENIED);
    fetch("/tracking-config.json")
      .then((r) => {
        if (!r.ok) throw new Error("Tracking config unavailable");
        return r.json();
      })
      .then((value) => {
        if (!active) return;
        initialiseTracking(value);
        setReady(true);
        if ((value.ga4MeasurementId || value.clarityProjectId || value.googleAdsId) && !saved)
          setOpen(true);
      })
      .catch(() => {
        /* Contact actions continue to work if analytics is unavailable. */
      });
    document.addEventListener("click", observeContactClicks, true);
    const preferences = () => {
      setChoice(readConsent() || DENIED);
      setOpen(true);
    };
    window.addEventListener("sv-cookie-preferences", preferences);
    return () => {
      active = false;
      document.removeEventListener("click", observeContactClicks, true);
      window.removeEventListener("sv-cookie-preferences", preferences);
    };
  }, []);
  useEffect(() => {
    if (ready) trackPage(path);
  }, [path, ready]);
  function save(value: Consent) {
    setChoice(value);
    setOpen(false);
    setConsent(value);
  }
  if (!open) return null;
  return (
    <aside
      aria-label="Privacy choices"
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl rounded-2xl border border-border bg-white p-5 text-ink shadow-2xl sm:p-6"
    >
      <p className="font-display text-2xl">Your privacy choices</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        With your permission, Google Analytics and Microsoft Clarity help us understand visits and
        improve enquiries. Advertising measurement is optional. You can change your choice in the
        footer.
      </p>
      <div className="my-4 flex flex-wrap gap-5 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={choice.analytics}
            onChange={(e) => setChoice({ ...choice, analytics: e.target.checked })}
          />
          Analytics & session insights
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={choice.advertising}
            onChange={(e) => setChoice({ ...choice, advertising: e.target.checked })}
          />
          Advertising measurement
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => save(choice)}
          className="rounded-full bg-ink px-5 py-3 text-sm text-white"
        >
          Save choices
        </button>
        <button
          onClick={() => save(DENIED)}
          className="rounded-full border border-border px-5 py-3 text-sm"
        >
          Reject optional
        </button>
        <button
          onClick={() => save({ analytics: true, advertising: true })}
          className="rounded-full border border-border px-5 py-3 text-sm"
        >
          Accept all
        </button>
        <Link
          to="/privacy"
          onClick={() => setOpen(false)}
          className="self-center px-2 text-sm underline"
        >
          Privacy notice
        </Link>
      </div>
    </aside>
  );
}
