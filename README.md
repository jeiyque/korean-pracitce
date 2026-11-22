# Korean grammar practice

An offline practice app for the grammar in 세종학당 한국어 1 (King Sejong Institute Korean 1), chapters 1–20.

- `data.js`: chapters, grammar tips and all exercises
- `app.js`: the app
- `sw.js`: offline cache. Bump `VERSION` after every change so installed copies update.

Hosted with GitHub Pages from the `main` branch.

## Checking new exercises

After every change to `data.js` or `free.js`, run both checks. Each must report no problems:

```
node tools/check-vocab.js     # only words taught up to that chapter
node tools/check-quality.js   # structure, sound rules, common grammar mistakes, answer keys
```
