# Arabic terminology glossary — DRAFT

**Status:** DRAFT — AWAITING NATIVE-SPEAKER MEDICAL REVIEW. Do not lock or ship to production pages until reviewed by an Arabic-speaking clinician with hyperbaric or wider clinical training. Higher review caution than DE/IT: medical Arabic has multiple registers (formal MSA used in academic literature vs regional clinical conventions) and several common terms have 2–3 accepted forms. The reviewer must pick one form per term as the binding standard.
**Scope:** candidate EN→AR terminology for clinical content; modelled on the locked Greek glossary at `el-glossary.md`. Will become binding when reviewed and approved.
**Authority:** prepared as a starter pack for the post-launch multilingual expansion phase. Term forms reflect Modern Standard Arabic (MSA) medical register as used in Saudi, Egyptian, and Levantine academic literature. Where the form differs across registers, both are listed.
**RTL note:** the public-facing Arabic pages will require right-to-left CSS direction (`dir="rtl"` on the page root, RTL-aware Tailwind utilities, mirrored layout components). That is a separate engineering concern from this terminology file. The glossary itself is left-to-right because it is a developer reference document with mixed Latin + Arabic content.

Update this file when a reviewer locks each section. Mark each section's heading with **(locked)** when its terms become binding.

---

## 1. Study types and methodology

| EN | AR | Notes |
|---|---|---|
| randomised controlled trial (RCT) | تجربة سريرية معشّاة محكمة (RCT) | **First-use convention:** expand on first occurrence — `تجربة سريرية معشّاة محكمة (RCT)` — then RCT alone for subsequent uses. RCT acronym widely used in Arabic medical literature. |
| trial | تجربة | |
| clinical trial | تجربة سريرية | |
| clinical review | مراجعة سريرية | |
| longitudinal follow-up | متابعة طولية | "متابعة لمدة عام" for "one-year follow-up" |
| cohort | مجموعة (مَجمُوعة دراسية) / كوهورت | "كوهورت" loanword used in some literature |
| meta-analysis | تحليل تَلوي / تحليل بَعدي | both forms used; reviewer to pick |
| systematic review | مراجعة منهجية | |
| observational study | دراسة رصدية | |
| preclinical study | دراسة قبل سريرية | |
| case-control study | دراسة الحالات والشواهد | |
| case series | سلسلة حالات | |
| case report | تقرير حالة | |
| trial protocol | بروتوكول الدراسة | |
| trial registration | تسجيل الدراسة | |

## 2. Evidence-level register

| EN | AR | Notes |
|---|---|---|
| Evidence Level A / B / C | مستوى الدليل أ / ب / ج | Arabic letters mapping: A→أ, B→ب, C→ج |
| Level B Evidence | دليل من المستوى ب | |
| Standard of Care | معيار الرعاية | |
| Emerging Evidence | أدلة ناشئة | tier label |
| FDA-Approved | معتمد من FDA | breadcrumb-form short label |
| FDA-Approved Indications | الاستطبابات المعتمدة من FDA | full form for section heading |
| Clinical Research | البحث السريري | |
| Investigational | استقصائي / تجريبي | reviewer to pick one |
| Investigational / Preclinical | استقصائي / قبل سريري | |
| Under Research | قيد البحث | |
| Regulatory Framework | الإطار التنظيمي | |
| Clinical Evidence | الأدلة السريرية | |

## 3. Caveat and uncertainty register

The caveat phrasing for emerging-tier indications must not be softened in AR.

| EN | AR |
|---|---|
| The evidence base is currently anchored to a single research group; independent replication is awaited. | تستند قاعدة الأدلة حاليًا إلى مجموعة بحثية واحدة؛ ولا تزال إعادة الإنتاج المستقلة قيد الانتظار. |
| may improve | قد يحسّن |
| associated with | مرتبط بـ |
| preliminary evidence suggests | تشير الأدلة الأولية إلى |
| significant improvement (statistical) | تحسن دال إحصائيًا |
| sustained at follow-up | مستمر عند المتابعة |
| benefits sustained | الفوائد مستدامة |
| meta-analytic confirmation provides supporting evidence | يوفر التأكيد التحليلي البَعدي أدلة داعمة |
| anchored to a single research group | مستند إلى مجموعة بحثية واحدة |

**Forbidden register** (must not appear in AR or EN):
- "transformative" / "تحويلي"
- "breakthrough" / "اختراق علمي"
- "revolutionary" / "ثوري"
- "the answer to X" / "الحل لـ"
- "miracle" / "معجزة"

## 4. Symptom and condition vocabulary (Long COVID seed)

| EN | AR | Notes |
|---|---|---|
| Long COVID | Long COVID (متلازمة ما بعد كوفيد) | First-mention: keep Latin, append Arabic descriptor |
| Post-Viral Syndromes | المتلازمات ما بعد الفيروسية | category label |
| persistent symptoms | أعراض مستمرة | |
| multisystem symptoms | أعراض متعددة الأجهزة | |
| SARS-CoV-2 infection | عدوى SARS-CoV-2 | virus name kept Latin |
| acute infection | عدوى حادة | |
| fatigue | إرهاق / إعياء | reviewer to pick |
| cognitive dysfunction | الخلل المعرفي / الاختلال الإدراكي | reviewer to pick |
| "brain fog" | "brain fog" / ضباب الدماغ | Latin retained; "ضباب الدماغ" lay equivalent |
| sleep disturbance | اضطراب النوم | |
| pain | ألم | |
| symptom burden | عبء الأعراض | |
| neurocognitive deficits | عجز عصبي معرفي | |
| post-concussion symptoms | أعراض ما بعد الارتجاج | |
| brain microstructure | البنية المجهرية للدماغ | |
| neuroinflammation | التهاب عصبي | |
| neuroplasticity | المرونة العصبية | |
| neurogenesis | تكوّن الخلايا العصبية | |
| cerebral hypoperfusion | نقص التروية الدماغية | |
| angiogenesis | تكوّن الأوعية الدموية | |
| peri-infarct hypoxia | نقص الأكسجين حول منطقة الاحتشاء | |
| ischaemic stroke | السكتة الإقفارية | |

## 4.C Fibromyalgia additions

| EN | AR | Notes |
|---|---|---|
| Fibromyalgia | الألم العضلي الليفي | |
| Chronic Pain Syndromes | متلازمات الألم المزمن | category label |
| central sensitisation syndrome | متلازمة التحسس المركزي | |
| widespread pain | ألم منتشر | |
| tender points | نقاط الألم / النقاط المؤلمة | |
| quality of life | جودة الحياة | |
| function / functional outcome | الوظيفة / النتيجة الوظيفية | |
| brain activity patterns | أنماط النشاط الدماغي | |
| prospective controlled trial | تجربة محكمة استشرافية | |
| pooled randomised data | بيانات معشّاة مُجمَّعة | |
| magnitude of effect / magnitude of reduction | حجم التأثير / حجم الانخفاض | |
| meta-analytic confirmation | تأكيد تحليلي بَعدي | |
| supporting evidence | أدلة داعمة | |

## 4.D Dermatology additions

| EN | AR | Notes |
|---|---|---|
| Inflammatory Dermatoses | الأمراض الجلدية الالتهابية | indication name |
| Inflammatory Skin Disease | المرض الجلدي الالتهابي | category label |
| atopic dermatitis | التهاب الجلد التأتبي | |
| psoriasis vulgaris / plaque psoriasis | الصدفية الشائعة / الصدفية اللويحية | |
| pustular psoriasis | الصدفية البثرية | |
| arthropathic psoriasis | التهاب المفاصل الصدفي | |
| hidradenitis suppurativa | التهاب الغدد العرقية القيحي | |
| livedoid vasculopathy | اعتلال الأوعية الزرقي الشبكي | |
| pyoderma gangrenosum | تَقَيُّح الجلد المُتَنخِّر | |
| pruritus | حكة | |
| lesion severity | شدة الآفات | |
| Staphylococcus aureus colonisation | استعمار المكورات العنقودية الذهبية | latin form Staphylococcus aureus also acceptable |
| case reports | تقارير حالات | |
| small-cohort evidence | أدلة من مجموعات صغيرة | |
| adjunctive, not first-line | مساعد، وليس خط العلاج الأول | emerging-tier disclaimer |
| chronic non-healing wounds | جروح مزمنة غير ملتئمة | |
| diabetic foot ulcers | قرحات القدم السكرية | |
| vascular ulcers | قرحات وعائية | |
| radiation dermatitis | التهاب الجلد الإشعاعي | |
| soft-tissue radiation injury | إصابة الأنسجة الرخوة الإشعاعية | |
| necrotizing fasciitis | التهاب اللفافة الناخر | |
| Fournier's gangrene | غرغرينا فورنييه | |
| skin grafts | طعوم جلدية | |
| flaps (skin) | شرائح جلدية | |
| compromised (graft/flap) | معرض للخطر / إقفاري | reviewer to pick one |

## 4.E Plastic Surgery additions

| EN | AR | Notes |
|---|---|---|
| Aesthetic & Reconstructive Recovery | التعافي التجميلي والترميمي | indication name |
| Aesthetic & Reconstructive Surgery | الجراحة التجميلية والترميمية | category label |
| facelift | شد الوجه / facelift | "facelift" loanword common in clinical use |
| case–control study | دراسة الحالات والشواهد | |
| matched controls | شواهد مُطابَقة | |
| retrospectively matched | مُطابَقة بأثر رجعي | |
| comparative outcome | نتيجة مقارنة | |
| accelerated healing | شفاء متسارع | |
| post-procedure recovery | التعافي بعد الإجراء | |
| compromised graft / flap | طعم معرض للخطر / شريحة معرضة للخطر | |
| graft/flap salvage | إنقاذ الطعم/الشريحة | |
| ischemic soft-tissue wounds | جروح إقفارية في الأنسجة الرخوة | |
| difficult postoperative wounds | جروح صعبة بعد العملية | |
| radiation-injured tissue | نسيج مصاب بالإشعاع | |
| within 24 h of surgery | خلال 24 ساعة من العملية | |
| not as a routine enhancer | ليس كمعزز روتيني | |
| uncomplicated cosmetic surgery | جراحة تجميلية غير معقدة | |

## 4.F Women's Health additions

| EN | AR | Notes |
|---|---|---|
| Endometriosis | الانتباذ البطاني الرحمي | |
| Reproductive Health | الصحة الإنجابية | category label |
| pelvic radiation injury | إصابة الحوض الإشعاعية | |
| radiation cystitis | التهاب المثانة الإشعاعي | |
| radiation proctitis | التهاب المستقيم الإشعاعي | |
| vaginal stenosis | تضيق المهبل | |
| translational evidence | أدلة انتقالية / تَرجَمية | "تَرجَمية" matches "translational" academic register |
| rodent models | نماذج القوارض | |
| rat-model study | دراسة على نموذج الجرذ | |
| mouse-model study | دراسة على نموذج الفأر | |
| endometriotic lesions | آفات الانتباذ البطاني الرحمي | |
| inflammatory markers | علامات الالتهاب | |
| registered randomised trial | دراسة معشّاة مسجلة | |
| recruiting | يستقطب المشاركين | |
| clinical evidence in humans is awaited | الأدلة السريرية في البشر قيد الانتظار | |
| investigational adjunct, not standard of care | علاج مساعد استقصائي، وليس معيار الرعاية | |
| Investigational | استقصائي | |
| Not standardised | غير موحد | |

## 4.G Safety additions

| EN | AR | Notes |
|---|---|---|
| Safety & Contraindications | السلامة وموانع الاستعمال | page title |
| Absolute contraindications | موانع الاستعمال المطلقة | |
| Relative contraindications | موانع الاستعمال النسبية | |
| Adverse events | الأحداث الضارة | |
| Pre-treatment screening | الفحص قبل العلاج | |
| Stop criteria | معايير الإيقاف | |
| untreated pneumothorax | استرواح صدري غير مُعالَج | |
| middle-ear barotrauma | الرضح الضغطي للأذن الوسطى | |
| sinus squeeze (barosinusitis) | الرضح الضغطي للجيوب الأنفية | |
| pulmonary barotrauma | الرضح الضغطي الرئوي | |
| CNS oxygen toxicity | سُمِّيَّة الأكسجين للجهاز العصبي المركزي | |
| pulmonary oxygen toxicity | سُمِّيَّة الأكسجين الرئوية | |
| reversible myopia | حسر بصر عكسي | |
| confinement anxiety | رهاب الأماكن المغلقة | |
| hypoglycaemia | نقص سكر الدم | |
| eustachian tube dysfunction | خلل قناة استاكيوس | |
| seizure history | تاريخ نوبات صرعية | |
| pregnancy | حَمل | |
| optic neuritis | التهاب العصب البصري | |

## 5. Treatment and protocol vocabulary

| EN | AR | Notes |
|---|---|---|
| HBOT | HBOT / العلاج بالأكسجين عالي الضغط | "HBOT" loanword widely used; full form for first occurrence |
| Hyperbaric Oxygen Therapy | العلاج بالأكسجين عالي الضغط | full form |
| Hyperbaric Medicine | الطب فائق الضغط | |
| HBOT session | جلسة HBOT | |
| 2.0 ATA | 2.0 ATA | numeric form universal |
| 90 min session | جلسة 90 دقيقة | |
| 5×/week | 5×/أسبوع | |
| Once daily, 5×/week | مرة واحدة يوميًا، 5×/أسبوع | |
| Daily, protocol-dependent | يوميًا، وفقًا للبروتوكول | |
| Once or twice daily | مرة أو مرتين يوميًا | |
| Immediately, then daily | فورًا، ثم يوميًا | |
| Continuous until resolved | مستمر حتى الزوال | |
| Continuous until stable | مستمر حتى الاستقرار | |
| Post-exercise or daily | بعد التمرين أو يوميًا | |
| Prior to each radiation fraction | قبل كل جلسة إشعاع | |
| 1 – 3 (emergency) | 1 – 3 (طوارئ) | |
| 6 – 30 (highly variable) | 6 – 30 (متفاوت جدًا) | |
| 10 – 20 per cycle | 10 – 20 لكل دورة | |
| Per radiation course | لكل دورة إشعاع | |
| daily, then maintenance | يوميًا، ثم علاج صيانة | |
| emergency standard | معيار الطوارئ | |
| adjunctive therapy | علاج مساعد | |
| individual clinical evaluation | تقييم سريري فردي | |

## 6. Proper nouns kept in original

The following are kept untranslated:

- HOT-LoCO, HEROES (trial names)
- UHMS, FDA, NFPA, GDPR, HIPAA (acronyms)
- Medicare / Medicaid
- Cochrane
- Author surnames in citations
- DOI URLs
- Journal names (e.g. *Sci Reports*, *BMJ Open*, *Frontiers in Medicine*)

## 7. Open items for reviewer

- **HBOT (loanword) vs العلاج بالأكسجين عالي الضغط**: lock on one as the going-forward abbreviation in body text. Latin "HBOT" is widely understood in Gulf and Levantine clinical literature.
- **مجموعة vs كوهورت**: cohort term — pick one.
- **تحليل تَلوي vs تحليل بَعدي**: meta-analysis term — pick one.
- **Investigational** — استقصائي vs تجريبي — pick one.
- **fatigue** — إرهاق vs إعياء — pick one for the Long COVID register.
- **cognitive dysfunction** — الخلل المعرفي vs الاختلال الإدراكي — pick one.
- **First-use expansion convention** for RCT: align with the Greek convention (expand on first occurrence in any document; bare RCT thereafter).
- **RTL on the public site**: when AR pages are added to Astro, the page root needs `dir="rtl"`, RTL-aware Tailwind utilities (`rtl:`), and review of every layout component for mirrored behaviour. That work is separate from this terminology file.
- **Numerals**: this glossary uses Western Arabic numerals (0–9) per international medical convention. If the reviewer prefers Eastern Arabic-Indic numerals (٠–٩) for some content, document the rule here.

After native review locks the register, mark this file `**Status:** locked at end of review pass` and use it as the binding authority for any AR pages that get added in a future multilingual expansion.
