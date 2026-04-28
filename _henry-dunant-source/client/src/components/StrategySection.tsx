import { STRATEGIC_RECOMMENDATIONS, type Lang } from "@/data/hbot-data";
import { Building2, ClipboardList, Sparkles, FlaskConical, TrendingUp, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, ClipboardList, Sparkles, FlaskConical,
};

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-rose-100 text-rose-800 border border-rose-200",
  Medium: "bg-amber-100 text-amber-800 border border-amber-200",
};

export default function StrategySection() {
  const { t, lang } = useLanguage();
  const l = lang as Lang;
  return (
    <section id="strategy" className="section-anchor py-24 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e7490]/10 mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#0e7490]" />
            <span className="text-[11px] font-bold text-[#0e7490] tracking-widest uppercase">
              {t("strategy.section.badge")}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("strategy.section.title")}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            {t("strategy.section.subtitle")}
          </p>
        </div>

        {/* Recommendation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {STRATEGIC_RECOMMENDATIONS.map((rec, idx) => {
            const Icon = ICON_MAP[rec.icon] || Building2;

            return (
              <div
                key={rec.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden dept-card"
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#0e7490]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#0e7490]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[11px] font-bold text-slate-400 tracking-widest uppercase"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            Phase {idx + 1}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${PRIORITY_STYLES[rec.priority]}`}
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                          >
                            {rec.priority === "High" ? t("strategy.priority.high") : t("strategy.priority.medium")}
                          </span>
                        </div>
                        <h3
                          className="text-[16px] font-bold text-slate-800 leading-snug"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {rec.title[l]}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-5" style={{ fontFamily: "Lato, sans-serif" }}>
                    {rec.description[l]}
                  </p>

                  {/* Action Items */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">
                      {t("strategy.actions.label")}
                    </div>
                    {rec.actions[l].map((action: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <ChevronRight className="w-3.5 h-3.5 text-[#0e7490] mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-[13px]" style={{ fontFamily: "Lato, sans-serif" }}>
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Market Opportunity Banner */}
        <div
          className="rounded-2xl p-6 md:p-10 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e2a47 0%, #0e7490 100%)" }}
        >
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse">
                  <polygon points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
          </div>
          <div className="relative grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="text-[11px] font-bold text-teal-300 tracking-widest uppercase mb-3">
                {t("strategy.market.badge")}
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("strategy.market.title")}
              </h3>
              <p className="text-white/70 leading-relaxed text-[15px]" style={{ fontFamily: "Lato, sans-serif", fontWeight: 300 }}>
                {t("strategy.market.body")}
              </p>
            </div>
            <div className="space-y-4">
              {[
                { val: "$44.2B", label: t("strategy.market.stat1") },
                { val: "1st", label: t("strategy.market.stat2") },
                { val: t("strategy.market.stat3.val"), label: t("strategy.market.stat3") },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-teal-300" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {s.val}
                  </div>
                  <div className="text-white/70 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
