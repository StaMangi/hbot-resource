# Phase 4 Plan — Content Expansion (Launch-Blocking)

**Status:** Awaiting Stamos approval. Phase 4 is **launch-blocking** — Phase 6 (domain attachment + go-live) cannot start until Phase 4 ships.
**Predecessor:** Phase 3.A–3.F producing the IA shell (homepage, /clinical/, /wellness/, ~90 routes for existing 30 indications).
**Successor:** Phase 5 (polish, non-blocking) and Phase 6 (launch).

---

## Prerequisites — confirm before kickoff

1. **Source PDF in the repo.** `Other_HBOT_applications.pdf` (covering long COVID, fibromyalgia, dermatology, plastic surgery, women's health) was referenced in conversation but is **not yet in the working tree**. Before 4.A starts, it must be committed at `docs/sources/Other_HBOT_applications.pdf` (or path of Stamos's choosing) so the research methodology can extract claims and citations from it.

2. **Phase 3.E cross-link patterns landed.** Phase 4 indications inherit Phase 3.E's MedicalCondition / MedicalProcedure / ScholarlyArticle JSON-LD. If 3.E is incomplete when Phase 4 kicks off, the new indications can't yet emit the right schema.

3. **Reference-verification tool installed.** Either the automated `pnpm verify-refs` script (4.A.2) is in place and green, or the manual checklist (4.A.3 fallback) is committed to docs.

---

## Scope locked

**In scope (per source PDF):**
- 5 indication clusters: long COVID, fibromyalgia, dermatology, plastic surgery, women's health.
- 3 new departments: Dermatology, Plastic Surgery, Women's Health.
- 3 standalone content pages: `/safety/`, `/programme-design/`, `/operator-blueprint/`.

**Out of Phase 4 scope (proposed — Stamos to confirm or amend):**
The original brief listed wider additions — multiple sclerosis, migraine, surgical extras (aseptic osteonecrosis, non-diabetic chronic surgical wounds, soft tissue infection adjunct), endocrinology (obesity, T2D), sports/performance (concussion, overtraining, tendon injury). These are **not in the source PDF** and would require de-novo research from PubMed + clinical guidelines.

**My recommendation:** scope Phase 4 strictly to the PDF clusters + 3 placeholder pages. The wider list goes to a future Phase 4.5 or stays deferred. Reasons:
- Phase 4 is already a 50-65 hour effort even with the PDF as a research base.
- Inflating scope risks the launch-blocking date.
- The wider list lacks the same upfront research foundation; quality control would be harder.
- Most of the wider items are weaker-evidence indications (MS adjunctive, T2D research-level) — adding them without strong RCT/meta-analysis support would dilute editorial authority.

If Stamos disagrees, propose a 4.X cluster grouping per the wider list and I'll add to the plan.

---

## Sub-step breakdown

| Sub-step | Deliverable | Sessions | Stop point? |
|---|---|---|---|
| **4.A** | Foundation: DOI verification tooling + research workflow + 3 new dept entries created | 2–3 | ✓ |
| **4.B** | Long COVID indication (extends Neurology) | 1 | ✓ (first content cluster — sets the pattern) |
| **4.C** | Fibromyalgia indication (extends Neurology) | 1 | |
| **4.D** | Dermatology dept + 4 indications (Burns extension, Pyoderma gangrenosum, Necrobiosis lipoidica, Skin grafts) | 8–10 | ✓ (first new dept cluster — validates dept-pattern at scale) |
| **4.E** | Plastic Surgery dept + 3 indications (Flap salvage, Fat grafting, Scar reduction) | 6–8 | |
| **4.F** | Women's Health dept + 2 indications (Pelvic radiation injury *expansion*, Endometriosis. **Menopause omitted entirely**.) | 4–5 | ✓ (last new content cluster) |
| **4.G** | `/safety/` — full contraindications + adverse events + screening checklist | 5–7 | |
| **4.H** | `/programme-design/` — 60-session longevity protocol design | 4–5 | |
| **4.I** | `/operator-blueprint/` — operator reference architecture | 4–5 | |
| **4.J** | Final QA: cross-link refresh, Lighthouse on representative new pages, full-site verify-refs run, STATUS sweep | 1–2 | (final) |
| **Total** | | **~37–48 sessions (50–65 hours)** | 4 stop points |

Cluster splitting note: dermatology has 4 indications and is the first new department, so it's the largest cluster. If a sub-step starts to exceed ~12 sessions of estimated effort, I'll propose splitting it (e.g. 4.D.1 dept + Burns, 4.D.2 the three remaining derm indications).

---

## 4.A — Foundation work

### 4.A.1 — Department additions (3 new entries)

Three new YAML files in `src/content/departments/`:

| Slug | Name (EN) | Name (EL) | Icon | Colour |
|---|---|---|---|---|
| `dermatology` | Dermatology | Δερματολογία | `lucide:bandage` | `#d97706` (amber) |
| `plastic-surgery` | Plastic Surgery | Πλαστική Χειρουργική | `lucide:sparkles` | `#e11d48` (rose) |
| `womens-health` | Women's Health | Γυναικολογική Υγεία | `lucide:venus` | `#7c3aed` (violet) |

Icon + colour proposals for Stamos to amend. Rationale: each new colour is distinct from existing palette (teal/navy/emerald/sky/violet variants) so cards remain visually distinguishable on `/clinical/` and `/departments/`.

`shortDesc` and `applications[]` populated as their indication content lands in 4.D / 4.E / 4.F.

### 4.A.2 — DOI verification script (recommended)

`scripts/verify-references.mjs` (committed, runnable as `pnpm verify-refs`):

```javascript
// For each src/content/references/ref-*.yaml:
//   1. Extract the doi field
//   2. HEAD https://doi.org/<doi> with User-Agent: "HBOT-Science-DOI-Verifier"
//   3. Status 200/302/303 → ok; 404/410 → fail (broken DOI)
//   4. If any fail: print which refs, exit 1
//   5. Network errors retried once, then surface as warning (not fail)
// Goal: catch invented DOIs at build time, before any content ships.
```

Caveats:
- Some publishers block HEAD; fallback to GET with body discarded.
- Some require User-Agent allowlist; add a known-good string.
- Rate-limit to ~10 req/sec to avoid getting blocked.
- Cache results for 24 h (`.verify-refs-cache.json`, gitignored) to avoid repeat hits during fast iteration.

Wire into CI: `pnpm verify-refs` runs before `pnpm build` in the Cloudflare Pages build command. If a DOI is broken, build fails, deploy doesn't ship.

### 4.A.3 — Manual verification checklist (fallback)

If 4.A.2 hits implementation friction (likely because of publisher quirks), fall back to a hand-checked list:

- For each new reference YAML: open `https://doi.org/<doi>` in a browser
- Confirm: page resolves, paper title matches, authors match, year matches
- Tick the box in the cluster's PR description: `[x] All N DOIs in this cluster verified manually`

I'll start with 4.A.2 (automated) and downgrade to 4.A.3 if implementation effort exceeds half a session. Stamos's call if implementation goes longer.

### 4.A.4 — Research workflow scaffolding

`docs/research/` directory created:
- `docs/research/methodology.md` — the per-indication research recipe (see §"Research methodology" below)
- `docs/research/<indication>-notes.md` — per-indication research notebook, captures PubMed search log, evidence levels assigned, claims rejected and why
- These notebooks ship with the repo as audit trail. They're plain markdown, not collection content, so they don't render anywhere on the public site.

---

## Research methodology per indication

Standardised recipe applied to every new indication:

### Step 1 — PubMed search
Search terms documented in research notebook. Examples:
- Long COVID: `"hyperbaric oxygen" AND ("long COVID" OR "post-acute COVID" OR "PASC")`
- Fibromyalgia: `"hyperbaric oxygen" AND fibromyalgia`
- Pyoderma gangrenosum: `"hyperbaric oxygen" AND "pyoderma gangrenosum"`
- Filters: `randomized controlled trial[PT]`, `meta-analysis[PT]`, `systematic review[PT]`, last 10 years preferred
- Capture all results meeting filter criteria; record IDs.

### Step 2 — Evidence inclusion criteria
**Include:**
- Randomised controlled trials (RCTs)
- Meta-analyses and systematic reviews
- Prospective cohort studies (Level II, when RCTs are absent)

**Exclude:**
- Single case reports — *unless* the indication has only preclinical/case-report evidence, in which case include with explicit "preliminary" framing
- Animal-only studies — except as mechanism support, never as primary evidence
- Conference abstracts without full publication
- Non-peer-reviewed preprints

### Step 3 — Evidence-level assignment
Per UHMS grading style:
- **A**: Multiple Level I sources (RCT or meta-analysis), consistent results, clinically actionable
- **B**: Single Level I source OR multiple consistent Level II sources
- **C**: Level II/III only OR mixed/conflicting evidence
- **Preclinical**: animal studies, mechanism papers, no human trials yet

### Step 4 — Claim verification
For every quantitative or qualitative claim before it goes into YAML:
- Identify the source paper
- Read the abstract (full text if needed) — confirm the claim wording matches the paper's findings
- **No paraphrase that adds specificity** the source doesn't have (the 30-50% lesson — Phase 3.B Flag #2)
- If a number can be cited: cite it. If not: drop the number, use qualitative framing.

### Step 5 — DOI verification
- Open `https://doi.org/<doi>` in a browser
- Confirm: paper title, authors, year, journal — all match the YAML
- Add to `src/content/references/ref-N.yaml` (next free number) or use existing if already in collection

### Step 6 — Bilingual write-up
- EN draft: clinical tone, citation tags inline (`[N]`), evidence level explicit, protocol parameters where supported
- EL translation: technical terms via standardised glossary (4.A.4 produces this), uncertain phrasings flagged in PR for Stamos review

### Step 7 — Render check
- Build locally, navigate to `/indications/<slug>/` and `/el/indications/<slug>/`
- Verify breadcrumbs, schema.org, cross-links all render correctly

---

## Reference verification — concrete process

Two-tier:
1. **Automated** (4.A.2 if implementable): every push runs `pnpm verify-refs` as part of build. Broken DOIs fail the build before deploy.
2. **Manual-in-PR**: every Phase 4 PR includes a checklist:
   ```
   ### DOI verification
   - [ ] All new DOIs added in this PR were opened in a browser and confirmed to resolve
   - [ ] Paper title, authors, year match the YAML
   - [ ] No DOIs were generated by Claude or paraphrased from the PDF without verification
   ```
   Stamos checks the boxes during review.

If automated and manual disagree, manual wins — re-investigate.

---

## Editorial review workflow

**Branch + PR + preview deploy + per-cluster review.**

Per cluster (4.B through 4.I):
1. I create a branch: `phase-4/long-covid`, `phase-4/dermatology`, etc.
2. Write content for the entire cluster (1 indication for solo clusters; 2-4 for dept clusters).
3. Run `pnpm verify-refs` locally. If any DOI fails: investigate, fix, repeat.
4. Push branch → Cloudflare Pages auto-creates per-PR preview URL.
5. Open PR with:
   - Cluster summary
   - List of new indications with evidence levels assigned
   - DOI verification checklist (auto + manual)
   - Preview URL pointing at the new pages
   - Any flagged uncertainties (translation tone, conflicting evidence, etc.)
6. Stamos reviews the rendered pages on the preview URL, requests changes or approves.
7. Approve → merge to `main` → main re-deploys → next cluster starts.

**Smallest reviewable unit:** per cluster (not per indication). Reasons:
- Per-indication PRs would multiply review overhead 10× across Phase 4.
- Cluster review lets Stamos see indications in context (e.g. all 4 dermatology indications together with their cross-links and dept page).
- A cluster typically corresponds to one preview-deploy URL with all the new pages in one place — easier mental model.

**Exceptions:** if a cluster is large or controversial (dermatology with 4 indications, women's health with menopause-omission decisions to reaffirm), I may split into sub-PRs. Flagged in the cluster's research notebook.

---

## Order of writing — proposed priority

| # | Cluster | Why this order |
|---|---|---|
| 4.B | **Long COVID** | Highest current public interest, freshest research base (last 4 years, well-cited), single indication so smallest first-cluster scope. Sets the per-indication pattern for everything that follows. |
| 4.C | Fibromyalgia | Similar profile (single indication, neurology-adjacent, recent RCT evidence including Efrati 2015). Lets us reuse the long-COVID research workflow on a similar-shape problem before scaling to multi-indication clusters. |
| 4.D | Dermatology | First new dept cluster, 4 indications. Largest single sub-step. Tests the dept-creation pattern with the most indications attached. |
| 4.E | Plastic Surgery | New dept, 3 indications. Slightly smaller than dermatology; reuses the dept-creation pattern from 4.D. |
| 4.F | Women's Health | New dept, 2 indications (pelvic radiation expansion + endometriosis). Smallest of the new-dept clusters; menopause omission codifies editorial-integrity precedent in a fresh content area. |
| 4.G | `/safety/` | Comprehensive content, no source PDF. UHMS guidelines + adverse-event literature. Goes after all indication clusters because safety content frequently cross-references specific indications. |
| 4.H | `/programme-design/` | 60-session longevity protocol per Hadanny model. Builds on the existing Longevity content collection. |
| 4.I | `/operator-blueprint/` | Operational/regulatory content. Mostly fresh material — Stamos's operational expertise is a primary input here, alongside CE/medical-device guidance. |
| 4.J | QA | Final sweep — cross-links, Lighthouse, STATUS, sitemap re-check. |

If Stamos has a different priority order, I'll re-sequence.

---

## i18n process for new content

- **Write EN first.** Research, citations, prose all anchored in the source paper's language (typically English).
- **Translate EL.** I draft Greek translations using the same medical-term register as existing collection content (`src/i18n/el.ts` + `src/content/*/*.yaml`). For technical or medicalterms unfamiliar to my training data, flag for Stamos before commit.
- **Greek glossary.** `docs/research/el-glossary.md` — small reference of EN→EL mappings for HBOT-specific medical terms used across new content. Built up as 4.B/4.C/etc. land. Ensures consistency across cluster.
- **Quality control:**
  - Each cluster PR includes a "Translations to verify" section listing any phrasings I'm uncertain about.
  - Stamos's review explicitly checks the EL counterpart pages on the preview URL.
  - If a translation is rejected, I retry with the rejection feedback.

---

## Schema.org for new content

**No new schema design needed.** Phase 4 indication detail pages render through the same `DetailLayout` + `getStaticPaths` pattern established in Phase 3.D, with schema emitted by the helpers introduced in Phase 3.E:

- `MedicalWebPage` (every page)
- `MedicalCondition` (indication detail pages — name, description, possibleTreatment)
- `MedicalProcedure` (protocol parameters — applicable for indications that have protocols)
- `ScholarlyArticle` (references aggregated on `/references/` page)
- `BreadcrumbList` (every deep page)

New department pages (`/departments/dermatology/` etc.) inherit the same `MedicalSpecialty` schema as the existing 9 departments. New i18n strings in `src/i18n/{en,el}.ts` for any department-name labels that surface beyond the department YAML.

If Phase 4 surfaces a content shape that doesn't fit existing schema (e.g. `/operator-blueprint/` could be a `HowTo` schema, `/safety/` could need `MedicalGuideline`), I'll propose new schema entries in 4.G/4.I and flag for review before committing.

---

## Three placeholder pages — how they're researched and structured

### `/safety/` (4.G — 5–7 sessions)

**Research base:** UHMS Safety Committee guidelines (latest published version), peer-reviewed adverse-event literature on HBOT, current AHA/CDC contraindication lists for hyperbaric therapy.

**Structure:**
1. **Absolute contraindications** — list with citation per item:
   - Untreated pneumothorax
   - Concurrent bleomycin chemotherapy (and timing window post-bleomycin)
   - Specific drugs (cisplatin, doxorubicin) per UHMS guidance
2. **Relative contraindications** — list with citations:
   - COPD with CO₂ retention, claustrophobia, recent ear/sinus surgery, pregnancy first trimester, congenital spherocytosis, optic neuritis history, severe asthma
3. **Adverse events** — table with frequency + management:
   - Barotrauma (most common, ear/sinus), oxygen toxicity (CNS / pulmonary), myopia (transient lens shape change), claustrophobia, fire risk (chamber)
4. **Patient screening checklist** — pre-treatment evaluation:
   - Cardiac (echo, stress test thresholds)
   - Pulmonary (PFTs, history of pneumothorax)
   - Drug interactions
   - Imaging (chest X-ray pre-protocol)
5. References inline — every claim citable.

**No source PDF**, so research effort is heaviest here.

### `/programme-design/` (4.H — 4–5 sessions)

**Research base:** Hadanny et al. 2020 + 2021 + 2022 (the "Aging" RCT and follow-ups) + IN2050 operational know-how (Stamos's input).

**Structure:**
1. **The 60-session protocol** — pressure (2.0 ATA), duration (90 min/session), frequency (5×/week), total duration (12 weeks), maintenance schedule
2. **Member journey** — assessment phase (baseline biomarkers), active phase (60 sessions), maintenance phase (1-2 sessions/week ongoing)
3. **Biomarker tracking** — telomere length (PBMC measurement), senescence markers (T-cell subsets), VO2 max, cognitive battery
4. **Adjunct modalities** — research literature only on combined HBOT + cold exposure / IV vitamins / red light. Flagged as non-validated combinations.
5. References inline.

### `/operator-blueprint/` (4.I — 4–5 sessions)

**Research base:** Stamos's operational expertise (primary), CE marking documents, EU Medical Device Regulation (MDR), local regulatory frameworks.

**Structure:**
1. **Space requirements** — single chamber (~100 sq ft including support), multi-chamber suite (500–1000 sq ft), HVAC specs, fire-safety requirements
2. **Staffing model** — medical director (qualifications), hyperbaric technician (CHT or equivalent), front-of-house, back-up coverage
3. **Regulatory checklist** — chamber CE marking, local medical device approval pathways, professional indemnity insurance, member consent forms
4. **Member journey design** — appointment cadence, in-chamber experience, post-session protocols
5. **Integration with adjunct modalities** — co-located cold plunge / IV / consultation rooms (operational considerations only, not clinical claims)

NO commercial pricing, NO IN2050 product names. Footer attribution only (per content-integrity rules in memory).

---

## Estimated effort per cluster — full breakdown

| Cluster | Indications | Research | EN write | EL translate | Verify | Total per indication | Cluster sessions |
|---|---|---|---|---|---|---|---|
| 4.B Long COVID | 1 | 1.5 h | 1 h | 0.5 h | 0.5 h | 3.5 h | 1 |
| 4.C Fibromyalgia | 1 | 1.5 h | 1 h | 0.5 h | 0.5 h | 3.5 h | 1 |
| 4.D Dermatology | 4 (+dept) | 6 h | 4 h | 2 h | 2 h | — | 8–10 |
| 4.E Plastic Surgery | 3 (+dept) | 4.5 h | 3 h | 1.5 h | 1.5 h | — | 6–8 |
| 4.F Women's Health | 2 (+dept) | 3 h | 2 h | 1 h | 1 h | — | 4–5 |
| 4.G /safety/ | (page) | 5 h | 3 h | 1.5 h | 1 h | — | 5–7 |
| 4.H /programme-design/ | (page) | 4 h | 2.5 h | 1.5 h | 1 h | — | 4–5 |
| 4.I /operator-blueprint/ | (page) | 4 h | 2.5 h | 1.5 h | 1 h | — | 4–5 |
| 4.A Foundation | (tooling) | — | — | — | — | — | 2–3 |
| 4.J QA | (final) | — | — | — | — | — | 1–2 |
| **Total** | **11 indications + 3 pages** | | | | | | **~37–48** |

Per-session = 1.5 hours focused work. Total: ~50–65 hours. Materially heavier than Phase 3 (~27 hours) because each claim demands research + verification.

---

## PDF claim verification

For each claim in the source PDF before it ships:

1. **Identify cited source.** Read the PDF's footnote/endnote/inline citation. Note paper title + DOI.
2. **Look up the source.** Open DOI → confirm paper page resolves.
3. **Read abstract / full text.** Confirm the claim wording in the PDF appears in the source paper.
4. **Quantitative claims:** specifically verify any numbers (percentages, effect sizes, sample sizes). The 30-50% lesson — fabricated quantification slips through paraphrasing.
5. **If claim verified:** carry into the indication YAML with the citation tag.
6. **If claim unsupported by source:** flag in the cluster's research notebook (`docs/research/<indication>-notes.md`), discuss with Stamos before omitting or replacing.
7. **If reference exists in our `references` collection already:** use the existing `[N]` tag. Otherwise add a new `ref-N.yaml`.

This step is unglamorous but is the foundation of editorial integrity. Per Stamos's Phase 3.B Flag #2 precedent: every claim citable, no exceptions, no asymmetry between languages.

---

## Acceptance criteria for Phase 4 completion

- [ ] All 5 indication clusters built out — 11+ new indications across Long COVID, Fibromyalgia, Dermatology (×4), Plastic Surgery (×3), Women's Health (×2)
- [ ] 3 new departments live with their applications populated
- [ ] `/safety/`, `/programme-design/`, `/operator-blueprint/` content pages live (no longer Phase 4 stubs)
- [ ] Every reference DOI verified — automated `pnpm verify-refs` green OR manual checklists ticked in PRs
- [ ] EN/EL parity on every new indication and page — no translation gaps
- [ ] `astro check` clean
- [ ] Lighthouse on a representative new indication detail page — Performance ≥95, A11y ≥95, BP ≥95 (SEO still 66 from `noindex`)
- [ ] Cross-link reverse index regenerated to include new content (Phase 3.E helper picks them up automatically)
- [ ] Quadruple-grep clean — no Henry Dunant residue introduced inadvertently
- [ ] Menopause confirmed absent from women's health page

---

## What I will NOT do during Phase 4

- Touch indications outside the source PDF unless Stamos explicitly expands scope.
- Include menopause anywhere on the women's health page (per locked decision).
- Cite anything that doesn't resolve on doi.org or pubmed.ncbi.nlm.nih.gov.
- Paraphrase the source PDF's quantitative claims without re-verifying against the cited paper.
- Ship one-language asymmetry — every new indication is EN + EL on the same commit.
- Add commercial pricing or IN2050 product names anywhere outside footer attribution.
- Build new schema.org types unless an existing one genuinely doesn't fit.

---

## Stop conditions

Pause for Stamos sign-off after each of:
- **4.A** complete (foundation in place: dept entries created, verify-refs working, research notebook scaffolding committed)
- **4.B** complete (first indication shipped — sets the cluster pattern; if approved, the rest of Phase 4 is mechanical)
- **4.D** complete (first new department cluster — validates the dept-pattern at scale before Plastic Surgery and Women's Health follow the same shape)
- **4.F** complete (last new content cluster — at this point all 5 PDF clusters are landed; only standalone pages remain)
- 4.G–4.I land sequentially without forced pauses (each is a single page, each gets a PR preview anyway)
- **4.J** complete (final QA — Phase 4 acceptance criteria verified)

After 4.J, Phase 5 (polish) and/or Phase 6 (launch) become eligible.

---

## Three open questions for Stamos's review of this plan

1. **Scope.** OK to lock Phase 4 to the 5 PDF clusters + 3 placeholder pages, deferring the wider original-brief items (MS, migraine, surgical extras, sports, obesity, T2D)? Or does the wider list need to land before launch?

2. **DOI verification implementation.** Approve building the automated `pnpm verify-refs` script in 4.A.2 (~half a session)? Falls back to manual checklists in 4.A.3 if implementation runs over.

3. **Reviewable unit.** Approve "per-cluster PR + per-cluster preview deploy" as the editorial review unit (rather than per-indication)? Splits to per-indication only when a cluster is large or controversial.

Source PDF still needs to be committed to the repo before 4.A starts. Either upload to `docs/sources/Other_HBOT_applications.pdf` or specify another path.
