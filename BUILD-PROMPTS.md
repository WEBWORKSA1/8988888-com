# 8988888.com — Phase-wise Build Prompts

Concept: **8988888 · The Premium Number Exchange**. It is a reference hub, a toolset and a lead-generation concierge for lucky, vanity and premium numbers: mobile numbers, toll-free and vanity business lines, licence plates, prosperity pricing and numeric domains.

Run the prompts in order. Each phase ends in a deployable state.

---

## Phase 0 — Strategy & guardrails
> You are building **8988888.com**, a static, GitHub-Pages-hosted website (free plan, no server).
>
> **Positioning:** "The Premium Number Exchange — value, find and own the numbers people pay fortunes for." The domain reads 发久发发发发发 ("lasting prosperity"): 8 = 发 (prosper), 9 = 久 (lasting), and it contains no 4.
>
> **Revenue stack**, by priority:
> 1. Lead generation: number concierge, business-phone-system quotes, and valuation/listing requests.
> 2. Google AdSense in 5 placements per page.
> 3. Affiliate links for VoIP phone systems and domain marketplaces.
> 4. Featured listings ($88/mo) and an 8% brokered-sale fee.
> 5. Sponsorships and paid advertising.
> 6. Donations.
> 7. YouTube.
>
> **Hard rules:**
> - Never sell or broker US/Canadian toll-free numbers (FCC 47 CFR §52.105/§52.107).
> - Every record must link to its source.
> - Never use fabricated testimonials or listings.
> - Claim no trademark in "8988888".
> - Every page carries a top bar reading: "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership", linked to https://web.works/contact.
> - All forms deliver to ONE private inbox. The address is never rendered in HTML. It is stored as an XOR-encoded array in `config.js` and assembled only at submit time.

## Phase 1 — Design system & shell
> Create `assets/css/style.css`:
> - Dark-first premium palette: near-black backgrounds, a gold gradient (#ffd77a→#e8b94a→#c9861a), red accent (#e0313f) and jade for "good".
> - A full light theme via `[data-theme=light]`.
> - Fonts: Outfit for text, JetBrains Mono for numbers.
> - Components: sticky header with mega-dropdowns and a mobile burger menu; gradient interest bar; buttons (gold/red/ghost); cards; badges; chips; tabs; plate-style number tags; sortable tables; multi-step form cards with a progress bar; accordions; countdowns; ad slots; consent banner; modal; toast; back-to-top button.
> - Responsive at 1020, 900, 760 and 620 px.
> - Respect `prefers-reduced-motion`. Gate the `.reveal` animation behind a `.js` class.
>
> Build a Jekyll shell (GitHub Pages builds it natively on the free plan, so no workflow is needed):
> - `_layouts/default.html` holds the head, SEO, OG and Organization JSON-LD, the interest bar, header, footer with newsletter form, consent banner, lead toast, quick-lead modal and scripts.
> - `_includes/sidebar.html` is the shared article sidebar.
> - Every page is a file with front matter (title, description, canonical, ogtype) plus its body.
> - All links use `{{ site.baseurl }}/`, so the same files work at `/8988888-com/` and on the custom domain.

## Phase 2 — Number Intelligence Engine + 7 tools
> Write `assets/js/tools.js`. All processing happens in the browser.
>
> **Engine:**
> - Digit weights from Chinese homophones: 8 +8; 6 and 9 +5; 2 and 3 +2; 0, 1 and 7 +1; 5 −1; 4 −9.
> - A combination dictionary: 168, 518, 888, 8888, 89, 98, 99, 666, 28, 58, 520, 1314 are good; 14, 74, 94, 54, 44, 250, 38, 13 are bad.
> - A **luck score** from 0 to 100.
> - A **rarity score** built from: longest run, solid or near-solid digits, distinct-digit count, palindromes, ladders, repeating blocks, share of 8s, a penalty for 4s, and length bonuses for plates and domains.
> - Five tiers (Standard → Legendary), each with an indicative USD band per asset type.
>
> **Tools** (one page each, with explainer, FAQ + FAQPage schema, WebApplication schema, embed code and a sidebar):
> 1. Number Value Estimator
> 2. Chinese Luck Scorer
> 3. Vanity Converter (letters↔digits, dictionary word finder)
> 4. Lucky Number Finder (prefix → ranked candidates)
> 5. Licence Plate Builder (HK/UK/UAE/CN/US preview)
> 6. Lucky Price Generator
> 7. Red Envelope Calculator
>
> Every result panel carries concierge CTAs prefilled through URL parameters.

## Phase 3 — Lead-generation engine
> Build `concierge.html` with three tabbed, multi-step forms. Each form has a progress bar, per-step validation, a honeypot and consent checkboxes. Tabs are deep-linkable via `#find`, `#phone` and `#sell`.
> - **Find me a number:** type → wanted number → market → budget → timeline → use → contact.
> - **Business phone quotes:** users → features → current provider → contact → consent to share with up to 3 providers. This is the highest-value lead: sell it via affiliate or pay-per-lead.
> - **Free valuation / list it:** asset → number → registry → goal → asking price → ownership attestation. Include a toll-free exclusion notice.
>
> Also add:
> - The same lead capture on the home page.
> - A quick-lead modal.
> - A 35-second valuation toast, shown once per session.
> - Sidebar CTAs.
> - A `marketplace.html` pricing page: free valuation, $88/mo featured listing, 8% brokered sale.
>
> Form transport is FormSubmit AJAX (free; one-time activation email). The `_replyto` header uses the visitor's email.

## Phase 4 — Authority content
> Build these pages:
> - **`records.html`** — a sortable, filterable Hall of Records with a Dataset schema. Every row is sourced. Include:
>   - Plates: P 7 (AED 55M, 2023); Abu Dhabi "1" (AED 52.2M, 2008); AA 9; AA 8; D 5; HK W (HK$26M, 2021); R; 28; 18; 88; UK F 1; 25 O; X 1.
>   - Phone numbers: 050-7777777 (AED 7.82M, 2014); 054-8888888 (AED 2.3M, 2023); the Beijing five-8 number (¥2.25M, 2020); 8888-8888 (¥2.33M, 2003).
>   - The FCC 833 auction (Dec 2019: 1,659 numbers bid on; $285,075 owed).
> - **`the-8988888-story.html`** — the flagship explainer: reading, 8, 9, five 8s and no 4, world cultures, economics (Fortin 2014 +2.5%/−2.2%; Ng et al. 2010 +134.8%/+97.4%), diaspora markets, and the maths (2³×3×374,537).
> - **8 guides:** number meanings, toll-free & vanity, plate auctions, premium mobile numbers, lucky-number economics, numeric domains, choosing a business phone number (high-CPC), and the Lunar New Year 2027 calendar.
>
> Every guide needs Article, FAQ and Breadcrumb schema, a sources list and related links.

## Phase 5 — Monetisation layer
> Write `assets/js/config.js` as the single settings file: AdSense client and slot ids, GA4, YouTube channel and videos, donation links, fundraising goal, affiliate links and the form relay.
>
> **Ads:**
> - Placements: top, inContent, sidebar and footer.
> - Before approval, the slots show rotating house ads.
> - After approval, set `adsenseClient` and they switch to AdSense.
> - Serve non-personalised ads until the visitor consents to cookies.
> - Ship `ads.txt` as a template.
>
> **Video hub:** lite-YouTube facades for configured ids, and curated search playlists as the fallback.

## Phase 6 — Community, donations, contests, hiring, advertising
> Build these pages:
> - **`donate.html`** — goal bar, tiers ($8/$28/$88/$888), six payment buttons (PayPal, Stripe, Ko-fi, BMC, Patreon, crypto) and a pledge form. Show the allocation: operations, promotion/marketing, hiring, contest prizes.
> - **`contests.html`** — the monthly 8888 Challenge: countdown, prizes ($888/$288/$88), upcoming contests, rules, entry form and Event schema.
> - **`careers.html`** — six roles with JobPosting schema and an application form.
> - **`advertise.html`** — rate card (tool sponsor $888/mo, category partner $1,888/mo, contest sponsor $588) and a media-kit form.

## Phase 7 — Trust, legal, SEO
> - Write `legal.html` with: trademark disclosure (no claim in "8988888"; no affiliation with any company or carrier using it), copyright disclosure and DMCA route, affiliate disclosure, FCC regulatory notice, cultural notice, and domain enquiries routed to web.works/contact.
> - Write `privacy.html` (AdSense cookie wording, GDPR/CCPA/PIPEDA rights), `terms.html` (including contest terms), `faq.html`, `methodology.html`, `about.html`, `contact.html` and `404.html` (`permalink: /404.html`).
> - Add Organization and WebSite JSON-LD sitewide, canonical URLs to https://8988888.com, OG image, manifest, `robots.txt` and `sitemap.xml`.

## Phase 8 — QA & deploy
> **QA:**
> - Playwright: zero console errors on all pages; working tools; prefilled forms; no horizontal scroll at 390 px; light and dark themes both work.
> - Grep the repo to confirm the inbox address never appears in plain text.
>
> **Deploy:**
> - Push to `webworksa1/8988888-com` on both `main` and `gh-pages`.
> - Pages builds and serves the `gh-pages` branch with Jekyll.
> - Custom domain: add a `CNAME` file containing `8988888.com` and set `baseurl: ""` in `_config.yml`, then add DNS A records 185.199.108–111.153 and `www` CNAME → `webworksa1.github.io`, then Enforce HTTPS.

## Phase 9 — Growth (after launch)
> 1. Submit the sitemap to Search Console and apply for AdSense.
> 2. Sign up for VoIP affiliate programmes and paste the links into `config.affiliates`.
> 3. Publish 2 guides a week. Topics: "most expensive plates [year]", "[city] lucky phone numbers", "vanity numbers for [industry]".
> 4. Turn records into YouTube Shorts.
> 5. Pitch the embeddable tools to plate dealers and realtors for backlinks.
> 6. Add a Chinese (zh-Hans) mirror of the top 10 pages.
