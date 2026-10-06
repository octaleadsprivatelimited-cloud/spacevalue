import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const compiled = ts.transpileModule(fs.readFileSync("src/lib/tracking.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
function setup() {
  const tags = [];
  const storage = new Map();
  const session = new Map();
  let reloads = 0;
  const sandbox = {
    exports: {},
    require: () => ({ PROPERTIES: [{ slug: "asbl-loft" }] }),
    URL,
    URLSearchParams,
    crypto: globalThis.crypto,
    Date,
    window: {},
    document: {
      referrer: "https://example.com/private?email=private",
      getElementById: (id) => tags.find((t) => t.id === id),
      createElement: () => ({}),
      head: { appendChild: (t) => tags.push(t) },
    },
    location: {
      origin: "https://www.spacevalue.co.in",
      pathname: "/projects/asbl-loft",
      search:
        "?utm_source=google&utm_medium=cpc&utm_campaign=space_value_projects&email=private&gclid=01234567890123456789",
      reload: () => reloads++,
    },
    localStorage: { getItem: (k) => storage.get(k), setItem: (k, v) => storage.set(k, v) },
    sessionStorage: { getItem: (k) => session.get(k), setItem: (k, v) => session.set(k, v) },
  };
  vm.runInNewContext(compiled, sandbox);
  return {
    api: sandbox.exports,
    sandbox,
    tags,
    get reloads() {
      return reloads;
    },
  };
}
const x = setup();
const ids = { ga4MeasurementId: "G-0EG53RGT3T", clarityProjectId: "ytidctkkk3", googleAdsId: "" };
x.api.initialiseTracking(ids);
x.api.trackPage("/projects/asbl-loft");
x.api.trackEvent("contact_click", { channel: "phone" });
assert.equal(x.tags.length, 0, "No optional providers before consent");
x.api.setConsent({ analytics: true, advertising: false });
assert.equal(x.tags.length, 2);
const events = () => x.sandbox.window.dataLayer.map((a) => Array.from(a));
const page = events().find((a) => a[0] === "event" && a[1] === "page_view");
assert.ok(page);
assert.ok(!page[2].page_location.includes("email"));
assert.ok(!page[2].page_location.includes("gclid"));
assert.equal(page[2].page_referrer, "https://example.com/");
x.api.trackPage("/projects/asbl-loft");
assert.equal(events().filter((a) => a[1] === "page_view").length, 1, "No duplicate page views");
x.api.trackEvent("enquiry_prepared", {
  channel: "whatsapp",
  project_slug: "asbl-loft",
  enquiry_id: "SV-TEST1234",
});
assert.equal(
  events().filter((a) => a[1] === "generate_lead").length,
  0,
  "Intent is not a confirmed lead",
);
x.sandbox.location.search = "";
assert.equal(
  x.api.sourceLabel(),
  "Google",
  "Attribution survives internal navigation after consent",
);
x.api.setConsent({ analytics: false, advertising: false });
assert.equal(x.reloads, 1);
assert.equal(x.sandbox.window["ga-disable-G-0EG53RGT3T"], true);
const y = setup();
y.api.initialiseTracking({ ...ids, googleAdsId: "AW-123456" });
y.api.setConsent({ analytics: false, advertising: true });
assert.equal(y.tags.length, 1);
assert.ok(
  !y.sandbox.window.dataLayer.some((a) => a[0] === "config" && a[1] === ids.ga4MeasurementId),
);
y.api.setConsent({ analytics: true, advertising: true });
assert.ok(
  y.sandbox.window.dataLayer.some((a) => a[0] === "config" && a[1] === ids.ga4MeasurementId),
  "Analytics can be enabled after advertising",
);
assert.equal(y.api.safePage("/projects/private-email"), "/404");
console.log(
  "Tracking checks passed: default denial, sanitised URLs, deduplication, attribution, withdrawal, provider consent and intent separation.",
);
