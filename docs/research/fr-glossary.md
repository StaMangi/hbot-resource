# French terminology glossary — APPLIED, native review pending

**Status:** APPLIED — used across the FR site rolled out in Phase 7.D (2026-09-24). Native-speaker medical review has not been completed; open as a Phase 8 deliverable, mirroring the de/it/es glossaries (applied, review pending). A reviewer walking each section should lock approved terms with **(locked)** and flag any term needing revision (each revision triggers a sweep across `src/content/**` + `src/pages/fr/**` + `src/i18n/fr.ts`).
**Scope:** binding EN→FR terminology for clinical content; modelled on `el-glossary.md` / `es-glossary.md`. Reviewer authority: a French-speaking clinician familiar with hyperbaric medicine literature.
**Variant:** **standard metropolitan French** (Académie / Imprimerie nationale conventions). Region-specific (Québec, Belgium, Switzerland) lexicon avoided.

---

## 0. Locked rollout decisions (flag for native reviewer)

| Decision | Choice | Rationale |
|---|---|---|
| French variant | Standard metropolitan French | Widest comprehension across FR-speaking Europe and Africa. |
| Decimal separator — prose | **COMMA** — « 2,5 ATA », « 62,5 % », « 42,6 » | French norm. Same choice as IT. |
| Decimal separator — protocol fields | Identical to EN (« 2.0 – 2.5 ATA ») | Protocol field values are shared numeric strings across all locales (same as IT/DE); changing them per locale would fork the data. Flag for reviewer. |
| Percent / units spacing | Non-breaking space before % and units in prose: « 62,5 % », « 90 minutes » | French typography. |
| HBOT abbreviation | **HBOT** kept (not « OHB ») | Cross-locale consistency, "HBOT Science" brand, SEO. Full form « oxygénothérapie hyperbare » used in prose where spelled out. Mirrors ES/IT. Flag for reviewer (OHB is common in French clinical literature). |
| RCT abbreviation | **ECR** (essai contrôlé randomisé) | Expand on first occurrence in any field — « essai contrôlé randomisé (ECR) » — then bare « ECR ». Mirrors EL ΤΕΔ / DE RKS / ES ECA. |
| Quotation marks | « guillemets » with non-breaking inner spaces | French print standard. |
| High punctuation | Non-breaking space before « : ; ? ! » | French typography. |
| UHMS / FDA | « l'UHMS », « la FDA » | Acronyms kept; article per gender of the expanded name (la Society → l'UHMS; la Food and Drug Administration). |
| British spellings in EN (programme, centre) | n/a | EN-only concern. |

## 1. Study types and methodology

| EN | FR | Notes |
|---|---|---|
| randomised controlled trial (RCT) | essai contrôlé randomisé (ECR) | First-use expansion, then ECR. |
| trial | essai | |
| clinical trial | essai clinique | |
| crossover RCT | ECR croisé | |
| feasibility RCT / trial | ECR / essai de faisabilité | |
| sham-controlled | contrôlé contre placebo (simulation, « sham ») | first use; later « contrôlé contre simulation » |
| double-blind | en double aveugle | |
| clinical review | revue clinique | |
| systematic review | revue systématique | |
| meta-analysis | méta-analyse | |
| cohort | cohorte | |
| observational study | étude observationnelle | |
| prospective study | étude prospective | |
| retrospective study | étude rétrospective | |
| preclinical study | étude préclinique | |
| case-control study | étude cas-témoins | |
| case series | série de cas | |
| case report | cas clinique | |
| trial protocol | protocole d'essai | |
| trial registration | enregistrement de l'essai | |
| follow-up | suivi | « suivi à un an » |
| participation effect | effet de participation | |

## 2. Evidence-level register

| EN | FR | Notes |
|---|---|---|
| Evidence Level A / B / C | Niveau de preuve A / B / C | |
| Standard of Care | Traitement de référence | |
| Emerging Evidence | Données émergentes | tier label |
| UHMS-Approved | Approuvé par l'UHMS | tier label |
| UHMS-Approved Indications | Indications approuvées par l'UHMS | section heading |
| FDA-cleared | autorisé par la FDA | the FDA *clears* devices — « autorisé », not « approuvé » |
| Clinical Research | Recherche clinique | |
| Investigational | Expérimental | tier/status |
| Under Research | En cours de recherche | dept badge |
| Contested evidence | Données controversées | |
| Adjunct — limited evidence | Adjuvant — données limitées | |
| Regulatory Framework | Cadre réglementaire | |
| Clinical Evidence | Données cliniques | |

## 3. Caveat and uncertainty register

Caveats for emerging-tier and contested entries must NOT be softened in FR.

| EN | FR |
|---|---|
| The evidence base is currently anchored to a single research group; independent replication is awaited. | Les données reposent actuellement sur un seul groupe de recherche ; une réplication indépendante est attendue. |
| Investigational; not FDA-approved. | Expérimental ; non approuvé par la FDA. |
| not a clinical recommendation | pas une recommandation clinique |
| may improve | peut améliorer |
| preliminary evidence suggests | des données préliminaires suggèrent |
| significant improvement (statistical) | amélioration significative |
| sustained at follow-up | maintenu au cours du suivi |
| Not standardised | Non standardisé |

**Forbidden register** (must not appear): « révolutionnaire », « miracle », « transformateur », « la solution à ».

## 4. Condition vocabulary

| EN | FR |
|---|---|
| air or gas embolism | embolie gazeuse |
| carbon monoxide poisoning | intoxication au monoxyde de carbone |
| clostridial myositis and myonecrosis (gas gangrene) | myosite et myonécrose à clostridies (gangrène gazeuse) |
| crush injury, compartment syndrome | écrasement, syndrome des loges |
| decompression sickness | accident de décompression |
| central retinal artery occlusion | occlusion de l'artère centrale de la rétine |
| selected problem wounds / diabetic foot ulcers | plaies chroniques sélectionnées / ulcères du pied diabétique |
| severe (exceptional blood-loss) anaemia | anémie sévère (perte sanguine exceptionnelle) |
| intracranial abscess | abcès intracrânien |
| necrotising soft-tissue infections | infections nécrosantes des tissus mous |
| refractory osteomyelitis | ostéomyélite réfractaire |
| delayed radiation injury (soft-tissue and bony necrosis) | lésions radiques tardives (nécrose des tissus mous et osseuse) |
| osteoradionecrosis | ostéoradionécrose |
| compromised grafts and flaps | greffes et lambeaux compromis |
| acute thermal burns | brûlures thermiques aiguës |
| avascular necrosis of the femoral head | ostéonécrose aseptique de la tête fémorale |
| idiopathic sudden sensorineural hearing loss | surdité brusque idiopathique (neurosensorielle) |
| tinnitus | acouphènes |
| Long COVID | COVID long |
| brain fog | « brouillard cérébral » |
| fibromyalgia | fibromyalgie |
| endometriosis | endométriose |
| post-traumatic stress disorder (PTSD) | trouble de stress post-traumatique (TSPT) |
| traumatic brain injury (TBI), mild TBI | traumatisme crânien (TC), traumatisme crânien léger |
| post-concussion syndrome | syndrome post-commotionnel |
| stroke, ischaemic stroke | accident vasculaire cérébral (AVC), AVC ischémique |
| Acquired Brain Injury (category) | Lésions cérébrales acquises |
| Post-Viral Syndromes | Syndromes post-viraux |
| Chronic Pain Syndromes | Syndromes douloureux chroniques |
| Neuropsychiatric | Troubles neuropsychiatriques |
| Bone Disorders | Pathologies osseuses |
| Wound Healing | Cicatrisation des plaies |

## 5. Treatment, protocol and mechanism vocabulary

| EN | FR |
|---|---|
| HBOT | HBOT (see §0) |
| Hyperbaric Oxygen Therapy | oxygénothérapie hyperbare |
| hyperbaric chamber (monoplace / multiplace) | caisson hyperbare (monoplace / multiplace) |
| session | séance |
| Once daily, 5×/week | Une fois par jour, 5×/semaine |
| air breaks | pauses d'air |
| adjunctive therapy / adjunct | traitement adjuvant / adjuvant |
| hyperoxic-hypoxic paradox | paradoxe hyperoxie-hypoxie |
| angiogenesis | angiogenèse |
| neuroplasticity | neuroplasticité |
| telomere / telomerase | télomère / télomérase |
| senescent cells | cellules sénescentes |
| stem-cell mobilisation | mobilisation des cellules souches |
| oedema | œdème |
| Departments (site section) | Services |
| Longevity | Longévité |

## 6. Proper nouns kept in original

HOT-LoCO, HEROES (trial names) · UHMS, FDA, CMS, NCD, NIHSS, CAPS-5, SPECT, MRI→IRM, DTI · NCT numbers · author surnames and "et al." · DOI URLs · journal names · Latin genus/species.

## 7. Open items for the native reviewer

- Confirm **HBOT** over the French **OHB**.
- Confirm keeping protocol-field numbers in EN format (« 2.0 ATA ») while prose uses the decimal comma.
- Confirm **« Services »** for Departments and **« Données émergentes »** for the emerging tier.
- Confirm « contrôlé contre simulation » for sham-controlled.

## 8. Choices made during the Phase 7.D rollout (pending native review)

| EN | FR | Where |
|---|---|---|
| Acute Ischemias / Toxicities / Sensory Disorders / Infectious Diseases | Ischémies aiguës / Intoxications / Troubles sensoriels / Maladies infectieuses | indication categories |
| Gas/Bubble Disorders | Troubles liés aux gaz et aux bulles | category |
| Reproductive Health / Aesthetic & Reconstructive Surgery / Inflammatory Skin Disease | Santé reproductive / Chirurgie esthétique et reconstructrice / Maladies cutanées inflammatoires | categories |
| Geriatric Assessment / Surgery Sector / Rehabilitation Medicine | Évaluation gériatrique / Chirurgie / Médecine physique et de réadaptation | department names |
| ENT (Otolaryngology) | ORL (oto-rhino-laryngologie) | department |
| mTBI / CRAO / TKA / IBD / CT / PET | TCL / OACR / PTG / MICI / TDM (scanner) / TEP | abbreviations |
| UHMS / Emergency Standard | UHMS / Standard d'urgence | protocol basis |
| (emergency) · Immediately, then daily · Continuous until stable | (urgence) · Immédiatement, puis quotidiennement · En continu jusqu'à stabilisation | protocol fields |
| In favour / Against (TBI) | Arguments favorables / Arguments défavorables | TBI write-up |
| Related (aside) · Home (breadcrumb) | Voir aussi · Accueil | UI |
| Evidence (nav) | Preuves | nav + `nav.evidence` |
| Research Digest | Veille scientifique | nav |
| How we verify (footer) | Notre méthode de vérification | footer |
| Operator Blueprint | Plan directeur de l'opérateur | page title |
| hard-shell / soft-shell chambers | caissons rigides / souples | operator blueprint |
| the bends | « maladie des caissons » | DCS answer box |
| HBOT grammatical gender | feminine — « l'HBOT est expérimentale » | throughout (follows « oxygénothérapie ») |
| P-values | decimal comma — « P < 0,001 » | prose (EL/DE also convert; IT/ES keep « .001 ») |

**Source issues surfaced by the FR translators (not FR-specific):**
- `exceptional-blood-loss-anemia` is filed under the category "Infectious Diseases" in every locale — looks like an inherited mis-categorisation.
- ES `safety` page softens "universally recognised" to "generalmente reconocida" — minor ES drift.
- `strategy.market.body` (i18n, not rendered on any page) still says "FDA-approved clinical applications".
