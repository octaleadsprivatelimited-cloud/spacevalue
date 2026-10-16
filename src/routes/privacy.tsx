import { createFileRoute } from "@tanstack/react-router";
import { CONTACT } from "@/components/site/data";
import { pageMetadata } from "@/lib/site";
export const Route = createFileRoute("/privacy")({
  head: () => pageMetadata("/privacy"),
  component: Privacy,
});
function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-36 pb-20 sm:px-8">
      <p className="eyebrow">Space Value</p>
      <h1 className="mt-4 font-display text-5xl">Privacy notice</h1>
      <p className="mt-4 text-sm text-muted-foreground">Updated 16 October 2026</p>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="font-display text-2xl text-ink">Your property enquiry</h2>
          <p className="mt-3">
            Call Now opens your device’s calling application. You choose whether to place the call.
            Optional WhatsApp links prepare a property enquiry; you choose whether to send it. When
            you send a message, call or email, Space Value receives the information you share and
            uses it to respond to your enquiry and arrange follow-up.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Optional analytics</h2>
          <p className="mt-3">
            When configured and with your permission, Google Analytics measures visits and contact
            actions, and Microsoft Clarity provides heatmaps and session insights. These services
            can process device, network and browsing information. Budget preferences, names, phone
            numbers, emails and message contents are not included in our custom analytics events.
          </p>
          <p className="mt-3">
            A random enquiry reference helps our team recognise the request. A contact click or
            prepared enquiry does not confirm that a message was sent or a call was answered.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Cookies and advertising</h2>
          <p className="mt-3">
            Optional analytics and advertising measurement start only after you allow them. We store
            your privacy choice in your browser. Advertising measurement is a separate option; ad
            personalisation is disabled in our tag configuration. Contact buttons work if you reject
            optional tracking.
          </p>
          <button
            onClick={() => window.dispatchEvent(new Event("sv-cookie-preferences"))}
            className="mt-4 rounded-full border border-border px-5 py-3 text-ink"
          >
            Change cookie preferences
          </button>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Third-party services</h2>
          <p className="mt-3">
            WhatsApp, your telephone provider and email provider handle communications under their
            own terms. Optional measurement is subject to{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Google’s privacy policy
            </a>{" "}
            and{" "}
            <a
              href="https://privacy.microsoft.com/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Microsoft’s privacy statement
            </a>
            . These links explain provider processing and retention. Website hosting also processes
            requests needed to serve these pages.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">Your choices and questions</h2>
          <p className="mt-3">
            To ask about an enquiry, request correction or deletion of information held by Space
            Value, or stop further follow-up, email{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline">
              {CONTACT.email}
            </a>{" "}
            or call {CONTACT.phoneDisplay}. Avoid sending identity documents, bank details or other
            sensitive documents through enquiry channels.
          </p>
        </div>
      </div>
    </section>
  );
}
