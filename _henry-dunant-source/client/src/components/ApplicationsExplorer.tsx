import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DEPARTMENTS_WITH_HBOT } from "@/data/hbot-data";
import ProtocolPanel from "@/components/ProtocolPanel";
import RefTags from "@/components/RefTags";
import { Search, X, Filter, ChevronDown, ChevronUp, Gauge, Clock, Hash } from "lucide-react";

// ── Types ────────────────────────────────────────────────────
type StatusFilter = "all" | "FDA-Approved" | "Research" | "Emerging";

interface FlatApplication {
  deptId: string;
  deptName: { en: string; el: string };
  deptColor: string;
  title: { en: string; el: string };
  type: string;
  typeColor: string;
  description: { en: string; el: string };
  evidence: string;
  protocol?: {
    ata: string;
    duration: string;
    sessions: string;
    frequency: string;
    basis: { en: string; el: string };
  };
  refs: string[];
}

// ── i18n ─────────────────────────────────────────────────────
const L = {
  en: {
    badge: "Applications Explorer",
    title: "Filter HBOT Applications",
    subtitle:
      "Search and filter all HBOT applications across every hospital department by approval status, department, or keyword.",
    searchPlaceholder: "Search by condition, department, or keyword…",
    filterByStatus: "Filter by Status",
    filterByDept: "Filter by Department",
    allStatuses: "All Statuses",
    allDepts: "All Departments",
    fdaApproved: "FDA-Approved",
    research: "Research",
    emerging: "Emerging",
    results: "results",
    result: "result",
    noResults: "No applications match your filters.",
    clearFilters: "Clear all filters",
    activeFilters: "Active filters:",
    protocol: "Protocol",
    pressure: "Pressure",
    duration: "Duration",
    sessions: "Sessions",
    showProtocol: "Show Protocol",
    hideProtocol: "Hide Protocol",
    refs: "Refs:",
    evidence: "Evidence:",
    dept: "Department:",
  },
  el: {
    badge: "Εξερευνητής Εφαρμογών",
    title: "Φιλτράρισμα Εφαρμογών HBOT",
    subtitle:
      "Αναζητήστε και φιλτράρετε όλες τις εφαρμογές HBOT σε κάθε τμήμα του νοσοκομείου ανά κατάσταση έγκρισης, τμήμα ή λέξη-κλειδί.",
    searchPlaceholder: "Αναζήτηση κατάστασης, τμήματος ή λέξης-κλειδί…",
    filterByStatus: "Φιλτράρισμα κατά Κατάσταση",
    filterByDept: "Φιλτράρισμα κατά Τμήμα",
    allStatuses: "Όλες οι Καταστάσεις",
    allDepts: "Όλα τα Τμήματα",
    fdaApproved: "Εγκεκριμένο FDA",
    research: "Έρευνα",
    emerging: "Αναδυόμενο",
    results: "αποτελέσματα",
    result: "αποτέλεσμα",
    noResults: "Δεν βρέθηκαν εφαρμογές για τα επιλεγμένα φίλτρα.",
    clearFilters: "Εκκαθάριση φίλτρων",
    activeFilters: "Ενεργά φίλτρα:",
    protocol: "Πρωτόκολλο",
    pressure: "Πίεση",
    duration: "Διάρκεια",
    sessions: "Συνεδρίες",
    showProtocol: "Εμφάνιση Πρωτοκόλλου",
    hideProtocol: "Απόκρυψη Πρωτοκόλλου",
    refs: "Αναφ.:",
    evidence: "Τεκμηρίωση:",
    dept: "Τμήμα:",
  },
};

// ── Status badge config ──────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  "FDA-Approved": "bg-emerald-100 text-emerald-800 border border-emerald-200",
  Research: "bg-blue-100 text-blue-800 border border-blue-200",
  Emerging: "bg-amber-100 text-amber-800 border border-amber-200",
};

const EVIDENCE_STYLES: Record<string, string> = {
  "Level A": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "Level B": "bg-blue-50 text-blue-700 border border-blue-200",
  "Level C": "bg-amber-50 text-amber-700 border border-amber-200",
};

// ── Flatten all applications ─────────────────────────────────
function buildFlatApps(): FlatApplication[] {
  const flat: FlatApplication[] = [];
  for (const dept of DEPARTMENTS_WITH_HBOT) {
    for (const app of dept.applications) {
      flat.push({
        deptId: dept.id,
        deptName: dept.name,
        deptColor: dept.color,
        title: app.title,
        type: app.type,
        typeColor: app.typeColor,
        description: app.description,
        evidence: app.evidence,
        protocol: app.protocol,
        refs: app.refs,
      });
    }
  }
  return flat;
}

const ALL_APPS = buildFlatApps();

// ── Component ────────────────────────────────────────────────
export default function ApplicationsExplorer() {
  const { lang } = useLanguage();
  const t = L[lang];

  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deptFilter, setDeptFilter] = useState<string>("all");
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);

  // Build department list for filter dropdown
  const deptOptions = useMemo(
    () =>
      DEPARTMENTS_WITH_HBOT.map((d) => ({
        id: d.id,
        name: d.name[lang],
        color: d.color,
      })),
    [lang]
  );

  // Filter logic
  const filtered = useMemo(() => {
    const kw = keyword.toLowerCase().trim();
    return ALL_APPS.filter((app) => {
      const matchStatus =
        statusFilter === "all" || app.type === statusFilter;
      const matchDept =
        deptFilter === "all" || app.deptId === deptFilter;
      const matchKeyword =
        !kw ||
        app.title[lang].toLowerCase().includes(kw) ||
        app.description[lang].toLowerCase().includes(kw) ||
        app.deptName[lang].toLowerCase().includes(kw) ||
        app.type.toLowerCase().includes(kw);
      return matchStatus && matchDept && matchKeyword;
    });
  }, [keyword, statusFilter, deptFilter, lang]);

  // Active filter chips
  const activeChips: { label: string; clear: () => void }[] = [];
  if (statusFilter !== "all") {
    const label =
      statusFilter === "FDA-Approved"
        ? t.fdaApproved
        : statusFilter === "Research"
        ? t.research
        : t.emerging;
    activeChips.push({ label, clear: () => setStatusFilter("all") });
  }
  if (deptFilter !== "all") {
    const dept = deptOptions.find((d) => d.id === deptFilter);
    if (dept) activeChips.push({ label: dept.name, clear: () => setDeptFilter("all") });
  }
  if (keyword.trim()) {
    activeChips.push({ label: `"${keyword.trim()}"`, clear: () => setKeyword("") });
  }

  const clearAll = () => {
    setStatusFilter("all");
    setDeptFilter("all");
    setKeyword("");
  };

  const toggleProtocol = (key: string) =>
    setExpandedProtocol((prev) => (prev === key ? null : key));

  const resultCount = filtered.length;

  return (
    <section id="explorer" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#0e7490]/10 text-[#0e7490] mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">{t.title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">{t.subtitle}</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e7490]/30 focus:border-[#0e7490]"
            />
            {keyword && (
              <button
                onClick={() => setKeyword("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Status filter */}
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                <Filter className="inline h-3 w-3 mr-1" />
                {t.filterByStatus}
              </label>
              <div className="flex flex-wrap gap-2">
                {(["all", "FDA-Approved", "Research", "Emerging"] as const).map((s) => {
                  const label =
                    s === "all"
                      ? t.allStatuses
                      : s === "FDA-Approved"
                      ? t.fdaApproved
                      : s === "Research"
                      ? t.research
                      : t.emerging;
                  const active = statusFilter === s;
                  const colorClass =
                    s === "FDA-Approved"
                      ? active
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                      : s === "Research"
                      ? active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                      : s === "Emerging"
                      ? active
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                      : active
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50";
                  return (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${colorClass}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Department filter */}
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                <Filter className="inline h-3 w-3 mr-1" />
                {t.filterByDept}
              </label>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0e7490]/30 focus:border-[#0e7490] cursor-pointer"
              >
                <option value="all">{t.allDepts}</option>
                {deptOptions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active chips + result count */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              {activeChips.length > 0 && (
                <span className="text-xs text-slate-500 font-medium">{t.activeFilters}</span>
              )}
              {activeChips.map((chip, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0e7490]/10 text-[#0e7490] text-xs font-semibold"
                >
                  {chip.label}
                  <button onClick={chip.clear} className="hover:text-[#0c5f73]">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {activeChips.length > 1 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-slate-500 underline hover:text-slate-700"
                >
                  {t.clearFilters}
                </button>
              )}
            </div>
            <span className="text-sm font-semibold text-slate-700">
              <span className="text-[#0e7490] text-base font-bold">{resultCount}</span>{" "}
              {resultCount === 1 ? t.result : t.results}
            </span>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Search className="h-10 w-10 mx-auto mb-3 text-slate-300" />
            <p className="text-base font-medium">{t.noResults}</p>
            <button
              onClick={clearAll}
              className="mt-3 text-sm text-[#0e7490] underline hover:text-[#0c5f73]"
            >
              {t.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((app, idx) => {
              const key = `${app.deptId}-${idx}`;
              const isExpanded = expandedProtocol === key;
              return (
                <div
                  key={key}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Top row: dept tag + status badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold text-white"
                      style={{ backgroundColor: app.deptColor }}
                    >
                      {app.deptName[lang]}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap ${
                        STATUS_STYLES[app.type] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {app.type === "FDA-Approved"
                        ? t.fdaApproved
                        : app.type === "Research"
                        ? t.research
                        : t.emerging}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                    {app.title[lang]}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed flex-1 mb-3">
                    {app.description[lang]}
                  </p>

                  {/* Evidence + Refs row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] text-slate-500 font-medium">
                      {t.evidence}{" "}
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          EVIDENCE_STYLES[app.evidence] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {app.evidence}
                      </span>
                    </span>
                    {app.refs.length > 0 && (
                      <RefTags refs={app.refs} label={t.refs} />
                    )}
                  </div>

                  {/* Protocol mini-preview */}
                  {app.protocol && (
                    <>
                      {!isExpanded && (
                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-3 py-2 mb-2 border border-slate-100">
                          <span className="flex items-center gap-1 text-[11px] text-slate-700">
                            <Gauge className="h-3 w-3 text-[#0e7490]" />
                            <span className="font-bold">{app.protocol.ata}</span>
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-700">
                            <Clock className="h-3 w-3 text-[#0e7490]" />
                            <span className="font-bold">{app.protocol.duration}</span>
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-700">
                            <Hash className="h-3 w-3 text-[#0e7490]" />
                            <span className="font-bold">{app.protocol.sessions}</span>
                          </span>
                        </div>
                      )}
                      {isExpanded && <ProtocolPanel protocol={app.protocol} compact />}
                      <button
                        onClick={() => toggleProtocol(key)}
                        className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#0e7490] hover:text-[#0c5f73] transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" />
                            {t.hideProtocol}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" />
                            {t.showProtocol}
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
