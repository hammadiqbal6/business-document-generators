# Site configuration

Brand and site-identity values are driven by **environment variables** with Docuklin defaults in `src/config/siteDefaults.mjs`. Changing a name or domain should only require setting variables (and a rebuild for build-time keys)—not editing page copy.

| Mechanism | When it applies | Where to set |
|-----------|-----------------|--------------|
| **Build-time `PUBLIC_*`** | Baked into Astro HTML, sitemap, OG SVGs, `site.webmanifest`, JSON-LD | Cloudflare **Workers Builds → Variables**, GitHub Actions `env`, local `.env` |
| **Worker runtime vars** | Host 301s only (`CANONICAL_ORIGIN`, `LEGACY_REDIRECT_HOSTS`) | `wrangler.jsonc` `vars` and/or Cloudflare Worker **Variables** (next deploy) |

Do **not** put `PUBLIC_*` in top-level wrangler `vars` (breaks `npx wrangler preview` and does not bake Astro HTML). See `wrangler.jsonc` comments.

Internal identifiers (`docuforge:cookie-ok`, draft keys, `__docuforgeGrantAnalytics`) are **not** configurable—renaming them would re-prompt consent or drop drafts.

---

## Build-time variables

| Variable | Default | Controls |
|----------|---------|----------|
| `PUBLIC_SITE_URL` | `https://docuklin.com` | Canonical origin, sitemap, robots, llms, OG URLs, JSON-LD |
| `PUBLIC_SITE_NAME` | `Docuklin` | Header, titles, Organization/WebSite `name`, footer fallback |
| `PUBLIC_SITE_SHORT_NAME` | `Docuklin` | `apple-mobile-web-app-title`, manifest `short_name`, JSON-LD `alternateName` |
| `PUBLIC_SITE_TAGLINE` | Free niche business document generators — … | Organization / WebSite description |
| `PUBLIC_MANIFEST_DESCRIPTION` | Free niche business document generators with PDF export | `site.webmanifest` `description` |
| `PUBLIC_CONTACT_EMAIL` | `hello@docuklin.com` | Contact, footer, Organization email |
| `PUBLIC_COPYRIGHT_OWNER` | _(empty → site name)_ | Footer `©` owner |
| `PUBLIC_AUTHOR_NAME` | `Hammad Iqbal` | Bylines, About, Person schema |
| `PUBLIC_AUTHOR_EMAIL` | same as contact | Person schema email |
| `PUBLIC_AUTHOR_BIO` | _(honest maintainer bio)_ | Person / About bio |
| `PUBLIC_AUTHOR_URL` | `https://github.com/hammadiqbal6` | Person `@id` |
| `PUBLIC_AUTHOR_SAME_AS` | author URL | Comma-separated Person `sameAs` |
| `PUBLIC_ORG_SAME_AS` | _(empty → author sameAs)_ | Comma-separated Organization `sameAs` |
| `PUBLIC_THEME_COLOR` | `#0f6b5c` | `theme-color` meta, manifest, CSS `--brand` |
| `PUBLIC_BACKGROUND_COLOR` | `#ffffff` | Manifest `background_color` |
| `PUBLIC_LOCALE` | `en_US` | `og:locale` |
| `PUBLIC_HTML_LANG` | `en` | `<html lang>` / schema `inLanguage` |
| `PUBLIC_LAUNCHED_AT` | `2026-10-19` | Default published baseline |
| `PUBLIC_LOGO_PATH` | `/logo-512.png` | Organization logo JSON-LD |
| `PUBLIC_OG_IMAGE_PATH` | `/og-default.png` | Default `og:image` |
| `PUBLIC_OG_IMAGE_ALT` | `{name} — free invoice…` | Default `og:image:alt` (`{name}` → site name) |
| `PUBLIC_OG_IMAGE_FOOTER` | `{name} · Free PDF / DOCX templates` | Per-page OG SVG footer |
| `PUBLIC_OG_DEFAULT_SUBTITLE` | Free niche business document generators | `og-default.svg` subtitle |
| `PUBLIC_TWITTER_HANDLE` | _(empty)_ | `twitter:site` (omit when empty) |
| `PUBLIC_SITE_URL_PAYMENT_FEES` | payment-fee-calculators…workers.dev | Sister origin |
| `PUBLIC_SITE_URL_BUSINESS_DOCS` | `https://docuklin.com` | This site as seen by sisters |
| `PUBLIC_SITE_URL_HOME_GARDEN` | home-garden-calculators…workers.dev | Sister origin |
| `PUBLIC_SITE_URL_FIBER_ARTS` | fiber-arts-calculators…workers.dev | Sister origin |
| `PUBLIC_SITE_URL_PET` | pet-calculators…workers.dev | Sister origin |
| `PUBLIC_SISTER_NAME_*` | FeeCalc / YardCalc / FiberCalc / PetCalc labels | About sibling display names |
| `PUBLIC_EMAILJS_*` | _(empty)_ | Contact form (see `docs/CONTACT-EMAILJS.md`) |
| `PUBLIC_GA4_MEASUREMENT_ID` | `G-HR4DDMD97H` | Analytics |
| `PUBLIC_GSC_VERIFICATION` | _(current GSC token)_ | Search Console meta |
| `PUBLIC_BING_SITE_VERIFICATION` | _(empty)_ | Bing meta |
| `PUBLIC_INDEXNOW_KEY` / `INDEXNOW_KEY` | _(current key)_ | IndexNow |
| `PUBLIC_ADSENSE_PUBLISHER_ID` / `PUBLIC_ADS_ENABLED` / `PUBLIC_ADSENSE_AUTO_ADS` | off | AdSense script + ads.txt + Auto ads flag |
| `PUBLIC_ADSENSE_SLOT_DISPLAY` | _(empty)_ | Shared numeric display unit id for fixed `AdSlot` placements |
| `PUBLIC_ADSENSE_SLOT_HOME` / `PUBLIC_ADSENSE_SLOT_TOOL` | _(empty)_ | Optional per-placement unit ids (else `SLOT_DISPLAY`) |
| `PUBLIC_DIRECTORY_BADGES` | _(empty)_ | JSON array of footer badges: `[{href,img,alt,width?,height?,rel?}]`. Invalid JSON → warn + none. When unset, Fazier fallback below |
| `PUBLIC_FAZIER_BADGE_ENABLED` | `true` | Legacy Fazier-only footer badge when `PUBLIC_DIRECTORY_BADGES` is unset (set `false` to hide) |

Templates: `{name}` and `{short}` in `PUBLIC_OG_IMAGE_ALT` / `PUBLIC_OG_IMAGE_FOOTER` expand to the configured site / short name.

---

## Worker runtime variables

| Variable | Default | Controls |
|----------|---------|----------|
| `CANONICAL_ORIGIN` | `https://docuklin.com` | 301 target for legacy hosts (no trailing slash) |
| `LEGACY_REDIRECT_HOSTS` | `business-document-generators.hammadiqbal117.workers.dev` | Comma-separated **exact** Host values that 301 → `CANONICAL_ORIGIN` (path + query; trailing slash in the same hop). Preview hosts must not be listed. |

Defaults are also in `wrangler.jsonc` `vars` (and `previews.vars`). Dashboard overrides apply on the next Worker deploy without an Astro rebuild.

---

## Rename / domain checklist

1. Set build-time `PUBLIC_SITE_URL`, `PUBLIC_SITE_NAME`, `PUBLIC_SITE_SHORT_NAME` (and any OG/manifest overrides) in Workers Builds → rebuild.
2. Set Worker `CANONICAL_ORIGIN` and update `LEGACY_REDIRECT_HOSTS` if the old host list changes → deploy Worker.
3. Point DNS / Custom Domains; verify with `curl -sI` on old and new hosts.
4. Update sister sites’ `PUBLIC_SITE_URL_BUSINESS_DOCS` when they rebuild.

Also see `docs/CUSTOM-DOMAIN.md`.
