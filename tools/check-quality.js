// Automatic quality checks for all exercises (run after every content change).
// Usage: node tools/check-quality.js      (prints problems; exit code 1 if any)
// Checks: structure, sound rules for particles/이다, common grammar mistakes,
// answer keys of free translations, and that tips exist for every grammar point.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const ctx = {};
new Function("ctx", fs.readFileSync(path.join(root, "data.js"), "utf8") + "\n" +
  fs.readFileSync(path.join(root, "free.js"), "utf8") +
  "\nctx.ITEMS = ITEMS; ctx.FREE = FREE; ctx.TIPS = TIPS; ctx.CHAPTERS = CHAPTERS;")(ctx);
const { ITEMS, FREE, TIPS, CHAPTERS } = ctx;

const problems = [];
const bad = (it, msg) => problems.push(`${it.id}: ${msg}`);
const norm = (s) => String(s).normalize("NFC").replace(/[\s.,!?·~]/g, "").trim();
const SOUND_ONLY = new Set(["이다", "은/는", "이/가", "이/가 아니다", "을/를", "과/와", "으로/로", "이랑/랑"]);

// final consonant of a Hangul syllable: 0 = none, 8 = ㄹ
const jong = (ch) => { const c = ch.charCodeAt(0) - 0xac00; return c >= 0 && c < 11172 ? c % 28 : -1; };
const lastHangul = (s) => { const m = s.match(/[가-힣](?=[^가-힣]*$)/); return m ? m[0] : ""; };

function fullSentences(it) {
  if (it.t === "mc") return [it.q.replace(/___/g, it.a === "(nothing)" ? "" : it.a)];
  if (it.t === "type") return it.a.map((a) => it.q.replace(/___/g, a));
  if (it.t === "order") return [it.ko];
  return it.a;
}

// ---- grammar mistakes that must never appear in a correct sentence ----
const RULES = [
  [/아니예요/, "아니예요 → 아니에요"],
  [/[었았했]어서/, "no past tense before -어서"],
  [/[가-힣](?<![에께기])서 [^.?!]*(시다|세요|십시오|까요)[.?!]?$/, "-어서 cannot be followed by 'let's' / 'please' / 'shall we' (use -으니까)"],
  [/고 있으세요|고 있으셨/, "honorific -ing is -고 계세요"],
  [/(오늘|내일|어제|지금)에 /, "no 에 after 오늘/내일/어제/지금"],
  [/께서(?![^.?!]*(시|세|셨|셔|계))/, "께서 needs an honorific verb (-으시-)"],
  [/ 수 못/, "can't: -을 수 없다, not 수 못"],
  [/[가-힣]지 안/, "-지 않다 is spelled 않"],
];

// ---- structure of drills ----
const ids = new Set();
for (const it of ITEMS) {
  if (ids.has(it.id)) bad(it, "duplicate id");
  ids.add(it.id);
  if (!TIPS[it.g]) bad(it, `no tip for grammar "${it.g}"`);
  const ch = CHAPTERS.find((c) => c.n === it.c);
  if (!ch) bad(it, "unknown chapter");
  if (!it.en) bad(it, "missing English");
  if (it.t === "mc" || it.t === "type") {
    if ((it.q.match(/___/g) || []).length !== 1) bad(it, "question needs exactly one blank");
    if (!SOUND_ONLY.has(it.g) && !it.ctx) bad(it, "missing situation (ctx)");
  }
  if (it.t === "mc") {
    if (!Array.isArray(it.o) || it.o.length < 2) bad(it, "needs at least 2 options");
    else {
      if (!it.o.includes(it.a)) bad(it, "answer is not one of the options");
      if (new Set(it.o).size !== it.o.length) bad(it, "duplicate options");
    }
  }
  if (it.t === "type") {
    if (!Array.isArray(it.a) || !it.a.length || it.a.some((a) => !a.trim())) bad(it, "empty typed answer");
    if (!it.h) bad(it, "typed drill needs a hint");
  }
  if (it.t === "order") {
    if (!it.ko || it.ko.split(" ").length < 2) bad(it, "word order needs at least 2 words");
  }

  // sound rules: the answer must match the syllable before the blank
  if ((it.t === "mc" || it.t === "type") && SOUND_ONLY.has(it.g)) {
    const before = it.q.split("___")[0];
    const prev = lastHangul(before);
    if (prev && /[가-힣]$/.test(before)) {
      const j = jong(prev);
      const ans = it.t === "mc" ? it.a : it.a[0];
      const consonant = j > 0;
      const expect = {
        "은": consonant, "는": !consonant, "이": consonant, "가": !consonant,
        "을": consonant, "를": !consonant, "과": consonant, "와": !consonant,
        "이에요": consonant, "예요": !consonant, "이 아니에요": consonant, "가 아니에요": !consonant,
        "으로": consonant && j !== 8, "로": !consonant || j === 8,
        "이랑": consonant, "랑": !consonant,
      };
      if (ans in expect && !expect[ans]) bad(it, `sound rule: "${ans}" does not fit after "${prev}"`);
    }
  }
  for (const s of fullSentences(it)) for (const [re, msg] of RULES) if (re.test(s)) bad(it, `${msg}  | ${s}`);
}

// ---- free translation ----
for (const it of FREE) {
  if (ids.has(it.id)) bad(it, "duplicate id");
  ids.add(it.id);
  if (!it.en || !it.a.length || !it.k.length) { bad(it, "missing English, answers or key forms"); continue; }
  for (const a of it.a) {
    const v = norm(a);
    const missing = it.k.filter((g) => !g.some((f) => v.includes(norm(f))));
    if (missing.length) bad(it, `accepted answer "${a}" lacks key form ${missing.map((g) => g.join("/")).join(", ")}`);
    for (const [re, msg] of RULES) if (re.test(a)) bad(it, `${msg}  | ${a}`);
  }
}

if (problems.length) { console.log(problems.join("\n")); console.log(`\n${problems.length} problems`); process.exit(1); }
console.log(`OK: ${ITEMS.length} drills, ${FREE.length} translation sentences, 0 problems`);
