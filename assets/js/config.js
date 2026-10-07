/* =========================================================
   8988888.com — SITE SETTINGS (the only file you need to edit)
   ========================================================= */
window.SITE = {
  name: "8988888 · The Premium Number Exchange",
  domain: "8988888.com",
  partnerContact: "https://web.works/contact",

  /* Google AdSense — paste your publisher id after approval, e.g. "ca-pub-1234567890123456".
     Empty = slots show house ads (they promote the concierge / advertise pages). */
  adsenseClient: "",
  adSlots: { top: "", inContent: "", sidebar: "", footer: "" },

  /* Google Analytics 4 — e.g. "G-XXXXXXXXXX" (loads only after cookie consent) */
  ga4: "",

  /* YouTube — your channel URL and the video ids to embed on /videos.html and the home page.
     Empty list = curated topic cards that open YouTube searches. */
  youtubeChannel: "https://www.youtube.com/results?search_query=lucky+number+auction",
  videos: [
    // { id: "VIDEO_ID", title: "World's most expensive licence plates", topic: "plates" },
  ],

  /* Donation / support links. Empty = buttons open the pledge form instead. */
  donate: { paypal: "", stripe: "", kofi: "", buymeacoffee: "", patreon: "", crypto: "" },
  fundraising: { label: "Q4 2026 operations & growth fund", raised: 0, goal: 8888, currency: "USD" },

  /* Affiliate links for business phone providers (leave empty to hide the "visit" buttons). */
  affiliates: { provider1: "", provider2: "", provider3: "", domains: "" },

  /* Form relay: FormSubmit (free, no backend). First live submission sends a one-time
     activation email to the site inbox — click "Activate Form" once. */
  formRelay: "https://formsubmit.co/ajax/"
};

/* Inbox routing — encoded; assembled only at submit time and never written to the page.
   Do NOT replace with a plain-text address. */
window.__r = [53,55,59,118,52,49,57,53,63,24,105,57,43,51,42,55,47,58,61,47];
