// Irregular verbs & adjectives: study list + generated test items.
// Only verbs from the book (or Jenny's known words) and only endings already taught.
// tools/check-irregular.js prints every generated form for review and checks a fixed answer list.

// ── Hangul helpers ───────────────────────────────────────
const H0 = 0xac00;
const dec = (s) => { const c = s.charCodeAt(0) - H0; return { i: Math.floor(c / 588), v: Math.floor((c % 588) / 28), f: c % 28 }; };
const com = (i, v, f) => String.fromCharCode(H0 + i * 588 + v * 28 + f);
const setF = (s, f) => { const d = dec(s.slice(-1)); return s.slice(0, -1) + com(d.i, d.v, f); };
const lastF = (s) => dec(s.slice(-1)).f;
const lastV = (s) => dec(s.slice(-1)).v;
const V = { a: 0, ae: 1, eo: 4, e: 5, yeo: 6, ye: 7, o: 8, wa: 9, oe: 11, u: 13, wo: 14, eu: 18, i: 20 };
const F = { none: 0, n: 4, d: 7, l: 8, b: 17, ss: 20, h: 27 };
const bright = (v) => v === V.a || v === V.o; // ㅏ / ㅗ take 아

// 아/어 form (the base of -어요, past, -어서, -어야)
function aeo(stem, type) {
  const last = stem.slice(-1), d = dec(last);
  switch (type) {
    case "하": return stem.slice(0, -1) + "해";
    case "ㅂ": return setF(stem, F.none) + "워";
    case "ㄷ": return setF(stem, F.l) + "어";
    case "ㅎ": return stem.slice(0, -1) + com(d.i, V.ae, F.none); // 어떻 → 어때
    case "르": {
      const prev = stem.slice(0, -1);
      return setF(prev, F.l) + (bright(lastV(prev)) ? "라" : "러");
    }
    case "ㅡ": {
      const prev = stem.slice(0, -1);
      const v = prev && bright(lastV(prev)) ? V.a : V.eo;
      return prev + com(d.i, v, F.none);
    }
    default: // regular (incl. ㄹ stems)
      if (d.f) return stem + (bright(d.v) ? "아" : "어");
      return stem + (bright(d.v) ? "아" : "어"); // unmerged, only used for "not this" hints
  }
}

// endings that start with 으 when the stem ends in a consonant
const EU = {
  "세요": [(s) => s + "세요", "으세요"], "니까": [(s) => s + "니까", "으니까"], "십시오": [(s) => s + "십시오", "으십시오"],
  "ㄴ후": [(s) => setF(s, F.n) + " 후에", "은 후에"], "ㄹ수": [(s) => setF(s, F.l) + " 수 있어요", "을 수 있어요"],
  "ㄹ까": [(s) => setF(s, F.l) + "까요?", "을까요?"], "ㅂ시": [(s) => setF(s, F.b) + "시다", "읍시다"],
  "려고": [(s) => s + "려고", "으려고"], "러": [(s) => s + "러", "으러"],
};
function eu(stem, type, key) {
  const [vowelForm, euTail] = EU[key];
  if (type === "ㅂ") return vowelForm(setF(stem, F.none) + "우");
  if (type === "ㄷ") return setF(stem, F.l) + euTail;
  if (type === "ㄹ") {
    if (key === "ㄹ수" || key === "ㄹ까") return stem + (key === "ㄹ수" ? " 수 있어요" : "까요?");
    if (key === "려고" || key === "러") return stem + key;
    return vowelForm(setF(stem, F.none)); // ㄹ drops before ㄴ, ㅂ, ㅅ
  }
  if (lastF(stem)) return stem + euTail; // regular consonant stem
  return vowelForm(stem);
}

function conj(verb, type, key) {
  const stem = verb.slice(0, -1);
  switch (key) {
    case "습니다":
      if (type === "ㄹ") return setF(stem, F.b) + "니다";
      return lastF(stem) ? stem + "습니다" : setF(stem, F.b) + "니다";
    case "지않": return stem + "지 않아요";
    case "어요": return aeo(stem, type) + "요";
    case "었": { const a = aeo(stem, type); return setF(a, F.ss) + "어요"; }
    case "어서": return aeo(stem, type) + "서";
    case "어야": return aeo(stem, type) + "야 돼요";
    case "시": return eu(stem, type, "세요"); // honorific statement (ch20)
    default: return eu(stem, type, key);
  }
}

// ── What is taught ───────────────────────────────────────
// key, label, chapter taught, which words it fits (a = adjectives too)
const IRR_ENDINGS = [
  { key: "습니다", label: "-습니다 (formal)", ch: 3, a: true },
  { key: "어요", label: "-어요 (polite present)", ch: 5, a: true },
  { key: "지않", label: "-지 않아요 (not)", ch: 5, a: true },
  { key: "었", label: "-었어요 (past)", ch: 8, a: true },
  { key: "ㄹ까", label: "-을까요? (shall we)", ch: 10 },
  { key: "ㅂ시", label: "-읍시다 (let's)", ch: 10 },
  { key: "어서", label: "-어서 (because / so)", ch: 11, a: true },
  { key: "ㄹ수", label: "-을 수 있어요 (can)", ch: 13 },
  { key: "려고", label: "-으려고 (in order to)", ch: 14 },
  { key: "ㄴ후", label: "-은 후에 (after)", ch: 15 },
  { key: "세요", label: "-으세요 (please)", ch: 15 },
  { key: "십시오", label: "-으십시오 (very formal please)", ch: 16 },
  { key: "어야", label: "-어야 돼요 (have to)", ch: 17 },
  { key: "니까", label: "-으니까 (since / so)", ch: 18, a: true },
  { key: "러", label: "-으러 (go to …)", ch: 19 },
  { key: "시", label: "-으세요 (honorific: he/she …)", ch: 20, a: true },
];

// v = dictionary form, ch = chapter the word is taught, adj = adjective, person = can describe a person,
// only = the endings that make sense for this word (otherwise all that fit)
const IRR_GROUPS = [
  { type: "ㅂ", name: "ㅂ irregular", rule: "Before a vowel, ㅂ turns into 우: -어 → 워 (더워요), 으 → 우 (더우니까, 추운). Before a consonant nothing changes (덥지만, 덥습니다).",
    words: [
      { v: "덥다", person: true, en: "to be hot", ch: 5, adj: true }, { v: "춥다", person: true, en: "to be cold", ch: 5, adj: true },
      { v: "쉽다", en: "to be easy", ch: 10, adj: true }, { v: "맵다", en: "to be spicy", ch: 11, adj: true },
      { v: "가깝다", en: "to be close", ch: 16, adj: true },
      { v: "고맙다", en: "to be thankful", ch: 6, adj: true, only: ["습니다", "어요", "었", "어서"] },
    ] },
  { type: "ㄷ", name: "ㄷ irregular", rule: "Before a vowel, ㄷ turns into ㄹ: 듣다 → 들어요, 들었어요, 들으세요. Before a consonant nothing changes (듣고, 듣습니다).",
    words: [{ v: "듣다", en: "to listen", ch: 3 }] },
  { type: "ㄹ", name: "ㄹ stem", rule: "The ㄹ drops before ㄴ, ㅂ and ㅅ: 만드세요, 만듭니다, 만든 후에, 만드니까. It stays before -어요, -을 수, -을까요, -려고, -러: 만들어요, 만들 수 있어요. No 으 is ever added.",
    words: [
      { v: "살다", en: "to live", ch: 7, only: ["습니다", "어요", "었", "어서", "ㄹ수", "려고", "니까", "시"] },
      { v: "달다", en: "to be sweet", ch: 11, adj: true },
      { v: "만들다", en: "to make", ch: 13 },
      { v: "멀다", en: "to be far", ch: 16, adj: true },
    ] },
  { type: "르", name: "르 irregular", rule: "Before -어/-아, 르 becomes ㄹ라 / ㄹ러: 모르다 → 몰라요, 고르다 → 골라요. Other endings are regular (모릅니다, 고르세요).",
    words: [
      { v: "모르다", en: "to not know", ch: 4, only: ["습니다", "어요", "었", "어서", "니까", "시"] },
      { v: "고르다", en: "to choose", ch: 12 },
    ] },
  { type: "ㅡ", name: "ㅡ drops", rule: "Before -어/-아, ㅡ disappears. The vowel before it decides: ㅏ/ㅗ → 아 (아파요, 바빠요), others → 어 (예뻐요). One-syllable stems take 어 (써요, 커요).",
    words: [
      { v: "크다", person: true, en: "to be big", ch: 3, adj: true }, { v: "예쁘다", person: true, en: "to be pretty", ch: 3, adj: true },
      { v: "쓰다", en: "to write", ch: 6 }, { v: "아프다", person: true, en: "to be sick / hurt", ch: 15, adj: true },
      { v: "바쁘다", person: true, en: "to be busy", ch: 18, adj: true },
      { v: "고프다", en: "to be hungry (배가 고프다)", ch: 1, adj: true, only: ["습니다", "어요", "지않", "었", "어서", "니까"] },
    ] },
  { type: "ㅎ", name: "ㅎ irregular", rule: "어떻다 drops ㅎ and becomes 어때: 어때요? 어땠어요?",
    words: [{ v: "어떻다", en: "how is …?", ch: 5, adj: true, only: ["어요", "었"] }] },
];
// Study list only (regular, but the vowels merge)
const IRR_MERGE = {
  name: "Vowels merge (regular, but easy to get wrong)",
  rule: "Not irregular, but the vowels melt together before -어/-아: 오 + 아 → 와, 보 + 아 → 봐, 주 + 어 → 줘, 배우 + 어 → 배워, 마시 + 어 → 마셔, 하 → 해.",
  words: [["오다", "와요", "왔어요"], ["보다", "봐요", "봤어요"], ["주다", "줘요", "줬어요"], ["마시다", "마셔요", "마셨어요"], ["배우다", "배워요", "배웠어요"], ["하다", "해요", "했어요"]],
};

// alternatives that also count as right
function irrAlts(form) {
  const alts = [form];
  if (form.endsWith("야 돼요")) alts.push(form.replace(/야 돼요$/, "야 해요"));
  return alts;
}

function irrItems() {
  const items = [];
  for (const g of IRR_GROUPS) for (const w of g.words) for (const e of IRR_ENDINGS) {
    if (w.only ? !w.only.includes(e.key) : (w.adj && !e.a)) continue;
    // honorific statement: only for adjectives that describe a person (바쁘세요, 아프세요);
    // for verbs it is the same form as the -으세요 request, so it is not asked twice
    if (e.key === "시" && !(w.only ? w.only.includes("시") : w.person)) continue;
    const form = conj(w.v, g.type, e.key);
    const naive = conj(w.v, "", e.key);
    items.push({
      id: `irr:${w.v}:${e.key}`, c: Math.max(w.ch, e.ch), g: g.name, t: "type", irr: true,
      q: `${w.v} → ___`, h: e.label, a: irrAlts(form), en: `${w.v} = ${w.en}`,
      trap: naive !== form && !/[ㄱ-ㅎ]/.test(naive) ? naive : "",
    });
  }
  return items;
}
const IRREG = irrItems();
for (const g of IRR_GROUPS) TIPS[g.name] = g.rule;
