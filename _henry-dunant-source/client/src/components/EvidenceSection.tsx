import { RESEARCH_STUDIES, type Lang } from "@/data/hbot-data";
import { BookOpen, ExternalLink, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const EVIDENCE_COLORS: Record<string, string> = {
  "Level I": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Level I (Review)": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Level I (Meta-Analysis)": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Level II": "bg-sky-100 text-sky-800 border-sky-200",
};

const TYPE_COLORS: Record<string, string> = {
  "Randomized Controlled Trial": "bg-violet-100 text-violet-800",
  "Systematic Review & Meta-Analysis": "bg-indigo-100 text-indigo-800",
  "Prospective Clinical Study": "bg-sky-100 text-sky-800",
  "Comprehensive Review": "bg-teal-100 text-teal-800",
  "Clinical Trial Review": "bg-orange-100 text-orange-800",
};

export default function EvidenceSection() {
  const { t, language } = useLanguage();
  const l = language as Lang;
  return (
    <section id="evidence" className="section-anchor py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-violet-700" />
            <span className="text-[11px] font-bold text-violet-700 tracking-widest uppercase">
              {t("evidence.section.badge")}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("evidence.section.title")}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            {t("evidence.section.subtitle")}
          </p>
        </div>

        {/* Evidence Level Legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: t("evidence.level1"), color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
            { label: t("evidence.level2"), color: "bg-sky-100 text-sky-800 border-sky-200" },
            { label: t("evidence.level3"), color: "bg-orange-100 text-orange-800 border-orange-200" },
          ].map((l) => (
            <div
              key={l.label}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${l.color}`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {l.label}
            </div>
          ))}
        </div>

        {/* Study Cards */}
        <div className="space-y-4">
          {RESEARCH_STUDIES.map((study) => {
            const evidenceStyle = EVIDENCE_COLORS[study.evidenceLevel] || "bg-slate-100 text-slate-700 border-slate-200";
            const typeStyle = TYPE_COLORS[study.type] || "bg-slate-100 text-slate-700";

            return (
              <div
                key={study.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden dept-card"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Left: Number */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-xl bg-[#0e7490] text-white flex items-center justify-center font-bold text-sm"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {study.id}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${evidenceStyle}`}
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {study.evidenceLevel}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${typeStyle}`}
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {study.type}
                        </span>
                        {study.citations && (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {study.citations} {t("evidence.citations.label")}
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-[15px] font-bold text-slate-800 mb-1 leading-snug"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {study.title[l]}
                      </h3>

                      <p className="text-slate-500 text-[13px] mb-2" style={{ fontFamily: "Lato, sans-serif" }}>
                        {study.authors} — <em>{study.journal}</em>, {study.year}
                      </p>

                      {/* Key Finding */}
                      <div className="bg-[#0e7490]/5 border border-[#0e7490]/15 rounded-xl px-4 py-3 mt-3">
                        <div className="text-[10px] font-bold text-[#0e7490] tracking-widest uppercase mb-1">
                          {t("evidence.finding.label")}
                        </div>
                        <p className="text-slate-700 text-[13px] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                          {study.keyFinding[l]}
                        </p>
                      </div>
                    </div>

                    {/* DOI Link */}
                    <div className="flex-shrink-0">
                      <a
                        href={study.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 text-slate-600 text-[12px] font-semibold hover:bg-[#0e7490] hover:text-white transition-all"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {t("evidence.doi.label")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Evidence Summary */}
        <div
          className="mt-10 rounded-2xl p-6 md:p-8 text-white"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0e7490 100%)" }}
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("evidence.summary.title")}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "Lato, sans-serif", fontWeight: 300 }}>
                {t("evidence.summary.body")}
              </p>
            </div>
            {[
              { val: "4", label: t("evidence.stat.rcts"), sub: t("evidence.stat.rcts.sub") },
              { val: "3", label: t("evidence.stat.meta"), sub: t("evidence.stat.meta.sub") },
              { val: "258+", label: t("evidence.stat.citations"), sub: t("evidence.stat.citations.sub") },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-teal-300 mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {s.val}
                </div>
                <div className="text-white/90 text-sm font-semibold">{s.label}</div>
                <div className="text-white/50 text-[11px]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
