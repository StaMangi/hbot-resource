# Phase 4.E — Aesthetic & Reconstructive Recovery research notebook

**Source PDF:** `docs/sources/Other_HBOT_applications.pdf` § Plastic Surgery (pages 3–4).
**Glossary reference:** `docs/research/el-glossary.md` § 4.E (added in this commit).
**Scope decision:** plan-vs-PDF same pattern as 4.D — original plan named 3 indications (Flap salvage, Fat grafting, Scar reduction); flap salvage already FDA-approved, fat grafting and scar reduction not in source PDF. Replaced with 1 umbrella indication + plastic surgery dept activation.

## Source disposition

- **ref-37** Neel et al. 2023, *Aesthet Surg J Open Forum* — DOI `10.1093/asjof/ojad065`. **Case–control study, n=20 (9 HBOT + 11 control), retrospectively matched, single surgeon.** Mean wound healing 13.3 days HBOT vs 36.9 days control, P<.001. Sessions started within 24 h of surgery, ~78 min at ~2.0 ATA.
- **ref-38** Francis & Baynosa 2017, *Adv Wound Care* — DOI `10.1089/wound.2016.0707`. Review article on HBOT for compromised graft/flap. Backs the salvage-adjunct mechanism description (oxygen delivery, angiogenesis, fibroblast activity, edema control).
- **ref-39** Simman & Bach 2022, *Eplasty* — case series. No DOI; PMC URL (passes verifier as ncbi.nlm.nih.gov host).
- **ref-40** Bassetto et al. 2019, *G Chir* — case series + literature overview. No DOI; PubMed URL.

Excluded:
- PDF [25] o2oasis.com — commercial popular media
- PDF [29] intechopen.com — publish-by-author book chapter (lower-tier evidence)
- PDF [30] numaoxygen.com — commercial popular media

## Evidence level — B (Stamos's call)

Level B is recognised by Stamos because the Neel 2023 case–control study provides real comparative-outcome data (13.3 vs 36.9 days, P<.001) above pure case-report quality, even though the methodology is Level III by Oxford CEBM (case-control, n=20, retrospective, single surgeon). The description surfaces the comparative outcome explicitly with the actual numbers. Other 4.E sources are reviews + case series providing supporting context.

This is one tier above 4.D's Level C (which had no comparative-outcome data, only case reports + small cohort).

## Department mapping

Plastic Surgery dept moves from `applications: []` (placeholder set in 4.A) to a populated 5-entry list:

1. Compromised Skin Grafts & Flaps (FDA, Level B) — refs [1] [13] [38]
2. Difficult Postoperative Wounds (FDA, Level A) — refs [1] [7] (cross-references Enhancement of Healing)
3. Radiation-Injured Tissue (FDA, Level A) — refs [1] [12]
4. Burns & Necrotizing Soft-Tissue Infection (FDA, Level A) — refs [1] [10]
5. Aesthetic & Reconstructive Recovery (Emerging, Level B) — refs [37] [38] [39] [40]

Like dermatology, plastic surgery cross-references existing FDA indications rather than duplicating them. ref-38 (Francis 2017) appears on two dept entries (Compromised Grafts/Flaps + Aesthetic Recovery) because the paper reviews salvage adjunct mechanisms applicable to both.

## Editorial register

- **Used**: "salvage and recovery adjunct", "comparative-outcome evidence", "case–control study", "13.3 vs 36.9 days, P<.001", "started within 24 h of surgery", "case series report consistent salvage benefit".
- **Avoided**: "miracle facelift recovery", "transformative cosmetic outcomes", "best HBOT application", "the answer to plastic surgery healing".
- **Not-first-line disclaimer**: "positioned as a salvage and recovery adjunct, not as a routine enhancer of uncomplicated cosmetic surgery". Mirrors the source PDF's own positioning.
