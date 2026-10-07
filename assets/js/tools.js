/* 8988888.com — Number Intelligence Engine + tool UIs (runs 100% in the browser; nothing is uploaded) */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var ROOT = document.documentElement.getAttribute("data-root") || "";

  /* ---------- knowledge base ---------- */
  var DIGITS = {
    "0": { py: "líng", tone: "s", m: "Wholeness, a clean start (零 / 灵)" },
    "1": { py: "yī", tone: "s", m: "Unity, 'must' (要 yào in 168/518)" },
    "2": { py: "èr", tone: "g", m: "Pairs & harmony — 'easy' (易) in Cantonese" },
    "3": { py: "sān", tone: "g", m: "Life & growth — sounds like 生 (birth) in Cantonese" },
    "4": { py: "sì", tone: "b", m: "Avoided — sounds like 死 (death)" },
    "5": { py: "wǔ", tone: "s", m: "Self (吾 'I/me') — neutral; 'nothing' (无) in some combos" },
    "6": { py: "liù", tone: "g", m: "Smooth flow (流) — 六六大顺 'everything goes smoothly'" },
    "7": { py: "qī", tone: "s", m: "Rise / togetherness (起 / 齐); lucky in Western culture" },
    "8": { py: "bā", tone: "g", m: "Prosperity — rhymes with 发 fā (to get rich)" },
    "9": { py: "jiǔ", tone: "g", m: "Longevity — sounds like 久 (long-lasting); imperial number" }
  };
  var W = { "0": 1, "1": 1, "2": 2, "3": 2, "4": -9, "5": -1, "6": 5, "7": 1, "8": 8, "9": 5 };
  var COMBOS = [
    ["8888", 1, "四季发财 — prosperity in all four seasons"], ["888", 1, "Triple prosperity — wealth upon wealth"], ["88", 1, "Double fortune (双发)"],
    ["89", 1, "发久 — prosperity that lasts"], ["98", 1, "久发 — long-lasting fortune"], ["99", 1, "久久 — forever, eternal"],
    ["168", 1, "一路发 — prosperity all the way"], ["518", 1, "我要发 — I will prosper"], ["528", 1, "我易发 — I prosper easily"],
    ["666", 1, "六六大顺 — everything goes smoothly"], ["66", 1, "顺顺 — smooth and easy"], ["68", 1, "路发 — road to riches"],
    ["28", 1, "易发 — easy fortune (Cantonese)"], ["58", 1, "吾发 — I prosper"], ["1314", 1, "一生一世 — a lifetime (love)"],
    ["520", 1, "我爱你 — 'I love you'"], ["9999", 1, "Eternity — ultimate longevity"], ["369", 1, "3-6-9 ascending fortune"],
    ["14", -1, "要死 — sounds like 'must die'"], ["74", -1, "气死 — 'angry to death'"], ["94", -1, "久死 — 'long death'"],
    ["54", -1, "吾死 — 'I die'"], ["44", -1, "Double death — strongly avoided"], ["250", -1, "二百五 — slang for 'fool'"],
    ["38", -1, "三八 — unflattering slang (gossip)"], ["13", -1, "Unlucky in Western cultures"]
  ];
  var BANDS = {
    mobile: ["< $50", "$50 – $500", "$500 – $5,000", "$5,000 – $50,000", "$50,000+ (auction-grade)"],
    plate: ["< $500", "$500 – $5,000", "$5,000 – $50,000", "$50,000 – $500,000", "$500,000+ (record territory)"],
    domain: ["< $1,000", "$1,000 – $5,000", "$5,000 – $25,000", "$25,000 – $250,000", "$250,000+"],
    tollfree: ["n/a", "n/a", "n/a", "n/a", "n/a"],
    price: ["", "", "", "", ""]
  };
  var TIERS = ["Standard", "Silver", "Gold", "Platinum", "Legendary"];

  function onlyDigits(s) { return String(s || "").replace(/\D/g, ""); }
  function maxRun(d) { var m = d ? 1 : 0, c = 1; for (var i = 1; i < d.length; i++) { c = d[i] === d[i - 1] ? c + 1 : 1; if (c > m) m = c; } return m; }
  function ladder(d) { var best = 1, up = 1, dn = 1; for (var i = 1; i < d.length; i++) { up = (+d[i] === +d[i - 1] + 1) ? up + 1 : 1; dn = (+d[i] === +d[i - 1] - 1) ? dn + 1 : 1; best = Math.max(best, up, dn); } return best; }
  function periodic(d) { for (var p = 2; p <= 4; p++) { if (d.length >= p * 2 && d.length % p === 0) { var u = d.slice(0, p); if (u.split("").some(function (x) { return x !== u[0]; }) && d === new Array(d.length / p + 1).join(u)) return u; } } return null; }

  function analyze(raw, type) {
    type = type || "mobile";
    var d = onlyDigits(raw), L = d.length;
    if (!L) return null;
    var counts = {}; d.split("").forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    var u = Object.keys(counts).length, r = maxRun(d), lad = ladder(d), per = periodic(d);
    var pal = L >= 4 && d === d.split("").reverse().join("");
    var dom = Math.max.apply(null, Object.keys(counts).map(function (k) { return counts[k]; }));
    /* luck */
    var sum = 0; d.split("").forEach(function (x) { sum += W[x]; });
    var luck = 50 + (sum / L) * 6, found = [];
    COMBOS.forEach(function (c) { if (d.indexOf(c[0]) > -1) found.push(c); });
    // drop sub-combos fully covered by bigger ones of same sign
    found = found.filter(function (c) { return !found.some(function (o) { return o !== c && o[1] === c[1] && o[0].length > c[0].length && o[0].indexOf(c[0]) > -1; }); });
    found.forEach(function (c) { luck += c[1] > 0 ? 4 : -7; });
    luck = Math.round(Math.max(1, Math.min(99, luck)));
    /* rarity */
    var pats = [], rar = 0;
    if (r >= 3) { rar += (r - 2) * 12; pats.push(r + "× repeating " + d[d.search(new RegExp("(\\d)\\1{" + (r - 1) + "}"))]); }
    if (r === L && L > 1) { rar += 30; pats.push("Solid — every digit identical"); }
    else if (dom >= L - 1 && L >= 4) { rar += 12; pats.push("Near-solid — one odd digit out"); }
    rar += Math.max(0, L - u) * 5; if (u <= 2 && L >= 4) pats.push("Only " + u + " distinct digit" + (u > 1 ? "s" : ""));
    if (pal) { rar += 10; pats.push("Mirror / palindrome"); }
    if (lad >= 4) { rar += (lad - 3) * 8; pats.push(lad + "-step ladder (sequential)"); }
    if (per) { rar += 12; pats.push("Repeating block “" + per + "”"); }
    rar += (counts["8"] || 0) / L * 15; if ((counts["8"] || 0) >= 3) pats.push((counts["8"]) + "× eight");
    if (counts["4"]) { rar -= 10; pats.push("Contains 4 (discounted in Chinese markets)"); } else if (L >= 3) pats.push("Free of 4s");
    if (type === "plate") rar += L <= 1 ? 60 : L === 2 ? 40 : L === 3 ? 20 : 0;
    if (type === "domain") rar += L <= 2 ? 70 : L === 3 ? 45 : L === 4 ? 30 : L === 5 ? 15 : L === 6 ? 5 : -5;
    rar = Math.round(Math.max(0, Math.min(100, rar)));
    var t = rar >= 85 ? 4 : rar >= 65 ? 3 : rar >= 45 ? 2 : rar >= 25 ? 1 : 0;
    return { d: d, L: L, luck: luck, rarity: rar, tier: t, tierName: TIERS[t], band: (BANDS[type] || BANDS.mobile)[t], combos: found, patterns: pats, counts: counts, type: type };
  }
  window.N8 = { analyze: analyze, DIGITS: DIGITS };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function digitsHTML(d) { return '<div class="digits">' + d.split("").map(function (x) { var k = DIGITS[x]; return '<div class="digit ' + k.tone + '" title="' + esc(k.m) + '">' + x + "<small>" + k.py + "</small></div>"; }).join("") + "</div>"; }
  function chips(a) { return '<div class="chips">' + a.join("") + "</div>"; }
  function report(a, raw) {
    if (!a) return '<p class="muted">Enter at least one digit.</p>';
    var tf = a.type === "tollfree";
    var h = '<div class="result-head"><div class="score-ring" style="--p:' + a.luck + '"><div><span><b>' + a.luck + '</b><br><span class="small muted">Luck score</span></span></div></div>' +
      '<div style="flex:1;min-width:220px"><h3 style="margin:0">' + esc(raw) + '</h3>' +
      (tf ? '<p class="muted" style="margin:.3em 0">Memorability rarity: <b>' + a.rarity + '/100</b> · ' + a.tierName + '</p><p class="small">US & Canadian toll-free numbers cannot be bought or sold (FCC 47 CFR §52.107). Use a Responsible Organization (RespOrg) to reserve one — our concierge can route you.</p>'
        : (a.type === "price" ? '<p class="muted" style="margin:.3em 0">Rarity ' + a.rarity + '/100 · ' + a.tierName + ' pattern</p>' :
        '<p style="margin:.3em 0"><span class="badge gold">' + a.tierName + '</span> &nbsp;Rarity <b>' + a.rarity + '/100</b></p><p class="muted small" style="margin:0">Indicative market band: <b>' + a.band + '</b> — illustrative, not an appraisal. Real prices depend on market, rules and demand.</p>')) +
      "</div></div>";
    h += digitsHTML(a.d);
    var c = a.combos.map(function (x) { return '<span class="chip ' + (x[1] > 0 ? "good" : "bad") + '"><b>' + x[0] + "</b> " + esc(x[2]) + "</span>"; });
    h += "<h4 style='margin:14px 0 8px'>Meaningful combinations</h4>" + (c.length ? chips(c) : '<p class="muted small">No classic combinations detected.</p>');
    h += "<h4 style='margin:14px 0 8px'>Patterns detected</h4>" + (a.patterns.length ? chips(a.patterns.map(function (p) { return '<span class="chip ' + (/Contains 4/.test(p) ? "bad" : "gold") + '">' + esc(p) + "</span>"; })) : '<p class="muted small">No rare patterns — a standard number.</p>');
    var q = "?type=" + encodeURIComponent(a.type) + "&number=" + encodeURIComponent(raw);
    h += '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><a class="btn btn-gold" href="' + ROOT + 'concierge.html' + q + '#find">Find me a number like this</a>' +
      (tf ? "" : '<a class="btn btn-ghost" href="' + ROOT + 'concierge.html' + q + '&asset=' + encodeURIComponent(a.type) + '#sell">I own this — get a free valuation</a>') + "</div>";
    return h;
  }
  window.N8.report = report;

  /* ---------- universal analyzer (home + luck scorer + valuator) ---------- */
  document.querySelectorAll("[data-analyzer]").forEach(function (box) {
    var input = $("input", box), out = $(".result", box), type = box.getAttribute("data-type") || "mobile";
    box.addEventListener("tabchange", function (e) { type = e.detail; input.placeholder = { mobile: "e.g. 138 8988 8888", tollfree: "e.g. 1-888-898-8888", plate: "e.g. 88 or AB 8988", domain: "e.g. 8988888.com", price: "e.g. 1,888,000" }[type] || ""; if (input.value) run(); });
    function run() { var v = input.value.trim(); if (!v) return; out.innerHTML = report(analyze(v, type), v); out.classList.add("show"); }
    var f = $("form", box); if (f) f.addEventListener("submit", function (e) { e.preventDefault(); run(); });
    var t; input.addEventListener("input", function () { clearTimeout(t); t = setTimeout(function () { if (input.value.trim().length >= 2) run(); }, 400); });
    if (box.hasAttribute("data-autorun")) run();
  });

  /* ---------- vanity converter ---------- */
  var KEY = { a: 2, b: 2, c: 2, d: 3, e: 3, f: 3, g: 4, h: 4, i: 4, j: 5, k: 5, l: 5, m: 6, n: 6, o: 6, p: 7, q: 7, r: 7, s: 7, t: 8, u: 8, v: 8, w: 9, x: 9, y: 9, z: 9 };
  var WORDS = ("ace act add ads age aid air all app art ask auto baby back bags bake bank bar base bath beam bean bear beds beer best bet big bike bill bird bit blue boat body bond book boom boss box boy brew buy buzz cab cafe cake call cam camp can car card care cars case cash cat chef chip city clean club coach code coin cold cook cool cop copy cost crew cure cut dad data date day deal deck deli dent desk diet dig dine dish doc dog doll door dot draw dream drink drive dry duck easy eat eco eggs elite energy euro event expo eye face fact fair fame fan farm fast fat fee feet file film find fine fire firm fish fit fix flag flat flex flip flow fly food foot form fort free fresh fun fund gain game gas gear gem gift glow go goal gold golf good grab grow guru gym hair hand hat heal health heat help hero high hike hire home hope host hot hub hunt idea inc info ink iron jazz jet job join joy jump just keep key kids king kit lab lady lamp land law lawn lead learn legal life lift light like line link list live loan local lock logo look loop love luck lucky mail main make man map mart max meal media meet menu mind mint mix mobile mom money moon more motor move movie music nail name net new news next nice ninja note nurse oil one open order pack page paint park part party pass pay peak pen pet phone photo pie pizza plan play plus point pool post power pro prime print pure quick race radio rate real rent repair rest rich ride ring road rock roof room rose rush safe sale salon save school sell send serve shop show sign silk site skin sky smart smile snap soap sofa solar soul spa spark speed spin star stay steel stop store study style sun sure swim taxi tea team tech tell tent test text tile time tire today tool top tour town toys trade travel tree trip truck true trust tutor van vape vet view villa vip visa vote walk wall want wash watch water wave way wear web well wifi win wine wise wood work world yes yoga you zen zone flowers contact lawyer lawyers plumber dentist doctor realtor homes movers moving roofing clinic credit cars4u autos towing repairs cleaner cleaners florist hotel hotels tickets travel cruise rental rentals pharmacy vision glasses tires insure insurance legal injury attorney taxes refund loans mortgage invest wealth fortune prosper golden dragon lucky8 happy jade tiger noodle noodles dumpling sushi coffee bakery salons beauty spa nails massage fitness tutor tutors school college career jobs hiring staff shipping cargo freight export import trade traders market markets mall shopping deals sale sales offer gold silver diamond jewel jewelry watches phones mobile domains numbers plates premium vanity").split(" ").filter(function (w) { return /^[a-z]+$/.test(w); });
  var WMAP = {}; WORDS.forEach(function (w) { var k = w.split("").map(function (c) { return KEY[c]; }).join(""); (WMAP[k] = WMAP[k] || []).push(w.toUpperCase()); });
  window.N8.lettersToDigits = function (s) { return String(s).replace(/[a-z]/gi, function (c) { return KEY[c.toLowerCase()]; }); };
  window.N8.findWords = function (d) {
    var res = [];
    for (var len = 7; len >= 3; len--) for (var i = 0; i + len <= d.length; i++) { var k = d.substr(i, len); if (WMAP[k]) WMAP[k].forEach(function (w) { res.push({ w: w, i: i, len: len }); }); }
    return res.slice(0, 60);
  };
  var vc = $("#vanityTool");
  if (vc) {
    var l2d = $("#v-letters"), d2w = $("#v-digits"), o1 = $("#v-out1"), o2 = $("#v-out2");
    l2d.addEventListener("input", function () {
      var v = l2d.value; if (!v.trim()) { o1.innerHTML = ""; return; }
      var conv = window.N8.lettersToDigits(v.toUpperCase()), digits = onlyDigits(conv);
      o1.innerHTML = '<p>Dials as: <b class="mono" id="v-conv" style="font-size:1.4rem">' + esc(conv) + '</b> <button class="btn btn-ghost btn-sm" data-copy="v-conv" type="button">Copy</button></p><p class="small muted">' + digits.length + ' digits. ' +
        (digits.length > 7 ? "North American numbers use 7 digits after the area code — letters past the 7th are optional extras the caller may dial." : "") + "</p>" +
        '<a class="btn btn-gold btn-sm" href="' + ROOT + 'concierge.html?type=tollfree&number=' + encodeURIComponent(v) + '#find">Check availability via concierge</a>';
    });
    d2w.addEventListener("input", function () {
      var d = onlyDigits(d2w.value); if (d.length < 3) { o2.innerHTML = '<p class="muted small">Type at least 3 digits.</p>'; return; }
      var m = window.N8.findWords(d);
      if (!m.length) { o2.innerHTML = '<p class="muted">No dictionary words found in ' + d + '. Digits 0 and 1 carry no letters — try a different ending.</p>'; return; }
      o2.innerHTML = '<p class="small muted">' + m.length + " word match" + (m.length > 1 ? "es" : "") + " (best first):</p>" + chips(m.map(function (x) {
        return '<span class="chip gold mono">' + d.slice(0, x.i) + "<b>" + x.w + "</b>" + d.slice(x.i + x.len) + "</span>";
      }));
    });
  }

  /* ---------- lucky price generator ---------- */
  var lp = $("#priceTool");
  if (lp) {
    lp.addEventListener("submit", function (e) {
      e.preventDefault();
      var target = parseFloat(String($("#p-amount").value).replace(/[^0-9.]/g, "")), cur = $("#p-cur").value, mode = $("#p-mode").value, out = $("#p-out");
      if (!target || target < 1) { out.innerHTML = "<p class='muted'>Enter a price above 1.</p>"; return; }
      var mag = Math.pow(10, Math.max(0, Math.floor(Math.log10(target)) - 2)), cands = {};
      var ends = { prosper: ["8", "88", "888", "8888"], route: ["168", "1688", "518", "5188", "68", "688"], smooth: ["66", "666", "6688", "698"], lasting: ["99", "999", "89", "98", "988"] }[mode] || ["8"];
      [mag / 10, mag, mag * 10].forEach(function (unit) {
        if (unit < 1) unit = 1;
        ends.forEach(function (e) {
          var scale = Math.pow(10, e.length) * unit, base = Math.floor(target / scale) * scale;
          [base - scale, base, base + scale].forEach(function (b) { var v = b + parseInt(e, 10) * unit; if (v > 0 && Math.abs(v - target) / target < 0.12) cands[v] = 1; });
        });
      });
      var list = Object.keys(cands).map(Number).filter(function (v) { return String(Math.round(v)).indexOf("4") === -1; })
        .map(function (v) { var a = analyze(String(Math.round(v)), "price"); return { v: Math.round(v), diff: (v - target) / target * 100, luck: a.luck, combos: a.combos }; })
        .sort(function (a, b) { return (b.luck - Math.abs(b.diff) * 2) - (a.luck - Math.abs(a.diff) * 2); }).slice(0, 8);
      var warn = String(Math.round(target)).indexOf("4") > -1 ? '<div class="callout warn small">Your target contains a 4 — in Chinese markets this can depress perceived value (studies of Vancouver housing found a ~2.2% discount on addresses ending in 4).</div>' : "";
      out.innerHTML = warn + '<div class="table-wrap"><table><thead><tr><th>Lucky price</th><th>vs target</th><th>Luck</th><th>Meaning</th></tr></thead><tbody>' + list.map(function (x) {
        return "<tr><td class='num'><b>" + cur + " " + x.v.toLocaleString() + "</b></td><td class='num'>" + (x.diff >= 0 ? "+" : "") + x.diff.toFixed(2) + "%</td><td class='num'>" + x.luck + "</td><td class='small'>" + (x.combos.filter(function (c) { return c[1] > 0; }).slice(0, 2).map(function (c) { return c[2]; }).join("; ") || "Prosperous digits") + "</td></tr>";
      }).join("") + "</tbody></table></div>";
    });
  }

  /* ---------- hongbao (red envelope) guide ---------- */
  var hb = $("#hongbaoTool");
  if (hb) {
    var BASE = { wedding: [250, 160, 110, 80, 130], cny_child: [40, 20, 15, 10, 10], cny_staff: [0, 0, 0, 0, 0], birthday: [120, 70, 50, 35, 60], baby: [120, 80, 50, 35, 60], opening: [200, 120, 90, 60, 150], graduation: [150, 80, 50, 30, 40] };
    var FX = { USD: [1, "$"], CAD: [1.38, "C$"], CNY: [7.1, "¥"], HKD: [7.8, "HK$"], SGD: [1.29, "S$"], MYR: [4.2, "RM"], GBP: [0.76, "£"], AUD: [1.52, "A$"] };
    var LADDER = [8, 16, 18, 28, 38, 66, 68, 88, 128, 168, 188, 200, 288, 300, 388, 500, 520, 588, 600, 666, 688, 800, 888, 999, 1000, 1088, 1288, 1314, 1688, 1888, 2000, 2888, 3888, 5200, 5888, 6666, 6888, 8888, 9999, 10888, 13140, 16888, 18888, 28888];
    hb.addEventListener("submit", function (e) {
      e.preventDefault();
      var occ = $("#h-occ").value, rel = +$("#h-rel").value, cur = $("#h-cur").value, out = $("#h-out");
      if (occ === "cny_staff") { out.innerHTML = "<div class='callout tip'><b>Employee red packets</b> are usually a token (one or two lucky banknotes) or tied to salary — a common rule is an extra 2–8% of monthly pay as a year-end bonus, delivered in a red envelope. Use even, 4-free figures such as 88, 188 or 888 in local currency.</div>"; return; }
      var usd = BASE[occ][rel] * FX[cur][0], pool = LADDER.filter(function (v) { return occ === "wedding" || (v !== 520 && v !== 1314 && v !== 5200 && v !== 13140); });
      var best = pool.reduce(function (a, b) { return Math.abs(Math.log(b / usd)) < Math.abs(Math.log(a / usd)) ? b : a; });
      var i = pool.indexOf(best), lo = pool[Math.max(0, i - 1)], hi = pool[Math.min(pool.length - 1, i + 1)], s = FX[cur][1];
      out.innerHTML = "<div class='card' style='text-align:center'><p class='muted' style='margin:0'>Suggested amount</p><div class='big-number gold' style='font-size:3rem'>" + s + best.toLocaleString() + "</div><p class='muted small'>Modest option " + s + lo.toLocaleString() + " · Generous option " + s + hi.toLocaleString() + "</p></div>" +
        "<ul class='list-check small' style='margin-top:14px'><li>Use crisp new notes and even amounts; avoid any 4.</li><li>" + (occ === "wedding" ? "Weddings: 520 / 1314 / 5200 (\"I love you\", \"a lifetime\") are popular in Mainland China; HK guests often match the banquet cost per head." : "Hand the envelope with both hands; don't open it in front of the giver.") + "</li><li>Etiquette varies by family and region — treat this as a starting point.</li></ul>";
    });
  }

  /* ---------- plate builder ---------- */
  var pb = $("#plateTool");
  if (pb) {
    var pt = $("#pl-text"), ps = $("#pl-style"), pv = $("#pl-preview"), po = $("#pl-out");
    function draw() {
      var t = (pt.value || "8988").toUpperCase().replace(/[^A-Z0-9 ]/g, "").slice(0, 8);
      pv.className = "plate-xl " + ps.value; pv.textContent = t || "8988";
      var a = analyze(t, "plate");
      po.innerHTML = a ? report(a, t) : "<p class='muted small'>Letter-only marks carry no digit luck — their value is in shortness and initials. Single letters are the rarest tier.</p>";
    }
    pt.addEventListener("input", draw); ps.addEventListener("change", draw); draw();
  }

  /* ---------- lucky number finder ---------- */
  var nf = $("#finderTool");
  if (nf) {
    nf.addEventListener("submit", function (e) {
      e.preventDefault();
      var pre = onlyDigits($("#f-prefix").value), len = +$("#f-len").value, out = $("#f-out");
      var need = len - pre.length; if (need < 2) { out.innerHTML = "<p class='muted'>Total length must be at least 2 digits longer than the prefix.</p>"; return; }
      var seeds = ["8", "9", "6", "88", "89", "98", "168", "518", "688", "888", "8988", "9888", "6688", "1688", "5188", "8899", "8889", "2888", "3888", "6888", "9999", "8668", "1314"];
      var set = {};
      seeds.forEach(function (s) {
        var fill = function (ch) { var x = s; while (x.length < need) x = ch + x; return x.slice(-need); };
        ["8", "6", "9"].forEach(function (ch) { set[fill(ch)] = 1; });
        var y = s; while (y.length < need) y += s; set[y.slice(0, need)] = 1;
      });
      var list = Object.keys(set).filter(function (x) { return x.length === need && x.indexOf("4") < 0; }).map(function (x) { var a = analyze(pre + x, "mobile"); return { n: pre + x, a: a }; })
        .sort(function (p, q) { return (q.a.luck + q.a.rarity) - (p.a.luck + p.a.rarity); }).slice(0, 15);
      out.innerHTML = '<div class="table-wrap"><table><thead><tr><th>Candidate</th><th>Luck</th><th>Rarity</th><th>Tier</th><th></th></tr></thead><tbody>' + list.map(function (x) {
        return "<tr><td><span class='plate phone'>" + x.n + "</span></td><td class='num'>" + x.a.luck + "</td><td class='num'>" + x.a.rarity + "</td><td>" + x.a.tierName + "</td><td><a class='btn btn-ghost btn-sm' href='" + ROOT + "concierge.html?type=mobile&number=" + x.n + "#find'>Check availability</a></td></tr>";
      }).join("") + "</tbody></table></div><p class='small muted' style='margin-top:10px'>Candidates are generated patterns, not live inventory. Availability depends on your carrier or registry — the concierge checks it for you.</p>";
    });
  }
})();
