import { REFERENCES, type Reference } from "@/data/hbot-data";
import { BookOpen, ExternalLink, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TYPE_COLORS: Record<string, string> = {
  "Randomized Controlled Trial": "bg-violet-100 text-violet-800",
  "Systematic Review & Meta-Analysis": "bg-indigo-100 text-indigo-800",
  "Prospective Clinical Study": "bg-sky-100 text-sky-800",
  "Comprehensive Review": "bg-teal-100 text-teal-800",
  "Clinical Trial Review": "bg-orange-100 text-orange-800",
  "Review Article": "bg-teal-100 text-teal-800",
  "Reference Book": "bg-slate-100 text-slate-700",
  "Clinical Guidelines": "bg-emerald-100 text-emerald-800",
  "Clinical Study": "bg-sky-100 text-sky-800",
  "Clinical Review": "bg-blue-100 text-blue-800",
  "Preclinical Study": "bg-orange-100 text-orange-800",
};

export default function ReferencesSection() {
  const { t } = useLanguage();
  return (
    <section id="references" className="section-anchor py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[11px] font-bold text-slate-600 tracking-widest uppercase">
              {t("refs.section.badge")}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("refs.section.title")}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            {t("refs.section.subtitle")}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { val: "24", label: t("refs.stat.sources") },
            { val: "4", label: t("refs.stat.rcts") },
            { val: "3", label: t("refs.stat.reviews") },
            { val: "2025", label: t("refs.stat.guidelines") },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center"
            >
              <div
                className="text-2xl font-bold text-[#0e7490] mb-1"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {s.val}
              </div>
              <div className="text-[12px] text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* References List */}
        <div className="space-y-3">
          {REFERENCES.map((ref) => {
            const typeStyle = TYPE_COLORS[ref.type] || "bg-slate-100 text-slate-700";

            return (
              <div
                key={ref.num}
                id={`ref-${ref.num}`}
                className="bg-white rounded-xl border border-slate-200 p-5 dept-card scroll-mt-24"
                style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-start gap-4">
                  {/* Number */}
                  <div
                    className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {ref.num}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${typeStyle}`}
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {ref.type}
                      </span>
                      {ref.citations && (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {ref.citations} citations
                        </span>
                      )}
                    </div>

                    <p className="text-slate-800 text-[14px] font-semibold leading-snug mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {ref.title}
                    </p>

                    <p className="text-slate-500 text-[12px]" style={{ fontFamily: "Lato, sans-serif" }}>
                      {ref.authors}{" "}
                      <em className="text-slate-600">{ref.journal}</em>
                      {ref.volume && `, ${ref.volume}`}. {ref.year}.
                    </p>
                  </div>

                  {/* DOI */}
                  <a
                    href={ref.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold hover:bg-[#0e7490] hover:text-white transition-all"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {t("refs.doi.label")}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="section-divider mb-8" />
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[12px] font-semibold mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t("refs.footer.pill")}
          </div>
          <p className="text-slate-400 text-sm max-w-xl mx-auto" style={{ fontFamily: "Lato, sans-serif" }}>
            {t("refs.footer")}
          </p>
        </div>
      </div>
    </section>
  );
}
