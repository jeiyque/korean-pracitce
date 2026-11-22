// Checks the irregular-verb forms against a reviewed list (tools/irregular-expected.json)
// and that every word is taught by the chapter it is listed under.
// Usage: node tools/check-irregular.js          (check)
//        node tools/check-irregular.js --print  (print all forms for review)
//        node tools/check-irregular.js --save   (after reviewing, save them as the expected list)
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const V = require("./vocab.js");
const ctx = {};
new Function("ctx", fs.readFileSync(path.join(root, "data.js"), "utf8") + "\n" +
  fs.readFileSync(path.join(root, "irregular.js"), "utf8") + "\nctx.IRREG = IRREG; ctx.IRR_GROUPS = IRR_GROUPS;")(ctx);
const expFile = path.join(__dirname, "irregular-expected.json");
const forms = Object.fromEntries(ctx.IRREG.map((it) => [it.id, it.a[0]]));
if (process.argv.includes("--print")) { for (const [k, v] of Object.entries(forms)) console.log(k.padEnd(18), v); process.exit(0); }
if (process.argv.includes("--save")) { fs.writeFileSync(expFile, JSON.stringify(forms, null, 1)); console.log("saved", Object.keys(forms).length); process.exit(0); }
const problems = [];
const expected = JSON.parse(fs.readFileSync(expFile, "utf8"));
for (const [k, v] of Object.entries(forms)) if (expected[k] !== v) problems.push(`${k}: ${v} (expected ${expected[k] || "nothing — review and --save"})`);
for (const k of Object.keys(expected)) if (!(k in forms)) problems.push(`${k}: missing`);
for (const g of ctx.IRR_GROUPS) for (const w of g.words) {
  const stem = w.v.slice(0, -1);
  let ok = false;
  for (let i = 0; i <= w.ch; i++) if ((V[i] || []).some((s) => s === stem || stem.startsWith(s) && s.length >= stem.length - 1)) ok = true;
  if (!ok) problems.push(`${w.v}: not in the vocabulary of chapters 0–${w.ch}`);
}
if (problems.length) { console.log(problems.join("\n")); console.log(`\n${problems.length} problems`); process.exit(1); }
console.log(`OK: ${ctx.IRREG.length} irregular forms match the reviewed list`);
