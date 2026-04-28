import { useState } from "react";
import { MECHANISMS, type Lang } from "@/data/hbot-data";
import { Droplets, GitBranch, Shield, Minimize2, RefreshCw, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ICON_MAP: Record<string, React.ElementType> = {
  Droplets,
  GitBranch,
  Shield,
  Minimize2,
  RefreshCw,
};

const COLORS = {
  teal: {
    bg: "bg-[#0e7490]/10",
    icon: "text-[#0e7490]",
    border: "border-[#0e7490]/20",
    badge: "bg-[#0e7490]/10 text-[#0e7490]",
    accent: "#0e7490",
  },
  navy: {
    bg: "bg-[#1e3a5f]/10",
    icon: "text-[#1e3a5f]",
    border: "border-[#1e3a5f]/20",
    badge: "bg-[#1e3a5f]/10 text-[#1e3a5f]",
    accent: "#1e3a5f",
  },
};

export default function MechanismsSection() {
  const { t, lang } = useLanguage();
  const l = lang as Lang;
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="mechanisms" className="section-anchor py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e7490]/10 mb-4">
            <span className="text-[11px] font-bold text-[#0e7490] tracking-widest uppercase">
              {t("mechanisms.section.badge")}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("mechanisms.section.title")}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            {t("mechanisms.section.subtitle")}
          </p>
        </div>

        {/* Mechanism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MECHANISMS.map((m, idx) => {
            const Icon = ICON_MAP[m.icon] || Droplets;
            const color = COLORS[m.color as keyof typeof COLORS];
            const isExpanded = expanded === m.id;

            return (
              <div
                key={m.id}
                className={`rounded-2xl border bg-white dept-card overflow-hidden ${color.border}`}
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
              >
                {/* Card top accent */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: color.accent }}
                />

                <div className="p-6">
                  {/* Number + Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${color.icon}`} />
                    </div>
                    <span
                      className="text-4xl font-bold text-slate-100"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className="text-[17px] font-bold text-slate-800 mb-3 leading-snug"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {m.title[l]}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "Lato, sans-serif" }}>
                    {m.summary[l]}
                  </p>

                  {/* Expand button */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : m.id)}
                    className={`flex items-center gap-1.5 text-[12px] font-semibold transition-colors ${color.icon} hover:opacity-80`}
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {isExpanded ? t("mechanisms.collapse.label") : t("mechanisms.detail.label")}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className={`mt-4 pt-4 border-t ${color.border}`}>
                      <p className="text-slate-600 text-sm leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                        {m.detail[l]}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className={`text-[10px] font-semibold ${color.icon} mr-1`}>{t("mechanisms.refs.label")}</span>
                        {m.refs.map((r) => (
                          <span
                            key={r}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${color.badge}`}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Summary card */}
          <div
            className="rounded-2xl overflow-hidden md:col-span-2 lg:col-span-3"
            style={{
              background: "linear-gradient(135deg, #0e2a47 0%, #0e7490 100%)",
              boxShadow: "0 8px 40px rgba(14,116,144,0.2)",
            }}
          >
            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 mb-4">
                    <span className="text-[11px] font-bold text-white/80 tracking-widest uppercase">
                      {t("mechanisms.banner.badge")}
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {t("mechanisms.banner.title")}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-[15px]" style={{ fontFamily: "Lato, sans-serif", fontWeight: 300 }}>
                    {t("mechanisms.banner.body")}
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  {[
                    { label: t("mechanisms.stat1.label"), value: "~42×", sub: t("mechanisms.stat1.sub") },
                    { label: t("mechanisms.stat2.label"), value: "64%", sub: t("mechanisms.stat2.sub") },
                    { label: t("mechanisms.stat3.label"), value: t("mechanisms.stat3.value"), sub: t("mechanisms.stat3.sub") },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 rounded-xl p-4">
                      <div
                        className="text-2xl font-bold text-teal-300 mb-0.5"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {item.value}
                      </div>
                      <div className="text-white/90 text-sm font-semibold">{item.label}</div>
                      <div className="text-white/50 text-[11px]">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
