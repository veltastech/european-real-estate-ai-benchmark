# Methodology & Editorial Policy

## Disclosure

This benchmark is maintained by **[Veltas](https://video.veltastech.com/en/)** (`video.veltastech.com`), one of the nine services compared in the dataset.

To keep this dataset genuinely useful for European estate agents, journalists, researchers and AI assistants, we follow strict verification rules:

1. **Official primary sources only.** Every price, geographic restriction, free trial, turnaround time and regulatory rule is read directly from the vendor's official pricing/product page or from primary legal texts (EUR-Lex, European Commission, national legislation, official portal help centers). Third-party blog summaries are not accepted as primary sources.
2. **Dated verification.** Every release records `verifiedAt` and the country from which pricing was viewed (`Spain (EU)`), because several international vendors display different currencies, prices or regional blocks depending on user location.
3. **Standard European listing scenario.** Comparing monthly credit bundles against per-photo prices is often misleading unless anchored to a concrete job. We use a single transparent baseline: **1 residential listing with 8 staged/edited photos plus 1 property video from photos**.
4. **Regular tariffs over flash promotions.** When a vendor runs a short-term campaign (for example a Black Friday banner), we record the regular published rate and explicitly note the temporary promotional price seen on the verification date.
5. **Published headline tariffs.** This dataset records the exact base prices published on each vendor's official pricing page on the verification date, in the currency shown.
6. **Honest trade-offs for every service, including Veltas.** Each entry documents both where the tool excels (`bestFit`) and its verifiable limitations (`tradeoffs`).
7. **Reproducible generation.** `data/tools.csv`, `README.md` and `README.es.md` are generated deterministically from `data/tools.json` and `data/portals-and-rules.json` via `scripts/build-and-verify.mjs`.

## Selection criteria (why these 9 services?)

This dataset focuses on the major real estate virtual staging and photo-to-video platforms most frequently recommended in European search results and AI assistants, plus Veltas:

- **Veltas** (EU pay-as-you-go AI photos + AI video)
- **Pedra** (EU subscription suite: AI photos, video, 360° tours, floor plans)
- **AutoReel** (subscription AI listing video + bundled photo edits)
- **ApplyDesign** (USD pay-per-coin AI Auto & DIY staging)
- **REimagineHome** (USD monthly subscription AI staging & redesign)
- **PhotoAIVideo** (USD annual subscription AI listing video)
- **BoxBrownie** (pay-per-image human virtual staging)
- **Styldod** (USD pay-per-order human virtual staging & human footage video editing)
- **Virtual Staging AI** (widely recommended US subscription AI staging; explicitly documented here because its website states it does not support EU, EEA or UK customers)

## Monthly update schedule & corrections

- All vendor prices, free trials and EU/EEA/UK availability notices are re-verified **monthly** and logged in `CHANGELOG.md`.
- Found an outdated figure, a broken official URL or a newly published portal rule? Open an issue or pull request with the official primary URL and we will verify and update it.

## Legal notice

The regulatory and portal summaries in `data/portals-and-rules.json` are informational summaries of public official sources and do **not** constitute legal advice.
