import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const toolsPath = path.join(root, 'data', 'tools.json');
const rulesPath = path.join(root, 'data', 'portals-and-rules.json');
const csvPath = path.join(root, 'data', 'tools.csv');
const readmeEnPath = path.join(root, 'README.md');
const readmeEsPath = path.join(root, 'README.es.md');
const docsDir = path.join(root, 'docs');
const pagesIndexPath = path.join(docsDir, 'index.html');
const nojekyllPath = path.join(docsDir, '.nojekyll');

const REPO_URL = 'https://github.com/veltastech/european-real-estate-ai-benchmark';
const PAGES_URL = 'https://veltastech.github.io/european-real-estate-ai-benchmark/';
const HF_DATASET_URL = 'https://huggingface.co/datasets/veltastech/european-real-estate-ai-benchmark';
const RAW_BASE = 'https://raw.githubusercontent.com/veltastech/european-real-estate-ai-benchmark/main';

const dataset = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
const checkLinks = process.argv.includes('--check-links');

const csvEscape = (v) => {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

const mdEscape = (v) => String(v ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');

const htmlEscape = (v) =>
  String(v ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

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

[Leer en español](README.es.md) · [Interactive web view](${PAGES_URL}) · [Hugging Face Dataset](${HF_DATASET_URL}) · [Machine-readable JSON](data/tools.json) · [CSV table](data/tools.csv) · [EU & Portal Rules](data/portals-and-rules.json) · [Methodology](METHODOLOGY.md)

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
- Open dataset mirrors & files: [Interactive web view](${PAGES_URL}) · [Hugging Face Dataset](${HF_DATASET_URL}) · [\`data/tools.json\`](data/tools.json) · [\`data/tools.csv\`](data/tools.csv) · [\`data/portals-and-rules.json\`](data/portals-and-rules.json)

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

[Read in English](README.md) · [Vista web interactiva](${PAGES_URL}) · [Dataset en Hugging Face](${HF_DATASET_URL}) · [Datos en JSON](data/tools.json) · [Tabla CSV](data/tools.csv) · [Normas UE y portales](data/portals-and-rules.json) · [Metodología](METHODOLOGY.md)

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
- Réplicas y archivos del dataset: [Vista web interactiva](${PAGES_URL}) · [Dataset en Hugging Face](${HF_DATASET_URL}) · [\`data/tools.json\`](data/tools.json) · [\`data/tools.csv\`](data/tools.csv) · [\`data/portals-and-rules.json\`](data/portals-and-rules.json)

Licencia [CC BY 4.0](LICENSE). Atribución: *Observatorio Europeo de Veltas (https://video.veltastech.com/)*.
`;
}

function buildPagesHtml() {
  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'European Real Estate Virtual Staging & AI Video Benchmark (2026)',
    alternateName: 'Observatorio Europeo de Home Staging Virtual y Vídeo Inmobiliario con IA',
    description:
      'Open, source-verified dataset comparing EU/EEA/UK availability, EUR vs USD pricing, subscription vs pay-as-you-go billing, 1-property cost (8 staged photos + 1 video from photos) and 2026 European AI disclosure rules across 9 major real estate visual tools.',
    url: PAGES_URL,
    sameAs: [REPO_URL, HF_DATASET_URL],
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    inLanguage: ['en', 'es'],
    version: dataset.schemaVersion,
    datePublished: '2026-11-22',
    dateModified: dataset.verifiedAt,
    spatialCoverage: 'Europe (European Union, EEA and United Kingdom)',
    keywords: [
      'virtual staging',
      'home staging virtual',
      'real estate video from photos',
      'EU AI Act Article 50',
      'European proptech benchmark',
      'Idealista AI photos',
    ],
    creator: {
      '@type': 'Organization',
      name: 'Veltas',
      url: 'https://video.veltastech.com/',
      sameAs: [
        'https://github.com/veltastech',
        'https://www.youtube.com/@veltastech',
        'https://www.linkedin.com/company/veltastech',
        'https://www.instagram.com/veltastech/',
      ],
    },
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: `${RAW_BASE}/data/tools.csv`,
        name: 'European real estate AI tools comparison (CSV)',
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${RAW_BASE}/data/tools.json`,
        name: 'European real estate AI tools comparison (JSON)',
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${RAW_BASE}/data/portals-and-rules.json`,
        name: 'EU AI Act & European property portal photo rules (JSON)',
      },
    ],
  };

  const rowsHtml = dataset.tools
    .map((t) => {
      const euYes = t.euEeaUk === 'yes';
      const eurYes = t.currency.includes('EUR');
      const noSub = !t.subscriptionRequired;
      const hasBoth = t.photoStagingType === 'ai' && t.aiVideoFromPhotos;
      const highlight = t.id === 'veltas' ? ' class="row-veltas"' : '';
      const langs = t.europeanLanguages.map((l) => l.toUpperCase()).join(', ');
      return `<tr${highlight} data-eu="${euYes ? '1' : '0'}" data-eur="${eurYes ? '1' : '0'}" data-nosub="${noSub ? '1' : '0'}" data-video="${t.aiVideoFromPhotos ? '1' : '0'}" data-both="${hasBoth ? '1' : '0'}">
        <th scope="row"><a href="${htmlEscape(t.pricingUrl)}" rel="${t.id === 'veltas' ? 'noopener' : 'nofollow noopener'}" target="_blank">${htmlEscape(t.name)}</a></th>
        <td data-en="${htmlEscape(t.euEeaUkEn)}" data-es="${htmlEscape(t.euEeaUkEs)}">${htmlEscape(t.euEeaUkEn)}</td>
        <td>${htmlEscape(t.currency)}</td>
        <td data-en="${htmlEscape(t.subscriptionLabelEn)}" data-es="${htmlEscape(t.subscriptionLabelEs)}">${htmlEscape(t.subscriptionLabelEn)}</td>
        <td data-en="${htmlEscape(t.cost8PhotosEn)}" data-es="${htmlEscape(t.cost8PhotosEs)}">${htmlEscape(t.cost8PhotosEn)}</td>
        <td data-en="${htmlEscape(t.cost1VideoEn)}" data-es="${htmlEscape(t.cost1VideoEs)}">${htmlEscape(t.cost1VideoEn)}</td>
        <td data-en="${htmlEscape(t.costCombined1PropertyEn)}" data-es="${htmlEscape(t.costCombined1PropertyEs)}">${htmlEscape(t.costCombined1PropertyEn)}</td>
        <td>${htmlEscape(langs)}</td>
      </tr>`;
    })
    .join('\n      ');

  const regHtml = rules.regulations
    .map(
      (r) => `<tr>
        <th scope="row" data-en="${htmlEscape(r.jurisdictionEn)}" data-es="${htmlEscape(r.jurisdictionEs)}">${htmlEscape(r.jurisdictionEn)}</th>
        <td>${htmlEscape(r.effectiveDate)}</td>
        <td data-en="${htmlEscape(r.summaryEn)}" data-es="${htmlEscape(r.summaryEs)}">${htmlEscape(r.summaryEn)}</td>
        <td><a href="${htmlEscape(r.sourceUrl)}" data-href-en="${htmlEscape(r.sourceUrl)}" data-href-es="${htmlEscape(r.sourceUrlEs)}" target="_blank" rel="noopener" data-en="Official source" data-es="Fuente oficial">Official source</a></td>
      </tr>`,
    )
    .join('\n      ');

  const portalHtml = rules.portals
    .map(
      (p) => `<tr>
        <th scope="row" data-en="${htmlEscape(p.nameEn)}" data-es="${htmlEscape(p.nameEs)}">${htmlEscape(p.nameEn)}</th>
        <td>${htmlEscape(p.formats)}</td>
        <td>${htmlEscape(p.maxPhotoSize)}</td>
        <td data-en="${htmlEscape(p.limitsEn)}" data-es="${htmlEscape(p.limitsEs)}">${htmlEscape(p.limitsEn)}</td>
        <td><a href="${htmlEscape(p.sourceUrl)}" target="_blank" rel="nofollow noopener" data-en="Official help" data-es="Ayuda oficial">Official help</a></td>
      </tr>`,
    )
    .join('\n      ');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#fbfbf4">
  <title>European Real Estate Virtual Staging &amp; AI Video Benchmark (2026) | Veltas</title>
  <meta name="description" content="Open, source-verified benchmark of 9 real estate virtual staging and AI property video tools for Europe (EU, EEA &amp; UK): EUR pricing, subscriptions vs pay-as-you-go and 2026 EU AI Act rules.">
  <link rel="canonical" href="${PAGES_URL}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="European Real Estate Virtual Staging &amp; AI Video Benchmark (2026)">
  <meta property="og:description" content="Source-verified comparison of 9 virtual staging and property video tools for EU, EEA and UK estate agents. Open JSON/CSV dataset under CC BY 4.0.">
  <meta property="og:url" content="${PAGES_URL}">
  <script type="application/ld+json">${JSON.stringify(datasetJsonLd).replace(/</g, '\\u003c')}</script>
  <style>
    :root {
      --bg: #fbfbf4;
      --surface: #ffffff;
      --surface-alt: #f4f3e8;
      --ink: #162033;
      --muted: #4b5563;
      --navy: #1b2a4a;
      --navy-soft: #e9eef7;
      --sage: #4a6350;
      --border: #dddcc8;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.55;
    }
    a { color: var(--navy); text-underline-offset: 3px; }
    a:focus-visible, button:focus-visible { outline: 2px solid var(--navy); outline-offset: 2px; }
    .wrap { max-width: 1120px; margin: 0 auto; padding: 24px 20px 56px; }
    header.top {
      display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;
      padding-bottom: 18px; border-bottom: 1px solid var(--border);
    }
    .brand { font-weight: 700; font-size: 1rem; text-decoration: none; color: var(--ink); }
    .top-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .pill-link, .lang-btn, .filter-btn {
      font: inherit; font-size: 0.88rem; border-radius: 999px; padding: 6px 13px;
      border: 1px solid var(--border); background: var(--surface); color: var(--ink);
      text-decoration: none; cursor: pointer;
    }
    .lang-btn[aria-pressed="true"], .filter-btn[aria-pressed="true"] {
      background: var(--navy); border-color: var(--navy); color: #ffffff;
    }
    .hero { padding: 28px 0 18px; }
    .kicker { margin: 0 0 8px; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sage); }
    h1 { margin: 0 0 12px; font-size: clamp(1.7rem, 3.2vw, 2.35rem); line-height: 1.18; color: var(--sage); }
    .lead { margin: 0 0 14px; max-width: 78ch; color: var(--ink); font-size: 1.02rem; }
    .disclosure {
      margin: 0; padding: 12px 14px; background: var(--surface-alt); border: 1px solid var(--border);
      border-radius: 10px; font-size: 0.9rem; color: var(--muted);
    }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px; margin: 22px 0; }
    .card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 11px; padding: 14px 16px;
    }
    .card strong { display: block; font-size: 1.25rem; color: var(--navy); margin-bottom: 4px; }
    .card span { font-size: 0.88rem; color: var(--muted); }
    h2 { margin: 30px 0 10px; font-size: 1.3rem; color: var(--sage); }
    .filters { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 12px; align-items: center; }
    .count { font-size: 0.88rem; color: var(--muted); margin-left: auto; }
    .table-wrap { overflow-x: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 11px; }
    table { width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left; }
    th, td { padding: 11px 12px; border-bottom: 1px solid var(--border); vertical-align: top; }
    thead th { background: var(--surface-alt); font-weight: 600; color: var(--ink); white-space: nowrap; }
    tbody tr:last-child th, tbody tr:last-child td { border-bottom: 0; }
    tr.row-veltas { background: var(--navy-soft); }
    tr.row-veltas th a { font-weight: 700; }
    tr.hidden { display: none; }
    .note { font-size: 0.86rem; color: var(--muted); margin-top: 10px; }
    footer {
      margin-top: 36px; padding-top: 18px; border-top: 1px solid var(--border);
      display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; font-size: 0.88rem; color: var(--muted);
    }
    @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="top">
      <a class="brand" href="https://video.veltastech.com/" data-href-en="https://video.veltastech.com/en/" data-href-es="https://video.veltastech.com/es/">Veltas · Open Benchmark</a>
      <div class="top-actions">
        <a class="pill-link" href="${REPO_URL}">GitHub</a>
        <a class="pill-link" href="${HF_DATASET_URL}">Hugging Face</a>
        <a class="pill-link" href="${RAW_BASE}/data/tools.json">JSON</a>
        <a class="pill-link" href="${RAW_BASE}/data/tools.csv">CSV</a>
        <button type="button" class="lang-btn" data-lang="en" aria-pressed="true">EN</button>
        <button type="button" class="lang-btn" data-lang="es" aria-pressed="false">ES</button>
      </div>
    </header>

    <main>
      <section class="hero">
        <p class="kicker" data-en="Verified ${dataset.verifiedAt} · CC BY 4.0 Open Dataset" data-es="Verificado el ${dataset.verifiedAt} · Dataset abierto CC BY 4.0">Verified ${dataset.verifiedAt} · CC BY 4.0 Open Dataset</p>
        <h1 data-en="European Real Estate Virtual Staging &amp; AI Video Benchmark (2026)" data-es="Observatorio Europeo de Home Staging Virtual y Vídeo Inmobiliario con IA (2026)">European Real Estate Virtual Staging &amp; AI Video Benchmark (2026)</h1>
        <p class="lead" data-en="Source-verified comparison of 9 major virtual staging and real estate video tools for agencies in the EU, EEA and UK. Baseline job: 1 typical European property (8 edited photos + 1 video from photos)." data-es="Comparativa verificada en fuentes oficiales de 9 servicios de home staging virtual y vídeo inmobiliario para agencias de la UE, el EEE y el Reino Unido. Escenario base: 1 vivienda europea típica (8 fotos editadas + 1 vídeo desde fotos).">Source-verified comparison of 9 major virtual staging and real estate video tools for agencies in the EU, EEA and UK. Baseline job: 1 typical European property (8 edited photos + 1 video from photos).</p>
        <p class="disclosure" data-en="Transparency disclosure: Maintained by Veltas (video.veltastech.com), one of the nine services compared. Every tariff and regional restriction was read directly from official vendor pages from Spain (EU) on ${dataset.verifiedAt}. Corrections with an official URL are welcome on GitHub." data-es="Aviso de transparencia: Mantenido por Veltas (video.veltastech.com), uno de los nueve servicios comparados. Cada tarifa y restricción regional se ha leído directamente en las webs oficiales desde España (UE) el ${dataset.verifiedAt}. Se aceptan correcciones con enlace oficial en GitHub.">Transparency disclosure: Maintained by Veltas (video.veltastech.com), one of the nine services compared. Every tariff and regional restriction was read directly from official vendor pages from Spain (EU) on ${dataset.verifiedAt}. Corrections with an official URL are welcome on GitHub.</p>
      </section>

      <section class="cards" aria-label="Key findings">
        <div class="card">
          <strong>€13.55</strong>
          <span data-en="Lowest verified 1-property total (8 AI photos + 1 AI video in EUR, no subscription: Veltas; €11.95 on first listing with 10 gift edits)" data-es="Menor total verificado para 1 vivienda (8 fotos IA + 1 vídeo IA en EUR sin suscripción: Veltas; 11,95 € primera vivienda con 10 fotos de regalo)">Lowest verified 1-property total (8 AI photos + 1 AI video in EUR, no subscription: Veltas; €11.95 on first listing with 10 gift edits)</span>
        </div>
        <div class="card">
          <strong>1 of 9</strong>
          <span data-en="Services combining AI virtual staging and AI property video from photos in EUR with pay-as-you-go billing and no subscription" data-es="Servicios que combinan home staging con IA y vídeo inmobiliario desde fotos en euros con pago por uso y sin suscripción">Services combining AI virtual staging and AI property video from photos in EUR with pay-as-you-go billing and no subscription</span>
        </div>
        <div class="card">
          <strong data-en="Blocked in EU/UK" data-es="Bloqueado en UE/UK">Blocked in EU/UK</strong>
          <span data-en="Virtual Staging AI explicitly states on its site that it does not currently support customers in the EU, EEA or UK" data-es="Virtual Staging AI indica explícitamente en su web que no admite clientes de la UE, el EEE ni el Reino Unido">Virtual Staging AI explicitly states on its site that it does not currently support customers in the EU, EEA or UK</span>
        </div>
        <div class="card">
          <strong>2026-08-02</strong>
          <span data-en="EU AI Act Art. 50(4) enforcement date requiring clear visible disclosure on AI-furnished listing photos" data-es="Entrada en vigor del art. 50.4 del Reglamento de IA de la UE que exige aviso claro y visible en fotos amuebladas con IA">EU AI Act Art. 50(4) enforcement date requiring clear visible disclosure on AI-furnished listing photos</span>
        </div>
      </section>

      <section aria-labelledby="compare-heading">
        <h2 id="compare-heading" data-en="Interactive European comparison (1 property: 8 photos + 1 video)" data-es="Comparativa europea interactiva (1 vivienda: 8 fotos + 1 vídeo)">Interactive European comparison (1 property: 8 photos + 1 video)</h2>
        <div class="filters" role="group" aria-label="Filter services">
          <button type="button" class="filter-btn" data-filter="eu" aria-pressed="false" data-en="Confirmed EU / EEA / UK" data-es="Confirmado UE / EEE / UK">Confirmed EU / EEA / UK</button>
          <button type="button" class="filter-btn" data-filter="eur" aria-pressed="false" data-en="EUR billing" data-es="Precios en EUR">EUR billing</button>
          <button type="button" class="filter-btn" data-filter="nosub" aria-pressed="false" data-en="No subscription" data-es="Sin suscripción">No subscription</button>
          <button type="button" class="filter-btn" data-filter="video" aria-pressed="false" data-en="AI video from photos" data-es="Vídeo IA desde fotos">AI video from photos</button>
          <button type="button" class="filter-btn" data-filter="both" aria-pressed="false" data-en="AI photos + AI video" data-es="Fotos IA + Vídeo IA">AI photos + AI video</button>
          <span class="count" id="match-count">9 / 9</span>
        </div>
        <div class="table-wrap">
          <table id="tools-table">
            <thead>
              <tr>
                <th scope="col" data-en="Service" data-es="Servicio">Service</th>
                <th scope="col" data-en="EU / EEA / UK" data-es="UE / EEE / UK">EU / EEA / UK</th>
                <th scope="col" data-en="Currency" data-es="Moneda">Currency</th>
                <th scope="col" data-en="Subscription?" data-es="¿Suscripción?">Subscription?</th>
                <th scope="col" data-en="8 staged photos" data-es="8 fotos editadas">8 staged photos</th>
                <th scope="col" data-en="1 video from photos" data-es="1 vídeo desde fotos">1 video from photos</th>
                <th scope="col" data-en="Combined 1-property total" data-es="Total 1 vivienda">Combined 1-property total</th>
                <th scope="col" data-en="Languages" data-es="Idiomas">Languages</th>
              </tr>
            </thead>
            <tbody>
      ${rowsHtml}
            </tbody>
          </table>
        </div>
        <p class="note" data-en="Regular published rates verified from Spain (EU) on ${dataset.verifiedAt}. Click any service name to check its official pricing page." data-es="Tarifas habituales publicadas y verificadas desde España (UE) el ${dataset.verifiedAt}. Pulsa en cualquier servicio para comprobar su página oficial de precios.">Regular published rates verified from Spain (EU) on ${dataset.verifiedAt}. Click any service name to check its official pricing page.</p>
      </section>

      <section aria-labelledby="rules-heading">
        <h2 id="rules-heading" data-en="EU AI Act &amp; disclosure rules (2026)" data-es="Reglamento de IA de la UE y normas de aviso (2026)">EU AI Act &amp; disclosure rules (2026)</h2>
        <p class="note" data-en="${htmlEscape(rules.disclaimerEn)}" data-es="${htmlEscape(rules.disclaimerEs)}">${htmlEscape(rules.disclaimerEn)}</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col" data-en="Jurisdiction" data-es="Jurisdicción">Jurisdiction</th>
                <th scope="col" data-en="Effective date" data-es="Vigencia">Effective date</th>
                <th scope="col" data-en="Summary" data-es="Resumen">Summary</th>
                <th scope="col" data-en="Source" data-es="Fuente">Source</th>
              </tr>
            </thead>
            <tbody>
      ${regHtml}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="portals-heading">
        <h2 id="portals-heading" data-en="Verified European property portal rules" data-es="Requisitos comprobados en portales europeos">Verified European property portal rules</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col" data-en="Portal" data-es="Portal">Portal</th>
                <th scope="col" data-en="Formats" data-es="Formatos">Formats</th>
                <th scope="col" data-en="Max size" data-es="Tamaño máx.">Max size</th>
                <th scope="col" data-en="Key rules &amp; AI policy" data-es="Requisitos y política de IA">Key rules &amp; AI policy</th>
                <th scope="col" data-en="Source" data-es="Fuente">Source</th>
              </tr>
            </thead>
            <tbody>
      ${portalHtml}
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer>
      <span data-en="Maintained by Veltas · Licensed under CC BY 4.0" data-es="Mantenido por Veltas · Licencia CC BY 4.0">Maintained by Veltas · Licensed under CC BY 4.0</span>
      <span><a href="https://video.veltastech.com/en/" data-href-en="https://video.veltastech.com/en/" data-href-es="https://video.veltastech.com/es/" data-en="Veltas official website" data-es="Web oficial de Veltas">Veltas official website</a> · <a href="${REPO_URL}">GitHub</a> · <a href="${HF_DATASET_URL}">Hugging Face</a></span>
    </footer>
  </div>
  <script>
    const active = new Set();
    const rows = [...document.querySelectorAll('#tools-table tbody tr')];
    const countEl = document.getElementById('match-count');
    function applyFilters() {
      let visible = 0;
      for (const row of rows) {
        const ok = [...active].every((f) => row.dataset[f] === '1');
        row.classList.toggle('hidden', !ok);
        if (ok) visible++;
      }
      countEl.textContent = visible + ' / ' + rows.length;
    }
    for (const btn of document.querySelectorAll('.filter-btn')) {
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        if (active.has(f)) active.delete(f); else active.add(f);
        btn.setAttribute('aria-pressed', active.has(f) ? 'true' : 'false');
        applyFilters();
      });
    }
    function setLang(lang) {
      document.documentElement.lang = lang;
      for (const b of document.querySelectorAll('.lang-btn')) b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
      for (const el of document.querySelectorAll('[data-en][data-es]')) el.textContent = el.dataset[lang];
      for (const a of document.querySelectorAll('[data-href-en][data-href-es]')) a.href = a.dataset['href' + (lang === 'es' ? 'Es' : 'En')];
    }
    for (const btn of document.querySelectorAll('.lang-btn')) {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    }
    if ((navigator.language || '').toLowerCase().startsWith('es')) setLang('es');
  </script>
</body>
</html>
`;
}

// Write generated files
fs.mkdirSync(docsDir, { recursive: true });
const csvContent = buildCsv();
const readmeEn = buildReadmeEn();
const readmeEs = buildReadmeEs();
const pagesHtml = buildPagesHtml();
fs.writeFileSync(csvPath, csvContent, 'utf8');
fs.writeFileSync(readmeEnPath, readmeEn, 'utf8');
fs.writeFileSync(readmeEsPath, readmeEs, 'utf8');
fs.writeFileSync(pagesIndexPath, pagesHtml, 'utf8');
fs.writeFileSync(nojekyllPath, '', 'utf8');

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
  const eightPhotos = (8 * v.photoCents) / 100;
  const combinedSingle = (8 * v.photoCents + v.videoUnitCents) / 100;
  const combinedPack = (8 * v.photoCents + v.videoPackCents) / 100;
  assert(eightPhotos === 1.6, `Expected 8 photos = 1.60, got ${eightPhotos}`);
  assert(combinedSingle === 13.55, `Expected combined single = 13.55, got ${combinedSingle}`);
  assert(combinedPack === 21.6, `Expected combined pack = 21.60, got ${combinedPack}`);
  console.log('✓ Cross-checked Veltas figures against parent repo source files.');
}

// 3. Policy checks across all public files (no IVA/VAT, no decorative arrows, required disclosures)
const publicFiles = ['README.md', 'README.es.md', 'METHODOLOGY.md', 'CHANGELOG.md', 'docs/index.html', 'data/tools.json', 'data/tools.csv', 'data/portals-and-rules.json'];
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
assert(pagesHtml.includes('"@type":"Dataset"'), 'docs/index.html missing Dataset JSON-LD');

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
