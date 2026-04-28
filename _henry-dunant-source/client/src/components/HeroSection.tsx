import { Award, BookOpen, TrendingUp, Gauge } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STAT_ICONS = [Award, TrendingUp, BookOpen, Gauge];

const STAT_KEYS = [
  { value: "14", labelKey: "stat.fda.label", subKey: "stat.fda.sub" },
  { value: "20%+", labelKey: "stat.telomere.label", subKey: "stat.telomere.sub" },
  { value: "258", labelKey: "stat.citations.label", subKey: "stat.citations.sub" },
  { value: "2–3 ATA", labelKey: "stat.pressure.label", subKey: "stat.pressure.sub" },
];

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="section-anchor relative min-h-screen flex flex-col justify-center overflow-hidden gradient-hero"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] bg-[#0e7490] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05] bg-teal-400 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-36 pb-16">
        {/* Two-column layout on large screens */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">

          {/* LEFT — Badge + Headline + Description + CTAs */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 pulse-ring" />
              <span className="text-[11px] font-semibold text-white/80 tracking-widest uppercase">
                {t("hero.badge")}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {t("hero.title1")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400">
                {t("hero.title2")}
              </span>
              <br />
              <span className="text-white/90 text-4xl md:text-5xl lg:text-6xl">
                {t("hero.title3")}
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10"
              style={{ fontFamily: "Lato, sans-serif", fontWeight: 300 }}
            >
              {t("hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("departments");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-xl bg-[#0e7490] text-white font-semibold text-sm hover:bg-[#0c6880] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("hero.cta.departments")}
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("fda");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-xl glass text-white font-semibold text-sm hover:bg-white/15 transition-all"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("hero.cta.fda")}
              </button>
            </div>
          </div>

          {/* RIGHT — Compact 2×2 stat grid */}
          <div className="mt-12 lg:mt-0 lg:w-80 xl:w-96 shrink-0">
            <div className="grid grid-cols-2 gap-3">
              {STAT_KEYS.map((stat, i) => {
                const Icon = STAT_ICONS[i];
                return (
                  <div
                    key={stat.labelKey}
                    className="glass rounded-xl p-4 stat-card group cursor-default"
                  >
                    <div className="w-6 h-6 rounded-md bg-teal-500/20 flex items-center justify-center mb-2">
                      <Icon className="w-3.5 h-3.5 text-teal-300" />
                    </div>
                    <div
                      className="text-xl font-bold text-white mb-0.5"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-semibold text-white/85 leading-tight mb-0.5">
                      {t(stat.labelKey)}
                    </div>
                    <div className="text-[10px] text-white/45 leading-tight">{t(stat.subKey)}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
