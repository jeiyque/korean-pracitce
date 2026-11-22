// Flags Korean words in exercises that are not taught yet by that chapter.
// Usage: node tools/check-vocab.js
const fs = require("fs");
const path = require("path");
const V = require("./vocab.js");
const root = path.join(__dirname, "..");
const ctx = {};
new Function("ctx", fs.readFileSync(path.join(root, "data.js"), "utf8") + "\n" +
  fs.readFileSync(path.join(root, "free.js"), "utf8") + "\n" +
  fs.readFileSync(path.join(root, "grammar.js"), "utf8") + "\nctx.ITEMS = ITEMS; ctx.FREE = FREE; ctx.GRAMMAR = GRAMMAR; ctx.CHAPTERS = CHAPTERS;")(ctx);
// grammar summary examples count as items of their chapter
for (const ch of ctx.CHAPTERS) for (const g of ch.grammar) {
  const e = ctx.GRAMMAR[g];
  if (e) ctx.FREE.push({ id: "grammar " + g, c: ch.n, t: "free", a: e.ex.map((x) => x[0]).concat(e.form.map((f) => f[2].replace(/[=,→×]/g, " "))) });
}

// grammar pieces that may follow a stem (particles and endings, as syllables)
const SUFFIX = ("요 어 아 여 서 고 싶 지 않 만 니 까 습 다 읍 시 세 십 오 을 를 은 는 이 가 에 도 와 과 의 하 랑 로 으 께 한 테 게 부 터 보 수 있 없 었 았 했 려 러 기 전 후 돼 되 야 해 셨 셔 ㄹ 예 입 요 랑 들 님 니다 거 었").split(" ");

function allowed(ch) {
  const s = new Set();
  for (let i = 0; i <= ch; i++) for (const w of V[i] || []) s.add(w);
  return s;
}
function suffixOk(rest) {
  if (!rest) return true;
  for (let n = Math.min(3, rest.length); n >= 1; n--) {
    if (SUFFIX.includes(rest.slice(0, n)) && suffixOk(rest.slice(n))) return true;
  }
  return false;
}
function tokenOk(tok, stems) {
  for (let n = tok.length; n >= 1; n--) {
    if (stems.has(tok.slice(0, n)) && suffixOk(tok.slice(n))) return true;
  }
  return /^[0-9]+[월일시분]?$/.test(tok);
}
function sentences(it) {
  if (it.t === "mc") return [it.q.replace(/___/g, it.a === "(nothing)" ? "" : it.a)];
  if (it.t === "type") return [it.q.replace(/___/g, it.a[0])];
  if (it.t === "order") return [it.ko];
  return it.a;
}
let flagged = 0;
for (const it of ctx.ITEMS.concat(ctx.FREE)) {
  const stems = allowed(it.c);
  const bad = new Set();
  for (const s of sentences(it)) {
    const clean = s.replace(/\([^)]*\)/g, " ").replace(/[A-Za-z'.,?!·—…:~]/g, " ");
    for (const tok of clean.split(/\s+/).filter(Boolean)) if (!tokenOk(tok, stems)) bad.add(tok);
  }
  if (it.ctx && /[가-힣]/.test(it.ctx)) {
    for (const tok of it.ctx.replace(/[A-Za-z'.,?!·—…:~]/g, " ").split(/\s+/).filter(Boolean)) if (!tokenOk(tok, stems)) bad.add("ctx:" + tok);
  }
  if (bad.size) { flagged++; console.log(`${it.id} (ch${it.c})  ${[...bad].join(", ")}   | ${sentences(it)[0]}`); }
}
console.log(`\n${flagged} items flagged (${ctx.ITEMS.length + ctx.FREE.length} checked, incl. grammar summary)`);
