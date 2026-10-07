# 8988888.com — The Premium Number Exchange

**发久发发发发发 · Lasting prosperity.** This is a static website about lucky, vanity and premium numbers. It includes:

- 7 browser-based tools
- a sourced Hall of Records
- 9 guides
- a 3-desk lead-generation concierge (find a number, business phone quotes, valuation and listing)
- support pages: donations, contests, careers, advertising, and full legal disclosures

It is built for **GitHub Pages (free plan)** and needs no backend.

- Research and concept decision: [`RESEARCH.md`](RESEARCH.md)
- Phase-wise build prompts: [`BUILD-PROMPTS.md`](BUILD-PROMPTS.md)

## Structure (Jekyll, built automatically by GitHub Pages)
```
_layouts/default.html   shared shell: interest bar, header/mega-nav, footer, newsletter, consent, lead toast/modal, scripts
_includes/sidebar.html  shared article sidebar
_config.yml             baseurl (project path) + version (cache-busting)
*.html, tools/, guides/ one page per file: front matter (title, description, canonical) + page body
assets/css/style.css    design system (dark/light)
assets/js/config.js     ALL settings: AdSense, GA4, YouTube, donations, affiliates, form relay
assets/js/main.js       nav, theme, consent, ads, forms, tabs, countdowns, videos, records
assets/js/tools.js      number intelligence engine + 7 tools
assets/js/records.js    Hall of Records data (sourced)
sitemap.xml, robots.txt, ads.txt, site.webmanifest, 404.html
```
Links use `{{ site.baseurl }}/`, so the same files work on `webworksa1.github.io/8988888-com/` and on the custom domain.

## Publishing
GitHub Pages builds the `gh-pages` branch with Jekyll (free plan, no workflow needed). `main` mirrors it.
To add a page: copy any page, edit its front matter and body, link it from `_layouts/default.html` and add it to `sitemap.xml`.

## Go-live checklist
1. **Forms:** submit any form once on the live site. FormSubmit sends a one-time activation email to the site inbox; click **Activate Form** and every later submission is delivered. The inbox address is stored encoded in `config.js` and is never rendered on the site.
2. **AdSense:** apply using the live domain. Once approved, set `adsenseClient` and `adSlots` in `config.js`, then edit `ads.txt`.
3. **Donations, affiliates and YouTube:** paste your links and video ids into `config.js`.
4. **Custom domain:**
   1. Add a `CNAME` file containing `8988888.com` and set `baseurl: ""` in `_config.yml`.
   2. At your registrar, add `A @` records for 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, plus a `CNAME www` record pointing to `webworksa1.github.io`.
   3. Tick **Enforce HTTPS** in Settings → Pages.
5. **Search Console:** submit `sitemap.xml`.
6. **Social image:** upload a 1200×630 `assets/img/og.png` (referenced by the og:image tag).

## Legal
"8988888" is used as a numeral and as a domain name only. No trademark is claimed. See `legal.html`.
