import { useState } from "react";
import { FDA_INDICATIONS, type Lang } from "@/data/hbot-data";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProtocolPanel from "@/components/ProtocolPanel";
import RefTags from "@/components/RefTags";

// Category keys are stable EN strings used for filtering logic
const CATEGORY_KEYS = ["All", "Acute Ischemias", "Infectious Diseases", "Wound Healing", "Gas/Bubble Disorders", "Sensory Disorders"];

const EVIDENCE_COLORS: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  B: "bg-sky-100 text-sky-800 border border-sky-200",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Acute Ischemias": "bg-orange-50 border-orange-200",
  "Infectious Diseases": "bg-rose-50 border-rose-200",
  "Wound Healing": "bg-emerald-50 border-emerald-200",
  "Gas/Bubble Disorders": "bg-sky-50 border-sky-200",
  "Sensory Disorders": "bg-violet-50 border-violet-200",
};

// Greek labels for categories
const CATEGORY_LABELS_EL: Record<string, string> = {
  "All": "Όλες",
  "Acute Ischemias": "Οξείες Ισχαιμίες",
  "Infectious Diseases": "Λοιμώδη Νοσήματα",
  "Wound Healing": "Επούλωση Τραυμάτων",
  "Gas/Bubble Disorders": "Διαταραχές Αερίου",
  "Sensory Disorders": "Αισθητηριακές Διαταραχές",
};

export default function FDASection() {
  const { t, lang } = useLanguage();
  const l = lang as Lang;
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filtered = activeCategory === "All"
    ? FDA_INDICATIONS
    : FDA_INDICATIONS.filter((i) => i.category.en === activeCategory);

  return (
    <section id="fda" className="section-anchor py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
                {t("fda.section.badge")}
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-3"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {t("fda.section.title")}
            </h2>
            <p className="text-slate-500 text-base leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
              {t("fda.section.subtitle")}
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-slate-200 shadow-sm self-start md:self-auto">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === "cards"
                  ? "bg-[#0e7490] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t("fda.view.cards")}
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === "table"
                  ? "bg-[#0e7490] text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t("fda.view.table")}
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORY_KEYS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[#0e7490] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-[#0e7490]/40 hover:text-[#0e7490]"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {l === "el" ? CATEGORY_LABELS_EL[cat] ?? cat : cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-[11px] opacity-70">
                  ({FDA_INDICATIONS.filter((i) => i.category.en === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Cards View */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ind) => {
              const isExpanded = expandedId === ind.id;
              const catColor = CATEGORY_COLORS[ind.category.en] || "bg-slate-50 border-slate-200";
              const descText = ind.description[l];
              return (
                <div
                  key={ind.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden dept-card"
                  style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
                >
                  <div className="p-5">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#0e7490] flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                          style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {ind.id}
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${catColor} border`}
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {ind.category[l]}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold flex-shrink-0 ${EVIDENCE_COLORS[ind.evidenceLevel]}`}
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        Level {ind.evidenceLevel}
                      </span>
                    </div>

                    <h3
                      className="text-[15px] font-bold text-slate-800 mb-2 leading-snug"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {ind.condition[l]}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                      {isExpanded ? descText : `${descText.slice(0, 90)}...`}
                    </p>

                    {isExpanded && ind.protocol && (
                      <ProtocolPanel protocol={ind.protocol} compact />
                    )}
                    {isExpanded && ind.refs && ind.refs.length > 0 && (
                      <RefTags refs={ind.refs} label={l === "el" ? "Αναφ.:" : "Refs:"} />
                    )}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : ind.id)}
                      className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-[#0e7490] hover:opacity-70 transition-opacity"
                    >
                      {isExpanded ? (
                        <><ChevronUp className="w-3.5 h-3.5" /> {t("fda.btn.less")}</>
                      ) : (
                        <><ChevronDown className="w-3.5 h-3.5" /> {t("fda.btn.more")}</>
                      )}
                    </button>
                  </div>

                  <div className="px-5 py-2.5 bg-emerald-50 border-t border-emerald-100 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-emerald-700">
                      {ind.evidence[l]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-widest uppercase w-10">{t("fda.table.id")}</th>
                    <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-widest uppercase">{t("fda.table.condition")}</th>
                    <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-widest uppercase">{t("fda.table.category")}</th>
                    <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-widest uppercase">{t("fda.table.level")}</th>
                    <th className="px-4 py-3.5 text-left text-[11px] font-bold tracking-widest uppercase">{t("fda.table.evidence")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ind, idx) => (
                    <tr
                      key={ind.id}
                      className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                    >
                      <td className="px-4 py-3.5">
                        <span className="w-6 h-6 rounded bg-[#0e7490]/10 text-[#0e7490] text-[11px] font-bold flex items-center justify-center"
                          style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {ind.id}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-semibold text-slate-800 text-[13px]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {ind.condition[l]}
                        </span>
                        <p className="text-slate-400 text-[11px] mt-0.5 max-w-xs" style={{ fontFamily: "Lato, sans-serif" }}>
                          {ind.description[l].slice(0, 80)}...
                        </p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${CATEGORY_COLORS[ind.category.en] || ""}`}>
                          {ind.category[l]}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${EVIDENCE_COLORS[ind.evidenceLevel]}`}>
                          Level {ind.evidenceLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[11px] font-semibold text-emerald-700">{t("fda.evidence.standard")}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { en: "Acute Ischemias", el: "Οξείες Ισχαιμίες", count: 3, color: "bg-orange-100 text-orange-800" },
            { en: "Infectious Diseases", el: "Λοιμώδη Νοσήματα", count: 5, color: "bg-rose-100 text-rose-800" },
            { en: "Wound Healing", el: "Επούλωση Τραυμάτων", count: 2, color: "bg-emerald-100 text-emerald-800" },
            { en: "Sensory Disorders", el: "Αισθητηριακές Διαταραχές", count: 2, color: "bg-violet-100 text-violet-800" },
          ].map((item) => (
            <div key={item.en} className={`rounded-xl px-4 py-3 ${item.color}`}>
              <div className="text-2xl font-bold" style={{ fontFamily: "Montserrat, sans-serif" }}>{item.count}</div>
              <div className="text-[12px] font-semibold">{item[l]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
