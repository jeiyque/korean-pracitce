"use strict";

// ── Settings ─────────────────────────────────────────────
const SESSION_LEN = 12;
const FREE_LEN = 8;
const START_DATE = new Date(2026, 10, 22); // Sunday 22 Nov 2026: chapter 16 learned
const START_CHAPTER = 16;
const LAST_CHAPTER = CHAPTERS.length;

// ── Storage (each device keeps its own progress) ─────────
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem("kgp." + key); return v === null ? fallback : JSON.parse(v); }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("kgp." + key, JSON.stringify(value)); } catch { /* private mode */ }
  },
};

let stats = store.get("stats", {});        // id -> {c: correct, w: wrong, s: streak, last: 'r'|'w'}
let selection = store.get("selection", "all"); // "all" | chapter number | "mistakes"

function autoLearned() {
  const days = Math.floor((Date.now() - START_DATE.getTime()) / 86400000);
  return Math.max(1, Math.min(LAST_CHAPTER, START_CHAPTER + Math.floor(days / 7)));
}
function learnedThrough() {
  const manual = store.get("learned", "auto");
  return manual === "auto" ? autoLearned() : manual;
}
function nextUnlockText() {
  const n = learnedThrough();
  if (n >= LAST_CHAPTER) return "All 20 chapters are unlocked.";
  if (store.get("learned", "auto") !== "auto") return `Chapters 1–${n} unlocked (set by you).`;
  return `Chapter ${n + 1} unlocks on Sunday.`;
}

// ── Helpers ──────────────────────────────────────────────
const $app = document.getElementById("app");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = (s) => String(s).normalize("NFC").replace(/[\s.,!?·~]/g, "").trim();
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const chapter = (n) => CHAPTERS.find((c) => c.n === n);

function poolFor(sel) {
  const max = learnedThrough();
  const unlocked = ITEMS.filter((it) => it.c <= max);
  const free = FREE.filter((it) => it.c <= max);
  if (sel === "all") return unlocked;
  if (sel === "free") return free;
  if (sel === "mistakes") return unlocked.concat(free).filter((it) => stats[it.id] && stats[it.id].last === "w");
  return unlocked.filter((it) => it.c === sel);
}

// Items you got wrong come back much more often; ones you keep getting right fade out.
function weight(it) {
  const s = stats[it.id];
  // later chapters come up more often in free translation
  const level = it.t === "free" ? 0.5 + it.c / 16 : 1;
  if (!s) return 3 * level;
  if (s.last === "w") return 8 * level;
  return Math.max(0.4, 3 - s.s) * level;
}
function pickSession(pool, n) {
  const chosen = [];
  const bag = pool.map((it) => ({ it, w: weight(it) }));
  while (chosen.length < n && bag.length) {
    const total = bag.reduce((t, b) => t + b.w, 0);
    let r = Math.random() * total, i = 0;
    while (i < bag.length - 1 && (r -= bag[i].w) > 0) i++;
    chosen.push(bag.splice(i, 1)[0].it);
  }
  return chosen;
}

function record(it, ok) {
  const s = stats[it.id] || { c: 0, w: 0, s: 0, last: null };
  if (ok) { s.c++; s.s++; s.last = "r"; } else { s.w++; s.s = 0; s.last = "w"; }
  stats[it.id] = s;
  store.set("stats", stats);
}

function selectionLabel(sel) {
  if (sel === "all") return `Whole book (chapters 1–${learnedThrough()})`;
  if (sel === "mistakes") return "My mistakes";
  if (sel === "free") return "Free translation";
  const c = chapter(sel);
  return `Chapter ${c.n}: ${c.title}`;
}

// ── Home ─────────────────────────────────────────────────
function renderHome() {
  const max = learnedThrough();
  if (typeof selection === "number" && selection > max) selection = "all";
  const mistakes = poolFor("mistakes").length;
  if (selection === "mistakes" && !mistakes) selection = "all";
  const pool = poolFor(selection);

  $app.innerHTML = `
    <header>
      <h1>문법 연습</h1>
      <button class="icon-btn" id="statsBtn">Progress ›</button>
    </header>
    <p class="muted small" style="margin-top:0">세종학당 한국어 1 · ${esc(nextUnlockText())}</p>

    <h2>Free translation</h2>
    <button class="card free-card ${selection === "free" ? "sel" : ""}" data-sel="free">
      <b>English → Korean sentences</b>
      <div class="small muted">Write whole sentences yourself. Mixes every chapter you've learned, with a focus on verb endings (-고 싶어요, -아서, -으려고…). ${poolFor("free").length} sentences.</div>
    </button>

    <h2>Grammar drills</h2>
    <div class="row whole">
      <button class="btn secondary whole-btn ${selection === "all" ? "sel" : ""}" data-sel="all">Whole book</button>
      <button class="btn secondary whole-btn ${selection === "mistakes" ? "sel" : ""}" data-sel="mistakes" ${mistakes ? "" : "disabled"}>
        My mistakes${mistakes ? ` (${mistakes})` : ""}
      </button>
    </div>
    <div class="chapters">
      ${CHAPTERS.map((c) => {
        const locked = c.n > max;
        return `<button class="ch ${locked ? "locked" : ""} ${selection === c.n ? "sel" : ""}" data-ch="${c.n}" ${locked ? "disabled" : ""}>
          <b>${c.n}과</b><span>${locked ? "locked" : esc(c.grammar[0])}</span></button>`;
      }).join("")}
    </div>
    <div class="selinfo">
      <strong>${esc(selectionLabel(selection))}</strong>
      ${typeof selection === "number" ? `<div class="muted small">${esc(chapter(selection).grammar.join(" · "))}</div>` : ""}
    </div>
    <button class="btn" id="startBtn" ${pool.length ? "" : "disabled"}>Start · ${Math.min(selection === "free" ? FREE_LEN : SESSION_LEN, pool.length)} ${selection === "free" ? "sentences" : "questions"}</button>
  `;

  $app.querySelectorAll("[data-sel]").forEach((b) => b.onclick = () => { selection = b.dataset.sel; store.set("selection", selection); renderHome(); });
  $app.querySelectorAll("[data-ch]").forEach((b) => b.onclick = () => {
    if (b.disabled) return;
    selection = Number(b.dataset.ch); store.set("selection", selection); renderHome();
  });
  document.getElementById("startBtn").onclick = () => startSession(selection);
  document.getElementById("statsBtn").onclick = renderStats;
}

// ── Quiz ─────────────────────────────────────────────────
let session = null;

function startSession(sel) {
  const pool = poolFor(sel);
  const len = sel === "free" ? FREE_LEN : SESSION_LEN;
  const queue = pickSession(pool, Math.min(len, pool.length));
  session = { sel, queue, i: 0, right: 0, answered: 0, ids: new Set(), missed: [], retried: new Set() };
  renderQuestion();
}

function blankHtml(q, fill) {
  const parts = esc(q).split("___");
  const inner = fill === undefined ? "&nbsp;" : esc(fill === "(nothing)" ? "∅" : fill);
  return parts.join(`<span class="blank">${inner}</span>`);
}

function renderQuestion() {
  const it = session.queue[session.i];
  const total = session.queue.length;
  const c = chapter(it.c);
  const kinds = { mc: "Choose the right form", type: "Type the missing part", order: "Build the Korean sentence", free: "Translate into Korean" };

  $app.innerHTML = `
    <header>
      <button class="icon-btn" id="quitBtn">✕ Stop</button>
      <span class="muted small">${session.i + 1} / ${total}</span>
    </header>
    <div class="bar"><i style="width:${(session.i / total) * 100}%"></i></div>
    <div class="card">
      <div class="kind">${kinds[it.t]} · ${c.n}과</div>
      <div id="qbody"></div>
      <div id="fb"></div>
      <button class="btn hidden" id="nextBtn">Next</button>
    </div>
  `;
  document.getElementById("quitBtn").onclick = () => (session.answered ? renderResults() : renderHome());

  const body = document.getElementById("qbody");
  if (it.t === "mc") renderMC(it, body);
  else if (it.t === "type") renderType(it, body);
  else if (it.t === "free") renderFree(it, body);
  else renderOrder(it, body);
}

function renderMC(it, body) {
  body.innerHTML = `
    <div class="q" id="qtext">${blankHtml(it.q)}</div>
    <div class="opts">${shuffle(it.o).map((o) => `<button class="opt" data-o="${esc(o)}">${esc(o === "(nothing)" ? "— (nothing)" : o)}</button>`).join("")}</div>`;
  body.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
    const ok = b.dataset.o === it.a;
    body.querySelectorAll(".opt").forEach((x) => {
      x.disabled = true;
      if (x.dataset.o === it.a) x.classList.add("right");
    });
    if (!ok) b.classList.add("wrong");
    document.getElementById("qtext").innerHTML = blankHtml(it.q, it.a);
    answer(it, ok, it.a);
  });
}

function renderType(it, body) {
  body.innerHTML = `
    <div class="q" id="qtext">${blankHtml(it.q)}</div>
    <div class="hint">${esc(it.h || "")}</div>
    <form id="tf" autocomplete="off">
      <input class="answer" id="ans" lang="ko" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="한국어로 쓰세요">
      <button class="btn" id="checkBtn">Check</button>
    </form>`;
  const input = document.getElementById("ans");
  setTimeout(() => input.focus(), 50);
  document.getElementById("tf").onsubmit = (e) => {
    e.preventDefault();
    const v = norm(input.value);
    if (!v) return;
    const ok = it.a.some((a) => norm(a) === v);
    input.disabled = true;
    document.getElementById("checkBtn").classList.add("hidden");
    input.style.borderColor = ok ? "var(--good)" : "var(--bad)";
    document.getElementById("qtext").innerHTML = blankHtml(it.q, it.a[0]);
    answer(it, ok, it.a.join(" / "));
  };
}

function renderOrder(it, body) {
  const words = it.ko.replace(/[.?!]+$/, "").split(" ");
  let tiles = words.map((w, i) => ({ w, i }));
  // make sure the tiles don't start in the right order
  for (let tries = 0; tries < 10; tries++) {
    tiles = shuffle(tiles);
    if (words.length < 2 || tiles.some((t, i) => t.w !== words[i])) break;
  }
  const built = [];
  body.innerHTML = `
    <div class="q" style="font-size:20px">${esc(it.en)}</div>
    <div class="built" id="built"></div>
    <div class="tiles" id="tiles">${tiles.map((t, k) => `<button class="tile" data-k="${k}">${esc(t.w)}</button>`).join("")}</div>
    <button class="btn" id="checkBtn" disabled>Check</button>`;
  const $built = document.getElementById("built");
  const $check = document.getElementById("checkBtn");
  const draw = () => {
    $built.innerHTML = built.map((k, pos) => `<button class="tile" data-pos="${pos}">${esc(tiles[k].w)}</button>`).join("");
    $built.querySelectorAll("[data-pos]").forEach((b) => b.onclick = () => {
      const k = built.splice(Number(b.dataset.pos), 1)[0];
      body.querySelector(`#tiles [data-k="${k}"]`).classList.remove("used");
      draw();
    });
    $check.disabled = built.length !== tiles.length;
  };
  body.querySelectorAll("#tiles .tile").forEach((b) => b.onclick = () => {
    if (b.classList.contains("used")) return;
    b.classList.add("used"); built.push(Number(b.dataset.k)); draw();
  });
  $check.onclick = () => {
    const attempt = built.map((k) => tiles[k].w).join(" ");
    const ok = norm(attempt) === norm(it.ko);
    $check.classList.add("hidden");
    $built.querySelectorAll("button").forEach((b) => b.disabled = true);
    body.querySelectorAll("#tiles button").forEach((b) => b.disabled = true);
    $built.style.borderColor = ok ? "var(--good)" : "var(--bad)";
    $built.style.borderStyle = "solid";
    answer(it, ok, it.ko);
  };
}

// Free translation. An exact match with a model answer is right.
// If every key verb form is there but the sentence differs, you compare and decide.
// show a key form with the spacing it has in the model answer
function spaced(form, sentence) {
  const m = sentence.match(new RegExp(form.split("").join("\\s*")));
  return m ? m[0] : form;
}
function stripSubject(s) { return s.replace(/^(저는|전|제가)/, ""); }
function renderFree(it, body) {
  body.innerHTML = `
    <div class="q" style="font-size:21px">${esc(it.en)}</div>
    <button class="icon-btn" id="hintBtn" style="padding-left:0">💡 Show hint</button>
    <div class="hint hidden" id="hint">${esc(it.h)}</div>
    <form id="ff" autocomplete="off">
      <textarea class="answer" id="ans" lang="ko" rows="2" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="한국어로 쓰세요"></textarea>
      <button class="btn" id="checkBtn">Check</button>
    </form>
    <div id="self"></div>`;
  document.getElementById("hintBtn").onclick = (e) => { document.getElementById("hint").classList.remove("hidden"); e.target.remove(); };
  const input = document.getElementById("ans");
  setTimeout(() => input.focus(), 50);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); document.getElementById("checkBtn").click(); } });
  document.getElementById("ff").onsubmit = (e) => {
    e.preventDefault();
    const v = stripSubject(norm(input.value));
    if (!v) return;
    input.disabled = true;
    document.getElementById("checkBtn").classList.add("hidden");
    if (it.a.some((a) => stripSubject(norm(a)) === v)) { input.style.borderColor = "var(--good)"; return answer(it, true); }
    const missing = it.k.filter((group) => !group.some((form) => v.includes(norm(form))));
    if (missing.length) { input.style.borderColor = "var(--bad)"; return answer(it, false, it.a[0], missing); }
    // all key forms present, but worded differently
    document.getElementById("self").innerHTML = `
      <div class="feedback good">
        <div>Your verb forms look right ✓ Your sentence is worded a bit differently from mine:</div>
        <div class="ans">${esc(it.a[0])}</div>
        ${it.a.length > 1 ? `<div class="small">Also correct: ${it.a.slice(1).map(esc).join(" · ")}</div>` : ""}
        <div class="small muted" style="margin-top:6px">Is yours correct too?</div>
      </div>
      <div class="row"><button class="btn secondary" id="selfNo">I made a mistake</button><button class="btn" id="selfYes">Mine is right</button></div>`;
    document.getElementById("selfYes").onclick = () => { document.getElementById("self").innerHTML = ""; input.style.borderColor = "var(--good)"; answer(it, true); };
    document.getElementById("selfNo").onclick = () => { document.getElementById("self").innerHTML = ""; input.style.borderColor = "var(--bad)"; answer(it, false, it.a[0]); };
  };
}

function answer(it, ok, correctText, missing) {
  session.answered++;
  session.ids.add(it.id);
  const firstTry = !session.retried.has(it.id);
  if (ok && firstTry) session.right++;
  record(it, ok);
  if (!ok) {
    if (!session.missed.includes(it)) session.missed.push(it);
    // bring it back once, a few questions later
    if (firstTry) {
      session.retried.add(it.id);
      const at = Math.min(session.queue.length, session.i + 4);
      session.queue.splice(at, 0, it);
    }
  }
  const fb = document.getElementById("fb");
  fb.innerHTML = ok
    ? `<div class="feedback good">✓ 맞아요!${it.t === "free" ? `<div class="small" style="margin-top:6px">${it.a.map(esc).join(" · ")}</div>` : it.t === "order" ? "" : ` <span class="muted small">${esc(TIPS[it.g] ? it.g : "")}</span>`}</div>`
    : `<div class="feedback bad">
        <div>Not quite. The answer is:</div>
        <div class="ans">${esc(correctText === "(nothing)" ? "nothing (no particle)" : correctText)}</div>
        ${missing && missing.length ? `<div class="small" style="margin-top:6px">Check these forms: <b>${missing.map((g) => esc(spaced(g[0], it.a[0]))).join(", ")}</b></div>` : ""}
        ${it.t === "free" ? (it.a.length > 1 ? `<div class="small" style="margin-top:6px">Also correct: ${it.a.slice(1).map(esc).join(" · ")}</div>` : "") + `<div class="tip"><b>Use</b> · ${esc(it.h)}</div>` : `<div class="tip"><b>${esc(it.g)}</b> · ${esc(TIPS[it.g] || "")}</div>`}
        ${firstTry ? `<div class="small muted" style="margin-top:6px">This one will come back in a moment.</div>` : ""}
      </div>`;
  const next = document.getElementById("nextBtn");
  next.classList.remove("hidden");
  next.focus();
  next.onclick = () => {
    session.i++;
    if (session.i >= session.queue.length) renderResults(); else renderQuestion();
  };
}

// ── Results ──────────────────────────────────────────────
function renderResults() {
  const s = session;
  const firstTries = s.ids.size;
  const pct = firstTries ? Math.round((s.right / firstTries) * 100) : 0;
  const msg = pct >= 90 ? "훌륭해요! Excellent." : pct >= 70 ? "잘했어요! Well done." : "괜찮아요. Keep going, the hard ones will come back.";
  $app.innerHTML = `
    <header><h1>Done</h1></header>
    <div class="card">
      <div class="muted small">${esc(selectionLabel(s.sel))}</div>
      <div class="big">${s.right} / ${firstTries}</div>
      <div>${msg}</div>
    </div>
    ${s.missed.length ? `
      <h2>To review</h2>
      <div class="card"><ul class="list">
        ${s.missed.map((it) => `<li>
          <div>${it.t === "free" ? `${esc(it.en)}<br><b>${esc(it.a[0])}</b>` : it.t === "order" ? esc(it.ko) : blankHtml(it.q, it.a === "(nothing)" ? "∅" : (Array.isArray(it.a) ? it.a[0] : it.a))}</div>
          <div class="small muted">${it.t === "free" ? esc(it.h) : `${esc(it.g)} · ${esc(TIPS[it.g] || "")}`}</div></li>`).join("")}
      </ul></div>` : ""}
    <div class="row" style="margin-top:18px">
      <button class="btn secondary" id="homeBtn">Home</button>
      <button class="btn" id="againBtn">Practise again</button>
    </div>`;
  document.getElementById("homeBtn").onclick = renderHome;
  document.getElementById("againBtn").onclick = () => {
    const sel = s.sel === "mistakes" && !poolFor("mistakes").length ? "all" : s.sel;
    startSession(sel);
  };
}

// ── Progress & settings ──────────────────────────────────
function renderStats() {
  const max = learnedThrough();
  const manual = store.get("learned", "auto");
  const rows = CHAPTERS.filter((c) => c.n <= max).map((c) => {
    const items = ITEMS.filter((it) => it.c === c.n);
    const seen = items.filter((it) => stats[it.id]);
    const mastered = items.filter((it) => stats[it.id] && stats[it.id].last === "r").length;
    const weak = items.filter((it) => stats[it.id] && stats[it.id].last === "w").length;
    return `<li class="stat">
      <span><b>${c.n}과</b> <span class="small muted">${esc(c.grammar.join(", "))}</span>
      ${weak ? `<br><span class="small" style="color:var(--bad)">${weak} to review</span>` : ""}</span>
      <span class="meter" title="${mastered}/${items.length}"><i style="width:${(mastered / items.length) * 100}%"></i></span>
    </li>`;
  }).join("");

  $app.innerHTML = `
    <header><button class="icon-btn" id="backBtn">‹ Back</button><span></span></header>
    <h2>Progress by chapter</h2>
    <p class="small muted" style="margin-top:-4px">The green bar fills up as you answer each exercise correctly.</p>
    <div class="card"><ul class="list">${rows}</ul></div>

    <h2>Chapters I've learned</h2>
    <div class="card">
      <select id="learnedSel">
        <option value="auto" ${manual === "auto" ? "selected" : ""}>Automatic: one new chapter every Sunday (now ${autoLearned()})</option>
        ${CHAPTERS.map((c) => `<option value="${c.n}" ${manual === c.n ? "selected" : ""}>Up to chapter ${c.n}</option>`).join("")}
      </select>
      <p class="small muted">Use this if you skip a week or move ahead faster.</p>
    </div>

    <h2>Reset</h2>
    <button class="btn secondary" id="resetBtn">Clear my progress on this device</button>
    <p class="small muted">Progress is saved separately on your Mac and your iPhone.</p>`;
  document.getElementById("backBtn").onclick = renderHome;
  document.getElementById("learnedSel").onchange = (e) => {
    const v = e.target.value;
    store.set("learned", v === "auto" ? "auto" : Number(v));
    renderStats();
  };
  const reset = document.getElementById("resetBtn");
  reset.onclick = () => {
    if (reset.dataset.armed) { stats = {}; store.set("stats", stats); renderStats(); return; }
    reset.dataset.armed = "1"; reset.textContent = "Tap again to confirm";
  };
}

// ── Offline support ──────────────────────────────────────
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

renderHome();
