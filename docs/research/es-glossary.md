# Spanish terminology glossary — APPLIED, native review pending

**Status:** APPLIED — these terms have been used across the production ES site rolled out in Phase 7.C (Stage 6, 2026-05-29). Native-speaker medical review has not been completed; open as a Phase 8 deliverable, mirroring the el-glossary (locked) / de-glossary / it-glossary (applied, review pending) cadence. A reviewer walking each section should lock approved terms with **(locked)** and flag any term that needs revision (each revision triggers a content sweep across `src/content/**` + `src/pages/es/**` + `src/i18n/es.ts`).
**Scope:** binding-on-the-current-site EN→ES terminology for clinical content; modelled on the locked Greek glossary at `el-glossary.md`. Reviewer authority: a Spanish-speaking clinician familiar with hyperbaric medicine literature.
**Variant:** **neutral / international Spanish**, RAE-consistent. Region-specific lexicon avoided.

---

## 0. Locked rollout decisions (flag for native reviewer)

| Decision | Choice | Rationale |
|---|---|---|
| Spanish variant | Neutral / international (RAE) | Widest comprehension; avoids region-specific lexicon. |
| Decimal separator | **POINT** — "2.0 ATA", "62.5%", "44.2 mil millones" | International legibility + consistency with the source papers. Deliberately NOT the decimal comma used in the IT locale. Flag for reviewer. |
| HBOT abbreviation | **HBOT** kept (not "OHB") | Cross-locale consistency, "HBOT Science" brand, SEO. Full form "oxigenoterapia hiperbárica" used in prose where spelled out. Mirrors IT OTI→HBOT. Flag for reviewer. |
| RCT abbreviation | **ECA** (ensayo clínico aleatorizado) | Expand on first occurrence in any field/document — "ensayo clínico aleatorizado (ECA)" — then bare "ECA". Mirrors EL (ΤΕΔ) / DE (RKS) / IT (RCT) convention. |
| Quotation marks | Angular «comillas» | Spanish print standard. Applied where EL/DE/IT use locale quotes. |

## 1. Study types and methodology

| EN | ES | Notes |
|---|---|---|
| randomised controlled trial (RCT) | ensayo clínico aleatorizado (ECA) | First-use expansion, then ECA. |
| trial | ensayo | |
| clinical trial | ensayo clínico | |
| clinical review | revisión clínica | |
| longitudinal follow-up | seguimiento longitudinal | "one-year follow-up" → "seguimiento a un año" |
| cohort | cohorte | |
| meta-analysis | metaanálisis | RAE: one word, no hyphen |
| systematic review | revisión sistemática | |
| observational study | estudio observacional | |
| preclinical study | estudio preclínico | |
| case-control study | estudio de casos y controles | |
| case series | serie de casos | |
| case report | caso clínico | |
| trial protocol | protocolo del estudio | |
| trial registration | registro del ensayo | |

## 2. Evidence-level register

| EN | ES | Notes |
|---|---|---|
| Evidence Level A / B / C | Nivel de evidencia A / B / C | |
| Standard of Care | Estándar de atención | over "tratamiento estándar"; RAE-consistent medical register |
| Emerging Evidence | Evidencia emergente | tier label |
| FDA-Approved | Aprobado por la FDA | FDA kept as-is |
| FDA-Approved Indications | Indicaciones aprobadas por la FDA | section heading |
| Clinical Research | Investigación clínica | |
| Investigational | Experimental | over "en investigación" for the tier; "En investigación" used for the dept "Under Research" badge |
| Under Research | En investigación | |
| Regulatory Framework | Marco normativo | |
| Clinical Evidence | Evidencia clínica | |
| Level A Meta-Analysis | Metaanálisis de Nivel A | |

## 3. Caveat and uncertainty register

The caveat phrasing for emerging-tier indications must NOT be softened in ES.

| EN | ES |
|---|---|
| The evidence base is currently anchored to a single research group; independent replication is awaited. | La base de evidencia se sustenta actualmente en un único grupo de investigación; se espera una replicación independiente. |
| may improve | puede mejorar |
| associated with | asociado a |
| preliminary evidence suggests | la evidencia preliminar sugiere |
| significant improvement (statistical) | mejora significativa |
| sustained at follow-up | mantenido en el seguimiento |
| benefits sustained | beneficios mantenidos |
| investigational adjunct, not standard of care | adyuvante experimental, no estándar de atención |
| Not standardised | No estandarizado |

**Forbidden register** (must not appear in ES or EN): "transformador", "revolucionario", "avance milagroso", "la solución para", "milagro".

## 4. Symptom and condition vocabulary

| EN | ES | Notes |
|---|---|---|
| Long COVID | COVID persistente (Long COVID) | First mention keeps the international term, appends Spanish descriptor |
| Post-Viral Syndromes | Síndromes posvirales | category label |
| persistent / multisystem symptoms | síntomas persistentes / multisistémicos | |
| SARS-CoV-2 infection | infección por SARS-CoV-2 | virus name kept |
| fatigue | fatiga | |
| cognitive dysfunction | disfunción cognitiva | |
| "brain fog" | "niebla mental" | RAE-friendly lay term |
| sleep disturbance | trastornos del sueño | |
| pain | dolor | |
| symptom burden | carga sintomática | |
| angiogenesis | angiogénesis | |
| neuroinflammation | neuroinflamación | |
| neuroplasticity | neuroplasticidad | |
| ischaemic stroke | ictus isquémico | |
| Fibromyalgia | Fibromialgia | |
| Chronic Pain Syndromes | Síndromes de dolor crónico | |
| Endometriosis | Endometriosis | |
| Reproductive Health | Salud reproductiva | |
| Inflammatory Dermatoses | Dermatosis inflamatorias | |
| wound healing | cicatrización de heridas | |
| diabetic foot ulcers | úlceras de pie diabético | |
| necrotising fasciitis | fascitis necrosante | |
| skin grafts / flaps | injertos cutáneos / colgajos | |
| radiation injury | lesión por radiación / daño por radiación | |
| osteomyelitis | osteomielitis | |
| decompression sickness | enfermedad por descompresión | |
| carbon monoxide poisoning | intoxicación por monóxido de carbono | |
| sudden sensorineural hearing loss | hipoacusia neurosensorial súbita | |

## 5. Treatment and protocol vocabulary

| EN | ES | Notes |
|---|---|---|
| HBOT | HBOT | see §0 |
| Hyperbaric Oxygen Therapy | oxigenoterapia hiperbárica | full form |
| Hyperbaric Medicine | medicina hiperbárica | |
| session | sesión | |
| 2.0 ATA | 2.0 ATA | decimal point, see §0 |
| 90 min | 90 min | |
| Once daily, 5×/week | Una vez al día, 5×/semana | |
| Once or twice daily | Una o dos veces al día | |
| Immediately, then daily | De inmediato, luego diariamente | |
| Continuous until stable | Continuo hasta la estabilización | |
| Per radiation course | Por ciclo de radioterapia | |
| Prior to each radiation fraction | Antes de cada fracción de radioterapia | |
| 1 – 3 (emergency) | 1 – 3 (urgencia) | |
| adjunctive therapy | terapia adyuvante | |
| UHMS / Standard of Care | UHMS / Estándar de atención | basis field |
| UHMS / FDA-Approved | UHMS / Aprobado por la FDA | |
| Clinical Research | Investigación clínica | |
| Preclinical / Early Phase | Preclínico / Fase inicial | |

## 6. Proper nouns kept in original

HOT-LoCO, HEROES (trial names) · UHMS, FDA, NFPA, GDPR · NCT numbers · author surnames · DOI URLs · journal names · genus/species Latin (SARS-CoV-2, Staphylococcus aureus).

## 7. Open items for the native reviewer

- Confirm the **decimal-point** choice for the ES audience (vs. the comma used in much of Spain/Europe).
- Confirm **HBOT** over the Spanish **OHB**.
- Confirm **«comillas angulares»** vs. typographic curly quotes for the audience.
- Confirm **"Servicios"** as the rendering of "Departments" (vs. "Departamentos"/"Especialidades") — chosen as the neutral hospital-organisational term.
- Confirm **"niebla mental"** for "brain fog" (vs. keeping the English loan).
- Society-specific terminology was deliberately NOT attributed to a named national society — left for the reviewer.

After native review locks the register, mark this file `**Status:** locked at end of review pass`.

## PTSD / Neuropsychiatric additions (PTSD indication build — pending native review)

| EN | ES | Notes |
|---|---|---|
| Neuropsychiatric (category) | Trastornos neuropsiquiátricos | new indications category |
| Post-Traumatic Stress Disorder (PTSD) | Trastorno de estrés postraumático (TEPT) | matches Psychiatry dept term |
| CAPS-5 | CAPS-5 | instrument name kept |
| diffusion tensor imaging (DTI) | imagen por tensor de difusión (DTI) | |
| fractional anisotropy | anisotropía fraccional | |
| neuroplasticity | neuroplasticidad | |
| default-mode / central-executive / salience networks | redes por defecto / ejecutiva central / de saliencia | |
| hyperoxic-hypoxic paradox | paradoja hiperóxica-hipóxica | |
| sham-controlled | controlado con simulación (sham) | |
| fronto-limbic | fronto-límbico | |

RCT first-use: ECA (ensayo clínico aleatorizado) per the locked convention. Decimal POINT (42.6, 25.8).

## Rehabilitation Medicine additions (Rehab department build — pending native review)

| EN | ES | Notes |
|---|---|---|
| Rehabilitation Medicine | Medicina de rehabilitación | department name |
| neurorehabilitation | neurorrehabilitación | |
| post-stroke recovery | recuperación post-ictus | |
| post-concussion syndrome | síndrome post-conmoción | |
| mild TBI | traumatismo craneoencefálico leve | |
| SPECT | SPECT | imaging acronym kept |
| participation effect | efecto de participación | |
| low-pressure sham | simulación a baja presión (sham) | |
| upper-limb motor function | función motora del miembro superior | |
| crossover RCT | ECA cruzado | |
| feasibility RCT | ECA de viabilidad | |
