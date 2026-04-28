import { LONGEVITY_APPLICATIONS, type Lang } from "@/data/hbot-data";
import { Dna, Trash2, Brain, Sparkles, Zap, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ProtocolPanel from "@/components/ProtocolPanel";
import RefTags from "@/components/RefTags";

const ICON_MAP: Record<string, React.ElementType> = {
  Dna, Trash2, Brain, Sparkles, Zap, Layers,
};

export default function LongevitySection() {
  const { t, lang } = useLanguage();
  const l = lang as Lang;
  return (
    <section id="longevity" className="section-anchor py-24 overflow-hidden" style={{
      background: "linear-gradient(180deg, #f8fafc 0%, #f0f9ff 50%, #f8fafc 100%)"
    }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-[11px] font-bold text-teal-700 tracking-widest uppercase">
              {t("longevity.section.badge")}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("longevity.section.title")}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            {t("longevity.section.subtitle")}
          </p>
        </div>

        {/* Key Highlight Banner */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-12 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e2a47 0%, #0e7490 100%)" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-teal-400/10 -translate-y-1/2 translate-x-1/4" />
          <div className="relative grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="text-[11px] font-bold text-teal-300 tracking-widest uppercase mb-2">
                {t("longevity.landmark.badge")}
              </div>
              <h3
                className="text-xl md:text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("longevity.landmark.quote")}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "Lato, sans-serif", fontWeight: 300 }}>
                {t("longevity.landmark.body")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: ">20%", label: t("longevity.stat.telomere") },
                { val: "37%", label: t("longevity.stat.senescent") },
                { val: "60", label: t("longevity.stat.sessions") },
                { val: "2.0 ATA", label: t("longevity.stat.pressure") },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-teal-300" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {s.val}
                  </div>
                  <div className="text-[10px] text-white/60 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LONGEVITY_APPLICATIONS.map((app) => {
            const Icon = ICON_MAP[app.icon] || Sparkles;
            const isTeal = app.color === "teal";

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden dept-card"
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}
              >
                {/* Top accent */}
                <div
                  className="h-1"
                  style={{ background: isTeal ? "#0e7490" : "#1e3a5f" }}
                />

                <div className="p-6">
                  {/* Icon + Stat */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: isTeal ? "#0e7490/10" : "#1e3a5f/10", backgroundColor: isTeal ? "rgba(14,116,144,0.1)" : "rgba(30,58,95,0.1)" }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: isTeal ? "#0e7490" : "#1e3a5f" }}
                      />
                    </div>
                    <div className="text-right">
                      <div
                        className="text-2xl font-bold"
                        style={{ fontFamily: "Montserrat, sans-serif", color: isTeal ? "#0e7490" : "#1e3a5f" }}
                      >
                        {app.stat}
                      </div>
                      <div className="text-[10px] text-slate-400 max-w-[100px] text-right leading-tight">
                        {app.statLabel[l]}
                      </div>
                    </div>
                  </div>

                  <h3
                    className="text-[16px] font-bold text-slate-800 mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {app.title[l]}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "Lato, sans-serif" }}>
                    {app.summary[l]}
                  </p>

                  {/* Mechanism */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">
                      {t("longevity.mechanism.label")}
                    </div>
                    <p className="text-slate-600 text-[12px] leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                      {app.mechanism[l]}
                    </p>
                  </div>

                  {/* Protocol */}
                  {app.protocol && (
                    <ProtocolPanel protocol={app.protocol} />
                  )}
                  {/* Refs */}
                  <RefTags refs={app.refs} label={t("longevity.refs.label")} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Wellness Programs Callout */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {[
            {
              title: t("longevity.wellness.cognitive.title"),
              desc: t("longevity.wellness.cognitive.desc"),
              tag: t("longevity.wellness.cognitive.tag"),
              color: "#0e7490",
            },
            {
              title: t("longevity.wellness.athletic.title"),
              desc: t("longevity.wellness.athletic.desc"),
              tag: t("longevity.wellness.athletic.tag"),
              color: "#1e3a5f",
            },
          ].map((prog) => (
            <div
              key={prog.title}
              className="rounded-2xl p-6 border-2 dept-card"
              style={{ borderColor: prog.color + "33", backgroundColor: prog.color + "05" }}
            >
              <div
                className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold mb-3"
                style={{ backgroundColor: prog.color + "15", color: prog.color, fontFamily: "Montserrat, sans-serif" }}
              >
                {prog.tag}
              </div>
              <h4
                className="text-lg font-bold text-slate-800 mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {prog.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                {prog.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
