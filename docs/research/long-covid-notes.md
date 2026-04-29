# Phase 4.B — Long COVID research notebook

**Status:** in progress (PR `phase-4/long-covid` open).
**Source PDF:** `docs/sources/Other_HBOT_applications.pdf` § Long COVID (page 1).

---

## Source PDF claims and disposition

The PDF cited 5 sources for Long COVID. Four are peer-reviewed and survive verification; one was excluded. Each PDF claim was traced back to its underlying paper before any wording was carried into the indication YAML.

### Sources surviving verification (carried into `references` collection)

- **ref-25** — Zilberman-Itskovich et al., *Sci Reports* 2022. DOI `10.1038/s41598-022-15565-0`. The seminal RCT. n=73 long COVID patients, 40 HBOT sessions vs sham at 2.0 ATA / 90 min / 5×/week. Reported significant improvements in cognitive function, sleep, pain, psychiatric symptoms.
- **ref-26** — Hadanny et al., *Sci Reports* 2024. DOI `10.1038/s41598-024-53091-3`. Longitudinal one-year follow-up of the same cohort (n=31 of original 73). Effect sizes sustained: pain interference ES=0.83, pain severity ES=0.69, sleep quality ES=0.47–0.79.
- **ref-27** — Katz et al., *Frontiers in Medicine* 2024. DOI `10.3389/fmed.2024.1354088`. Clinical review of Nov 2021 – Jan 2024 literature. Frames HBOT as addressing endothelial dysfunction, mitochondrial impairment, and neuroinflammation — the candidate pathophysiology of long COVID.
- **ref-28** — Kjellberg et al., *BMJ Open* 2022. DOI `10.1136/bmjopen-2022-061870`. The HOT-LoCO RCT protocol. Phase II, n=80, 10 sessions over 6 weeks. **Trial protocol — results not yet published.** Cited here as evidence that an independent group is actively running a replication trial.

### Source rejected from references collection

- **PDF [1] (PMC11138265)** — Li Y et al., *BMJ Open* 2024. The PDF cited this as a long COVID HBOT efficacy source, but on inspection it's a **protocol for a future systematic review** — i.e. the authors are *planning* to review the literature, not reporting findings. Per Phase 4 plan methodology (peer-reviewed RCT/meta-analysis/cohort preferred; protocols-without-results have only procedural weight), this source does not support a claim about HBOT efficacy. Excluded from the references collection. Avoiding a 30-50%-style trap where a procedural document is dressed up as evidence.

### Source explicitly excluded by methodology

- **PDF [6]** — Yale Medicine news article. Popular-media explainer aimed at patients. Per Phase 4 plan inclusion criteria (peer-reviewed only, no popular media), excluded outright.

---

## Quantitative claims — traceability check

All numeric claims in the indication content traced back to their source.

| Claim | In YAML? | Source | Verified? |
|---|---|---|---|
| 40 HBOT sessions | yes (protocol.sessions) | ref-25 (Zilberman-Itskovich 2022 protocol) | ✓ |
| 2.0 ATA pressure | yes (protocol.ata) | ref-25 | ✓ |
| 90 min session duration | yes (protocol.duration) | ref-25 (Tel Aviv group standard, confirmed by ref-26 follow-up paper) | ✓ |
| 5×/week frequency | yes (protocol.frequency) | ref-25 | ✓ |
| "one-year follow-up" sustained benefits | yes (description) | ref-26 (longitudinal subset n=31 from the original 73) | ✓ |
| Effect sizes (ES=0.83 pain interference, etc.) | NO — kept qualitative | ref-26 has them; deliberately not paraphrased into the indication description (concise framing) | n/a |

**No quantification carried that isn't in a cited source.** Editorial-integrity precedent (Phase 3.B Flag #2) honoured: every number is in ref-25 or ref-26.

---

## Evidence level reasoning — why B not A

**Evidence Level: B.**

Decision basis (per Phase 4 plan methodology):
- **A** = multiple Level I sources, consistent results, clinically actionable.
- **B** = single Level I source OR multiple consistent Level II sources.
- **C** = Level II/III only OR mixed/conflicting.

For Long COVID HBOT:
- One foundational Level I RCT (ref-25) with sustained-benefit longitudinal extension (ref-26).
- One supportive clinical review (ref-27) — narrative, not meta-analytic.
- Independent replication is **not yet published** — HOT-LoCO (ref-28) is the protocol of a phase II trial in progress at Karolinska, results pending.
- All published positive evidence to date emerges from a single research group at Tel Aviv University (Efrati lab). Not yet replicated by independent investigators.

**Inflating to A would misrepresent the field.** Single-group evidence — even a well-designed RCT — does not meet the "multiple Level I, clinically actionable" threshold. The honest framing is "B with replication awaited", which is what the indication description states.

---

## Editorial register — language choices

Per the Phase 4 plan's anti-marketing reminder:

- **Used**: "may improve", "associated with", "preliminary evidence suggests", "evidence remains anchored to a single research group", "independent replication is awaited".
- **Avoided**: "transformative", "breakthrough", "unprecedented", "revolutionary", "the answer to long COVID".
- **Quantification**: kept where source-cited; dropped where it would be paraphrased.

The cognitive symptom set ("brain fog") is in quotes because it's the patient-facing term, not a clinical diagnosis. Cognitive dysfunction is the clinical referent.

---

## Bilingual parity check

Every claim, every caveat, every protocol parameter — same in EN and EL on the same commit. No asymmetry. The Greek translation of "evidence currently anchored to a single research group; independent replication ongoing" appears in both:
- `condition.long-covid.description.el`
- `departments.neurology.applications[Long COVID].description.el`

Same caveat in both places, same wording register. Nothing softened in EL.

---

## Department mapping

Long COVID added as the 6th application in `departments/neurology.yaml`. Reasons:

- Cognitive dysfunction is the dominant chronic symptom that drove the RCT primary endpoint.
- The Tel Aviv group's RCT framing centres on neurocognitive effects.
- Other affected systems (cardiopulmonary, GI, pain) overlap but the neuro framing is most defensible per the published trial's primary endpoints.

This means clicking a `[25]` or `[26]` ref tag from the dept page or the indication detail will resolve to the same `/references/#ref-N` anchor — cross-link reverse index from Phase 3.E will surface neurology + the long-covid indication on each ref's "Cited in" trail.

---

## Open questions for the Stamos review

1. **Category naming.** I used "Post-Viral Syndromes" / "Μετα-ϊογενή Σύνδρομα" as the indication category. Fibromyalgia (4.C next) doesn't fit cleanly under post-viral. Two options when 4.C lands:
    - Rename the category to something broader ("Chronic Multisystem Conditions"?) and re-categorise long-covid into it.
    - Keep "Post-Viral Syndromes" for long-covid only and create a separate category for fibromyalgia.
    Flagging now so the decision is made in 4.C with the cluster pattern intact.

2. **Cross-references to wellness path.** Long COVID symptoms (fatigue, brain fog, sleep, pain) overlap with the Hadanny 2020 cognitive enhancement / telomere work that drives the wellness path. The cross-link reverse index will already surface relationships via shared references (e.g. ref-3 / ref-25 are both Tel Aviv group). No manual cross-linking needed; the build-time index handles it.

3. **HOT-LoCO results posture.** The Karolinska HOT-LoCO trial was registered in 2022 and is the most awaited independent replication. When results publish (positive or negative), the long-covid indication will need an editorial update. Adding a `lastReviewed` or `evidenceUpdate` audit field to the schema is a Phase 5 consideration.

---

## DOI verification (proactive — `pnpm verify-refs`)

Run before commit:
- All 24 existing references resolve in CrossRef.
- 4 new references (ref-25 to ref-28) resolve in CrossRef.
- Total: 28 references, 0 broken DOIs.
