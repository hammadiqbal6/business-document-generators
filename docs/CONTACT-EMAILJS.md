# Contact form via EmailJS (free plan)

The `/contact/` page can show an accessible browser form that sends mail through
[EmailJS](https://www.emailjs.com/) using their **REST API** and a tiny page-local
script (no `@emailjs/browser` SDK).

If any EmailJS env var is missing at **build** time, the page falls back to the
mailto link only (no broken form). The mailto address always remains available
as a secondary option when the form is enabled.

## Environment variables (public only)

Set these in Cloudflare Workers Builds (or `.env` for local builds). They are
`PUBLIC_*` and are embedded in the static HTML for `/contact/` only.

| Variable | Purpose |
|----------|---------|
| `PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID (e.g. Gmail / Outlook service) |
| `PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS **public** key (`user_id` in the API body) |

**Never** put the EmailJS **private** key in the repo, `.env.example`, Workers
`vars`, or any `PUBLIC_*` variable. The free-plan browser flow uses only the
public key.

Empty defaults are listed in `.env.example`. Config lives next to other owner
settings in `src/config/site.ts` (`siteConfig.emailjs`).

## EmailJS template variables

Create a template that uses these placeholders (names must match):

| Template variable | Form field / source |
|-------------------|---------------------|
| `{{from_name}}` | Name input |
| `{{reply_to}}` | Email input (set as Reply-To in the EmailJS template UI when possible) |
| `{{message}}` | Message textarea |
| `{{page_url}}` | `window.location.href` when sent |
| `{{site_name}}` | `siteConfig.siteName` (e.g. DocuForge Tools) |

Example template body:

```text
From: {{from_name}} <{{reply_to}}>
Site: {{site_name}}
Page: {{page_url}}

{{message}}
```

## Client request

`POST https://api.emailjs.com/api/v1.0/email/send` with JSON:

```json
{
  "service_id": "<PUBLIC_EMAILJS_SERVICE_ID>",
  "template_id": "<PUBLIC_EMAILJS_TEMPLATE_ID>",
  "user_id": "<PUBLIC_EMAILJS_PUBLIC_KEY>",
  "template_params": {
    "from_name": "...",
    "reply_to": "...",
    "message": "...",
    "page_url": "...",
    "site_name": "..."
  }
}
```

## Free-plan safeguards

- **Honeypot** field (`company`) — bots that fill it get a fake success; no API call.
- **Throttle** — one successful send per 60 seconds (`localStorage`).
- **Message length** — capped at 2000 characters client-side.
- Script ships only on `/contact/` (Astro page component); other routes are unaffected for Lighthouse.

## CSP

This site does not set a sitewide `connect-src` CSP today. If you add one in
`public/_headers` or the Worker, allow:

```http
connect-src 'self' https://api.emailjs.com
```

(Also keep any GA4 / AdSense hosts you already need.)

## Setup checklist

1. Create an EmailJS account (free plan).
2. Add an email service and a template with the variables above.
3. Copy service ID, template ID, and **public** key into Workers Builds env.
4. Redeploy (`npm run build` embeds the values).
5. Open `/contact/`, send a test message, confirm delivery.
