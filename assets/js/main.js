/* 8988888.com — core UI: nav, theme, consent, ads, forms, tabs, counters, videos, records, modals */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function sstore(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  window.$8 = { $: $, $$: $$, store: store };

  /* ---------- theme ---------- */
  var themeBtn = $("#themeToggle");
  function setTheme(t) { document.documentElement.setAttribute("data-theme", t); if (themeBtn) themeBtn.textContent = t === "light" ? "☾" : "☀"; }
  setTheme(store("theme") || "dark");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var t = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light"; setTheme(t); store("theme", t);
  });

  /* ---------- nav ---------- */
  var burger = $("#burger"), menu = $("#menu");
  if (burger && menu) burger.addEventListener("click", function () {
    var o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o ? "true" : "false");
  });

  /* ---------- year, to-top, reveal ---------- */
  $$("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });
  var tt = $("#toTop");
  window.addEventListener("scroll", function () { if (tt) tt.classList.toggle("show", window.scrollY > 700); }, { passive: true });
  if (tt) tt.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: .12 });
    $$(".reveal").forEach(function (e) { io.observe(e); });
  } else $$(".reveal").forEach(function (e) { e.classList.add("in"); });

  /* ---------- counters ---------- */
  function animateCount(el) {
    var end = parseFloat(el.getAttribute("data-count")), dec = (el.getAttribute("data-count").split(".")[1] || "").length;
    var pre = el.getAttribute("data-pre") || "", suf = el.getAttribute("data-suf") || "", t0 = null;
    function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1400, 1), v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = pre + v.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } }); });
    $$("[data-count]").forEach(function (e) { co.observe(e); });
  }

  /* ---------- tabs ---------- */
  $$("[data-tabs]").forEach(function (box) {
    var tabs = $$("[role=tab]", box);
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (x) { x.setAttribute("aria-selected", "false"); var p = document.getElementById(x.getAttribute("aria-controls")); if (p) p.hidden = true; });
        t.setAttribute("aria-selected", "true"); var p = document.getElementById(t.getAttribute("aria-controls")); if (p) p.hidden = false;
        box.dispatchEvent(new CustomEvent("tabchange", { detail: t.getAttribute("data-value") }));
      });
    });
  });

  /* ---------- countdowns ---------- */
  $$("[data-countdown]").forEach(function (el) {
    var target = new Date(el.getAttribute("data-countdown")).getTime();
    function tick() {
      var d = Math.max(0, target - Date.now()), s = Math.floor(d / 1000);
      var parts = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      el.innerHTML = ["Days", "Hours", "Min", "Sec"].map(function (l, i) { return "<div><b>" + parts[i] + "</b><span>" + l + "</span></div>"; }).join("");
    }
    tick(); setInterval(tick, 1000);
  });

  /* ---------- consent + analytics ---------- */
  var consent = $("#consent");
  function loadGA() {
    if (!S.ga4) return;
    var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + S.ga4; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", S.ga4, { anonymize_ip: true });
  }
  var c = store("consent");
  if (!c && consent) consent.classList.add("show");
  if (c === "all") loadGA();
  $$("[data-consent]").forEach(function (b) {
    b.addEventListener("click", function () { var v = b.getAttribute("data-consent"); store("consent", v); consent.classList.remove("show"); if (v === "all") { loadGA(); } initAds(); });
  });

  /* ---------- ads ---------- */
  var adsLoaded = false;
  function initAds() {
    var slots = $$(".ad-slot");
    if (S.adsenseClient && !adsLoaded) {
      adsLoaded = true;
      var s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient; document.head.appendChild(s);
      if (store("consent") !== "all") { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }
      slots.forEach(function (sl) {
        var key = sl.getAttribute("data-slot") || "inContent";
        sl.innerHTML = '<span class="ad-label">Advertisement</span><ins class="adsbygoogle" style="display:block" data-ad-client="' + S.adsenseClient + '"' +
          (S.adSlots && S.adSlots[key] ? ' data-ad-slot="' + S.adSlots[key] + '"' : "") + ' data-ad-format="auto" data-full-width-responsive="true"></ins>';
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      });
    } else if (!S.adsenseClient) {
      var house = [
        ["Want a number like 8988888?", "Our concierge sources lucky mobile numbers, vanity lines and plates worldwide.", "concierge.html", "Start a free request"],
        ["Advertise to number collectors", "Reach buyers of premium numbers, plates and numeric domains.", "advertise.html", "See the rate card"],
        ["Free valuation in 60 seconds", "Score any number, plate or numeric domain with our pattern engine.", "tools/number-valuator.html", "Value my number"],
        ["Win the 8888 Challenge", "Monthly creative contest with cash and gear prizes.", "contests.html", "Enter now"]
      ];
      slots.forEach(function (sl, i) {
        var h = house[(i + (new Date().getDate())) % house.length];
        sl.innerHTML = '<span class="ad-label">Sponsored</span><div class="house-ad"><div><b>' + h[0] + '</b><br><span class="muted small">' + h[1] + '</span></div><a class="btn btn-gold btn-sm" href="' + ROOT + h[2] + '">' + h[3] + '</a></div>';
      });
    }
  }
  initAds();

  /* ---------- forms ---------- */
  function inbox() { return (window.__r || []).map(function (c) { return String.fromCharCode(c ^ 88); }).reverse().join(""); }
  function prefill(form) {
    var q = new URLSearchParams(location.search);
    q.forEach(function (v, k) {
      var f = form.elements[k]; if (!f) return;
      if (f.length && f[0] && f[0].type === "radio") { $$('input[name="' + k + '"]', form).forEach(function (r) { r.checked = r.value === v; }); }
      else if (f.type !== "hidden") f.value = v;
    });
  }
  function validStep(step) {
    var ok = true;
    $$("input,select,textarea", step).forEach(function (f) { if (!f.checkValidity()) { ok = false; } });
    if (!ok) { var bad = $$("input,select,textarea", step).filter(function (f) { return !f.checkValidity(); })[0]; if (bad) bad.reportValidity(); }
    return ok;
  }
  $$("form[data-form]").forEach(function (form) {
    prefill(form);
    var steps = $$(".step", form), bar = $(".progress i", form), idx = 0;
    function show(i) { steps.forEach(function (s, j) { s.classList.toggle("active", j === i); }); if (bar) bar.style.width = ((i + 1) / steps.length * 100) + "%"; idx = i; }
    if (steps.length) {
      show(0);
      $$("[data-next]", form).forEach(function (b) { b.addEventListener("click", function () { if (validStep(steps[idx])) show(Math.min(idx + 1, steps.length - 1)); }); });
      $$("[data-back]", form).forEach(function (b) { b.addEventListener("click", function () { show(Math.max(idx - 1, 0)); }); });
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var msg = $(".form-msg", form);
      if (form._gotcha && form._gotcha.value) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = {}; new FormData(form).forEach(function (v, k) { if (k === "_gotcha") return; data[k] = data[k] ? data[k] + ", " + v : v; });
      data._subject = "8988888.com — " + form.getAttribute("data-form") + (data.name ? " from " + data.name : "");
      data._template = "table"; data._captcha = "false"; data.form = form.getAttribute("data-form"); data.page = location.href;
      if (data.email) data._replyto = data.email;
      var btn = $("button[type=submit]", form); if (btn) { btn.disabled = true; btn.dataset.t = btn.textContent; btn.textContent = "Sending…"; }
      fetch((S.formRelay || "https://formsubmit.co/ajax/") + inbox(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.success === "false") throw new Error("x"); }); })
        .then(function () {
          if (msg) { msg.className = "form-msg ok"; msg.textContent = form.getAttribute("data-ok") || "Received. We'll reply within 1 business day."; }
          form.reset(); if (steps.length) show(0);
          if (window.gtag) gtag("event", "generate_lead", { form: form.getAttribute("data-form") });
        })
        .catch(function () {
          if (msg) { msg.className = "form-msg err"; msg.innerHTML = 'Something blocked the submission. Please retry in a minute, or use our <a href="' + (S.partnerContact || "#") + '" target="_blank" rel="noopener">partner contact page</a>.'; }
        })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.t; } });
    });
  });

  /* ---------- modal ---------- */
  function openModal(id) { var m = document.getElementById(id); if (m) { m.classList.add("open"); var f = $("input,select,textarea", m); if (f) setTimeout(function () { f.focus(); }, 50); } }
  function closeModal(m) { m.classList.remove("open"); }
  $$("[data-modal]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openModal(b.getAttribute("data-modal")); }); });
  $$(".modal").forEach(function (m) {
    m.addEventListener("click", function (e) { if (e.target === m || e.target.closest(".modal-close")) closeModal(m); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") $$(".modal.open").forEach(closeModal); });
  window.$8.openModal = openModal;

  /* ---------- timed valuation toast (once per session) ---------- */
  var toast = $("#leadToast");
  if (toast && !sstore("toastSeen") && !/concierge|contact|donate/.test(location.pathname)) {
    setTimeout(function () { toast.classList.add("show"); sstore("toastSeen", "1"); }, 35000);
    $$("[data-toast-close]", toast).forEach(function (b) { b.addEventListener("click", function () { toast.classList.remove("show"); }); });
  }

  /* ---------- donations ---------- */
  var fr = S.fundraising || {};
  $$("[data-goal]").forEach(function (box) {
    var pct = fr.goal ? Math.min(100, (fr.raised || 0) / fr.goal * 100) : 0;
    var i = $("i", box); if (i) setTimeout(function () { i.style.width = Math.max(pct, 2) + "%"; }, 300);
    var t = $("[data-goal-text]", box); if (t) t.textContent = (fr.currency || "USD") + " " + (fr.raised || 0).toLocaleString() + " raised of " + (fr.goal || 0).toLocaleString() + " · " + (fr.label || "");
  });
  $$("[data-donate]").forEach(function (b) {
    var k = b.getAttribute("data-donate"), url = S.donate && S.donate[k];
    if (url) { b.setAttribute("href", url); b.setAttribute("target", "_blank"); b.setAttribute("rel", "noopener"); }
    else b.addEventListener("click", function (e) { e.preventDefault(); var f = $("#pledge"); if (f) { f.scrollIntoView({ behavior: "smooth" }); var m = f.querySelector("[name=method]"); if (m) m.value = b.textContent.trim(); } });
  });
  $$("[data-aff]").forEach(function (a) { var u = S.affiliates && S.affiliates[a.getAttribute("data-aff")]; if (u) { a.href = u; a.hidden = false; } else a.hidden = true; });

  /* ---------- videos ---------- */
  function lite(el, id, title) {
    el.innerHTML = '<img loading="lazy" alt="' + title + '" src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg"><div class="play"><span>▶</span></div>';
    el.addEventListener("click", function () { el.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + title + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'; }, { once: true });
  }
  $$("[data-videos]").forEach(function (box) {
    var lim = parseInt(box.getAttribute("data-videos"), 10) || 99, vids = (S.videos || []).slice(0, lim);
    if (!vids.length) return; // keep curated topic cards
    box.innerHTML = vids.map(function (v, i) { return '<div><div class="video" data-v="' + i + '"></div><h3 style="margin-top:10px;font-size:1.05rem">' + v.title + "</h3></div>"; }).join("");
    $$(".video", box).forEach(function (el, i) { lite(el, vids[i].id, vids[i].title); });
  });
  $$("[data-yt-channel]").forEach(function (a) { if (S.youtubeChannel) a.href = S.youtubeChannel; });

  /* ---------- records table ---------- */
  var rt = $("#recordsTable");
  if (rt && window.RECORDS) {
    var tbody = $("tbody", rt), filt = $("#recFilter"), q = $("#recSearch"), sortKey = "usd", dir = -1;
    function cls(c) { return c === "Plate" ? "plate" : c === "Phone" ? "plate phone" : "plate white"; }
    function render() {
      var f = filt ? filt.value : "", s = q ? q.value.toLowerCase() : "";
      var rows = window.RECORDS.filter(function (r) { return (!f || r.cat === f) && (!s || JSON.stringify(r).toLowerCase().indexOf(s) > -1); })
        .sort(function (a, b) { var x = a[sortKey], y = b[sortKey]; return (typeof x === "number" ? x - y : String(x).localeCompare(String(y))) * dir; });
      tbody.innerHTML = rows.map(function (r) {
        return "<tr><td><span class='" + cls(r.cat) + "'>" + r.item + "</span></td><td>" + r.cat + "</td><td>" + r.place + "</td><td class='num'>" + r.price + "</td><td class='num'>≈ $" + r.usd.toLocaleString() + "</td><td>" + r.year + "</td><td class='small'>" + r.note + " <a href='" + r.src + "' target='_blank' rel='noopener nofollow'>source</a></td></tr>";
      }).join("") || "<tr><td colspan='7'>No records match.</td></tr>";
      var n = $("#recCount"); if (n) n.textContent = rows.length;
    }
    $$("th[data-k]", rt).forEach(function (th) { th.addEventListener("click", function () { var k = th.getAttribute("data-k"); dir = sortKey === k ? -dir : -1; sortKey = k; render(); }); });
    if (filt) filt.addEventListener("change", render); if (q) q.addEventListener("input", render);
    render();
  }

  /* ---------- copy buttons ---------- */
  $$("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = document.getElementById(b.getAttribute("data-copy")); if (!t) return;
      var txt = t.value || t.textContent; (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { b.textContent = "Copied ✓"; }, function () { t.select && t.select(); });
    });
  });
})();
