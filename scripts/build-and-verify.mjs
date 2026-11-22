import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const toolsPath = path.join(root, 'data', 'tools.json');
const rulesPath = path.join(root, 'data', 'portals-and-rules.json');
const csvPath = path.join(root, 'data', 'tools.csv');
const readmeEnPath = path.join(root, 'README.md');
const readmeEsPath = path.join(root, 'README.es.md');

const dataset = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
const checkLinks = process.argv.includes('--check-links');

const csvEscape = (v) => {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

const mdEscape = (v) => String(v ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');

function buildCsv() {
  const headers = [
    'id',
    'name',
    'website',
    'pricing_url',
    'verified_at',
    'eu_eea_uk',
    'currency',
    'billing_model',
    'subscription_required',
    'european_languages',
    'photo_staging_type',
    'ai_video_from_photos',
    'clean_unbranded_video_copy',
    'free_start_en',
    'cost_8_photos_en',
    'cost_1_video_en',
    'cost_combined_1_property_en',
  ];
  const rows = [headers.join(',')];
  for (const t of dataset.tools) {
    rows.push(
      [
        t.id,
        t.name,
        t.website,
        t.pricingUrl,
        dataset.verifiedAt,
        t.euEeaUk,
        t.currency,
        t.billingModel,
        t.subscriptionRequired,
        t.europeanLanguages.join(';'),
        t.photoStagingType,
        t.aiVideoFromPhotos,
        t.cleanUnbrandedVideoCopy === null ? 'unknown_or_na' : t.cleanUnbrandedVideoCopy,
        t.freeStartEn,
        t.cost8PhotosEn,
        t.cost1VideoEn,
        t.costCombined1PropertyEn,
      ]
        .map(csvEscape)
        .join(','),
    );
  }
  return rows.join('\n') + '\n';
}

function buildReadmeEn() {
  const veltas = dataset.tools.find((t) => t.id === 'veltas');
  const overviewRows = dataset.tools
    .map((t) => {
      const name = t.id === 'veltas' ? `**[${t.name}](${t.website})**` : `[${t.name}](${t.website})`;
      const langs = t.europeanLanguages.map((l) => l.toUpperCase()).join(', ');
      return `| ${name} | ${mdEscape(t.euEeaUkEn)} | ${mdEscape(t.currency)} | ${mdEscape(t.subscriptionLabelEn)} | ${mdEscape(t.photoStagingEn)} | ${mdEscape(t.videoTypeEn)} | ${mdEscape(t.cleanUnbrandedEn)} | ${langs} |`;
    })
    .join('\n');

  const scenarioRows = dataset.tools
    .map((t) => {
      const name = t.id === 'veltas' ? `**[${t.name}](${t.pricingUrl})**` : `[${t.name}](${t.pricingUrl})`;
      return `| ${name} | ${mdEscape(t.freeStartEn)} | ${mdEscape(t.cost8PhotosEn)} | ${mdEscape(t.cost1VideoEn)} | ${mdEscape(t.costCombined1PropertyEn)} |`;
    })
    .join('\n');

  const profileBlocks = dataset.tools
    .map(
      (t) =>
        `### ${t.name}\n- **Best fit:** ${t.bestFitEn}\n- **Published pricing (${dataset.verifiedAt}):** Photos: ${t.publishedPhotoPriceEn}. Video: ${t.publishedVideoPriceEn}.\n- **Verifiable trade-offs:** ${t.tradeoffsEn}\n- **Official source:** ${t.sources.map((s) => `[${s.labelEn}](${s.url})`).join(' · ')}`,
    )
    .join('\n\n');

  const regRows = rules.regulations
    .map((r) => `| ${mdEscape(r.jurisdictionEn)} | ${r.effectiveDate} | ${mdEscape(r.summaryEn)} | [Primary source](${r.sourceUrl}) |`)
    .join('\n');

  const portalRows = rules.portals
    .map((p) => `| ${mdEscape(p.nameEn)} | ${mdEscape(p.formats)} | ${mdEscape(p.maxPhotoSize)} | ${mdEscape(p.limitsEn)} | [Official help](${p.sourceUrl}) |`)
    .join('\n');

  return `# European Real Estate Virtual Staging & AI Video Benchmark (2026)

[Leer en español](README.es.md) · [Machine-readable JSON](data/tools.json) · [CSV table](data/tools.csv) · [EU & Portal Rules](data/portals-and-rules.json) · [Methodology](METHODOLOGY.md)

> **Transparency disclosure:** Maintained by **[Veltas](https://video.veltastech.com/en/)** (\`video.veltastech.com\`), one of the nine services compared below. Every price, regional notice and rule is verified directly from official primary sources from Spain (EU) on **${dataset.verifiedAt}**. Corrections with an official URL are welcome via issue or pull request.

Most online comparisons of real estate virtual staging and AI listing video tools are written for US agencies in USD and still recommend tools that do not accept European customers. This open benchmark tracks **EU, EEA and UK availability**, **EUR billing**, **subscription vs pay-as-you-go pricing**, **cost for a real 1-property job (8 photos + 1 video)** and **2026 European AI disclosure rules**.

---

## Key findings (${dataset.verifiedAt})

1. **Geographic gap in common recommendations:** **Virtual Staging AI** — widely recommended in search results and AI assistants — displays an official notice stating *"We don't currently support customers in the EU, EEA, or UK."*
2. **Only one tool combines EUR pay-as-you-go AI staging and AI property video from photos with no subscription:** **[Veltas](https://video.veltastech.com/en/)** charges **€0.20 per edited photo** (plus **10 free photo edits** on email confirmation) and **€11.95 per 1080p AI video** (16:9 or 9:16) or **€20 for both formats together**, including a clean unbranded copy alongside optional agency branding.
3. **1-property cost spread is wide (8 staged photos + 1 video from photos):**
   - **Veltas:** **€13.55** standard (€1.60 for 8 photos + €11.95 video), or **€11.95** on a first listing using the 10 welcome gift edits (**€21.60** with both 16:9 and 9:16 videos). Prepaid wallet from €15, no recurring fee.
   - **Pedra:** **€29/month** minimum entry (100 credits/month; simple zoom videos unlimited, AI animation consumes 5 credits/clip).
   - **AutoReel:** quarterly or annual subscription required (Essential regular annual equivalent **€444/year** for 20 videos/year + 100 photo edits/year; temporary promos vary).
   - **Human design teams (photos only):** **BoxBrownie** shows **€240** for 8 images (€30/image viewed from Spain, 48h); **Styldod** charges **$128** for 8 images ($16/image bulk, 24–48h) plus **$60–$80/video** only if you film raw footage yourself.
   - **USD pay-per-photo AI (photos only):** **ApplyDesign** costs **$96** for 8 auto-staged photos (12 coins × $8) or **$80** in DIY mode, with no AI video listed.
4. **EU AI disclosure is mandatory since 2 August 2026:** Under Article 50(4) of the EU AI Act and portal policies such as Idealista's AI labelling and C2PA detection, agencies need unedited originals and clean unbranded exports for portals that prohibit logos (such as ImmoScout24).

---

## 1. European availability & capabilities matrix (9 services)

| Service | EU / EEA / UK | Currency | Subscription required? | Photo staging | Property video | Clean unbranded video copy | European languages |
|---|---|---|---|---|---|---|---|
${overviewRows}

---

## 2. Real cost for 1 European property (8 staged photos + 1 video)

Baseline: **8 edited/staged photos + 1 property video generated from photos**, using regular published tariffs verified on **${dataset.verifiedAt}**.

| Service | Free start / welcome gift | 8 staged photos | 1 video from photos | Combined 1-property total |
|---|---|---|---|---|
${scenarioRows}

*Notes: Veltas includes 1 bonus video for every €75 in a single top-up and 1 bonus video each when an invited account makes its first top-up of €25 or more (up to 5 for the inviter). Unchanged photos in Veltas are not charged. Prices for third-party tools reflect regular published rates on their official pages on ${dataset.verifiedAt} and may change.*

---

## 3. Which service fits each European agency profile?

- **Occasional listings, variable monthly volume or agencies avoiding subscriptions (photos + video in EUR):** **[Veltas](https://video.veltastech.com/en/)** — lowest verified pay-as-you-go cost in EUR (€0.20/photo, €11.95 video / €20 for 16:9 + 9:16), 10 free photo edits to test on your own property before adding credit, 6 European languages, room-by-room consistency, originals always kept and clean unbranded copy included for portals.
- **High monthly volume needing 360° virtual tours and 2D floor plans in one plan:** **Pedra** (€29/mo or €239/yr, EUR, 6 European languages).
- **Manual drag-and-drop furniture placement (USD, photos only):** **ApplyDesign** (DIY mode at $7–$10/photo in USD).
- **100% human-designed luxury renders or human editing of filmed camera/drone footage:** **BoxBrownie** (photos, 48h, 2 months of free revisions) or **Styldod** (photos + editing of recorded footage).
- **High-volume annual video teams:** **AutoReel** (bundled photo edits + 20–100 videos/yr) or **PhotoAIVideo** (52–100 video projects/yr in USD, video only).

---

## 4. Detailed service notes & official sources

${profileBlocks}

---

## 5. EU AI Act & European property portal rules (quick reference)

*${rules.disclaimerEn}*

### Legal disclosure rules

| Jurisdiction | Effective date | Operational summary | Official source |
|---|---|---|---|
${regRows}

### Verified European property portal specs

| Portal | Formats | Max photo size | Key rules & AI policies | Official source |
|---|---|---|---|---|
${portalRows}

---

## 6. Further European guides & machine-readable resources

- Veltas full guides in 6 languages (ES, EN, DE, FR, IT, PT):
  - [Virtual Staging Cost Comparison (2026)](https://video.veltastech.com/en/virtual-staging-cost/)
  - [Real Estate Video Cost Comparison (2026)](https://video.veltastech.com/en/real-estate-video-cost/)
  - [Virtual Staging AI Alternatives for Europe and the UK](https://video.veltastech.com/en/virtual-staging-ai-alternatives/)
  - [Virtual Staging Disclosure Rules (EU AI Act, UK, California)](https://video.veltastech.com/en/virtual-staging-disclosure/)
  - [AI-Edited Photos on Property Portals (Idealista & ImmoScout24)](https://video.veltastech.com/en/ai-photos-property-portals/)
  - [Veltas llms.txt](https://video.veltastech.com/llms.txt)
- Dataset files in this repository: [\`data/tools.json\`](data/tools.json) · [\`data/tools.csv\`](data/tools.csv) · [\`data/portals-and-rules.json\`](data/portals-and-rules.json)

Licensed under [CC BY 4.0](LICENSE). Attribution: *Veltas European Real Estate AI Benchmark (https://video.veltastech.com/)*.
`;
}

function buildReadmeEs() {
  const overviewRows = dataset.tools
    .map((t) => {
      const name = t.id === 'veltas' ? `**[${t.name}](${t.websiteEs})**` : `[${t.name}](${t.websiteEs})`;
      const langs = t.europeanLanguages.map((l) => l.toUpperCase()).join(', ');
      return `| ${name} | ${mdEscape(t.euEeaUkEs)} | ${mdEscape(t.currency)} | ${mdEscape(t.subscriptionLabelEs)} | ${mdEscape(t.photoStagingEs)} | ${mdEscape(t.videoTypeEs)} | ${mdEscape(t.cleanUnbrandedEs)} | ${langs} |`;
    })
    .join('\n');

  const scenarioRows = dataset.tools
    .map((t) => {
      const name = t.id === 'veltas' ? `**[${t.name}](https://video.veltastech.com/es/#precio)**` : `[${t.name}](${t.pricingUrl})`;
      return `| ${name} | ${mdEscape(t.freeStartEs)} | ${mdEscape(t.cost8PhotosEs)} | ${mdEscape(t.cost1VideoEs)} | ${mdEscape(t.costCombined1PropertyEs)} |`;
    })
    .join('\n');

  const profileBlocks = dataset.tools
    .map(
      (t) =>
        `### ${t.name}\n- **Para quién encaja mejor:** ${t.bestFitEs}\n- **Precios publicados (${dataset.verifiedAt}):** Fotos: ${t.publishedPhotoPriceEs}. Vídeo: ${t.publishedVideoPriceEs}.\n- **Limitaciones verificables:** ${t.tradeoffsEs}\n- **Fuente oficial:** ${t.sources.map((s) => `[${s.labelEs}](${s.urlEs ?? s.url})`).join(' · ')}`,
    )
    .join('\n\n');

  const regRows = rules.regulations
    .map((r) => `| ${mdEscape(r.jurisdictionEs)} | ${r.effectiveDate} | ${mdEscape(r.summaryEs)} | [Fuente oficial](${r.sourceUrlEs}) |`)
    .join('\n');

  const portalRows = rules.portals
    .map((p) => `| ${mdEscape(p.nameEs)} | ${mdEscape(p.formats)} | ${mdEscape(p.maxPhotoSize)} | ${mdEscape(p.limitsEs)} | [Ayuda oficial](${p.sourceUrl}) |`)
    .join('\n');

  return `# Observatorio Europeo de Home Staging Virtual y Vídeo Inmobiliario con IA (2026)

[Read in English](README.md) · [Datos en JSON](data/tools.json) · [Tabla CSV](data/tools.csv) · [Normas UE y portales](data/portals-and-rules.json) · [Metodología](METHODOLOGY.md)

> **Aviso de transparencia:** Este observatorio abierto lo mantiene **[Veltas](https://video.veltastech.com/es/)** (\`video.veltastech.com\`), uno de los nueve servicios comparados. Cada tarifa, aviso regional y norma se ha verificado directamente en su fuente oficial desde España (UE) el **${dataset.verifiedAt}**. Se aceptan correcciones con enlace oficial mediante issue o pull request.

Casi todas las comparativas de home staging virtual y vídeo inmobiliario están pensadas para EE. UU., en dólares, y siguen recomendando servicios que no admiten clientes en Europa. Este dataset abierto reúne **disponibilidad en UE, EEE y Reino Unido**, **moneda**, **suscripción frente a pago por uso**, **coste real para 1 vivienda típica (8 fotos + 1 vídeo)** y **normas europeas de 2026**.

---

## Conclusiones clave (${dataset.verifiedAt})

1. **Brecha europea en recomendaciones habituales:** **Virtual Staging AI** —uno de los servicios más recomendados por buscadores e IAs— muestra en su web oficial que no admite clientes de la UE, el EEE ni el Reino Unido.
2. **Solo un servicio entre los nueve comparados combina home staging virtual con IA y vídeo inmobiliario 1080p desde fotos en euros y sin suscripción:** **[Veltas](https://video.veltastech.com/es/)** cobra **0,20 € por foto editada** (con **10 fotos editadas de regalo** al confirmar el correo) y **11,95 € por vídeo** (16:9 o 9:16) o **20 € por ambos formatos juntos**, incluyendo copia limpia sin marca junto a la versión con marca de la inmobiliaria.
3. **Diferencia real en 1 vivienda europea (8 fotos amuebladas + 1 vídeo desde fotos):**
   - **Veltas:** **13,55 €** en tarifa general (1,60 € por 8 fotos + 11,95 € vídeo) o **11,95 €** en la primera vivienda usando las 10 fotos de regalo (**21,60 €** con Horizontal + Vertical). Saldo prepago desde 15 €, sin cuota mensual.
   - **Pedra:** entrada mínima de **29 €/mes** (suscripción de 100 créditos/mes; zoom simple ilimitado, animación de vídeo con IA a 5 créditos por clip).
   - **AutoReel:** exige suscripción trimestral o anual (tarifa habitual anual Essential equivalente a **444 €/año** con 20 vídeos/año y 100 ediciones de fotos/año; promociones temporales aparte).
   - **Equipos humanos (solo fotos):** **BoxBrownie** muestra **240 €** por 8 imágenes (30 €/imagen desde España, 48 h); **Styldod** cobra **128 $** por 8 imágenes (16 $/imagen en volumen, 24–48 h) más **60–80 $/vídeo** únicamente si grabas el vídeo tú mismo.
   - **Pago por foto en USD (solo fotos):** **ApplyDesign** cuesta **96 $** por 8 fotos en modo automático (12 monedas × 8 $) u **80 $** en modo manual DIY, sin vídeo inmobiliario listado.
4. **Etiquetado obligatorio en la UE desde el 2 de agosto de 2026:** El art. 50.4 del Reglamento de IA y las reglas de portales como Idealista (etiqueta visible y detección C2PA) o ImmoScout24 (sin logotipos) hacen clave conservar siempre las originales y contar con copia sin marca.

---

## 1. Matriz de disponibilidad europea y capacidades (9 servicios)

| Servicio | UE / EEE / UK | Moneda | ¿Exige suscripción? | Home staging de fotos | Vídeo inmobiliario | Copia limpia sin marca | Idiomas europeos |
|---|---|---|---|---|---|---|---|
${overviewRows}

---

## 2. Coste real para 1 vivienda europea (8 fotos + 1 vídeo)

Escenario base: **8 fotos editadas o amuebladas + 1 vídeo inmobiliario generado desde fotos**, usando tarifas habituales publicadas y comprobadas el **${dataset.verifiedAt}**.

| Servicio | Prueba gratis / regalo | 8 fotos editadas | 1 vídeo desde fotos | Total combinado 1 vivienda |
|---|---|---|---|---|
${scenarioRows}

*Notas: Veltas añade 1 vídeo de regalo por cada 75 € de una misma recarga y 1 vídeo para cada parte en la primera recarga de 25 € o más de una cuenta invitada (hasta 5 para quien invita). Las fotos sin cambios aplicables en Veltas no se cobran. Los precios de terceros reflejan las tarifas habituales publicadas en sus webs oficiales el ${dataset.verifiedAt} y pueden cambiar.*

---

## 3. Qué herramienta encaja mejor según el perfil de inmobiliaria

- **Viviendas puntuales, volumen variable o agencias sin cuotas mensuales (fotos + vídeo en euros):** **[Veltas](https://video.veltastech.com/es/)** — menor coste verificado en pago por uso en euros (0,20 €/foto, 11,95 € vídeo o 20 € pack Horizontal + Vertical), 10 fotos de regalo al confirmar correo para probar con una vivienda propia, 6 idiomas europeos, coherencia por estancia, originales siempre conservados y copia limpia sin marca para portales.
- **Alto volumen mensual que necesita además tours 360° y planos 2D en una sola cuota:** **Pedra** (29 €/mes o 239 €/año, en euros y 6 idiomas).
- **Colocación manual de muebles arrastrando elementos (en dólares, solo fotos):** **ApplyDesign** (modo DIY a 7–10 $/foto).
- **Edición 100 % manual por diseñadores humanos o montaje de grabaciones propias con cámara/dron:** **BoxBrownie** (fotos en 48 h con cambios 2 meses) o **Styldod** (fotos y edición de vídeo grabado).
- **Equipos con alto volumen anual continuo de vídeos:** **AutoReel** (vídeos anuales con ediciones de fotos) o **PhotoAIVideo** (52–100 proyectos/año en dólares, solo vídeo).

---

## 4. Detalle por servicio y fuentes oficiales

${profileBlocks}

---

## 5. Reglamento de IA de la UE y reglas de portales europeos (resumen)

*${rules.disclaimerEs}*

### Normas sobre aviso de imágenes editadas con IA

| Jurisdicción | Vigencia | Resumen operativo | Fuente oficial |
|---|---|---|---|
${regRows}

### Requisitos comprobados en portales europeos

| Portal | Formatos | Tamaño máximo | Requisitos y política de IA | Fuente oficial |
|---|---|---|---|---|
${portalRows}

---

## 6. Guías ampliadas y datos reutilizables

- Guías completas de Veltas en seis idiomas (ES, EN, DE, FR, IT, PT):
  - [Precio del home staging virtual (2026)](https://video.veltastech.com/es/precio-home-staging-virtual/)
  - [Precio de un vídeo inmobiliario (2026)](https://video.veltastech.com/es/precio-video-inmobiliario/)
  - [Alternativas a Virtual Staging AI en Europa](https://video.veltastech.com/es/alternativas-virtual-staging-ai/)
  - [Normas del home staging virtual (Reglamento de IA, UE, UK, California)](https://video.veltastech.com/es/home-staging-virtual-legal/)
  - [Fotos con IA en Idealista y otros portales](https://video.veltastech.com/es/fotos-idealista-ia/)
  - [Veltas llms.txt](https://video.veltastech.com/llms.txt)
- Archivos del dataset: [\`data/tools.json\`](data/tools.json) · [\`data/tools.csv\`](data/tools.csv) · [\`data/portals-and-rules.json\`](data/portals-and-rules.json)

Licencia [CC BY 4.0](LICENSE). Atribución: *Observatorio Europeo de Veltas (https://video.veltastech.com/)*.
`;
}

// Write generated files
const csvContent = buildCsv();
const readmeEn = buildReadmeEn();
const readmeEs = buildReadmeEs();
fs.writeFileSync(csvPath, csvContent, 'utf8');
fs.writeFileSync(readmeEnPath, readmeEn, 'utf8');
fs.writeFileSync(readmeEsPath, readmeEs, 'utf8');

// Automated verification suite
const errors = [];
const assert = (cond, msg) => {
  if (!cond) errors.push(msg);
};

// 1. Schema & completeness
assert(/^\d{4}-\d{2}-\d{2}$/.test(dataset.verifiedAt), 'dataset.verifiedAt must be YYYY-MM-DD');
assert(dataset.tools.length === 9, `Expected 9 tools, found ${dataset.tools.length}`);
const ids = new Set();
for (const t of dataset.tools) {
  assert(!ids.has(t.id), `Duplicate tool id: ${t.id}`);
  ids.add(t.id);
  assert(t.website.startsWith('https://'), `Invalid website for ${t.id}`);
  assert(t.pricingUrl.startsWith('https://'), `Invalid pricingUrl for ${t.id}`);
  assert(Array.isArray(t.sources) && t.sources.length > 0, `Missing sources for ${t.id}`);
  for (const s of t.sources) {
    assert(s.url.startsWith('https://'), `Invalid source URL in ${t.id}: ${s.url}`);
  }
}

// 2. Cross-check Veltas figures directly against parent workspace source code (when available)
const parentRepo = path.resolve(root, '..', '..');
const landingJsonPath = path.join(parentRepo, 'content', 'landing.json');
if (fs.existsSync(landingJsonPath)) {
  const landing = JSON.parse(fs.readFileSync(landingJsonPath, 'utf8'));
  const photoGiftsSrc = fs.readFileSync(path.join(parentRepo, 'core', 'photo-gifts.ts'), 'utf8');
  const promosSrc = fs.readFileSync(path.join(parentRepo, 'core', 'promotions.ts'), 'utf8');
  const walletSrc = fs.readFileSync(path.join(parentRepo, 'core', 'wallet-pricing.ts'), 'utf8');
  const v = dataset.tools.find((t) => t.id === 'veltas')?.veltasFacts;
  assert(v, 'Missing veltasFacts');
  assert(v.photoCents === landing.photoPrice.amountCents, `Photo price mismatch: ${v.photoCents} vs ${landing.photoPrice.amountCents}`);
  assert(v.videoUnitCents === landing.price.amountCents, `Video unit price mismatch: ${v.videoUnitCents} vs ${landing.price.amountCents}`);
  assert(v.videoPackCents === landing.price.packAmountCents, `Video pack price mismatch: ${v.videoPackCents} vs ${landing.price.packAmountCents}`);
  assert(photoGiftsSrc.includes(`WELCOME_PHOTO_GIFTS=${v.welcomeGiftPhotos}`), 'WELCOME_PHOTO_GIFTS mismatch');
  assert(photoGiftsSrc.includes(`WELCOME_PHOTO_GIFT_DAYS=${v.welcomeGiftDays}`), 'WELCOME_PHOTO_GIFT_DAYS mismatch');
  assert(promosSrc.includes(`GIFT_STEP_CENTS=${v.topupGiftStepCents}`), 'GIFT_STEP_CENTS mismatch');
  assert(promosSrc.includes(`REFERRAL_MIN_CENTS=${v.referralMinCents}`), 'REFERRAL_MIN_CENTS mismatch');
  assert(promosSrc.includes(`REFERRAL_LIMIT=${v.referralLimit}`), 'REFERRAL_LIMIT mismatch');
  assert(walletSrc.includes(`minRechargeCents=1_500`) && v.minRechargeCents === 1500, 'minRechargeCents mismatch');
  // Arithmetic check for 8 photos + 1 video
  const eightPhotos = (8 * v.photoCents) / 100;
  const combinedSingle = (8 * v.photoCents + v.videoUnitCents) / 100;
  const combinedPack = (8 * v.photoCents + v.videoPackCents) / 100;
  assert(eightPhotos === 1.6, `Expected 8 photos = 1.60, got ${eightPhotos}`);
  assert(combinedSingle === 13.55, `Expected combined single = 13.55, got ${combinedSingle}`);
  assert(combinedPack === 21.6, `Expected combined pack = 21.60, got ${combinedPack}`);
  console.log('✓ Cross-checked Veltas figures against parent repo source files.');
}

// 3. Policy checks across all public files (no IVA/VAT, no decorative arrows, required disclosures)
const publicFiles = ['README.md', 'README.es.md', 'METHODOLOGY.md', 'CHANGELOG.md', 'data/tools.json', 'data/tools.csv', 'data/portals-and-rules.json'];
const forbiddenTax = /\b(IVA|VAT|MwSt|TVA|sales tax|pre-tax|más impuestos|plus tax)\b/i;
const forbiddenArrows = /[→↗←]/;

for (const rel of publicFiles) {
  const full = path.join(root, rel);
  const text = fs.readFileSync(full, 'utf8');
  assert(!forbiddenTax.test(text), `Forbidden tax/IVA mention found in ${rel}: ${text.match(forbiddenTax)?.[0]}`);
  assert(!forbiddenArrows.test(text), `Decorative arrow found in ${rel}`);
}

assert(/Not legal advice/i.test(readmeEn), 'README.md missing legal advice disclaimer');
assert(/No es asesoramiento jurídico/i.test(readmeEs), 'README.es.md missing legal advice disclaimer');
assert(/Maintained by/i.test(readmeEn) && /one of the nine services compared/i.test(readmeEn), 'README.md missing conflict-of-interest disclosure');
assert(/lo mantiene/i.test(readmeEs) && /uno de los nueve servicios comparados/i.test(readmeEs), 'README.es.md missing conflict-of-interest disclosure');

// 4. Optional live link verification
async function verifyLinks() {
  const urls = new Set();
  for (const t of dataset.tools) {
    urls.add(t.website);
    urls.add(t.pricingUrl);
    for (const s of t.sources) {
      urls.add(s.url);
      if (s.urlEs) urls.add(s.urlEs);
    }
  }
  for (const r of rules.regulations) {
    urls.add(r.sourceUrl);
    urls.add(r.sourceUrlEs);
  }
  for (const p of rules.portals) urls.add(p.sourceUrl);

  const botBlockedKnown = ['www.idealista.com', 'leginfo.legislature.ca.gov'];
  let okCount = 0;
  let knownBlockedCount = 0;

  for (const url of urls) {
    const host = new URL(url).hostname;
    try {
      const r = await fetch(url, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8' },
        signal: AbortSignal.timeout(12000),
      });
      if (r.status >= 200 && r.status < 400) {
        okCount++;
      } else if (botBlockedKnown.includes(host) && (r.status === 403 || r.status === 405)) {
        knownBlockedCount++;
        console.log(`  [known bot-block ${r.status}] ${url}`);
      } else {
        errors.push(`HTTP ${r.status} for ${url}`);
      }
    } catch (e) {
      errors.push(`Fetch error for ${url}: ${e.message}`);
    }
  }
  console.log(`✓ Checked ${urls.size} URLs: ${okCount} OK, ${knownBlockedCount} known bot-block.`);
}

(async () => {
  if (checkLinks) await verifyLinks();
  if (errors.length > 0) {
    console.error('VERIFICATION FAILED:');
    for (const err of errors) console.error(' -', err);
    process.exit(1);
  }
  console.log('✓ All files built and verified with 0 errors.');
})();
