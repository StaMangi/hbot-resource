# Phase 4.F — Endometriosis research notebook

**Source PDF:** `docs/sources/Other_HBOT_applications.pdf` § Women's Health (pages 4–5).
**Glossary reference:** `docs/research/el-glossary.md` § 4.F (added in this commit).

## Scope decision (per Stamos)

Per Stamos's instruction: **endometriosis only**; fertility omitted; menopause already omitted (per Phase 4 plan). Women's Health dept activates with 2 applications: Pelvic Radiation Injury (cross-references existing FDA Delayed Radiation Injury) + Endometriosis (new emerging-tier indication).

## Source-PDF integrity issue surfaced

The source PDF's endometriosis section claims:
> "A pilot study described symptom improvement after 20 sessions over 4 weeks, and a registered trial indicates the topic is under active investigation.[32][34][35]"

Of the three citations:
- **[32]** is the HEROES trial registration (clinicaltrials.gov), not a pilot study.
- **[34]** is `oxify.co.uk/health-condition/hbot-for-endometriosis/` — commercial popular media. **Excluded per inclusion criteria.**
- **[35]** is `gynecologiconcologyinstitute.org/news/...` — commercial popular media. **Excluded per inclusion criteria.**

PubMed search for "hyperbaric oxygen endometriosis" returns 5 hits — none are human clinical pilot studies. The only HBOT-endometriosis primary literature in PubMed is in **animal models** (rat 2011 + mouse 2022). The "pilot study" claim in the source PDF appears to derive from the commercial-site summaries which are not citable per editorial integrity rules.

**Decision:** drop the unsupported "pilot study" claim. Re-frame the description around what IS citable: translational animal-model evidence + the registered HEROES trial. Honest framing is "Clinical evidence in humans is awaited."

This is the second editorial-integrity catch where the source PDF cited commercial media for a claim that lacks peer-reviewed support (first was 4.B's PMC11138265 protocol-not-results trap).

## Sources surviving verification

- **ref-41** Aydin et al. 2011, *Reproductive Sciences* — DOI `10.1177/1933719111400635`. Rat-model study reporting endometriotic-lesion remission with HBOT.
- **ref-42** Syahrizal et al. 2022, *International Journal of Reproductive BioMedicine* — DOI `10.18502/ijrm.v20i5.11049`. Mouse-model study reporting reduction in inflammatory markers in endometriosis.
- **ref-43** HEROES Trial — NCT06579040 (Sunnybrook Health Sciences Centre, recruiting since April 2025). ClinicalTrials.gov registry; verifier extended to accept `clinicaltrials.gov` as a recognised non-DOI repository host.

## Sources rejected

- PDF [34] oxify.co.uk — commercial popular media
- PDF [35] gynecologiconcologyinstitute.org — commercial popular media
- PDF [5] woundreference.com — commercial / clinic blog
- PDF [31] PMC9753892 — fertility paper (oocyte quality), excluded per Stamos's "fertility omitted" instruction
- PDF [33] PMC12621376 — fertility paper (oocyte yield), excluded per same instruction

## Evidence level — C

Honest C: no published human clinical evidence; only animal-model translational data + registered trial awaiting results. The framing is "investigational adjunct, not standard of care" with explicit "clinical evidence in humans is awaited".

## Verifier extension

Added `clinicaltrials.gov` to the verifier's `NON_DOI_HOSTS_RE`. Trial registries are stable, official sources widely cited in medical literature; treating them as a recognised non-DOI repository host is the right precedent for any future indication that needs to cite a registered trial without a published protocol paper.
