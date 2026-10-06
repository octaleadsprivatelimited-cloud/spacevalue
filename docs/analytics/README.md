# Space Value lead measurement — 6 October 2026

Production config: `/tracking-config.json`. GA4 `G-0EG53RGT3T`; Clarity `ytidctkkk3`. These public identifiers are not credentials. Google Ads ID remains empty: Ads onboarding/terms are not complete and no Ads conversion upload is configured.

## What is measured

After optional analytics consent: manual page views, `contact_click` (phone/WhatsApp/email), and `enquiry_prepared`. Parameters include channel, project slug, placement and a random enquiry reference. They do not include name, phone number, budget, home preferences, timeframe or WhatsApp draft text. Known campaign labels are allowed; arbitrary URLs/referrers are sanitised. Ad click identifiers are included only with advertising consent. Google signals and ad personalisation are disabled. Enhanced measurement was turned off in the GA4 stream to avoid duplicate SPA page views and automatic private outbound/form data. Clarity Strict masking and bot detection are enabled.

Visitors can reject optional measurement or reopen Cookie preferences in the footer. Providers are not loaded until consent; withdrawing analytics reloads to remove the session replay script. No promises of complete measurement for visitors who decline consent or block tags.

## Confirmed leads with WhatsApp Business app

A click is not a sent message. A prepared draft is not a lead. A phone click does not establish that a call connected. The app does not provide automatic webhooks for received messages. This release does not fabricate `generate_lead`, answered-call or sale events.

Create these WhatsApp Business labels manually: New enquiry, Requirements confirmed, Site visit booked, Visit completed, Follow up, Closed, Spam/irrelevant. On receipt, copy the `SV-...` reference and source from the message into the local lead-review CSV, verify the requested project and requirements with the person, then record the actual outcome. Do not upload phone numbers or financial preferences to GA4. Store this operational file privately; never commit completed rows to Git.

For automatic end-to-end tracking, connect an authorised WhatsApp Business Platform provider/CRM and actual call reporting. Then map verified received enquiries, qualified conversations, visits and sales to offline conversions using permitted identifiers and consent. Website call clicks alone must remain intent events. Google Ads forwarding-number reporting, if available to the account, is another way to measure ad calls once Ads setup is completed.

## Lead-quality operating plan

Keep the approved total budget ₹300/day. Start with a small set of clearly named projects rather than spreading that budget across all 19. Use Search exact/phrase project/location buying terms; Hyderabad presence targeting; exclude jobs, careers, rentals, free accommodation and irrelevant informational searches. Review search terms before broadening. Keep call delivery within staffed hours. Do not start broad Display or Performance Max before verified qualified-lead feedback exists.

The 19 landing pages offer project-specific images, contact options, clear channel-partner identity and a guided requirements enquiry. Budget choices are preferences, not project prices. Verify actual prices, configurations, possession and project RERA registration before advertising them. Voluntary requirements help match suitable options; do not restrict housing access using sensitive personal characteristics.

Review weekly: received enquiries, requirements-confirmed enquiries, booked visits, completed visits, spam and cost per confirmed enquiry. Optimise to confirmed outcomes rather than a high click count. The site's improvements cannot guarantee genuine leads or rankings.

## SEO

Canonical HTTPS www URLs and project metadata are preserved. RealEstateAgent structured data includes the published address and Hyderabad service area; each project adds breadcrumbs. `/privacy` is indexed in the sitemap. Project-specific descriptions and FAQs do not invent pricing or approvals. Submit `/sitemap.xml` in verified Search Console; monitor indexing and page experience after deployment. Ranking improvements require observation over time.

## Validation

`node scripts/check-tracking.mjs` checks default denial, URL/referrer sanitisation, page-view deduplication, consent withdrawal, provider-specific consent, attribution across navigation and intent/confirmed-lead separation. Also run TypeScript, targeted ESLint and production build. Browser QA checks mobile overflow, form preparation and absence of optional scripts after rejection. Provider dashboards must be checked after production deployment; script installation alone is not evidence of received data.
