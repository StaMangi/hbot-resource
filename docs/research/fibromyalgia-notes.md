# Phase 4.C — Fibromyalgia research notebook

**Status:** in progress (PR `phase-4/fibromyalgia` open).
**Source PDF:** `docs/sources/Other_HBOT_applications.pdf` § Fibromyalgia (pages 1–2).
**Glossary reference:** `docs/research/el-glossary.md` (locked end of 4.B; new terms introduced here added inline below).

---

## Source PDF claims and disposition

The PDF cited 7 sources for Fibromyalgia ([10] through [16]). After de-duplication and inclusion-criteria filtering, four unique peer-reviewed papers remain. The collapsing pattern is the same as Long COVID (4.B), where the PDF cited the same paper twice via different URLs.

### Sources surviving verification (carried into `references` collection)

- **ref-29** — Efrati et al., *PLOS ONE* 2015. DOI `10.1371/journal.pone.0127012`. The seminal prospective controlled trial. Crossover design, n=48 (24 treated immediately, 24 control crossed over after 2-month wait). Reported significant improvements in pain, tender points, quality of life, and SPECT-imaged brain activity patterns after 40 HBOT sessions at 2.0 ATA / 90 min / 5×/week.
- **ref-30** — Cao et al., *Clinics and Practice* 2023. DOI `10.3390/clinpract13030053`. Independent meta-analysis of randomised trials. Pooled analysis confirmed effect on widespread pain, tender points, fatigue, sleep, and quality of life.
- **ref-31** — Chen et al., *BMJ Open* 2023. DOI `10.1136/bmjopen-2022-062322`. Independent systematic review and meta-analysis. Same direction of effect as ref-30 across pooled randomised data; magnitude of pain reduction varied between the two pooled analyses (the source PDF flags this directly).
- **ref-32** — Ablin, Lang, Catalogna et al., *PLOS ONE* 2023. DOI `10.1371/journal.pone.0282406`. RCT for TBI-associated fibromyalgia (sub-population): HBOT vs pharmacological intervention. Cited as scope-defining: protocol overlap with primary fibromyalgia literature noted in the source PDF.

### De-duplications collapsed

- **PDF [10] = PDF [11]** — Both link to Efrati et al. 2015. PMC4444341 mirror vs the PLOS direct URL (`journal.pone.0127012`). Same paper, kept once as ref-29.
- **PDF [13] = PDF [14]** — Both link to Chen et al. 2023 BMJ Open. PMC9872467 mirror vs `bmjopen.bmj.com/content/13/1/e062322`. Same paper, kept once as ref-31. (PDF [13] reference link was titled without the "systematic review and meta-analysis" suffix; checking the PMC page confirmed it's the same paper.)

### Source rejected by methodology

- **PDF [16]** — `oxynova.com/2021/09/13/low-pressure-hyperbaric-oxygen-therapy-and-physical-exercise-protocol-in-women-with-fibromyalgia/`. Clinic blog post promoting a low-pressure protocol. Per Phase 4 plan inclusion criteria (peer-reviewed only, no popular media), excluded outright. Same exclusion logic as Yale Medicine news article (PDF [6]) in 4.B Long COVID.

---

## Quantitative claims — traceability check

| Claim | In YAML? | Source | Verified? |
|---|---|---|---|
| 40 HBOT sessions | yes (protocol.sessions) | ref-29 (Efrati 2015 protocol) | ✓ |
| 2.0 ATA pressure | yes (protocol.ata) | ref-29 | ✓ |
| 90 min session duration | yes (protocol.duration) | ref-29 | ✓ |
| 5×/week frequency | yes (protocol.frequency) | ref-29 | ✓ |
| "significant improvements in pain, tender points, quality of life, and brain activity patterns" | yes (description) | ref-29 (paper's own primary endpoints + SPECT secondary) | ✓ |
| "two independent 2023 meta-analyses … improvements in function, tender points, fatigue, sleep, and quality of life" | yes (description) | ref-30 + ref-31 | ✓ |
| "magnitude of pain reduction varied between pooled analyses" | yes (description) | ref-30 vs ref-31 — flagged in source PDF, confirmed by reading both abstracts | ✓ |

**No quantification carried that isn't in a cited source.**

---

## Evidence level reasoning — why B (and why this is stronger than 4.B)

**Evidence Level: B.**

Decision basis (per Phase 4 plan methodology):
- **A** = multiple Level I sources, consistent results, clinically actionable.
- **B** = single Level I source OR multiple consistent Level II sources.
- **C** = Level II/III only OR mixed/conflicting.

For Fibromyalgia HBOT:
- One foundational Level I prospective controlled trial (ref-29 / Efrati 2015).
- **Two independent meta-analyses** of randomised data (ref-30 Cao / ref-31 Chen, 2023), both pooled, both confirmatory in direction.
- One additional RCT for the TBI sub-population (ref-32 Ablin 2023).
- The original positive RCT remains anchored to the Efrati lab, but ref-30 and ref-31 are independent groups (Chinese institutions) doing meta-analytic confirmation. This is a meaningful step beyond Long COVID's evidence base, which has no published meta-analyses.

**Why still B and not A:**
- Independent *replication trials* (parallel-group RCTs from groups other than Efrati lab) are not yet published. The meta-analyses pool the existing literature rather than introducing new RCT data.
- The magnitude of pain reduction differs between the two meta-analyses — a heterogeneity signal worth noting honestly.
- "Multiple Level I, clinically actionable" requires more than meta-analytic confirmation of a single-group RCT; it requires *independent positive replication*.

**Going to A would require:** a non-Efrati-lab parallel-group RCT replicating the primary endpoints. None exist yet at the time of this writing (2026-04). Honest framing: B with replication awaited.

The single-research-group caveat is **softened but not removed** in the Fibromyalgia indication relative to Long COVID, because the meta-analyses do provide independent confirmation. The wording reflects that: *"The seminal RCT remains anchored to a single research group, but meta-analytic confirmation provides supporting evidence."*

---

## Editorial register — language choices

Per the Phase 4 plan's anti-marketing reminder and the glossary lock from 4.B:

- **Used**: "may improve", "associated with", "preliminary evidence suggests", "significant improvements", "meta-analytic confirmation provides supporting evidence", "anchored to a single research group".
- **Avoided**: "transformative", "breakthrough", "the answer to fibromyalgia", "cure".
- **Quantification**: kept where source-cited; the heterogeneity in pain-reduction magnitude is named explicitly rather than glossed.

---

## Greek glossary — additions for this cluster

The following terms were used in the Fibromyalgia translation but were not in the glossary as locked at end of 4.B. They are appended to `docs/research/el-glossary.md` in the same commit:

- **fibromyalgia** → ινομυαλγία
- **central sensitisation syndrome** → σύνδρομο κεντρικής ευαισθητοποίησης
- **tender points** → ευαίσθητα σημεία
- **widespread pain** → εκτεταμένος πόνος
- **quality of life** → ποιότητα ζωής
- **function / functional outcome** → λειτουργικότητα
- **magnitude of effect / magnitude of reduction** → μέγεθος / μέγεθος μείωσης
- **brain activity patterns** → πρότυπα εγκεφαλικής δραστηριότητας
- **prospective controlled trial** → προοπτική ελεγχόμενη δοκιμή
- **meta-analytic confirmation** → μετα-αναλυτική επιβεβαίωση

ΤΕΔ first-use convention from the glossary respected: "Τυχαιοποιημένη Ελεγχόμενη Δοκιμή (ΤΕΔ)" expanded on first occurrence in the EL description, then ΤΕΔ alone if it recurred (it doesn't — only one mention).

---

## Bilingual parity check

Every claim, every caveat, every protocol parameter — same in EN and EL. The softened single-group caveat is in both:
- `condition.fibromyalgia.description.el`
- `departments.neurology.applications[Fibromyalgia].description.el`

Same wording register. The "but" / "αλλά" pivot from caveat to confirmation appears identically in both.

---

## Department mapping

Fibromyalgia added as the 7th application in `departments/neurology.yaml`. Reasons:

- No rheumatology department exists in the current taxonomy. Neurology is the closest fit.
- Fibromyalgia's mechanism is centred on **central sensitisation** — a neurological process — and HBOT's effect on the indication is mediated by changes in brain activity patterns (per ref-29's SPECT data) and neuroinflammation (per ref-30 / ref-31 mechanistic discussion).
- Co-location with Long COVID (also tier=emerging on neurology dept) is editorially coherent: both conditions are characterised by central sensitisation symptoms and similar HBOT protocols (2.0 ATA / 90 min / 40 sessions / 5×/week — identical).

Alternative considered: psychiatry (fibromyalgia has psychiatric comorbidity). Rejected: fibromyalgia is not primarily a psychiatric diagnosis, and HBOT efficacy is on the somatic/central-sensitisation axis, not on mood per se.

Stamos's flag from 4.B notes — "likely rheumatology if exists, or neurology as secondary" — is honoured here: rheumatology doesn't exist, so neurology takes the role that would normally be rheumatology's.

---

## Category decision

**Decision:** create a new category `Chronic Pain Syndromes` / `Σύνδρομα Χρόνιου Πόνου` for fibromyalgia. Long COVID stays under `Post-Viral Syndromes`. Both are tier=emerging.

This is **Option B from the 4.B notes** open question (a separate category for fibromyalgia rather than renaming "Post-Viral Syndromes" to a broader umbrella).

Reasons for B over A:
- "Post-Viral Syndromes" is *accurate* for Long COVID — renaming it would be a backfit to fit fibromyalgia rather than reflecting Long COVID's actual character.
- Fibromyalgia's primary clinical signature is chronic pain with central sensitisation — well-named by `Chronic Pain Syndromes`.
- A category should be a defensible clinical grouping, not a catch-all for "anything emerging-tier."
- This sets up the pattern for future Phase 4 clusters: each gets its medically-honest category, all live under the `tier: emerging` umbrella.

Future emerging-tier indications can either join `Chronic Pain Syndromes` (if pain-centred) or get their own categories. CFS/ME if it ever lands could plausibly join either — that's a future decision.

---

## Open questions for the Stamos review

1. **Magnitude-of-pain-reduction language.** The phrase "though the magnitude of pain reduction varied between pooled analyses" honours the heterogeneity signal honestly but reads slightly clinical. Alternative: "though the strength of the effect on pain itself differed between the two pooled analyses." Pick one.

2. **TBI-associated fibromyalgia (ref-32).** Currently cited but not separately discussed in the indication description — the Ablin 2023 RCT is for a *sub-population*, not primary fibromyalgia. Two options:
   - Keep ref-32 in the citation list (current state) — cited as supporting evidence for HBOT in fibromyalgia generally.
   - Add a sentence to the description noting that for TBI-associated fibromyalgia specifically, an independent RCT exists.
   The second is more editorially complete; the first is more concise.

3. **Future cross-link with Long COVID.** The `RelatedAside` will populate as soon as both indications cite shared references — but ref-29 through ref-32 are fibromyalgia-specific, and ref-25 through ref-28 are Long COVID-specific. No shared references exist between them yet. The cross-link reverse index will surface relationships through the `neurology` department which both belong to (department → applications → indication → references). No manual cross-linking needed.

---

## DOI verification (proactive)

Will be run via `pnpm verify-refs` before commit. Expected: all 32 references resolve in CrossRef (28 existing + 4 new fibromyalgia refs).
