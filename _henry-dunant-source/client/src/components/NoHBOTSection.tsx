import { DEPARTMENTS_WITHOUT_HBOT, type Lang } from "@/data/hbot-data";
import { FlaskConical, ScanLine, Monitor, Droplet, Dna, Layers, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ICON_MAP: Record<string, React.ElementType> = {
  FlaskConical, ScanLine, Monitor, Droplet, Dna, Layers,
};

export default function NoHBOTSection() {
  const { t, lang } = useLanguage();
  const l = lang as Lang;
  return (
    <section id="no-hbot" className="section-anchor py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 mb-4">
            <Info className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[11px] font-bold text-slate-600 tracking-widest uppercase">
              {t("nohbot.section.badge")}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("nohbot.section.title")}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            {t("nohbot.section.subtitle")}
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Info className="w-5 h-5 text-amber-700" />
            </div>
          </div>
          <div>
            <h4
              className="text-[14px] font-bold text-amber-900 mb-1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {t("nohbot.criteria.title")}
            </h4>
            <p className="text-amber-800 text-sm leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
              {t("nohbot.criteria.body")}
            </p>
          </div>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DEPARTMENTS_WITHOUT_HBOT.map((dept) => {
            const Icon = ICON_MAP[dept.icon] || Info;

            return (
              <div
                key={dept.name.en}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden dept-card"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                {/* Striped top */}
                <div
                  className="h-1 w-full"
                  style={{
                    background: "repeating-linear-gradient(90deg, #e2e8f0 0px, #e2e8f0 8px, #f1f5f9 8px, #f1f5f9 16px)",
                  }}
                />

                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-[16px] font-bold text-slate-700 mb-2"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {dept.name[l]}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "Lato, sans-serif" }}>
                        {dept.rationale[l]}
                      </p>

                      {/* Role badge */}
                      <div className="flex items-start gap-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-0.5">
                            {t("nohbot.role.label")}
                          </div>
                          <p className="text-slate-600 text-[12px]" style={{ fontFamily: "Lato, sans-serif" }}>
                          {dept.role[l]}
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm" style={{ fontFamily: "Lato, sans-serif" }}>
            {t("nohbot.note")}
          </p>
        </div>
      </div>
    </section>
  );
}
