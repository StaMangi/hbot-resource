# Phase 4.D — Dermatology research notebook

**Status:** in progress (PR `phase-4/dermatology` open).
**Source PDF:** `docs/sources/Other_HBOT_applications.pdf` § Dermatology (pages 2–3).
**Glossary reference:** `docs/research/el-glossary.md` § 4.D (added in this commit).
**Scope decision:** see `docs/PHASE-4-PLAN.md` line 46 — original 4-indication list replaced post-PDF reading with one umbrella indication + dept activation. Three of four planned indications were already FDA-approved in our taxonomy; the fourth (Necrobiosis lipoidica) is not in the source PDF.

---

## Source PDF claims and disposition

The PDF cited 7 sources for Dermatology ([17] through [23], plus indirect reuse of [25] which is plastic-surgery context). After de-duplication and inclusion-criteria filtering, four unique peer-reviewed papers remain.

### Sources surviving verification (carried into `references` collection)

- **ref-33** — Goggins & Khachemoune, *Acta Dermatovenerologica APA* 2019. DOI `10.15570/actaapa.2019.20`. Review covering necrotizing soft tissue infections, compromised grafts and flaps, hidradenitis suppurativa, and pyoderma gangrenosum. **Bridges established (NSTI, grafts/flaps) and emerging (HS, PG) — used both for the dermatology dept's FDA-approved entries and for the new Inflammatory Dermatoses indication.**
- **ref-34** — Zwoliński et al., *J Clin Med* 2025. DOI `10.3390/jcm14093138`. Review on the supporting role of HBOT in atopic dermatitis treatment. The 2025 review the source PDF references for AD reductions in pruritus, lesion severity, and S. aureus colonisation.
- **ref-35** — Mews et al., *J Clin Med* 2021. DOI `10.3390/jcm10061157`. Paediatric clinical study: effects of HBOT in children with severe atopic dermatitis. The "30-session cycle" paediatric study cited in the PDF.
- **ref-36** — Butler et al., *J Med Case Reports* 2009. DOI `10.1186/1752-1947-0003-0000007023`. Two case reports: one pustular/arthropathic psoriasis remission after 6 sessions at 2.8 ATA × 60 min; one psoriasis vulgaris case improving after 15 sessions at 2.0 ATA × 90 min.

### De-duplications collapsed

- **PDF [21] = PDF [26]** — Both link to the Butler 2009 psoriasis vulgaris paper. PMC2737769 vs PubMed/19830133. Same paper, kept once as ref-36.

### Sources rejected by methodology

- **PDF [23]** — `oxygeneration.com/hbot-resource-library/dermatology` — HBOT clinic Galway Ireland. Commercial popular-media; excluded per Phase 4 inclusion criteria. Same exclusion logic as Yale Medicine in 4.B and Oxynova in 4.C.
- **PDF [25]** — `o2oasis.com/utilizing-hyperbaric-oxygen-therapy-for-optimal-healing-of-compromised-skin-grafts-and-flaps/` — commercial site. Excluded.

### Source not used (already covered)

- **PDF [18]** — Cohen *et al.* 2022, "Role of Hyperbaric Oxygen Therapy in Cosmetic and Therapeutic Skin Conditions" (PMC9748824). Peer-reviewed but the cosmetic-rejuvenation framing is explicitly *outside* the scope this dermatology indication takes (the source PDF lead even says HBOT is "*not* for cosmetic rejuvenation"). Kept available for 4.E plastic surgery context if needed; not required by 4.D.
- **PDF [19]** — Skin Grafts and Flaps StatPearls (NBK470219). Already implicitly relevant to the Compromised Skin Grafts and Flaps FDA indication (which carries existing refs [1], [13]); not added to dermatology because the dept entry uses the existing FDA refs plus ref-33 (Goggins 2019) which is the more current dermatology-specific source.

---

## Quantitative claims — traceability check

| Claim | In YAML? | Source | Verified? |
|---|---|---|---|
| atopic dermatitis: pruritus / lesion severity / S. aureus colonisation reduction | yes (description) | ref-34 (Zwoliński 2025 review) | ✓ |
| atopic dermatitis: paediatric severe-disease improvement after 30-session cycle | yes (description, framed as paediatric study) | ref-35 (Mews 2021) | ✓ |
| psoriasis: pustular/arthropathic remission after 6 sessions at 2.8 ATA × 60 min | yes (description) | ref-36 (Butler 2009 case 1) | ✓ |
| psoriasis vulgaris improvement after 15 sessions at 2.0 ATA × 90 min | yes (description) | ref-36 (Butler 2009 case 2) | ✓ |
| hidradenitis suppurativa, livedoid vasculopathy, pyoderma gangrenosum: early-stage clinical reports, lack robust trials | yes (description) | ref-33 (Goggins 2019 review covers HS+PG) for HS+PG; LV is honestly framed as "described but lacks robust trials" with no specific citation since the PDF doesn't provide one | ✓ (LV framing deliberately conservative) |
| Protocols vary widely / not standardised | yes (description) | ref-34 (Zwoliński 2025 review) — explicit | ✓ |

**No quantification carried that isn't in a cited source.** The hidradenitis suppurativa / livedoid vasculopathy / pyoderma gangrenosum mentions are deliberately framed as "have been described in early-stage clinical reports but lack robust supporting trials" — the only solid citation source for HS and PG is the Goggins 2019 review (ref-33). Livedoid vasculopathy has no direct citation in our reference set; it appears in the source PDF as a list-of-conditions mention only, so the YAML treats it the same way.

---

## Evidence level reasoning — why C

**Evidence Level: C.**

Decision basis (per Phase 4 plan methodology):
- **A** = multiple Level I sources, consistent results, clinically actionable.
- **B** = single Level I source OR multiple consistent Level II sources.
- **C** = Level II/III only OR mixed/conflicting OR case-level.

For Inflammatory Dermatoses HBOT:
- No RCTs published.
- One paediatric clinical study (ref-35 Mews 2021) on severe atopic dermatitis — observational/single-arm.
- One 2025 review (ref-34 Zwoliński) — narrative, not meta-analytic.
- Two psoriasis case reports (ref-36 Butler 2009).
- One mixed-condition review (ref-33 Goggins 2019) covering HS, PG, NSTI, grafts.
- Protocols vary widely; no standard regimen.

**Going to B would require** a controlled trial in any of these conditions. None exists at the time of writing.

This is the first Level C indication added in Phase 4. Long COVID and Fibromyalgia were B; Inflammatory Dermatoses is honestly C. The framing reflects that — "case-level and small-cohort evidence", "protocols vary widely and are not standardised", "HBOT is positioned as adjunctive, not first-line".

---

## Editorial register — language choices

Per the Phase 4 plan's anti-marketing reminder and the glossary lock from 4.B/4.C:

- **Used**: "case-level and small-cohort evidence", "supports HBOT as an adjunct", "described in early-stage clinical reports", "lack robust supporting trials", "protocols vary widely and are not standardised", "positioned as adjunctive, not first-line".
- **Avoided**: "promising new treatment", "breakthrough", "miracle for psoriasis", "the answer to atopic dermatitis".
- **Quantification**: protocol parameters from specific case reports kept verbatim (6 sessions at 2.8 ATA × 60 min; 15 sessions at 2.0 ATA × 90 min) since they're source-cited.

The "not first-line" framing is critical for an authority site — clinical readers will scrutinise whether we're overstating evidence. By explicitly positioning HBOT as adjunctive for these conditions, the page sets honest expectations.

---

## Greek glossary — additions for this cluster

The following terms were used in the Inflammatory Dermatoses translation but were not in the glossary as locked at end of 4.C. They are appended to `docs/research/el-glossary.md` § 4.D in the same commit:

- **Inflammatory Dermatoses** → Φλεγμονώδεις Δερματοπάθειες
- **Inflammatory Skin Disease** → Φλεγμονώδης Δερματοπάθεια (category label, singular form)
- **atopic dermatitis** → ατοπική δερματίτιδα
- **psoriasis vulgaris / plaque psoriasis** → ψωρίαση κατά πλάκες
- **pustular psoriasis** → φλυκταινώδης ψωρίαση
- **arthropathic psoriasis** → αρθροπαθική ψωρίαση
- **hidradenitis suppurativa** → πυώδης ιδρωταδενίτιδα
- **livedoid vasculopathy** → λιβεδοειδής αγγειοπάθεια
- **pyoderma gangrenosum** → γαγγραινώδες πυόδερμα
- **pruritus** → κνησμός
- **lesion severity** → σοβαρότητα βλαβών
- **Staphylococcus aureus colonisation** → αποικισμός από Staphylococcus aureus (genus name kept Latin)
- **case reports** → αναφορές περιπτώσεων
- **small-cohort evidence** → στοιχεία μικρών ομάδων
- **adjunctive, not first-line** → επικουρική, όχι πρώτης γραμμής
- **chronic non-healing wounds** → χρόνιες μη-επουλούμενες πληγές
- **diabetic foot ulcers** → διαβητικά έλκη ποδιού
- **vascular ulcers** → αγγειακά έλκη
- **radiation dermatitis** → ακτινική δερματίτιδα
- **soft-tissue radiation injury** → ακτινική βλάβη μαλακών ιστών
- **necrotizing fasciitis** → νεκρωτική περιτονίτιδα
- **Fournier's gangrene** → γάγγραινα Fournier (proper noun kept Latin)
- **flaps (skin)** → κρημνοί
- **skin grafts** → δερματικά μοσχεύματα
- **compromised** (graft/flap) → διακυβευμένο / ισχαιμικό

---

## Bilingual parity check

Every claim, every caveat, every protocol parameter — same in EN and EL. The "adjunctive, not first-line" disclaimer appears in both:
- `condition.inflammatory-dermatoses.description.el`
- `departments.dermatology.applications[Inflammatory Dermatoses].description.el`

Same wording register. The HS / livedoid vasculopathy / PG triad is mirrored verbatim.

---

## Department mapping

Inflammatory Dermatoses added as the 5th application in `departments/dermatology.yaml`. The dermatology dept moves from `applications: []` (placeholder set up in 4.A) to a populated 5-entry list:

1. **Chronic Non-Healing Wounds** (FDA-Approved, Level A) — refs [1] [7] (cross-references the existing `enhancement-of-healing-in-selected-problem-wounds` indication)
2. **Radiation Dermatitis & Soft-Tissue Radiation Injury** (FDA-Approved, Level A) — refs [1] [12]
3. **Compromised Skin Grafts & Flaps** (FDA-Approved, Level B) — refs [1] [13] [33]
4. **Burns & Necrotizing Soft-Tissue Infection** (FDA-Approved, Level A) — refs [1] [10] [33]
5. **Inflammatory Dermatoses** (Emerging, Level C) — refs [33] [34] [35] [36]

ref-33 (Goggins 2019) appears on three dept entries because the paper specifically reviews NSTI + grafts/flaps + HS + PG — it's the cleanest single source bridging the dept's FDA-approved and emerging applications.

---

## Open questions for the Stamos review

1. **Livedoid vasculopathy citation gap.** The PDF mentions LV in the inflammatory dermatoses list but cites no specific paper for it. The current YAML lists LV in the "described in early-stage clinical reports" sentence without a specific reference. Two options:
   - Keep current framing (honest about evidence gap, but mentions a condition without a direct citation).
   - Drop LV entirely from the description (preserves strict citation hygiene).
   I lean toward keeping current framing — the source PDF acknowledges LV exists in the literature, and our description's "lack robust supporting trials" is itself a warning. But if you want strict citation discipline, drop it. Hidradenitis and pyoderma gangrenosum don't have this problem because ref-33 (Goggins 2019) covers them.

2. **Cohen 2022 cosmetic-skin-conditions paper (PMC9748824) excluded from 4.D.** It's peer-reviewed but covers cosmetic indications which we explicitly position against. Decision to exclude is documented above. If 4.E (plastic surgery / aesthetic) wants to cite it for the aesthetic-surgery context, it'll be added then. Flagging now in case you'd rather cite it conservatively in 4.D as a counterpoint reference.

3. **Goggins 2019 ref-33 used on three dept entries.** Editorially defensible (the paper specifically reviews each of NSTI, grafts/flaps, HS, PG) but creates the strongest cross-link signal of any reference so far in the site. The cross-link reverse index will surface dermatology + the inflammatory-dermatoses indication on the ref-33 "Cited in" trail. No action needed; flagging the structural feature.

---

## DOI verification (proactive)

Will be run via `pnpm verify-refs` before commit. Expected: all 36 references resolve in CrossRef (32 existing + 4 new dermatology refs).
