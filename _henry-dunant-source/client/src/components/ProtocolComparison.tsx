import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import {
  FDA_INDICATIONS,
  DEPARTMENTS_WITH_HBOT,
  LONGEVITY_APPLICATIONS,
} from "@/data/hbot-data";
import type { Protocol } from "@/data/hbot-data";
import {
  GitCompare,
  X,
  Gauge,
  Clock,
  Hash,
  RefreshCw,
  BookOpen,
  Plus,
  ChevronDown,
  ChevronUp,
  Search,
  Trash2,
} from "lucide-react";

// ── i18n ─────────────────────────────────────────────────────
const L = {
  en: {
    badge: "Protocol Comparison Tool",
    title: "Compare Treatment Protocols",
    subtitle:
      "Select up to 6 HBOT indications or applications to compare their treatment parameters side by side — pressure, duration, sessions, frequency, and evidence basis.",
    searchPlaceholder: "Search indications…",
    addIndication: "Add indication to compare",
    clearAll: "Clear all",
    noSelection: "No indications selected yet.",
    noSelectionHint: "Use the picker above to add indications for comparison.",
    maxReached: "Maximum 6 indications reached.",
    indication: "Indication / Application",
    source: "Source",
    pressure: "ATA Pressure",
    duration: "Session Duration",
    sessions: "Total Sessions",
    frequency: "Frequency",
    basis: "Evidence Basis",
    fdaLabel: "FDA Indication",
    deptLabel: "Dept. Application",
    longevityLabel: "Longevity",
    groupFDA: "FDA-Approved Indications",
    groupDept: "Department Applications",
    groupLongevity: "Longevity & Wellness",
    remove: "Remove",
    noProtocol: "—",
    tip: "Tip: Click any row header to remove that indication from the comparison.",
    results: "indications selected",
    downloadPdf: "Download as PDF",
    pdfTitle: "HBOT Protocol Comparison",
    pdfSubtitle: "Henry Dunant Hospital Center — Clinical Resource Platform",
    pdfGenerated: "Generated",
    pdfSource: "Source: HBOT Clinical Resource · Henry Dunant Hospital Center, Athens",
  },
  el: {
    badge: "Εργαλείο Σύγκρισης Πρωτοκόλλων",
    title: "Σύγκριση Θεραπευτικών Πρωτοκόλλων",
    subtitle:
      "Επιλέξτε έως 6 ενδείξεις ή εφαρμογές HBOT για σύγκριση των παραμέτρων θεραπείας δίπλα-δίπλα — πίεση, διάρκεια, συνεδρίες, συχνότητα και τεκμηρίωση.",
    searchPlaceholder: "Αναζήτηση ενδείξεων…",
    addIndication: "Προσθήκη ένδειξης για σύγκριση",
    clearAll: "Εκκαθάριση όλων",
    noSelection: "Δεν έχουν επιλεγεί ενδείξεις.",
    noSelectionHint: "Χρησιμοποιήστε τον επιλογέα παραπάνω για προσθήκη ενδείξεων.",
    maxReached: "Μέγιστο 6 ενδείξεις.",
    indication: "Ένδειξη / Εφαρμογή",
    source: "Πηγή",
    pressure: "Πίεση ATA",
    duration: "Διάρκεια Συνεδρίας",
    sessions: "Σύνολο Συνεδριών",
    frequency: "Συχνότητα",
    basis: "Τεκμηρίωση",
    fdaLabel: "Ένδειξη FDA",
    deptLabel: "Εφαρμογή Τμήματος",
    longevityLabel: "Μακροζωία",
    groupFDA: "Εγκεκριμένες Ενδείξεις FDA",
    groupDept: "Εφαρμογές Τμημάτων",
    groupLongevity: "Μακροζωία & Ευεξία",
    remove: "Αφαίρεση",
    noProtocol: "—",
    tip: "Συμβουλή: Κάντε κλικ σε οποιαδήποτε κεφαλίδα γραμμής για αφαίρεση της ένδειξης από τη σύγκριση.",
    results: "ενδείξεις επιλεγμένες",
    downloadPdf: "Λήψη ως PDF",
    pdfTitle: "Σύγκριση Πρωτοκόλλων HBOT",
    pdfSubtitle: "Νοσοκομείο Henry Dunant — Κλινική Πλατφόρμα Πόρων",
    pdfGenerated: "Δημιουργήθηκε",
    pdfSource: "Πηγή: HBOT Κλινικό · Νοσοκομείο Ερυθρός Σταυρός, Αθήνα",
  },
};

// ── Flat comparison item ──────────────────────────────────────
interface CompareItem {
  key: string;
  label: { en: string; el: string };
  sourceLabel: { en: string; el: string };
  sourceType: "fda" | "dept" | "longevity";
  protocol: Protocol | undefined;
}

// ── Build master list of all comparable items ─────────────────
function buildMasterList(): CompareItem[] {
  const items: CompareItem[] = [];

  // FDA indications
  FDA_INDICATIONS.forEach((ind) => {
    items.push({
      key: `fda-${ind.id}`,
      label: ind.condition,
      sourceLabel: { en: `FDA #${ind.id}`, el: `FDA #${ind.id}` },
      sourceType: "fda",
      protocol: ind.protocol,
    });
  });

  // Department applications
  DEPARTMENTS_WITH_HBOT.forEach((dept) => {
    dept.applications.forEach((app, idx) => {
      items.push({
        key: `dept-${dept.id}-${idx}`,
        label: app.title,
        sourceLabel: dept.name,
        sourceType: "dept",
        protocol: app.protocol,
      });
    });
  });

  // Longevity applications
  LONGEVITY_APPLICATIONS.forEach((lon) => {
    items.push({
      key: `lon-${lon.id}`,
      label: lon.title,
      sourceLabel: { en: "Longevity", el: "Μακροζωία" },
      sourceType: "longevity",
      protocol: lon.protocol,
    });
  });

  return items;
}

const MASTER_LIST = buildMasterList();

// ── Source badge colours ──────────────────────────────────────
const SOURCE_COLORS: Record<string, string> = {
  fda: "bg-emerald-100 text-emerald-800 border-emerald-200",
  dept: "bg-blue-100 text-blue-800 border-blue-200",
  longevity: "bg-violet-100 text-violet-800 border-violet-200",
};

// ── Comparison table row ──────────────────────────────────────
interface RowProps {
  icon: React.ReactNode;
  label: string;
  values: (string | undefined)[];
  highlight?: boolean;
}
function CompareRow({ icon, label, values, highlight = false }: RowProps) {
  return (
    <tr className={highlight ? "bg-[#f0f9ff]" : "bg-white hover:bg-slate-50 transition-colors"}>
      <td className="sticky left-0 z-10 bg-inherit px-4 py-3 border-r border-slate-200">
        <div className="flex items-center gap-2 text-[#0e7490]">
          <span className="shrink-0">{icon}</span>
          <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            {label}
          </span>
        </div>
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className="px-4 py-3 text-sm font-semibold text-slate-800 border-r border-slate-100 last:border-r-0 min-w-[160px] max-w-[220px]"
        >
          {val ?? <span className="text-slate-400 text-xs italic">—</span>}
        </td>
      ))}
    </tr>
  );
}

// ── Main component ────────────────────────────────────────────
export default function ProtocolComparison() {
  const { lang } = useLanguage();
  const l = L[lang];

  const [selected, setSelected] = useState<CompareItem[]>([]);
  const [search, setSearch] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return MASTER_LIST.filter(
      (item) =>
        !selected.find((s) => s.key === item.key) &&
        (q === "" ||
          item.label.en.toLowerCase().includes(q) ||
          item.label.el.toLowerCase().includes(q) ||
          item.sourceLabel.en.toLowerCase().includes(q) ||
          item.sourceLabel.el.toLowerCase().includes(q))
    );
  }, [search, selected]);

  const grouped = useMemo(() => {
    const fda = filtered.filter((i) => i.sourceType === "fda");
    const dept = filtered.filter((i) => i.sourceType === "dept");
    const lon = filtered.filter((i) => i.sourceType === "longevity");
    return { fda, dept, lon };
  }, [filtered]);

  const addItem = (item: CompareItem) => {
    if (selected.length >= 6) return;
    setSelected((prev) => [...prev, item]);
    setSearch("");
  };

  const removeItem = (key: string) => {
    setSelected((prev) => prev.filter((i) => i.key !== key));
  };

  const clearAll = () => {
    setSelected([]);
    setSearch("");
  };

  // ── PDF export ──────────────────────────────────────────────
  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    // Header bar
    doc.setFillColor(14, 116, 144); // #0e7490
    doc.rect(0, 0, pageWidth, 22, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(l.pdfTitle, margin, 10);

    // Subtitle
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(l.pdfSubtitle, margin, 16);

    // Date (right-aligned)
    const dateStr = `${l.pdfGenerated}: ${new Date().toLocaleDateString()}`;
    doc.setFontSize(8);
    doc.text(dateStr, pageWidth - margin, 16, { align: "right" });

    // Build table data
    const rowLabels = [l.pressure, l.duration, l.sessions, l.frequency, l.basis];
    const rowKeys: (keyof NonNullable<CompareItem["protocol"]>)[] = ["ata", "duration", "sessions", "frequency", "basis"];

    const head = [
      [
        { content: l.indication, styles: { fontStyle: "bold" as const } },
        ...selected.map((item) => ({
          content: item.label[lang],
          styles: { fontStyle: "bold" as const },
        })),
      ],
    ];

    const body = rowLabels.map((label, rowIdx) => [
      { content: label, styles: { fontStyle: "bold" as const, textColor: [14, 116, 144] as [number, number, number] } },
      ...selected.map((item) => {
        const key = rowKeys[rowIdx];
        const val = item.protocol?.[key];
        if (!val) return l.noProtocol;
        if (typeof val === "object" && val !== null && "en" in val) {
          return (val as { en: string; el: string })[lang];
        }
        return String(val);
      }),
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 28,
      margin: { left: margin, right: margin },
      headStyles: {
        fillColor: [14, 116, 144],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 9,
      },
      alternateRowStyles: { fillColor: [240, 249, 255] },
      bodyStyles: { fontSize: 9, cellPadding: 4 },
      columnStyles: { 0: { cellWidth: 38, fontStyle: "bold" } },
      theme: "grid",
    });

    // Footer
    const finalY = (doc as jsPDF & { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ?? 180;
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    doc.text(l.pdfSource, margin, finalY + 8);

    doc.save(`HBOT-Protocol-Comparison-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Comparison table rows
  const pressureVals = selected.map((i) => i.protocol?.ata);
  const durationVals = selected.map((i) => i.protocol?.duration);
  const sessionsVals = selected.map((i) => i.protocol?.sessions);
  const frequencyVals = selected.map((i) => i.protocol?.frequency);
  const basisVals = selected.map((i) =>
    i.protocol ? i.protocol.basis[lang] : undefined
  );

  return (
    <section id="compare" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0e7490]/30 bg-[#0e7490]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0e7490] mb-4">
            <GitCompare className="h-3.5 w-3.5" />
            {l.badge}
          </span>
          <h2
            className="text-3xl font-bold text-slate-900 mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {l.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
            {l.subtitle}
          </p>
        </div>

        {/* Picker */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#0e7490]" />
              <span className="text-sm font-semibold text-slate-700">{l.addIndication}</span>
              <span className="text-xs text-slate-400">
                ({selected.length}/6 {l.results})
              </span>
            </div>
            {selected.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {l.clearAll}
              </button>
            )}
          </div>

          {/* Search input */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPickerOpen(true);
              }}
              onFocus={() => setPickerOpen(true)}
              placeholder={l.searchPlaceholder}
              disabled={selected.length >= 6}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e7490]/30 focus:border-[#0e7490] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setPickerOpen(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Picker dropdown */}
          {pickerOpen && (search || true) && filtered.length > 0 && selected.length < 6 && (
            <div className="rounded-xl border border-slate-200 bg-white shadow-lg max-h-72 overflow-y-auto">
              {grouped.fda.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 sticky top-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                      {l.groupFDA}
                    </span>
                  </div>
                  {grouped.fda.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => { addItem(item); setPickerOpen(false); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 transition-colors flex items-center justify-between gap-3 border-b border-slate-50 last:border-b-0"
                    >
                      <span className="text-sm text-slate-800">{item.label[lang]}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${SOURCE_COLORS.fda}`}>
                        {item.sourceLabel[lang]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {grouped.dept.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 sticky top-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">
                      {l.groupDept}
                    </span>
                  </div>
                  {grouped.dept.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => { addItem(item); setPickerOpen(false); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors flex items-center justify-between gap-3 border-b border-slate-50 last:border-b-0"
                    >
                      <span className="text-sm text-slate-800">{item.label[lang]}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${SOURCE_COLORS.dept}`}>
                        {item.sourceLabel[lang]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {grouped.lon.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 sticky top-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-700">
                      {l.groupLongevity}
                    </span>
                  </div>
                  {grouped.lon.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => { addItem(item); setPickerOpen(false); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-violet-50 transition-colors flex items-center justify-between gap-3 border-b border-slate-50 last:border-b-0"
                    >
                      <span className="text-sm text-slate-800">{item.label[lang]}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${SOURCE_COLORS.longevity}`}>
                        {item.sourceLabel[lang]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {selected.length >= 6 && (
            <p className="text-xs text-amber-600 font-medium mt-2">{l.maxReached}</p>
          )}

          {/* Selected chips */}
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
              {selected.map((item) => (
                <span
                  key={item.key}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.sourceType === "fda"
                        ? "bg-emerald-500"
                        : item.sourceType === "dept"
                        ? "bg-blue-500"
                        : "bg-violet-500"
                    }`}
                  />
                  {item.label[lang]}
                  <button
                    onClick={() => removeItem(item.key)}
                    className="ml-0.5 text-slate-400 hover:text-red-500 transition-colors"
                    title={l.remove}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Comparison table */}
        {selected.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
            <GitCompare className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">{l.noSelection}</p>
            <p className="text-slate-400 text-sm mt-1">{l.noSelectionHint}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#0e7490] text-white">
                    <th className="sticky left-0 z-20 bg-[#0e7490] px-4 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap min-w-[140px]">
                      {l.indication}
                    </th>
                    {selected.map((item) => (
                      <th
                        key={item.key}
                        className="px-4 py-4 text-xs font-bold min-w-[160px] max-w-[220px] align-top"
                      >
                        <div className="flex flex-col gap-1.5">
                          <span className="leading-snug">{item.label[lang]}</span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${SOURCE_COLORS[item.sourceType]}`}
                            >
                              {item.sourceLabel[lang]}
                            </span>
                            <button
                              onClick={() => removeItem(item.key)}
                              className="text-white/60 hover:text-white transition-colors"
                              title={l.remove}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <CompareRow
                    icon={<Gauge className="h-4 w-4" />}
                    label={l.pressure}
                    values={pressureVals}
                    highlight
                  />
                  <CompareRow
                    icon={<Clock className="h-4 w-4" />}
                    label={l.duration}
                    values={durationVals}
                  />
                  <CompareRow
                    icon={<Hash className="h-4 w-4" />}
                    label={l.sessions}
                    values={sessionsVals}
                    highlight
                  />
                  <CompareRow
                    icon={<RefreshCw className="h-4 w-4" />}
                    label={l.frequency}
                    values={frequencyVals}
                  />
                  <CompareRow
                    icon={<BookOpen className="h-4 w-4" />}
                    label={l.basis}
                    values={basisVals}
                    highlight
                  />
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-400 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <GitCompare className="h-3.5 w-3.5 shrink-0" />
                {l.tip}
              </div>
              <button
                onClick={exportToPDF}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e7490] text-white text-xs font-semibold hover:bg-[#0c6880] transition-colors shadow-sm shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {l.downloadPdf}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
