import { PROPERTIES } from "@/components/site/data";

export type Consent = { analytics: boolean; advertising: boolean };
export type TrackingConfig = {
  ga4MeasurementId: string;
  clarityProjectId: string;
  googleAdsId: string;
};
const CONSENT_KEY = "sv-consent-v1";
export const DENIED: Consent = { analytics: false, advertising: false };
let consent = DENIED;
let config: TrackingConfig = { ga4MeasurementId: "", clarityProjectId: "", googleAdsId: "" };
let configured = false;
let gaConfigured = false;
let adsConfigured = false;
let lastPage = "";
let previousPage = "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  }
}

export function readConsent(): Consent | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    return value && typeof value.analytics === "boolean" && typeof value.advertising === "boolean"
      ? value
      : null;
  } catch {
    return null;
  }
}

export function cleanConfig(value: Partial<TrackingConfig>): TrackingConfig {
  return {
    ga4MeasurementId: /^G-[A-Z0-9]+$/.test(value.ga4MeasurementId || "")
      ? value.ga4MeasurementId!
      : "",
    clarityProjectId: /^[a-z0-9]{5,20}$/.test(value.clarityProjectId || "")
      ? value.clarityProjectId!
      : "",
    googleAdsId: /^AW-[0-9]+$/.test(value.googleAdsId || "") ? value.googleAdsId! : "",
  };
}

export function safePage(path: string) {
  if (path.startsWith("/projects/"))
    return PROPERTIES.some((p) => path === `/projects/${p.slug}`) ? path : "/404";
  return ["/", "/about", "/properties", "/contact", "/gallery", "/rera", "/privacy"].includes(path)
    ? path
    : "/404";
}

function consentValues(value: Consent) {
  return {
    analytics_storage: value.analytics ? "granted" : "denied",
    ad_storage: value.advertising ? "granted" : "denied",
    ad_user_data: value.advertising ? "granted" : "denied",
    ad_personalization: "denied",
  };
}

function script(id: string, src: string) {
  if (document.getElementById(id)) return;
  const tag = document.createElement("script");
  tag.id = id;
  tag.src = src;
  tag.async = true;
  document.head.appendChild(tag);
}

function startTags() {
  if (
    !configured &&
    ((consent.analytics && config.ga4MeasurementId) || (consent.advertising && config.googleAdsId))
  ) {
    window.dataLayer ||= [];
    window.gtag ||= function () {
      // Google's gtag queue expects the Arguments object.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", consentValues(DENIED));
    window.gtag("consent", "update", consentValues(consent));
    window.gtag("set", "ads_data_redaction", true);
    window.gtag("set", "allow_google_signals", false);
    window.gtag("set", "allow_ad_personalization_signals", false);
    window.gtag("js", new Date());
    script(
      "sv-google-tag",
      `https://www.googletagmanager.com/gtag/js?id=${config.ga4MeasurementId || config.googleAdsId}`,
    );
    configured = true;
  }
  if (consent.analytics && config.ga4MeasurementId && !gaConfigured) {
    window.gtag?.("config", config.ga4MeasurementId, {
      send_page_view: false,
      page_location: measurementPage(location.pathname),
      page_referrer: safeReferrer(),
    });
    gaConfigured = true;
  }
  if (consent.advertising && config.googleAdsId && !adsConfigured) {
    window.gtag?.("config", config.googleAdsId, { send_page_view: false });
    adsConfigured = true;
  }
  if (consent.analytics && config.clarityProjectId && !window.clarity) {
    const clarity: NonNullable<Window["clarity"]> = (...args) => {
      clarity.q!.push(args);
    };
    clarity.q = [];
    window.clarity = clarity;
    window.clarity("consentv2", {
      analytics_Storage: "granted",
      ad_Storage: consent.advertising ? "granted" : "denied",
    });
    script("sv-clarity-tag", `https://www.clarity.ms/tag/${config.clarityProjectId}`);
  }
}

function safeReferrer() {
  try {
    const url = new URL(document.referrer);
    return url.origin === location.origin
      ? `${url.origin}${safePage(url.pathname)}`
      : `${url.origin}/`;
  } catch {
    return "";
  }
}

export function setConsent(value: Consent, persist = true) {
  const wasAllowed = consent.analytics;
  consent = value;
  if (persist) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    } catch {
      /* storage can be blocked */
    }
  }
  window.gtag?.("consent", "update", consentValues(value));
  window.clarity?.("consentv2", {
    analytics_Storage: value.analytics ? "granted" : "denied",
    ad_Storage: value.advertising ? "granted" : "denied",
  });
  if (configured && config.ga4MeasurementId)
    (window as unknown as Record<string, unknown>)[`ga-disable-${config.ga4MeasurementId}`] =
      !value.analytics;
  if (wasAllowed && !value.analytics) {
    lastPage = "";
    // A reload removes the active session-replay script after a consent withdrawal.
    location.reload();
    return;
  }
  startTags();
  if (!wasAllowed && value.analytics) trackPage(location.pathname);
}

export function initialiseTracking(value: Partial<TrackingConfig>) {
  config = cleanConfig(value);
  setConsent(readConsent() || DENIED, false);
}

export function trackEvent(
  name: "contact_click" | "enquiry_prepared",
  data: {
    channel: "whatsapp" | "phone" | "email";
    project_slug?: string | undefined;
    placement?: string;
    enquiry_id?: string | undefined;
  },
) {
  if (!consent.analytics) return;
  if (config.ga4MeasurementId)
    window.gtag?.("event", name, {
      ...data,
      page_location: measurementPage(location.pathname),
      page_path: safePage(location.pathname),
      send_to: config.ga4MeasurementId,
    });
  window.clarity?.("event", name);
}

export function trackPage(path: string) {
  if (!consent.analytics) return;
  const page = safePage(path);
  sourceLabel();
  if (lastPage === page) return;
  const referrer = previousPage ? `${location.origin}${previousPage}` : safeReferrer();
  previousPage = page;
  lastPage = page;
  if (config.ga4MeasurementId)
    window.gtag?.("event", "page_view", {
      page_location: measurementPage(page),
      page_path: page,
      page_title: document.title,
      page_referrer: referrer,
      send_to: config.ga4MeasurementId,
    });
  window.clarity?.("set", "page_type", page.startsWith("/projects/") ? "project" : "general");
}

export function enquiryReference() {
  return `SV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export function sourceLabel() {
  const query = new URLSearchParams(location.search);
  const source = query.get("utm_source");
  const current =
    source === "google" || query.has("gclid") || query.has("gbraid") || query.has("wbraid")
      ? "Google"
      : source === "facebook" || source === "instagram"
        ? "Social"
        : "Website";
  if (consent.analytics) {
    try {
      if (current !== "Website") sessionStorage.setItem("sv-enquiry-source", current);
      const saved = sessionStorage.getItem("sv-enquiry-source");
      if (saved === "Google" || saved === "Social") return saved;
    } catch {
      /* keep contact working with storage blocked */
    }
  }
  return current;
}

function measurementPage(path: string) {
  const url = new URL(safePage(path), location.origin);
  const query = new URLSearchParams(location.search);
  const allowed: Record<string, string[]> = {
    utm_source: ["google", "facebook", "instagram"],
    utm_medium: ["cpc", "organic", "social", "referral"],
    utm_campaign: ["space_value_projects"],
  };
  for (const [key, values] of Object.entries(allowed)) {
    const value = query.get(key);
    if (value && values.includes(value)) url.searchParams.set(key, value);
  }
  if (consent.advertising)
    for (const key of ["gclid", "gbraid", "wbraid"]) {
      const value = query.get(key);
      if (value && /^[A-Za-z0-9_-]{10,512}$/.test(value)) url.searchParams.set(key, value);
    }
  return url.href;
}

export function observeContactClicks(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>("a[href]");
  if (!link) return;
  const href = link.getAttribute("href") || "";
  const channel = href.startsWith("tel:")
    ? "phone"
    : href.startsWith("mailto:")
      ? "email"
      : /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)
        ? "whatsapp"
        : null;
  if (!channel) return;
  const slug =
    link.closest<HTMLElement>("[data-project]")?.dataset["project"] ||
    location.pathname.split("/projects/")[1];
  const project_slug = PROPERTIES.some((p) => p.slug === slug) ? slug : undefined;
  let reference = link.dataset["enquiryId"];
  if (channel === "whatsapp" && !reference) {
    reference = enquiryReference();
    const url = new URL(href);
    const text =
      url.searchParams.get("text") ||
      "Hi Space Value, I would like to enquire about Hyderabad properties.";
    url.searchParams.set(
      "text",
      `${text}\nReference: ${reference}\nSource: ${sourceLabel()}\nPage: ${safePage(location.pathname)}`,
    );
    link.href = url.href;
    link.dataset["enquiryId"] = reference;
  }
  trackEvent("contact_click", {
    channel,
    project_slug,
    enquiry_id: reference,
    placement:
      link.dataset["placement"] ||
      (link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content"),
  });
}
