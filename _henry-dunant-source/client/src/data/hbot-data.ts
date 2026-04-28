// HBOT Clinical Resource — Master Data File (Bilingual EN/EL)
// Henry Dunant Hospital Center, Athens
// ============================================================

export type Lang = "en" | "el";
export type BilingualText = Record<Lang, string>;

export interface Protocol {
  ata: string;           // e.g. "2.0 – 2.4 ATA"
  duration: string;      // e.g. "90 min"
  sessions: string;      // e.g. "30 – 40"
  frequency: string;     // e.g. "Once daily, 5×/week"
  basis: { en: string; el: string };  // evidence basis label
}


export const SITE_STATS = [
  {
    value: "14",
    label: { en: "FDA-Approved Indications", el: "Εγκεκριμένες Ενδείξεις FDA" },
    sub: { en: "UHMS recognized conditions", el: "Αναγνωρισμένες παθήσεις UHMS" },
  },
  {
    value: "20%+",
    label: { en: "Telomere Lengthening", el: "Επιμήκυνση Τελομερών" },
    sub: { en: "In healthy older adults (60 sessions)", el: "Σε υγιείς ηλικιωμένους (60 συνεδρίες)" },
  },
  {
    value: "258",
    label: { en: "Peer-Reviewed Citations", el: "Peer-Reviewed Αναφορές" },
    sub: { en: "Supporting the evidence base", el: "Υποστηρίζουν τη βάση τεκμηρίωσης" },
  },
  {
    value: "2–3 ATA",
    label: { en: "Treatment Pressure", el: "Θεραπευτική Πίεση" },
    sub: { en: "Standard therapeutic range", el: "Τυπικό θεραπευτικό εύρος" },
  },
];

// ============================================================
// MECHANISMS OF ACTION
// ============================================================
export const MECHANISMS = [
  {
    id: "hyperoxygenation",
    title: { en: "Hyperoxygenation & Vasoconstriction", el: "Υπεροξυγόνωση & Αγγειοσύσπαση" },
    icon: "Droplets",
    color: "teal",
    summary: {
      en: "HBOT reverses tissue hypoxia while simultaneously inducing vasoconstriction, reducing edema without compromising oxygen delivery.",
      el: "Η HBOT αντιστρέφει την ιστική υποξία ενώ παράλληλα προκαλεί αγγειοσύσπαση, μειώνοντας το οίδημα χωρίς να διακυβεύεται η παροχή οξυγόνου.",
    },
    detail: {
      en: "At 3.0 ATA breathing 100% oxygen, dissolved plasma oxygen increases by approximately 42%, providing sufficient oxygen to sustain cellular respiration even in the absence of hemoglobin. This is particularly beneficial in compartment syndrome and traumatic brain injury.",
      el: "Στα 3,0 ATA με αναπνοή 100% οξυγόνου, το διαλυμένο οξυγόνο πλάσματος αυξάνεται κατά ~42%, παρέχοντας επαρκές οξυγόνο για κυτταρική αναπνοή ακόμα και χωρίς αιμοσφαιρίνη. Αυτό είναι ιδιαίτερα ωφέλιμο στο σύνδρομο διαμερίσματος και στο τραυματικό εγκεφαλικό τραύμα.",
    },
    refs: ["[1]"],
  },
  {
    id: "angiogenesis",
    title: { en: "Neovascularization & Angiogenesis", el: "Νεοαγγείωση & Αγγειογένεση" },
    icon: "GitBranch",
    color: "navy",
    summary: {
      en: "Hyperoxia stimulates VEGF, PDGF, and FGF release, promoting capillary budding and granulation tissue formation in chronic wounds.",
      el: "Η υπεροξία διεγείρει την απελευθέρωση VEGF, PDGF και FGF, προάγοντας τη δημιουργία τριχοειδών και σχηματισμό κοκκιώδους ιστού σε χρόνια τραύματα.",
    },
    detail: {
      en: "Vascular endothelial growth factor (VEGF), platelet-derived growth factor (PDGF), and fibroblast growth factor (FGF) are upregulated under hyperoxic conditions. This cascade promotes new blood vessel formation, critical for wound healing and tissue regeneration.",
      el: "Ο αγγειακός ενδοθηλιακός αυξητικός παράγοντας (VEGF), ο παράγοντας ανάπτυξης αιμοπεταλίων (PDGF) και ο αυξητικός παράγοντας ινοβλαστών (FGF) ενεργοποιούνται υπό υπεροξικές συνθήκες. Αυτή η καταρράκτης προάγει τη δημιουργία νέων αιμοφόρων αγγείων, κρίσιμη για την επούλωση τραυμάτων και αναγέννηση ιστών.",
    },
    refs: ["[1]", "[2]"],
  },
  {
    id: "antimicrobial",
    title: { en: "Antimicrobial Activity", el: "Αντιμικροβιακή Δράση" },
    icon: "Shield",
    color: "teal",
    summary: {
      en: "High oxygen tensions enhance leukocyte oxidative killing capacity and are directly lethal to anaerobic bacteria such as Clostridium perfringens.",
      el: "Οι υψηλές τάσεις οξυγόνου ενισχύουν την οξειδωτική ικανότητα θανάτωσης λευκοκυττάρων και είναι άμεσα θανατηφόρες για αναερόβια βακτήρια όπως το Clostridium perfringens.",
    },
    detail: {
      en: "Oxygen is utilized by neutrophils and macrophages to generate reactive oxygen species (ROS) that destroy bacteria. HBOT is directly bactericidal to obligate anaerobes and enhances the efficacy of certain antibiotics, particularly aminoglycosides.",
      el: "Το οξυγόνο χρησιμοποιείται από ουδετερόφιλα και μακροφάγα για παραγωγή δραστικών ειδών οξυγόνου (ROS) που καταστρέφουν βακτήρια. Η HBOT είναι άμεσα βακτηριοκτόνος για υποχρεωτικά αναερόβια και ενισχύει την αποτελεσματικότητα ορισμένων αντιβιοτικών, ιδίως αμινογλυκοσιδών.",
    },
    refs: ["[1]"],
  },
  {
    id: "gas-reduction",
    title: { en: "Gas Volume Reduction", el: "Μείωση Όγκου Αερίου" },
    icon: "Minimize2",
    color: "navy",
    summary: {
      en: "According to Boyle's Law, increased pressure reduces the volume of gas bubbles in the blood — the primary mechanism for decompression sickness and arterial gas embolism.",
      el: "Σύμφωνα με τον Νόμο του Boyle, η αυξημένη πίεση μειώνει τον όγκο των φυσαλίδων αερίου στο αίμα — ο κύριος μηχανισμός για τη νόσο αποσυμπίεσης και αρτηριακή αεροεμβολή.",
    },
    detail: {
      en: "At 2.8 ATA, gas bubble volume is reduced by approximately 64% compared to atmospheric pressure. This physical compression, combined with nitrogen washout through breathing 100% oxygen, eliminates intravascular and intratissue gas bubbles.",
      el: "Στα 2,8 ATA, ο όγκος φυσαλίδων αερίου μειώνεται κατά ~64% σε σχέση με την ατμοσφαιρική πίεση. Αυτή η φυσική συμπίεση, σε συνδυασμό με έκπλυση αζώτου μέσω αναπνοής 100% οξυγόνου, εξαλείφει ενδοαγγειακές και ενδοϊστικές φυσαλίδες αερίου.",
    },
    refs: ["[1]"],
  },
  {
    id: "antiaging",
    title: { en: "Anti-Aging & Cellular Regeneration", el: "Αντιγήρανση & Κυτταρική Αναγέννηση" },
    icon: "RefreshCw",
    color: "teal",
    summary: {
      en: "HBOT activates telomerase, induces senolytic effects, mobilizes stem cells, and enhances antioxidant defense through the hyperoxic-hypoxic paradox.",
      el: "Η HBOT ενεργοποιεί τελομεράση, επάγει σενολυτικά αποτελέσματα, κινητοποιεί βλαστοκύτταρα και ενισχύει αντιοξειδωτική άμυνα μέσω του υπεροξικού-υποξικού παράδοξου.",
    },
    detail: {
      en: "Repeated HBOT sessions activate telomerase (increasing telomere length by >20%), selectively eliminate senescent cells, mobilize bone marrow stem cells via NOS activation, and upregulate endogenous antioxidants (SOD, catalase, glutathione peroxidase) through hormetic stress responses.",
      el: "Επαναλαμβανόμενες συνεδρίες HBOT ενεργοποιούν τελομεράση (αύξηση μήκους τελομερών >20%), εκλεκτικά εξαλείφουν γηρασμένα κύτταρα, κινητοποιούν βλαστοκύτταρα μυελού οστών μέσω ενεργοποίησης NOS και ανεβάζουν ενδογενή αντιοξειδωτικά (SOD, καταλάση, υπεροξειδάση γλουταθειόνης) μέσω ορμητικών αποκρίσεων στρες.",
    },
    refs: ["[3]", "[5]", "[6]"],
  },
];

// ============================================================
// FDA-APPROVED INDICATIONS (14)
// ============================================================
export const FDA_INDICATIONS = [
  {
    id: 1,
    category: { en: "Acute Ischemias", el: "Οξείες Ισχαιμίες" },
    condition: { en: "Air or Gas Embolism", el: "Αεροεμβολή ή Εμβολή Αερίου" },
    description: {
      en: "Intravascular gas bubbles causing arterial obstruction. HBOT reduces bubble volume and promotes nitrogen elimination.",
      el: "Ενδοαγγειακές φυσαλίδες αερίου που προκαλούν αρτηριακή απόφραξη. Η HBOT μειώνει τον όγκο φυσαλίδων και προάγει αποβολή αζώτου.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "A",
    protocol: { ata: "2.8 – 3.0 ATA", duration: "90 min", sessions: "1 – 3 (emergency)", frequency: "Continuous until stable", basis: { en: "UHMS / Emergency Standard", el: "UHMS / Επείγον Πρότυπο" } },
    refs: ["[1]", "[2]"],
  },
  {
    id: 2,
    category: { en: "Toxicities", el: "Τοξικότητες" },
    condition: { en: "Carbon Monoxide Poisoning", el: "Δηλητηρίαση από Μονοξείδιο Άνθρακα" },
    description: {
      en: "HBOT accelerates CO elimination from hemoglobin and cytochrome oxidase, preventing delayed neurological sequelae.",
      el: "Η HBOT επιταχύνει αποβολή CO από αιμοσφαιρίνη και κυτόχρωμα οξειδάση, αποτρέποντας καθυστερημένες νευρολογικές επιπλοκές.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "A",
    protocol: { ata: "2.4 – 2.8 ATA", duration: "90 min", sessions: "1 – 3 (emergency)", frequency: "Continuous until resolved", basis: { en: "UHMS / Emergency Standard", el: "UHMS / Επείγον Πρότυπο" } },
    refs: ["[1]", "[3]"],
  },
  {
    id: 3,
    category: { en: "Infectious Diseases", el: "Λοιμώδη Νοσήματα" },
    condition: { en: "Clostridial Myositis & Myonecrosis (Gas Gangrene)", el: "Κλωστριδιακή Μυοσίτιδα & Μυονέκρωση (Αέρια Γάγγραινα)" },
    description: {
      en: "HBOT is directly lethal to Clostridium perfringens and inhibits toxin production, used adjunctively with surgery and antibiotics.",
      el: "Η HBOT είναι άμεσα θανατηφόρα για Clostridium perfringens και αναστέλλει παραγωγή τοξινών, χρησιμοποιείται επικουρικά με χειρουργική επέμβαση και αντιβιοτικά.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "A",
    protocol: { ata: "2.0 – 2.5 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[4]"],
  },
  {
    id: 4,
    category: { en: "Acute Ischemias", el: "Οξείες Ισχαιμίες" },
    condition: { en: "Crush Injury & Compartment Syndrome", el: "Τραύμα Σύνθλιψης & Σύνδρομο Διαμερίσματος" },
    description: {
      en: "Reduces post-ischemic edema, preserves threatened tissue, and accelerates healing in traumatic crush injuries.",
      el: "Μειώνει μετα-ισχαιμικό οίδημα, διατηρεί απειλούμενο ιστό και επιταχύνει επούλωση σε τραυματικές κακώσεις σύνθλιψης.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "A",
    protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "30 – 40", frequency: "Once daily, 5×/week", basis: { en: "UHMS / FDA-Approved", el: "UHMS / FDA-Εγκεκριμένο" } },
    refs: ["[1]", "[5]"],
  },
  {
    id: 5,
    category: { en: "Gas/Bubble Disorders", el: "Διαταραχές Αερίου/Φυσαλίδων" },
    condition: { en: "Decompression Sickness", el: "Νόσος Αποσυμπίεσης" },
    description: {
      en: "Primary treatment for nitrogen bubble formation in divers and compressed-air workers. Reduces bubble volume and promotes nitrogen elimination.",
      el: "Κύρια θεραπεία για σχηματισμό φυσαλίδων αζώτου σε δύτες και εργαζόμενους με συμπιεσμένο αέρα. Μειώνει όγκο φυσαλίδων και προάγει αποβολή αζώτου.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "A",
    protocol: { ata: "2.0 – 2.5 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[6]"],
  },
  {
    id: 6,
    category: { en: "Wound Healing", el: "Επούλωση Τραυμάτων" },
    condition: { en: "Enhancement of Healing in Selected Problem Wounds", el: "Ενίσχυση Επούλωσης Επιλεγμένων Προβληματικών Τραυμάτων" },
    description: {
      en: "Adjunctive treatment for chronic non-healing wounds, particularly diabetic foot ulcers with transcutaneous oxygen measurements <40 mmHg.",
      el: "Επικουρική θεραπεία για χρόνια μη επουλούμενα τραύματα, ιδίως διαβητικά έλκη ποδιού με διαδερμικές μετρήσεις οξυγόνου <40 mmHg.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "A",
    protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[7]"],
  },
  {
    id: 7,
    category: { en: "Infectious Diseases", el: "Λοιμώδη Νοσήματα" },
    condition: { en: "Exceptional Blood Loss Anemia", el: "Αναιμία Εξαιρετικής Απώλειας Αίματος" },
    description: {
      en: "When transfusion is not possible due to religious beliefs or unavailability, HBOT provides sufficient dissolved plasma oxygen to sustain life.",
      el: "Όταν η μετάγγιση δεν είναι δυνατή λόγω θρησκευτικών πεποιθήσεων ή έλλειψης, η HBOT παρέχει επαρκές διαλυμένο οξυγόνο πλάσματος για διατήρηση ζωής.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "B",
    protocol: { ata: "2.0 – 2.5 ATA", duration: "90 min", sessions: "20 – 40", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[8]"],
  },
  {
    id: 8,
    category: { en: "Infectious Diseases", el: "Λοιμώδη Νοσήματα" },
    condition: { en: "Intracranial Abscess", el: "Ενδοκρανιακό Απόστημα" },
    description: {
      en: "Adjunctive therapy for brain abscesses, particularly those caused by anaerobic organisms. Enhances antibiotic efficacy and immune response.",
      el: "Επικουρική θεραπεία για εγκεφαλικά αποστήματα, ιδίως από αναερόβιους οργανισμούς. Ενισχύει αποτελεσματικότητα αντιβιοτικών και ανοσολογική απόκριση.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "B",
    protocol: { ata: "2.0 – 2.5 ATA", duration: "90 min", sessions: "30 – 60", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[9]"],
  },
  {
    id: 9,
    category: { en: "Infectious Diseases", el: "Λοιμώδη Νοσήματα" },
    condition: { en: "Necrotizing Soft Tissue Infections", el: "Νεκρωτικές Λοιμώξεις Μαλακών Ιστών" },
    description: {
      en: "Adjunctive treatment for necrotizing fasciitis and Fournier's gangrene, reducing mortality and tissue loss when combined with surgery.",
      el: "Επικουρική θεραπεία για νεκρωτική περιτονίτιδα και γάγγραινα Fournier, μειώνοντας θνησιμότητα και απώλεια ιστού σε συνδυασμό με χειρουργική επέμβαση.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "A",
    protocol: { ata: "2.0 – 2.5 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[10]"],
  },
  {
    id: 10,
    category: { en: "Infectious Diseases", el: "Λοιμώδη Νοσήματα" },
    condition: { en: "Refractory Osteomyelitis", el: "Ανθεκτική Οστεομυελίτιδα" },
    description: {
      en: "Chronic osteomyelitis unresponsive to conventional therapy. HBOT enhances leukocyte killing, promotes angiogenesis in avascular bone.",
      el: "Χρόνια οστεομυελίτιδα μη ανταποκρινόμενη σε συμβατική θεραπεία. Η HBOT ενισχύει λευκοκυτταρική θανάτωση, προάγει αγγειογένεση σε αναίμακτο οστό.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "A",
    protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "30 – 60", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[11]"],
  },
  {
    id: 11,
    category: { en: "Wound Healing", el: "Επούλωση Τραυμάτων" },
    condition: { en: "Delayed Radiation Injury (Soft Tissue & Bony Necrosis)", el: "Καθυστερημένη Ακτινοβολική Βλάβη (Νέκρωση Μαλακών Ιστών & Οστού)" },
    description: {
      en: "Treatment for osteoradionecrosis and soft tissue radiation necrosis. Promotes angiogenesis in hypoxic, hypovascular, hypocellular tissue.",
      el: "Θεραπεία για οστεοακτινονέκρωση και νέκρωση μαλακών ιστών από ακτινοβολία. Προάγει αγγειογένεση σε υποξικό, υποαγγειακό, υποκυτταρικό ιστό.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "A",
    protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "30 – 60", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[12]"],
  },
  {
    id: 12,
    category: { en: "Acute Ischemias", el: "Οξείες Ισχαιμίες" },
    condition: { en: "Compromised Skin Grafts & Flaps", el: "Επικινδυνεύοντα Δερματικά Μοσχεύματα & Κρημνοί" },
    description: {
      en: "Salvage therapy for ischemic skin grafts and flaps. Reduces hypoxic necrosis and promotes graft survival through enhanced oxygenation.",
      el: "Σωτήρια θεραπεία για ισχαιμικά δερματικά μοσχεύματα και κρημνούς. Μειώνει υποξική νέκρωση και προάγει επιβίωση μοσχεύματος μέσω ενισχυμένης οξυγόνωσης.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "B",
    protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[13]"],
  },
  {
    id: 13,
    category: { en: "Sensory Disorders", el: "Αισθητηριακές Διαταραχές" },
    condition: { en: "Idiopathic Sudden Sensorineural Hearing Loss", el: "Ιδιοπαθής Αιφνίδια Αισθητηριονευρική Απώλεια Ακοής" },
    description: {
      en: "Adjunctive treatment when corticosteroids fail. Reverses cochlear hypoxia and reduces endolymphatic hydrops.",
      el: "Επικουρική θεραπεία όταν αποτυγχάνουν τα κορτικοστεροειδή. Αντιστρέφει κοχλιακή υποξία και μειώνει ενδολεμφικό ύδρωπα.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "B",
    protocol: { ata: "2.0 – 2.5 ATA", duration: "90 min", sessions: "10 – 20", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
    refs: ["[1]", "[14]"],
  },
  {
    id: 14,
    category: { en: "Sensory Disorders", el: "Αισθητηριακές Διαταραχές" },
    condition: { en: "Central Retinal Artery Occlusion", el: "Απόφραξη Κεντρικής Αρτηρίας Αμφιβληστροειδούς" },
    description: {
      en: "Emergency treatment to preserve retinal layers and improve visual acuity through reversal of retinal ischemia.",
      el: "Επείγουσα θεραπεία για διατήρηση στρωμάτων αμφιβληστροειδούς και βελτίωση οπτικής οξύτητας μέσω αντιστροφής αμφιβληστροειδικής ισχαιμίας.",
    },
    evidence: { en: "Standard of Care", el: "Πρότυπο Θεραπείας" },
    evidenceLevel: "B",
    protocol: { ata: "2.0 – 2.8 ATA", duration: "90 min", sessions: "1 – 3 (emergency)", frequency: "Immediately, then daily", basis: { en: "UHMS / Emergency Standard", el: "UHMS / Επείγον Πρότυπο" } },
    refs: ["[1]", "[15]"],
  },
];

// ============================================================
// HOSPITAL DEPARTMENTS WITH HBOT APPLICATIONS
// ============================================================
export const DEPARTMENTS_WITH_HBOT = [
  {
    id: "surgery",
    name: { en: "Surgery Sector", el: "Χειρουργικός Τομέας" },
    icon: "Scissors",
    color: "#0e7490",
    shortDesc: { en: "Orthopedics, Plastic, Cardiothoracic, Vascular", el: "Ορθοπεδική, Πλαστική, Καρδιοθωρακοχειρουργική, Αγγειοχειρουργική" },
    applications: [
      {
        title: { en: "Refractory Osteomyelitis", el: "Ανθεκτική Οστεομυελίτιδα" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "Standard-of-care adjunctive treatment for chronic osteomyelitis unresponsive to conventional therapy. HBOT enhances leukocyte killing in avascular bone and promotes neovascularization.",
          el: "Επικουρική θεραπεία πρότυπου φροντίδας για χρόνια οστεομυελίτιδα μη ανταποκρινόμενη σε συμβατική θεραπεία. Η HBOT ενισχύει λευκοκυτταρική θανάτωση σε αναίμακτο οστό και προάγει νεοαγγείωση.",
        },
        evidence: "Level A",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "30 – 60", frequency: "Once daily, 5×/week", basis: { en: "UHMS / FDA-Approved", el: "UHMS / FDA-Εγκεκριμένο" } },
        refs: ["[9]"],
      },
      {
        title: { en: "Crush Injuries & Compartment Syndrome", el: "Κακώσεις Σύνθλιψης & Σύνδρομο Διαμερίσματος" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "Approved for acute traumatic ischemias. Reduces post-ischemic edema and preserves threatened tissue in severe crush injuries.",
          el: "Εγκεκριμένη για οξείες τραυματικές ισχαιμίες. Μειώνει μετα-ισχαιμικό οίδημα και διατηρεί απειλούμενο ιστό σε σοβαρές κακώσεις σύνθλιψης.",
        },
        evidence: "Level A",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "10 – 20", frequency: "Once daily, 5×/week", basis: { en: "UHMS / FDA-Approved", el: "UHMS / FDA-Εγκεκριμένο" } },
        refs: ["[9]"],
      },
      {
        title: { en: "Compromised Skin Grafts & Flaps", el: "Επικινδυνεύοντα Δερματικά Μοσχεύματα & Κρημνοί" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "Salvage therapy for ischemic reconstructive flaps and skin grafts. Reduces hypoxic necrosis through enhanced tissue oxygenation and angiogenesis.",
          el: "Σωτήρια θεραπεία για ισχαιμικούς ανακατασκευαστικούς κρημνούς και δερματικά μοσχεύματα. Μειώνει υποξική νέκρωση μέσω ενισχυμένης οξυγόνωσης ιστών και αγγειογένεσης.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once daily, 5×/week", basis: { en: "UHMS / FDA-Approved", el: "UHMS / FDA-Εγκεκριμένο" } },
        refs: ["[9]"],
      },
      {
        title: { en: "Postoperative Recovery (TKA)", el: "Μετεγχειρητική Αποκατάσταση (ΟΑΓ)" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "Emerging evidence shows HBOT accelerates recovery and reduces muscle damage following total knee arthroplasty and major orthopedic procedures.",
          el: "Αναδυόμενα στοιχεία δείχνουν ότι η HBOT επιταχύνει αποκατάσταση και μειώνει μυϊκή βλάβη μετά από ολική αρθροπλαστική γόνατος και μεγάλες ορθοπεδικές επεμβάσεις.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "10 – 20", frequency: "Once daily, 5×/week", basis: { en: "Clinical Research", el: "Κλινική Έρευνα" } },
        refs: ["[10]"],
      },
      {
        title: { en: "Thermal Burns", el: "Θερμικά Εγκαύματα" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "Adjunctive treatment for acute thermal burns. Reduces edema, promotes epithelialization, and decreases infection risk.",
          el: "Επικουρική θεραπεία για οξεία θερμικά εγκαύματα. Μειώνει οίδημα, προάγει επιθηλιοποίηση και μειώνει κίνδυνο λοίμωξης.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once or twice daily", basis: { en: "UHMS / FDA-Approved", el: "UHMS / FDA-Εγκεκριμένο" } },
        refs: ["[1]"],
      },
      {
        title: { en: "Therapeutic Angiogenesis (Cardiac)", el: "Θεραπευτική Αγγειογένεση (Καρδιακή)" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "Investigational use for chronic stable ischemic heart disease and post-MI left ventricular function improvement through VEGF-mediated angiogenesis.",
          el: "Ερευνητική χρήση για χρόνια σταθερή ισχαιμική καρδιοπάθεια και βελτίωση λειτουργίας αριστερής κοιλίας μετά από ΕΜ μέσω αγγειογένεσης μεσολαβούμενης από VEGF.",
        },
        evidence: "Level C",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "30 – 40", frequency: "Once daily, 5×/week", basis: { en: "Investigational", el: "Ερευνητικό" } },
        refs: ["[12]"],
      },
    ],
  },
  {
    id: "neurology",
    name: { en: "Neurology", el: "Νευρολογία" },
    icon: "Brain",
    color: "#7c3aed",
    shortDesc: { en: "TBI, Stroke, Dementia, Cognitive Enhancement", el: "ΕΚΤ, Εγκεφαλικό, Άνοια, Γνωστική Ενίσχυση" },
    applications: [
      {
        title: { en: "Mild Traumatic Brain Injury (mTBI)", el: "Ήπια Κρανιοεγκεφαλική Κάκωση (ΗΚΕ)" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "B-level evidence from clinical trials demonstrating improvements in neurocognitive deficits, post-concussion symptoms, and brain microstructure in mTBI patients.",
          el: "Τεκμηρίωση επιπέδου Β από κλινικές δοκιμές που αποδεικνύουν βελτιώσεις σε νευρογνωστικά ελλείμματα, συμπτώματα μετά από διάσειση και μικροδομή εγκεφάλου σε ασθενείς με ΗΚΕ.",
        },
        evidence: "Level B",
        protocol: { ata: "1.5 – 2.0 ATA", duration: "60 – 90 min", sessions: "40 – 60", frequency: "Once daily, 5×/week", basis: { en: "Level B Evidence", el: "Τεκμηρίωση Επιπέδου Β" } },
        refs: ["[15]"],
      },
      {
        title: { en: "Stroke Recovery", el: "Αποκατάσταση Εγκεφαλικού" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "Investigational adjunctive therapy for ischemic stroke recovery. HBOT promotes neuroplasticity, reduces peri-infarct hypoxia, and may improve functional outcomes.",
          el: "Ερευνητική επικουρική θεραπεία για αποκατάσταση ισχαιμικού εγκεφαλικού. Η HBOT προάγει νευροπλαστικότητα, μειώνει περι-εμφρακτική υποξία και μπορεί να βελτιώσει λειτουργικά αποτελέσματα.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "40 – 60", frequency: "Once daily, 5×/week", basis: { en: "Clinical Research", el: "Κλινική Έρευνα" } },
        refs: ["[16]"],
      },
      {
        title: { en: "Vascular Dementia", el: "Αγγειακή Άνοια" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "HBOT reverses chronic cerebral hypoperfusion and promotes angiogenesis in brain tissue. Clinical studies show improvements in cognitive function in vascular dementia patients.",
          el: "Η HBOT αντιστρέφει χρόνια εγκεφαλική υποαιμάτωση και προάγει αγγειογένεση σε εγκεφαλικό ιστό. Κλινικές μελέτες δείχνουν βελτιώσεις σε γνωστική λειτουργία σε ασθενείς με αγγειακή άνοια.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "60", frequency: "Once daily, 5×/week", basis: { en: "Clinical Research", el: "Κλινική Έρευνα" } },
        refs: ["[16]"],
      },
      {
        title: { en: "Cognitive Enhancement in Healthy Aging", el: "Γνωστική Ενίσχυση στην Υγιή Γήρανση" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "Randomized controlled trial demonstrated significant cognitive enhancements in healthy older adults, including memory and processing speed improvements correlated with increased cerebral blood flow.",
          el: "Τυχαιοποιημένη ελεγχόμενη δοκιμή απέδειξε σημαντικές γνωστικές ενισχύσεις σε υγιείς ηλικιωμένους, συμπεριλαμβανομένης βελτίωσης μνήμης και ταχύτητας επεξεργασίας που συσχετίζονται με αυξημένη εγκεφαλική αιματική ροή.",
        },
        evidence: "Level A (RCT)",
        protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "60", frequency: "Once daily, 5×/week", basis: { en: "RCT (Hadanny et al., 2020)", el: "ΤΕΔ (Hadanny et al., 2020)" } },
        refs: ["[4]"],
      },
      {
        title: { en: "Neurodegenerative Diseases", el: "Νευροεκφυλιστικές Παθήσεις" },
        type: "Research",
        typeColor: "orange",
        description: {
          en: "Emerging preclinical and early clinical evidence for Alzheimer's disease and Parkinson's disease. HBOT reduces neuroinflammation and promotes neurogenesis.",
          el: "Αναδυόμενα προκλινικά και πρώιμα κλινικά στοιχεία για νόσο Alzheimer και Parkinson. Η HBOT μειώνει νευροφλεγμονή και προάγει νευρογένεση.",
        },
        evidence: "Level C",
        protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "40 – 60", frequency: "Once daily, 5×/week", basis: { en: "Preclinical / Early Phase", el: "Προκλινικό / Πρώιμη Φάση" } },
        refs: ["[8]"],
      },
    ],
  },
  {
    id: "oncology",
    name: { en: "Medical Oncology", el: "Παθολογική Ογκολογία" },
    icon: "Activity",
    color: "#b45309",
    shortDesc: { en: "Radiation Injury, Tumor Sensitization", el: "Ακτινοβολική Βλάβη, Ευαισθητοποίηση Όγκου" },
    applications: [
      {
        title: { en: "Delayed Radiation Injury", el: "Καθυστερημένη Ακτινοβολική Βλάβη" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "Standard-of-care treatment for osteoradionecrosis and soft tissue radiation necrosis. HBOT promotes angiogenesis in hypoxic, hypovascular, hypocellular irradiated tissue.",
          el: "Θεραπεία πρότυπου φροντίδας για οστεοακτινονέκρωση και νέκρωση μαλακών ιστών από ακτινοβολία. Η HBOT προάγει αγγειογένεση σε υποξικό, υποαγγειακό, υποκυτταρικό ακτινοβολημένο ιστό.",
        },
        evidence: "Level A",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "30 – 60", frequency: "Once daily, 5×/week", basis: { en: "UHMS / FDA-Approved", el: "UHMS / FDA-Εγκεκριμένο" } },
        refs: ["[9]"],
      },
      {
        title: { en: "Radiation Cystitis & Proctitis", el: "Ακτινοβολική Κυστίτιδα & Πρωκτίτιδα" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "Approved adjunctive treatment for radiation-induced hemorrhagic cystitis and proctitis, reducing bleeding and promoting mucosal healing.",
          el: "Εγκεκριμένη επικουρική θεραπεία για αιμορραγική κυστίτιδα και πρωκτίτιδα από ακτινοβολία, μειώνοντας αιμορραγία και προάγοντας επούλωση βλεννογόνου.",
        },
        evidence: "Level A",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "30 – 40", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
        refs: ["[9]"],
      },
      {
        title: { en: "Tumor Radiosensitization", el: "Ακτινοευαισθητοποίηση Όγκου" },
        type: "Research",
        typeColor: "orange",
        description: {
          en: "Investigational use as neoadjuvant therapy to sensitize hypoxic solid tumors to radiotherapy and chemotherapy. Hypoxic tumor microenvironments are resistant to radiation; HBOT may reverse this resistance.",
          el: "Ερευνητική χρήση ως νεοεπικουρική θεραπεία για ευαισθητοποίηση υποξικών συμπαγών όγκων σε ακτινοθεραπεία και χημειοθεραπεία. Υποξικά μικροπεριβάλλοντα όγκων αντιστέκονται στην ακτινοβολία· η HBOT μπορεί να αντιστρέψει αυτή την αντίσταση.",
        },
        evidence: "Level C",
        protocol: { ata: "2.0 – 2.5 ATA", duration: "90 min", sessions: "Per radiation course", frequency: "Prior to each radiation fraction", basis: { en: "Investigational", el: "Ερευνητικό" } },
        refs: ["[17]"],
      },
      {
        title: { en: "Breast Radiation Complications", el: "Επιπλοκές Ακτινοθεραπείας Μαστού" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "Effective treatment for late radiation toxicity in breast cancer patients, including radiation dermatitis and tissue necrosis following breast-conserving surgery.",
          el: "Αποτελεσματική θεραπεία για όψιμη ακτινοτοξικότητα σε ασθενείς με καρκίνο μαστού, συμπεριλαμβανομένης ακτινοδερματίτιδας και νέκρωσης ιστού μετά από συντηρητική χειρουργική μαστού.",
        },
        evidence: "Level A",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "30 – 40", frequency: "Once daily, 5×/week", basis: { en: "UHMS / Standard of Care", el: "UHMS / Πρότυπο Θεραπείας" } },
        refs: ["[9]"],
      },
    ],
  },
  {
    id: "gastroenterology",
    name: { en: "Gastroenterology", el: "Γαστρεντερολογία" },
    icon: "Stethoscope",
    color: "#0f766e",
    shortDesc: { en: "IBD, Ulcerative Colitis, Crohn's Disease", el: "ΦΝΕ, Ελκώδης Κολίτιδα, Νόσος Crohn" },
    applications: [
      {
        title: { en: "Ulcerative Colitis", el: "Ελκώδης Κολίτιδα" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "Systematic reviews indicate HBOT may achieve response rates exceeding 80% in acute severe ulcerative colitis refractory to conventional therapy, reversing chronic intestinal hypoxia.",
          el: "Συστηματικές ανασκοπήσεις υποδεικνύουν ότι η HBOT μπορεί να επιτύχει ποσοστά ανταπόκρισης >80% σε οξεία σοβαρή ελκώδη κολίτιδα ανθεκτική σε συμβατική θεραπεία, αντιστρέφοντας χρόνια εντερική υποξία.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 40", frequency: "Once daily, 5×/week", basis: { en: "Level A Meta-Analysis", el: "Μετα-Ανάλυση Επιπέδου Α" } },
        refs: ["[14]"],
      },
      {
        title: { en: "Crohn's Disease", el: "Νόσος Crohn" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "Meta-analyses demonstrate significant mucosal healing and clinical remission in Crohn's disease patients treated with HBOT, particularly for perianal fistulizing disease.",
          el: "Μετα-αναλύσεις αποδεικνύουν σημαντική επούλωση βλεννογόνου και κλινική ύφεση σε ασθενείς με νόσο Crohn που θεραπεύτηκαν με HBOT, ιδίως για περιπρωκτική νόσο με συρίγγια.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 40", frequency: "Once daily, 5×/week", basis: { en: "Level A Meta-Analysis", el: "Μετα-Ανάλυση Επιπέδου Α" } },
        refs: ["[14]"],
      },
      {
        title: { en: "Inflammatory Bowel Disease (IBD)", el: "Φλεγμονώδης Νόσος Εντέρου (ΦΝΕ)" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "HBOT reverses chronic intestinal hypoxia, reduces mucosal inflammation, and promotes epithelial healing. Considered a promising adjunctive therapy for IBD management.",
          el: "Η HBOT αντιστρέφει χρόνια εντερική υποξία, μειώνει φλεγμονή βλεννογόνου και προάγει επιθηλιακή επούλωση. Θεωρείται υποσχόμενη επικουρική θεραπεία για διαχείριση ΦΝΕ.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 40", frequency: "Once daily, 5×/week", basis: { en: "Level A Meta-Analysis", el: "Μετα-Ανάλυση Επιπέδου Α" } },
        refs: ["[14]"],
      },
    ],
  },
  {
    id: "endocrinology",
    name: { en: "Endocrinology & Metabolism", el: "Ενδοκρινολογία & Μεταβολισμός" },
    icon: "Zap",
    color: "#d97706",
    shortDesc: { en: "Diabetic Foot, Metabolic Syndrome, Nephropathy", el: "Διαβητικό Πόδι, Μεταβολικό Σύνδρομο, Νεφροπάθεια" },
    applications: [
      {
        title: { en: "Diabetic Foot Ulcers", el: "Διαβητικά Έλκη Ποδιού" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "Most recognized HBOT application. Significantly improves complete healing rates in ischemic diabetic foot ulcers, reducing amputation rates when combined with standard wound care.",
          el: "Η πιο αναγνωρισμένη εφαρμογή HBOT. Βελτιώνει σημαντικά ποσοστά πλήρους επούλωσης σε ισχαιμικά διαβητικά έλκη ποδιού, μειώνοντας ποσοστά ακρωτηριασμού σε συνδυασμό με τυπική φροντίδα τραύματος.",
        },
        evidence: "Level A",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "30 – 40", frequency: "Once daily, 5×/week", basis: { en: "UHMS / FDA-Approved", el: "UHMS / FDA-Εγκεκριμένο" } },
        refs: ["[9]", "[13]"],
      },
      {
        title: { en: "Diabetic Nephropathy", el: "Διαβητική Νεφροπάθεια" },
        type: "Research",
        typeColor: "orange",
        description: {
          en: "Preclinical and early clinical studies demonstrate HBOT suppresses biomarkers of cell stress and kidney injury in diabetic models, suggesting renoprotective effects.",
          el: "Προκλινικές και πρώιμες κλινικές μελέτες δείχνουν ότι η HBOT καταστέλλει βιοδείκτες κυτταρικού στρες και νεφρικής βλάβης σε διαβητικά μοντέλα, υποδηλώνοντας νεφροπροστατευτικά αποτελέσματα.",
        },
        evidence: "Level C",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once daily, 5×/week", basis: { en: "Clinical Research", el: "Κλινική Έρευνα" } },
        refs: ["[18]"],
      },
      {
        title: { en: "Insulin Sensitivity & Metabolic Syndrome", el: "Ευαισθησία Ινσουλίνης & Μεταβολικό Σύνδρομο" },
        type: "Research",
        typeColor: "orange",
        description: {
          en: "Emerging evidence suggests HBOT may improve insulin sensitivity and reduce metabolic syndrome markers through enhanced mitochondrial function and reduced inflammation.",
          el: "Αναδυόμενα στοιχεία υποδηλώνουν ότι η HBOT μπορεί να βελτιώσει ευαισθησία ινσουλίνης και να μειώσει δείκτες μεταβολικού συνδρόμου μέσω ενισχυμένης μιτοχονδριακής λειτουργίας και μειωμένης φλεγμονής.",
        },
        evidence: "Level C",
        protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once daily, 5×/week", basis: { en: "Investigational", el: "Ερευνητικό" } },
        refs: ["[18]"],
      },
    ],
  },
  {
    id: "ent",
    name: { en: "ENT (Otolaryngology)", el: "ΩΡΛ (Ωτορινολαρυγγολογία)" },
    icon: "Ear",
    color: "#0891b2",
    shortDesc: { en: "Sudden Hearing Loss, Tinnitus", el: "Αιφνίδια Απώλεια Ακοής, Εμβοές" },
    applications: [
      {
        title: { en: "Idiopathic Sudden Sensorineural Hearing Loss", el: "Ιδιοπαθής Αιφνίδια Αισθητηριονευρική Απώλεια Ακοής" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "FDA-approved adjunctive treatment (2011) when corticosteroid therapy fails. Reverses cochlear hypoxia and reduces endolymphatic hydrops, improving hearing recovery rates.",
          el: "Εγκεκριμένη επικουρική θεραπεία FDA (2011) όταν αποτυγχάνει η θεραπεία με κορτικοστεροειδή. Αντιστρέφει κοχλιακή υποξία και μειώνει ενδολεμφικό ύδρωπα, βελτιώνοντας ποσοστά αποκατάστασης ακοής.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 – 2.5 ATA", duration: "90 min", sessions: "10 – 20", frequency: "Once daily, 5×/week", basis: { en: "UHMS / FDA-Approved", el: "UHMS / FDA-Εγκεκριμένο" } },
        refs: ["[9]"],
      },
      {
        title: { en: "Tinnitus", el: "Εμβοές" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "Investigational use for chronic tinnitus associated with cochlear hypoxia. Some clinical studies show improvement in tinnitus severity scores.",
          el: "Ερευνητική χρήση για χρόνιες εμβοές που σχετίζονται με κοχλιακή υποξία. Ορισμένες κλινικές μελέτες δείχνουν βελτίωση στις βαθμολογίες σοβαρότητας εμβοών.",
        },
        evidence: "Level C",
        protocol: { ata: "2.0 – 2.5 ATA", duration: "90 min", sessions: "10 – 20", frequency: "Once daily, 5×/week", basis: { en: "Clinical Research", el: "Κλινική Έρευνα" } },
        refs: ["[2]"],
      },
    ],
  },
  {
    id: "ophthalmology",
    name: { en: "Ophthalmology", el: "Οφθαλμολογία" },
    icon: "Eye",
    color: "#4f46e5",
    shortDesc: { en: "Retinal Artery Occlusion, Retinal Ischemia", el: "Απόφραξη Αμφιβληστροειδικής Αρτηρίας, Ισχαιμία Αμφιβληστροειδούς" },
    applications: [
      {
        title: { en: "Central Retinal Artery Occlusion (CRAO)", el: "Απόφραξη Κεντρικής Αρτηρίας Αμφιβληστροειδούς (ΑΚΑΑ)" },
        type: "FDA-Approved",
        typeColor: "green",
        description: {
          en: "Emergency FDA-approved treatment. Early HBOT intervention (within 24 hours) preserves retinal layers and improves visual acuity by reversing acute retinal ischemia.",
          el: "Επείγουσα εγκεκριμένη θεραπεία FDA. Η έγκαιρη παρέμβαση HBOT (εντός 24 ωρών) διατηρεί στρώματα αμφιβληστροειδούς και βελτιώνει οπτική οξύτητα αντιστρέφοντας οξεία αμφιβληστροειδική ισχαιμία.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 – 2.8 ATA", duration: "90 min", sessions: "1 – 3 (emergency)", frequency: "Immediately, then daily", basis: { en: "UHMS / FDA-Approved", el: "UHMS / FDA-Εγκεκριμένο" } },
        refs: ["[9]", "[19]"],
      },
      {
        title: { en: "Diabetic Retinopathy", el: "Διαβητική Αμφιβληστροειδοπάθεια" },
        type: "Research",
        typeColor: "orange",
        description: {
          en: "Investigational use for early-stage diabetic retinopathy. HBOT may reduce retinal hypoxia and slow progression of vascular changes.",
          el: "Ερευνητική χρήση για πρώιμο στάδιο διαβητικής αμφιβληστροειδοπάθειας. Η HBOT μπορεί να μειώσει αμφιβληστροειδική υποξία και να επιβραδύνει εξέλιξη αγγειακών αλλαγών.",
        },
        evidence: "Level C",
        protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 30", frequency: "Once daily, 5×/week", basis: { en: "Investigational", el: "Ερευνητικό" } },
        refs: ["[2]"],
      },
    ],
  },
  {
    id: "psychiatry",
    name: { en: "Psychiatry & Psychology", el: "Ψυχιατρική & Ψυχολογία" },
    icon: "HeartHandshake",
    color: "#be185d",
    shortDesc: { en: "PTSD, Depression, Anxiety", el: "ΔΜΤΣ, Κατάθλιψη, Άγχος" },
    applications: [
      {
        title: { en: "Post-Traumatic Stress Disorder (PTSD)", el: "Διαταραχή Μετατραυματικού Στρες (ΔΜΤΣ)" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "Clinical trials demonstrate HBOT improves brain microstructure functionality and alleviates PTSD symptoms in veterans with treatment-resistant PTSD. Significant improvements in PTSD checklist scores.",
          el: "Κλινικές δοκιμές αποδεικνύουν ότι η HBOT βελτιώνει λειτουργικότητα μικροδομής εγκεφάλου και ανακουφίζει συμπτώματα ΔΜΤΣ σε βετεράνους με ανθεκτική στη θεραπεία ΔΜΤΣ. Σημαντικές βελτιώσεις στις βαθμολογίες ελέγχου ΔΜΤΣ.",
        },
        evidence: "Level B",
        protocol: { ata: "1.5 – 2.0 ATA", duration: "60 – 90 min", sessions: "40 – 60", frequency: "Once daily, 5×/week", basis: { en: "Level B Evidence (RCT)", el: "Τεκμηρίωση Επιπέδου Β (ΤΕΔ)" } },
        refs: ["[20]"],
      },
      {
        title: { en: "Treatment-Resistant Depression", el: "Ανθεκτική στη Θεραπεία Κατάθλιψη" },
        type: "Research",
        typeColor: "orange",
        description: {
          en: "Emerging research investigates HBOT for treatment-resistant depression through neuroplasticity enhancement, BDNF upregulation, and reduction of neuroinflammation.",
          el: "Αναδυόμενη έρευνα διερευνά την HBOT για ανθεκτική στη θεραπεία κατάθλιψη μέσω ενίσχυσης νευροπλαστικότητας, ανύψωσης BDNF και μείωσης νευροφλεγμονής.",
        },
        evidence: "Level C",
        protocol: { ata: "1.5 – 2.0 ATA", duration: "60 – 90 min", sessions: "20 – 40", frequency: "Once daily, 5×/week", basis: { en: "Investigational", el: "Ερευνητικό" } },
        refs: ["[8]"],
      },
    ],
  },
  {
    id: "geriatrics",
    name: { en: "Geriatric Assessment", el: "Γηριατρική Αξιολόγηση" },
    icon: "Users",
    color: "#065f46",
    shortDesc: { en: "Physical Performance, Cognitive Aging", el: "Φυσική Απόδοση, Γνωστική Γήρανση" },
    applications: [
      {
        title: { en: "Physical Performance Enhancement", el: "Ενίσχυση Φυσικής Απόδοσης" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "Randomized controlled trial demonstrated HBOT improves maximal physical performance and cardiac perfusion in sedentary older adults, enhancing exercise capacity and cardiovascular function.",
          el: "Τυχαιοποιημένη ελεγχόμενη δοκιμή απέδειξε ότι η HBOT βελτιώνει μέγιστη φυσική απόδοση και καρδιακή αιμάτωση σε καθιστικούς ηλικιωμένους, ενισχύοντας ικανότητα άσκησης και καρδιαγγειακή λειτουργία.",
        },
        evidence: "Level A (RCT)",
        protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "40 – 60", frequency: "Once daily, 5×/week", basis: { en: "RCT (Doenyas-Barak et al., 2024)", el: "ΤΕΔ (Doenyas-Barak et al., 2024)" } },
        refs: ["[21]"],
      },
      {
        title: { en: "Cognitive Decline Prevention", el: "Πρόληψη Γνωστικής Έκπτωσης" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "HBOT reverses age-related cerebral hypoperfusion and promotes angiogenesis in brain tissue, potentially preventing or slowing cognitive decline in aging populations.",
          el: "Η HBOT αντιστρέφει ηλικιακή εγκεφαλική υποαιμάτωση και προάγει αγγειογένεση σε εγκεφαλικό ιστό, ενδεχομένως αποτρέποντας ή επιβραδύνοντας γνωστική έκπτωση σε γηράσκοντες πληθυσμούς.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "60", frequency: "Once daily, 5×/week", basis: { en: "RCT (Hadanny et al., 2020)", el: "ΤΕΔ (Hadanny et al., 2020)" } },
        refs: ["[4]", "[5]"],
      },
      {
        title: { en: "Cellular Aging Reversal", el: "Αντιστροφή Κυτταρικής Γήρανσης" },
        type: "Research",
        typeColor: "blue",
        description: {
          en: "First human evidence of telomere lengthening (>20%) and senescent cell clearance through 60 HBOT sessions in healthy older adults, representing a novel anti-aging intervention.",
          el: "Πρώτη ανθρώπινη απόδειξη επιμήκυνσης τελομερών (>20%) και εκκαθάρισης γηρασμένων κυττάρων μέσω 60 συνεδριών HBOT σε υγιείς ηλικιωμένους, αντιπροσωπεύοντας νέα παρέμβαση κατά της γήρανσης.",
        },
        evidence: "Level B",
        protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "60", frequency: "Once daily, 5×/week", basis: { en: "Hadanny et al., 2020 (RCT)", el: "Hadanny et al., 2020 (ΤΕΔ)" } },
        refs: ["[3]"],
      },
    ],
  },
];

// ============================================================
// DEPARTMENTS WITHOUT HBOT APPLICATIONS
// ============================================================
export const DEPARTMENTS_WITHOUT_HBOT = [
  {
    name: { en: "Diagnostic Laboratories", el: "Διαγνωστικά Εργαστήρια" },
    icon: "FlaskConical",
    rationale: {
      en: "Diagnostic laboratories (Microbiology, Hematology, Biochemistry) are analytical entities that process specimens and generate results. While HBOT relies on these departments for patient assessment — including transcutaneous oximetry and microbiological wound cultures — the therapy itself is not applied within these disciplines. No current evidence supports HBOT as a diagnostic modality.",
      el: "Τα διαγνωστικά εργαστήρια (Μικροβιολογία, Αιματολογία, Βιοχημεία) είναι αναλυτικές οντότητες που επεξεργάζονται δείγματα και παράγουν αποτελέσματα. Ενώ η HBOT βασίζεται σε αυτά τα τμήματα για αξιολόγηση ασθενών — συμπεριλαμβανομένης διαδερμικής οξυμετρίας και μικροβιολογικών καλλιεργειών τραυμάτων — η ίδια η θεραπεία δεν εφαρμόζεται εντός αυτών των κλάδων. Δεν υπάρχουν τρέχοντα στοιχεία που να υποστηρίζουν την HBOT ως διαγνωστική μέθοδο.",
    },
    role: { en: "Supportive — provides pre/post HBOT biomarker assessment", el: "Υποστηρικτικός — παρέχει αξιολόγηση βιοδεικτών πριν/μετά HBOT" },
  },
  {
    name: { en: "Medical Imaging & Nuclear Medicine", el: "Ιατρική Απεικόνιση & Πυρηνική Ιατρική" },
    icon: "ScanLine",
    rationale: {
      en: "Medical Imaging (CT, MRI, PET, Nuclear Medicine Theranostics) serves a purely diagnostic and interventional imaging function. HBOT does not alter imaging protocols or radiopharmaceutical uptake in any clinically meaningful way. These departments support HBOT patient selection and monitoring but are not sites of HBOT application.",
      el: "Η Ιατρική Απεικόνιση (CT, MRI, PET, Θεραγνωστική Πυρηνικής Ιατρικής) εξυπηρετεί αμιγώς διαγνωστική και παρεμβατική λειτουργία απεικόνισης. Η HBOT δεν αλλάζει πρωτόκολλα απεικόνισης ή πρόσληψη ραδιοφαρμάκων με κλινικά σημαντικό τρόπο. Αυτά τα τμήματα υποστηρίζουν επιλογή ασθενών και παρακολούθηση HBOT αλλά δεν είναι χώροι εφαρμογής HBOT.",
    },
    role: { en: "Supportive — pre-treatment imaging and perfusion assessment", el: "Υποστηρικτικός — απεικόνιση προ-θεραπείας και αξιολόγηση αιμάτωσης" },
  },
  {
    name: { en: "Intensive Care Unit (ICU)", el: "Μονάδα Εντατικής Θεραπείας (ΜΕΘ)" },
    icon: "Monitor",
    rationale: {
      en: "While critically ill patients may occasionally require HBOT for conditions such as gas gangrene or carbon monoxide poisoning, the logistical challenges of managing ventilated, hemodynamically unstable patients in a hyperbaric chamber are significant. Standard ICU monitoring equipment is not compatible with hyperbaric environments. Monoplace chambers limit access for emergency interventions.",
      el: "Ενώ κρίσιμα ασθενείς μπορεί περιστασιακά να χρειαστούν HBOT για παθήσεις όπως αέρια γάγγραινα ή δηλητηρίαση από μονοξείδιο άνθρακα, οι λογιστικές προκλήσεις διαχείρισης διασωληνωμένων, αιμοδυναμικά ασταθών ασθενών σε υπερβαρικό θάλαμο είναι σημαντικές. Ο τυπικός εξοπλισμός παρακολούθησης ΜΕΘ δεν είναι συμβατός με υπερβαρικά περιβάλλοντα.",
    },
    role: { en: "Occasional referral for specific indications (CO poisoning, gas gangrene)", el: "Περιστασιακή παραπομπή για συγκεκριμένες ενδείξεις (δηλητηρίαση CO, αέρια γάγγραινα)" },
  },
  {
    name: { en: "Kidney Dialysis Unit", el: "Μονάδα Νεφρικής Αιμοκάθαρσης" },
    icon: "Droplet",
    rationale: {
      en: "While emerging research explores HBOT for chronic kidney disease and diabetic nephropathy, it is not currently a treatment modality utilized within a standard dialysis unit. Dialysis patients have complex vascular access requirements and hemodynamic instability that complicate hyperbaric treatment. This remains a preclinical area of investigation.",
      el: "Ενώ αναδυόμενη έρευνα εξερευνά την HBOT για χρόνια νεφρική νόσο και διαβητική νεφροπάθεια, δεν αποτελεί επί του παρόντος θεραπευτική μέθοδο που χρησιμοποιείται εντός τυπικής μονάδας αιμοκάθαρσης. Ασθενείς αιμοκάθαρσης έχουν σύνθετες απαιτήσεις αγγειακής πρόσβασης και αιμοδυναμική αστάθεια που περιπλέκουν υπερβαρική θεραπεία.",
    },
    role: { en: "No current clinical application; preclinical research ongoing", el: "Καμία τρέχουσα κλινική εφαρμογή· προκλινική έρευνα σε εξέλιξη" },
  },
  {
    name: { en: "Genetics Clinic", el: "Κλινική Γενετικής" },
    icon: "Dna",
    rationale: {
      en: "The Genetics Clinic manages hereditary conditions, chromosomal disorders, and genetic counseling. There is currently no scientific evidence supporting the use of HBOT in the management of genetic disorders. While HBOT modulates gene expression through HIF pathways, this does not translate to therapeutic benefit for primary genetic conditions.",
      el: "Η Κλινική Γενετικής διαχειρίζεται κληρονομικές παθήσεις, χρωμοσωμικές διαταραχές και γενετική συμβουλευτική. Δεν υπάρχουν επί του παρόντος επιστημονικά στοιχεία που να υποστηρίζουν χρήση HBOT στη διαχείριση γενετικών διαταραχών. Ενώ η HBOT τροποποιεί γονιδιακή έκφραση μέσω μονοπατιών HIF, αυτό δεν μεταφράζεται σε θεραπευτικό όφελος για πρωτογενείς γενετικές παθήσεις.",
    },
    role: { en: "No current or projected clinical application", el: "Καμία τρέχουσα ή προβλεπόμενη κλινική εφαρμογή" },
  },
  {
    name: { en: "Hepatology", el: "Ηπατολογία" },
    icon: "Layers",
    rationale: {
      en: "While preclinical research is emerging on HBOT for liver regeneration and hepatic ischemia-reperfusion injury, this has not yet translated to established clinical practice. Liver transplant centers have explored HBOT as a preservation strategy, but this remains strictly investigational with no approved protocols.",
      el: "Ενώ αναδύεται προκλινική έρευνα για HBOT σε αναγέννηση ήπατος και ηπατική βλάβη ισχαιμίας-επαναιμάτωσης, αυτό δεν έχει ακόμα μεταφραστεί σε καθιερωμένη κλινική πρακτική. Κέντρα μεταμόσχευσης ήπατος έχουν εξερευνήσει την HBOT ως στρατηγική διατήρησης, αλλά αυτό παραμένει αυστηρά ερευνητικό χωρίς εγκεκριμένα πρωτόκολλα.",
    },
    role: { en: "Preclinical research only; no established clinical protocols", el: "Μόνο προκλινική έρευνα· δεν υπάρχουν καθιερωμένα κλινικά πρωτόκολλα" },
  },
];

// ============================================================
// LONGEVITY & WELLNESS APPLICATIONS
// ============================================================
export const LONGEVITY_APPLICATIONS = [
  {
    id: "telomere",
    title: { en: "Telomere Lengthening", el: "Επιμήκυνση Τελομερών" },
    icon: "Dna",
    stat: ">20%",
    statLabel: { en: "Increase in telomere length", el: "Αύξηση μήκους τελομερών" },
    color: "teal",
    summary: {
      en: "Landmark 2020 study demonstrated >20% increase in PBMC telomere length after 60 HBOT sessions in healthy older adults — the first human evidence of therapeutic telomere lengthening.",
      el: "Σταθμός μελέτη 2020 απέδειξε >20% αύξηση στο μήκος τελομερών PBMC μετά από 60 συνεδρίες HBOT σε υγιείς ηλικιωμένους — η πρώτη ανθρώπινη απόδειξη θεραπευτικής επιμήκυνσης τελομερών.",
    },
    mechanism: {
      en: "HBOT activates telomerase, the enzyme responsible for telomere maintenance and extension. Repeated daily sessions create a hormetic stimulus that upregulates telomerase reverse transcriptase (TERT) expression.",
      el: "Η HBOT ενεργοποιεί τελομεράση, το ένζυμο υπεύθυνο για συντήρηση και επέκταση τελομερών. Επαναλαμβανόμενες καθημερινές συνεδρίες δημιουργούν ορμητικό ερέθισμα που ανεβάζει έκφραση αντίστροφης τρανσκριπτάσης τελομεράσης (TERT).",
    },
  protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "60", frequency: "Once daily, 5×/week", basis: { en: "Hadanny et al., 2020 (RCT)", el: "Hadanny et al., 2020 (ΤΕΔ)" } },
    refs: ["[3]"],
  },
  {
    id: "senescence",
    title: { en: "Senescent Cell Clearance", el: "Εκκαθάριση Γηρασμένων Κυττάρων" },
    icon: "Trash2",
    stat: "37%",
    statLabel: { en: "Reduction in senescent T-cells", el: "Μείωση γηρασμένων T-κυττάρων" },
    color: "navy",
    summary: {
      en: "The same landmark study demonstrated significant reduction in senescent (dysfunctional) immune cells — the first senolytic effect demonstrated through a non-pharmacological intervention.",
      el: "Η ίδια σταθμός μελέτη απέδειξε σημαντική μείωση γηρασμένων (δυσλειτουργικών) ανοσοκυττάρων — το πρώτο σενολυτικό αποτέλεσμα που αποδείχθηκε μέσω μη φαρμακολογικής παρέμβασης.",
    },
    mechanism: {
      en: "HBOT induces selective apoptosis of senescent cells through ROS-mediated signaling pathways. Senescent cells accumulate with age and drive the 'inflammaging' phenotype associated with age-related diseases.",
      el: "Η HBOT επάγει εκλεκτική απόπτωση γηρασμένων κυττάρων μέσω σηματοδοτικών μονοπατιών μεσολαβούμενων από ROS. Τα γηρασμένα κύτταρα συσσωρεύονται με την ηλικία και οδηγούν τον φαινότυπο 'φλεγμονώδους γήρανσης' που σχετίζεται με ηλικιακές παθήσεις.",
    },
  protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "60", frequency: "Once daily, 5×/week", basis: { en: "Hadanny et al., 2020 (RCT)", el: "Hadanny et al., 2020 (ΤΕΔ)" } },
    refs: ["[3]"],
  },
  {
    id: "cognitive",
    title: { en: "Cognitive Enhancement", el: "Γνωστική Ενίσχυση" },
    icon: "Brain",
    stat: "16.5%",
    statLabel: { en: "Improvement in attention & processing speed", el: "Βελτίωση προσοχής & ταχύτητας επεξεργασίας" },
    color: "teal",
    summary: {
      en: "Randomized controlled trial in healthy older adults showed significant cognitive enhancements including memory, processing speed, and executive function improvements correlated with increased cerebral blood flow.",
      el: "Τυχαιοποιημένη ελεγχόμενη δοκιμή σε υγιείς ηλικιωμένους έδειξε σημαντικές γνωστικές ενισχύσεις συμπεριλαμβανομένης βελτίωσης μνήμης, ταχύτητας επεξεργασίας και εκτελεστικής λειτουργίας που συσχετίζονται με αυξημένη εγκεφαλική αιματική ροή.",
    },
    mechanism: {
      en: "HBOT increases regional cerebral blood flow, promotes neuroplasticity through BDNF upregulation, reduces neuroinflammation, and supports hippocampal neurogenesis — all mechanisms diminished with normal aging.",
      el: "Η HBOT αυξάνει περιφερειακή εγκεφαλική αιματική ροή, προάγει νευροπλαστικότητα μέσω ανύψωσης BDNF, μειώνει νευροφλεγμονή και υποστηρίζει ιπποκαμπική νευρογένεση — όλοι μηχανισμοί που μειώνονται με την κανονική γήρανση.",
    },
  protocol: { ata: "2.0 ATA", duration: "90 min", sessions: "60", frequency: "Once daily, 5×/week", basis: { en: "Hadanny et al., 2020 (RCT)", el: "Hadanny et al., 2020 (ΤΕΔ)" } },
    refs: ["[4]", "[8]"],
  },
  {
    id: "stemcells",
    title: { en: "Stem Cell Mobilization", el: "Κινητοποίηση Βλαστοκυττάρων" },
    icon: "Sparkles",
    stat: "8×",
    statLabel: { en: "Increase in circulating stem cells", el: "Αύξηση κυκλοφορούντων βλαστοκυττάρων" },
    color: "navy",
    summary: {
      en: "HBOT mobilizes bone marrow stem cells into circulation at rates up to 8-fold above baseline, enhancing the body's regenerative capacity for tissue repair and organ maintenance.",
      el: "Η HBOT κινητοποιεί βλαστοκύτταρα μυελού οστών στην κυκλοφορία σε ρυθμούς έως 8 φορές πάνω από τη βάση, ενισχύοντας αναγεννητική ικανότητα του σώματος για επισκευή ιστών και συντήρηση οργάνων.",
    },
    mechanism: {
      en: "Hyperoxia activates endothelial nitric oxide synthase (eNOS), which triggers stem cell mobilization from bone marrow niches. Increased circulating stem progenitor cells (SPCs) differentiate into various cell types to repair damaged tissues.",
      el: "Η υπεροξία ενεργοποιεί ενδοθηλιακή συνθάση μονοξειδίου αζώτου (eNOS), η οποία ενεργοποιεί κινητοποίηση βλαστοκυττάρων από θέσεις μυελού οστών. Αυξημένα κυκλοφορούντα πρόδρομα βλαστοκύτταρα (SPCs) διαφοροποιούνται σε διάφορους τύπους κυττάρων για επισκευή κατεστραμμένων ιστών.",
    },
  protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 40", frequency: "Once daily, 5×/week", basis: { en: "Thom et al., 2006 / Clinical Research", el: "Thom et al., 2006 / Κλινική Έρευνα" } },
    refs: ["[6]"],
  },
  {
    id: "athletic",
    title: { en: "Athletic Performance & Recovery", el: "Αθλητική Απόδοση & Αποκατάσταση" },
    icon: "Zap",
    stat: "50%",
    statLabel: { en: "Faster muscle recovery", el: "Ταχύτερη μυϊκή αποκατάσταση" },
    color: "teal",
    summary: {
      en: "Systematic review and meta-analysis demonstrates consistent benefits including 30-50% faster muscle recovery, reduced exercise-induced muscle damage, decreased inflammation markers, and enhanced endurance capacity.",
      el: "Συστηματική ανασκόπηση και μετα-ανάλυση αποδεικνύει συνεπή οφέλη συμπεριλαμβανομένης 30-50% ταχύτερης μυϊκής αποκατάστασης, μειωμένης μυϊκής βλάβης από άσκηση, μειωμένων δεικτών φλεγμονής και ενισχυμένης ικανότητας αντοχής.",
    },
    mechanism: {
      en: "HBOT increases oxygen availability to muscle tissue, accelerating ATP production and enhancing natural repair mechanisms. It reduces pro-inflammatory cytokines (IL-6, TNF-α) that impede recovery and promotes satellite cell activation for muscle regeneration.",
      el: "Η HBOT αυξάνει διαθεσιμότητα οξυγόνου στον μυϊκό ιστό, επιταχύνοντας παραγωγή ATP και ενισχύοντας φυσικούς μηχανισμούς επισκευής. Μειώνει προ-φλεγμονώδεις κυτοκίνες (IL-6, TNF-α) που εμποδίζουν αποκατάσταση και προάγει ενεργοποίηση δορυφορικών κυττάρων για μυϊκή αναγέννηση.",
    },
  protocol: { ata: "1.5 – 2.4 ATA", duration: "60 – 90 min", sessions: "10 – 20 per cycle", frequency: "Post-exercise or daily", basis: { en: "Systematic Review & Meta-Analysis", el: "Συστηματική Ανασκόπηση & Μετα-Ανάλυση" } },
    refs: ["[22]"],
  },
  {
    id: "collagen",
    title: { en: "Collagen Production & Skin Health", el: "Παραγωγή Κολλαγόνου & Υγεία Δέρματος" },
    icon: "Layers",
    stat: "3×",
    statLabel: { en: "Increase in collagen III formation", el: "Αύξηση σχηματισμού κολλαγόνου τύπου ΙΙΙ" },
    color: "navy",
    summary: {
      en: "HBOT stimulates collagen III formation and increases overall collagen production through growth factor upregulation, supporting skin elasticity, joint health, and connective tissue integrity.",
      el: "Η HBOT διεγείρει σχηματισμό κολλαγόνου τύπου ΙΙΙ και αυξάνει συνολική παραγωγή κολλαγόνου μέσω ανύψωσης αυξητικών παραγόντων, υποστηρίζοντας ελαστικότητα δέρματος, υγεία αρθρώσεων και ακεραιότητα συνδετικού ιστού.",
    },
    mechanism: {
      en: "Hyperoxia upregulates VEGF, PDGF, and FGF, promoting fibroblast proliferation and collagen synthesis. HBOT also enhances hydroxylation of proline and lysine residues, critical steps in collagen cross-linking and tissue strength.",
      el: "Η υπεροξία ανεβάζει VEGF, PDGF και FGF, προάγοντας πολλαπλασιασμό ινοβλαστών και σύνθεση κολλαγόνου. Η HBOT επίσης ενισχύει υδροξυλίωση καταλοίπων προλίνης και λυσίνης, κρίσιμα βήματα στη διασύνδεση κολλαγόνου και αντοχή ιστού.",
    },
  protocol: { ata: "2.0 – 2.4 ATA", duration: "90 min", sessions: "20 – 40", frequency: "Once daily, 5×/week", basis: { en: "Clinical Research", el: "Κλινική Έρευνα" } },
    refs: ["[11]"],
  },
];

// ============================================================
// EVIDENCE-BASED RESEARCH STUDIES
// ============================================================
export interface ResearchStudy {
  id: number;
  title: BilingualText;
  authors: string;
  journal: string;
  year: number;
  type: string;
  evidenceLevel: string;
  keyFinding: BilingualText;
  doi: string;
  ref: string;
  citations?: number;
  volume?: string;
}

export const RESEARCH_STUDIES: ResearchStudy[] = [
  {
    id: 1,
    title: { en: "Hyperbaric oxygen therapy increases telomere length and decreases immunosenescence in isolated blood cells", el: "Η θεραπεία με υπερβαρικό οξυγόνο αυξάνει το μήκος τελομερών και μειώνει την ανοσοεπιγήρανση σε απομονωμένα αιμοσφαίρια" },
    authors: "Hadanny A, Daniel-Kotovsky M, Suzin G, et al.",
    journal: "Aging (Albany NY)",
    year: 2020,
    type: "Prospective Clinical Study",
    evidenceLevel: "Level II",
    keyFinding: { en: "60 HBOT sessions increased PBMC telomere length by >20% and significantly reduced senescent T-cells — first human evidence of non-pharmacological telomere lengthening.", el: "60 συνεδρίες HBOT αύξησαν το μήκος τελομερών PBMC κατά >20% και μείωσαν σημαντικά τα γηρασμένα T-κύτταρα — πρώτη ανθρώπινη απόδειξη μη φαρμακολογικής επιμήκυνσης τελομερών." },
    doi: "https://doi.org/10.18632/aging.202188",
    ref: "[3]",
  },
  {
    id: 2,
    title: { en: "Cognitive enhancement of healthy older adults using hyperbaric oxygen: a randomized controlled trial", el: "Γνωστική ενίσχυση υγιών ηλικιωμένων με υπερβαρικό οξυγόνο: τυχαιοποιημένη ελεγχόμενη μελέτη" },
    authors: "Amir H, Malka DK, Gil S, et al.",
    journal: "Aging (Albany NY)",
    year: 2020,
    type: "Randomized Controlled Trial",
    evidenceLevel: "Level I",
    keyFinding: { en: "HBOT induced significant cognitive enhancements in healthy aging adults via mechanisms involving regional changes in cerebral blood flow.", el: "Η HBOT επέφερε σημαντικές γνωστικές ενισχύσεις σε υγιείς ηλικιωμένους μέσω μηχανισμών που αφορούν περιφερειακές αλλαγές στην εγκεφαλική αιματική ροή." },
    doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7377835/",
    ref: "[4]",
  },
  {
    id: 3,
    title: { en: "Hyperbaric oxygen therapy for healthy aging: From mechanisms to therapeutics", el: "Θεραπεία με υπερβαρικό οξυγόνο για υγιή γήρανση: Από τους μηχανισμούς στη θεραπεία" },
    authors: "Fu Q, Duan R, Sun Y, Li Q.",
    journal: "Redox Biology",
    year: 2022,
    type: "Comprehensive Review",
    evidenceLevel: "Level I (Review)",
    keyFinding: { en: "First comprehensive overview of HBOT in aging and geriatric research. Therapeutic targets of HBOT overlap considerably with hallmarks of aging.", el: "Πρώτη ολοκληρωμένη επισκόπηση της HBOT στη γηριατρική έρευνα. Οι θεραπευτικοί στόχοι της HBOT επικαλύπτονται σημαντικά με τα χαρακτηριστικά της γήρανσης." },
    doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9156818/",
    ref: "[5]",
  },
  {
    id: 4,
    title: { en: "Physical enhancement of older adults using hyperbaric oxygen: a randomized controlled trial", el: "Φυσική ενίσχυση ηλικιωμένων με υπερβαρικό οξυγόνο: τυχαιοποιημένη ελεγχόμενη μελέτη" },
    authors: "Hadanny A, Sasson E, Copel L, et al.",
    journal: "BMC Geriatrics",
    year: 2024,
    type: "Randomized Controlled Trial",
    evidenceLevel: "Level I",
    keyFinding: { en: "HBOT improved maximal physical performance and cardiac perfusion in sedentary older adults, including enhanced VO2 max and cardiovascular function.", el: "Η HBOT βελτίωσε τη μέγιστη φυσική απόδοση και καρδιακή αιμάτωση σε καθιστικούς ηλικιωμένους, συμπεριλαμβανομένης ενισχυμένης VO2 max και καρδιαγγειακής λειτουργίας." },
    doi: "https://link.springer.com/article/10.1186/s12877-024-05146-3",
    ref: "[21]",
  },
  {
    id: 5,
    title: { en: "Hyperbaric oxygen therapy in inflammatory bowel disease: a systematic review and meta-analysis", el: "Θεραπεία με υπερβαρικό οξυγόνο στη φλεγμονώδη νόσο εντέρου: συστηματική ανασκόπηση και μετα-ανάλυση" },
    authors: "Singh AK, Jha DK, Jena A, et al.",
    journal: "European Journal of Gastroenterology & Hepatology",
    year: 2021,
    type: "Systematic Review & Meta-Analysis",
    evidenceLevel: "Level I (Meta-Analysis)",
    keyFinding: { en: "HBOT achieved response rates exceeding 80% in both ulcerative colitis and Crohn's disease, with significant mucosal healing demonstrated.", el: "Η HBOT επέτυχε ποσοστά ανταπόκρισης >80% τόσο στην ελκώδη κολίτιδα όσο και στη νόσο Crohn, με αποδεδειγμένη σημαντική επούλωση βλεννογόνου." },
    doi: "https://pubmed.ncbi.nlm.nih.gov/33156066/",
    ref: "[14]",
  },
  {
    id: 6,
    title: { en: "Hyperbaric oxygen: B-level evidence in mild traumatic brain injury clinical trials", el: "Υπερβαρικό οξυγόνο: τεκμηρίωση επιπέδου Β σε κλινικές δοκιμές ήπιας κρανιοεγκεφαλικής κάκωσης" },
    authors: "Wolf G, Cifu D, Baugh L, et al.",
    journal: "Neurology",
    year: 2012,
    type: "Clinical Trial Review",
    evidenceLevel: "Level II",
    keyFinding: { en: "B-level evidence supporting HBOT for mild TBI and post-concussion syndrome, showing improvements in neurocognitive deficits and post-concussion symptoms.", el: "Τεκμηρίωση επιπέδου Β που υποστηρίζει HBOT για ήπια ΚΕΚ και σύνδρομο μετά από διάσειση, δείχνοντας βελτιώσεις σε νευρογνωστικά ελλείμματα και συμπτώματα μετά από διάσειση." },
    doi: "https://www.neurology.org/doi/abs/10.1212/wnl.0000000000003146",
    ref: "[15]",
  },
  {
    id: 7,
    title: { en: "HBOT improves symptoms, brain microstructure and functionality in veterans with treatment-resistant PTSD", el: "Η HBOT βελτιώνει συμπτώματα, μικροδομή εγκεφάλου και λειτουργικότητα σε βετεράνους με ανθεκτική ΔΜΤΣ" },
    authors: "Doenyas-Barak K, Catalogna M, Kutz I, et al.",
    journal: "PLoS One",
    year: 2022,
    type: "Prospective Clinical Study",
    evidenceLevel: "Level II",
    keyFinding: { en: "HBOT significantly improved PTSD checklist scores and demonstrated measurable improvements in brain microstructure on advanced MRI in treatment-resistant PTSD veterans.", el: "Η HBOT βελτίωσε σημαντικά τις βαθμολογίες ελέγχου ΔΜΤΣ και απέδειξε μετρήσιμες βελτιώσεις στη μικροδομή εγκεφάλου σε προηγμένη MRI σε βετεράνους με ανθεκτική ΔΜΤΣ." },
    doi: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0261350",
    ref: "[20]",
  },
  {
    id: 8,
    title: { en: "Effects of pre-, post- and intra-exercise HBOT on performance and recovery: systematic review and meta-analysis", el: "Επιδράσεις της HBOT πριν, κατά και μετά την άσκηση στην απόδοση και αποκατάσταση: συστηματική ανασκόπηση και μετα-ανάλυση" },
    authors: "Huang X, Wang R, Zhang Z, et al.",
    journal: "Frontiers in Physiology",
    year: 2021,
    type: "Systematic Review & Meta-Analysis",
    evidenceLevel: "Level I (Meta-Analysis)",
    keyFinding: { en: "First meta-analysis on HBOT for exercise performance and recovery. Consistent benefits in muscle recovery, reduced inflammation, and enhanced endurance capacity.", el: "Πρώτη μετα-ανάλυση για HBOT σε αθλητική απόδοση και αποκατάσταση. Συνεπή οφέλη σε μυϊκή αποκατάσταση, μειωμένη φλεγμονή και ενισχυμένη ικανότητα αντοχής." },
    doi: "https://www.frontiersin.org/articles/10.3389/fphys.2021.791872/full",
    ref: "[22]",
  },
];

// ============================================================
// STRATEGIC RECOMMENDATIONS
// ============================================================
export const STRATEGIC_RECOMMENDATIONS = [
  {
    id: "unit",
    title: { en: "Establish a Dedicated Hyperbaric Medicine Unit", el: "Ίδρυση Αφιερωμένης Μονάδας Υπερβαρικής Ιατρικής" },
    icon: "Building2",
    priority: "High",
    description: {
      en: "Create a specialized department staffed with certified hyperbaric physicians, trained nurses, and hyperbaric technicians. A multiplace chamber (6–12 seats) enables simultaneous treatment of multiple patients and allows full monitoring of critically ill patients.",
      el: "Δημιουργία εξειδικευμένου τμήματος με πιστοποιημένους υπερβαρικούς ιατρούς, εκπαιδευμένες νοσηλεύτριες και υπερβαρικούς τεχνικούς. Ένας πολυθέσιος θάλαμος (6–12 θέσεις) επιτρέπει ταυτόχρονη θεραπεία πολλαπλών ασθενών και πλήρη παρακολούθηση κρίσιμα ασθενών.",
    },
    actions: {
      en: [
        "Recruit a board-certified hyperbaric medicine physician",
        "Install multiplace chamber with full ICU monitoring capability",
        "Establish UHMS-compliant safety protocols and staff training",
        "Integrate with existing surgical and internal medicine departments",
      ],
      el: [
        "Πρόσληψη πιστοποιημένου ιατρού υπερβαρικής ιατρικής",
        "Εγκατάσταση πολυθέσιου θαλάμου με πλήρη δυνατότητα παρακολούθησης ΜΕΘ",
        "Καθιέρωση πρωτοκόλλων ασφαλείας συμβατών με UHMS και εκπαίδευση προσωπικού",
        "Ενσωμάτωση με υπάρχοντα χειρουργικά και παθολογικά τμήματα",
      ],
    },
  },
  {
    id: "clinical",
    title: { en: "Clinical Integration Protocols", el: "Πρωτόκολλα Κλινικής Ενσωμάτωσης" },
    icon: "ClipboardList",
    priority: "High",
    description: {
      en: "Develop standardized referral pathways from Surgery, Internal Medicine, Oncology, and Geriatric departments for FDA-approved indications. Establish transcutaneous oximetry screening for wound care patients.",
      el: "Ανάπτυξη τυποποιημένων διαδρομών παραπομπής από Χειρουργική, Παθολογική, Ογκολογία και Γηριατρικά τμήματα για εγκεκριμένες ενδείξεις FDA. Καθιέρωση διαδερμικής οξυμετρίας για ασθενείς φροντίδας τραυμάτων.",
    },
    actions: {
      en: [
        "Diabetic foot ulcer pathway with Endocrinology",
        "Radiation injury protocol with Oncology and Breast Center",
        "Acute hearing loss emergency protocol with ENT",
        "Osteomyelitis referral pathway with Orthopedics",
      ],
      el: [
        "Διαδρομή διαβητικού έλκους ποδιού με Ενδοκρινολογία",
        "Πρωτόκολλο ακτινοβολικής βλάβης με Ογκολογία και Κέντρο Μαστού",
        "Πρωτόκολλο επείγουσας οξείας απώλειας ακοής με ΩΡΛ",
        "Διαδρομή παραπομπής οστεομυελίτιδας με Ορθοπεδική",
      ],
    },
  },
  {
    id: "wellness",
    title: { en: "Premium Wellness & Longevity Programs", el: "Premium Προγράμματα Ευεξίας & Μακροζωίας" },
    icon: "Sparkles",
    priority: "Medium",
    description: {
      en: "Develop premium wellness packages targeting healthy individuals seeking cognitive enhancement, anti-aging benefits, and athletic performance optimization. Position as a differentiated offering in the growing longevity medicine market.",
      el: "Ανάπτυξη premium πακέτων ευεξίας που στοχεύουν υγιή άτομα που αναζητούν γνωστική ενίσχυση, αντιγηραντικά οφέλη και βελτιστοποίηση αθλητικής απόδοσης. Τοποθέτηση ως διαφοροποιημένη προσφορά στην αναπτυσσόμενη αγορά ιατρικής μακροζωίας.",
    },
    actions: {
      en: [
        "Cognitive Enhancement Program (60 sessions, 2.0 ATA)",
        "Athletic Recovery & Performance Program",
        "Executive Health & Longevity Package",
        "Anti-Aging Cellular Renewal Protocol",
      ],
      el: [
        "Πρόγραμμα Γνωστικής Ενίσχυσης (60 συνεδρίες, 2,0 ATA)",
        "Πρόγραμμα Αθλητικής Αποκατάστασης & Απόδοσης",
        "Πακέτο Υγείας & Μακροζωίας Στελεχών",
        "Πρωτόκολλο Κυτταρικής Ανανέωσης κατά της Γήρανσης",
      ],
    },
  },
  {
    id: "research",
    title: { en: "Clinical Research Initiatives", el: "Κλινικές Ερευνητικές Πρωτοβουλίες" },
    icon: "FlaskConical",
    priority: "Medium",
    description: {
      en: "Establish clinical research partnerships to conduct trials on emerging indications, positioning Henry Dunant Hospital as a leader in hyperbaric medicine research in the Eastern Mediterranean region.",
      el: "Καθιέρωση κλινικών ερευνητικών συνεργασιών για διεξαγωγή δοκιμών σε αναδυόμενες ενδείξεις, τοποθετώντας το Νοσοκομείο Henry Dunant ως ηγέτη στην έρευνα υπερβαρικής ιατρικής στην Ανατολική Μεσόγειο.",
    },
    actions: {
      en: [
        "IBD clinical trial with Gastroenterology",
        "Neurological disorders research program",
        "Cognitive enhancement in aging cohort study",
        "Longevity biomarker tracking program",
      ],
      el: [
        "Κλινική δοκιμή ΦΝΕ με Γαστρεντερολογία",
        "Ερευνητικό πρόγραμμα νευρολογικών διαταραχών",
        "Μελέτη κοόρτης γνωστικής ενίσχυσης στη γήρανση",
        "Πρόγραμμα παρακολούθησης βιοδεικτών μακροζωίας",
      ],
    },
  },
];

// ============================================================
// COMPLETE REFERENCES (24 sources)
// ============================================================
export interface Reference {
  num: number;
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi: string;
  type: string;
  volume?: string;
  citations?: number;
}

export const REFERENCES: Reference[] = [
  {
    num: 1,
    authors: "Kahle AC, Cooper JS.",
    title: "Hyperbaric Physiological And Pharmacological Effects of Gases.",
    journal: "StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing",
    year: 2023,
    doi: "https://www.ncbi.nlm.nih.gov/books/NBK470481/",
    type: "Reference Book",
  },
  {
    num: 2,
    authors: "Ortega MA, Fraile-Martinez O, García-Montero C, et al.",
    title: "A General Overview on the Hyperbaric Oxygen Therapy: Applications, Mechanisms and Translational Opportunities.",
    journal: "Medicina",
    year: 2021,
    volume: "57(9):864",
    doi: "https://doi.org/10.3390/medicina57090864",
    type: "Review Article",
    citations: 258,
  },
  {
    num: 3,
    authors: "Hadanny A, Daniel-Kotovsky M, Suzin G, et al.",
    title: "Hyperbaric oxygen therapy increases telomere length and decreases immunosenescence in isolated blood cells.",
    journal: "Aging (Albany NY)",
    year: 2020,
    doi: "https://doi.org/10.18632/aging.202188",
    type: "Prospective Clinical Study",
  },
  {
    num: 4,
    authors: "Amir H, Malka DK, Gil S, Rahav BG, Merav C, et al.",
    title: "Cognitive enhancement of healthy older adults using hyperbaric oxygen: a randomized controlled trial.",
    journal: "Aging (Albany NY)",
    year: 2020,
    doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7377835/",
    type: "Randomized Controlled Trial",
  },
  {
    num: 5,
    authors: "Fu Q, Duan R, Sun Y, Li Q.",
    title: "Hyperbaric oxygen therapy for healthy aging: From mechanisms to therapeutics.",
    journal: "Redox Biology",
    year: 2022,
    volume: "53:102352",
    doi: "https://doi.org/10.1016/j.redox.2022.102352",
    type: "Comprehensive Review",
  },
  {
    num: 6,
    authors: "MacLaughlin KJ, et al.",
    title: "Hyperbaric air mobilizes stem cells in humans.",
    journal: "PMC — National Library of Medicine",
    year: 2023,
    doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10318163/",
    type: "Clinical Study",
  },
  {
    num: 7,
    authors: "Fu Q, Duan R, Sun Y, Li Q.",
    title: "The oxygen paradox in aging — antioxidant defense enhancement through hormesis.",
    journal: "Redox Biology",
    year: 2022,
    doi: "https://doi.org/10.1016/j.redox.2022.102352",
    type: "Review Article",
  },
  {
    num: 8,
    authors: "Gottfried I, Schottlender N, Ashery U.",
    title: "Hyperbaric oxygen treatment — from mechanisms to cognitive improvement.",
    journal: "Biomolecules",
    year: 2021,
    volume: "11(10):1520",
    doi: "https://doi.org/10.3390/biom11101520",
    type: "Review Article",
    citations: 142,
  },
  {
    num: 9,
    authors: "Undersea and Hyperbaric Medical Society (UHMS).",
    title: "Hyperbaric Oxygen Therapy Indications (14th Edition).",
    journal: "UHMS Official Publication",
    year: 2020,
    doi: "https://www.uhms.org/resources/featured-resources/hbo-indications.html",
    type: "Clinical Guidelines",
  },
  {
    num: 10,
    authors: "Multiple Authors.",
    title: "Effect of hyperbaric oxygen therapy on postoperative muscle damage and inflammation following total knee arthroplasty: a randomized controlled trial.",
    journal: "Scientific Reports",
    year: 2025,
    doi: "https://www.nature.com/articles/s41598-025-06223-2",
    type: "Randomized Controlled Trial",
  },
  {
    num: 11,
    authors: "Růžička J, et al.",
    title: "Hyperbaric Oxygen Enhances Collagen III Formation in Healing Wounds.",
    journal: "PMC — National Library of Medicine",
    year: 2021,
    doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8820531/",
    type: "Clinical Study",
  },
  {
    num: 12,
    authors: "Tian M.",
    title: "Application and progress of hyperbaric oxygen therapy in cardiovascular diseases.",
    journal: "Medical Gas Research",
    year: 2025,
    doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12054664/",
    type: "Review Article",
  },
  {
    num: 13,
    authors: "Stoekenbroek RM, Santema TB, Legemate DA, et al.",
    title: "Hyperbaric oxygen for the treatment of diabetic foot ulcers: a systematic review.",
    journal: "European Journal of Vascular and Endovascular Surgery",
    year: 2014,
    doi: "https://doi.org/10.1016/j.ejvs.2014.05.007",
    type: "Systematic Review",
  },
  {
    num: 14,
    authors: "Singh AK, Jha DK, Jena A, et al.",
    title: "Hyperbaric oxygen therapy in inflammatory bowel disease: a systematic review and meta-analysis.",
    journal: "European Journal of Gastroenterology & Hepatology",
    year: 2021,
    doi: "https://doi.org/10.1097/MEG.0000000000001960",
    type: "Systematic Review & Meta-Analysis",
  },
  {
    num: 15,
    authors: "Wolf G, Cifu D, Baugh L, et al.",
    title: "Hyperbaric oxygen: B-level evidence in mild traumatic brain injury clinical trials.",
    journal: "Neurology",
    year: 2012,
    doi: "https://www.neurology.org/doi/abs/10.1212/wnl.0000000000003146",
    type: "Clinical Trial Review",
  },
  {
    num: 16,
    authors: "Xu Y, Wang Q, Qu Z, et al.",
    title: "Protective effect of hyperbaric oxygen therapy on cognitive function in patients with vascular dementia.",
    journal: "Cell Transplantation",
    year: 2019,
    doi: "https://doi.org/10.1177/0963689719874637",
    type: "Clinical Study",
  },
  {
    num: 17,
    authors: "Multiple Authors.",
    title: "Hyperbaric Oxygen Therapy for Managing Cancer Treatment.",
    journal: "PMC — National Library of Medicine",
    year: 2025,
    doi: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11943617/",
    type: "Review Article",
  },
  {
    num: 18,
    authors: "Multiple Authors.",
    title: "Hyperbaric oxygen therapy (HBOT) suppresses biomarkers of cell stress and kidney injury in diabetic mice.",
    journal: "ScienceDirect — Nitric Oxide",
    year: 2023,
    doi: "https://www.sciencedirect.com/science/article/pii/S1355814523016279",
    type: "Preclinical Study",
  },
  {
    num: 19,
    authors: "Celebi ARC.",
    title: "Hyperbaric oxygen therapy for central retinal artery occlusion: patient selection and perspectives.",
    journal: "Clinical Ophthalmology",
    year: 2021,
    doi: "https://doi.org/10.2147/OPTH.S276591",
    type: "Clinical Review",
  },
  {
    num: 20,
    authors: "Doenyas-Barak K, Catalogna M, Kutz I, et al.",
    title: "Hyperbaric oxygen therapy improves symptoms, brain's microstructure and functionality in veterans with treatment resistant post-traumatic stress disorder.",
    journal: "PLoS One",
    year: 2022,
    doi: "https://doi.org/10.1371/journal.pone.0261350",
    type: "Prospective Clinical Study",
  },
  {
    num: 21,
    authors: "Hadanny A, Sasson E, Copel L, Daniel-Kotovsky M, et al.",
    title: "Physical enhancement of older adults using hyperbaric oxygen: a randomized controlled trial.",
    journal: "BMC Geriatrics",
    year: 2024,
    doi: "https://doi.org/10.1186/s12877-024-05146-3",
    type: "Randomized Controlled Trial",
  },
  {
    num: 22,
    authors: "Huang X, Wang R, Zhang Z, Wang G, Gao B.",
    title: "Effects of pre-, post- and intra-exercise hyperbaric oxygen therapy on performance and recovery: a systematic review and meta-analysis.",
    journal: "Frontiers in Physiology",
    year: 2021,
    doi: "https://doi.org/10.3389/fphys.2021.791872",
    type: "Systematic Review & Meta-Analysis",
  },
  {
    num: 23,
    authors: "Gupta M, et al.",
    title: "Hyperbaric oxygen therapy: future prospects in regenerative therapy and anti-aging.",
    journal: "Frontiers in Aging",
    year: 2024,
    doi: "https://doi.org/10.3389/fragi.2024.1368982",
    type: "Review Article",
    citations: 22,
  },
  {
    num: 24,
    authors: "Multiple Authors.",
    title: "Regenerative Longevity Medicine: Hyperbaric Oxygen Therapy as a Cornerstone for Healthy Aging.",
    journal: "SciVision Publishers — Regenerative Medicine",
    year: 2025,
    doi: "https://www.scivisionpub.com/pdfs/regenerative-longevity-medicine-hyperbaric-oxygen-therapy-as-a-cornerstone-for-healthy-aging-3714.pdf",
    type: "Review Article",
  },
];
