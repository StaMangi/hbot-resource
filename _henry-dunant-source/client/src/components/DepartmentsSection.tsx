import { useState } from "react";
import { DEPARTMENTS_WITH_HBOT, type Lang } from "@/data/hbot-data";
import { useLanguage } from "@/contexts/LanguageContext";
import ProtocolPanel from "@/components/ProtocolPanel";
import RefTags from "@/components/RefTags";
import {
  Scissors, Brain, Activity, Stethoscope, Zap, Ear, Eye, HeartHandshake, Users,
  ChevronRight, CheckCircle2, FlaskConical, BookOpen
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Scissors, Brain, Activity, Stethoscope, Zap, Ear, Eye, HeartHandshake, Users,
};

const TYPE_STYLES: Record<string, string> = {
  "FDA-Approved": "bg-emerald-100 text-emerald-800 border border-emerald-200",
  "Research": "bg-sky-100 text-sky-800 border border-sky-200",
};

const TYPE_DOT: Record<string, string> = {
  "FDA-Approved": "bg-emerald-500",
  "Research": "bg-sky-500",
};

export default function DepartmentsSection() {
  const { t, lang } = useLanguage();
  const l = lang as Lang;
  const [activeId, setActiveId] = useState(DEPARTMENTS_WITH_HBOT[0].id);

  const activeDept = DEPARTMENTS_WITH_HBOT.find((d) => d.id === activeId)!;
  const fdaCount = activeDept.applications.filter((a) => a.type === "FDA-Approved").length;
  const researchCount = activeDept.applications.filter((a) => a.type === "Research").length;

  return (
    <section id="departments" className="section-anchor py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e7490]/10 mb-4">
            <span className="text-[11px] font-bold text-[#0e7490] tracking-widest uppercase">
              {t("dept.section.badge")}
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {t("dept.section.title")}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
            {t("dept.section.subtitle")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Department Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 bg-slate-800 text-white">
                <span className="text-[11px] font-bold tracking-widest uppercase">
                  {t("dept.applications.title")}
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {DEPARTMENTS_WITH_HBOT.map((dept) => {
                  const Icon = ICON_MAP[dept.icon] || Activity;
                  const isActive = dept.id === activeId;
                  const fdaCount = dept.applications.filter((a) => a.type === "FDA-Approved").length;
                  const resCount = dept.applications.filter((a) => a.type === "Research").length;

                  return (
                    <button
                      key={dept.id}
                      onClick={() => setActiveId(dept.id)}
                      className={`w-full text-left px-4 py-3.5 flex items-center gap-3 transition-all ${
                        isActive
                          ? "bg-[#0e7490] text-white"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-white/20" : "bg-white border border-slate-200"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${isActive ? "text-white" : ""}`}
                          style={{ color: isActive ? "white" : dept.color }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[13px] font-semibold truncate ${isActive ? "text-white" : "text-slate-800"}`}
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {dept.name[l]}
                        </div>
                        <div className={`text-[11px] mt-0.5 ${isActive ? "text-white/70" : "text-slate-400"}`}>
                          {fdaCount > 0 && <span className="mr-2">{fdaCount} {t("dept.type.approved")}</span>}
                          {resCount > 0 && <span>{resCount} {t("dept.type.research")}</span>}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-300"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Department Detail Panel */}
          <div className="flex-1 min-w-0">
            {/* Dept header */}
            <div
              className="rounded-2xl p-6 mb-5 text-white overflow-hidden relative"
              style={{
                background: `linear-gradient(135deg, ${activeDept.color}dd 0%, ${activeDept.color}99 100%)`,
              }}
            >
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className="text-2xl font-bold text-white mb-1"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {activeDept.name[l]}
                    </h3>
                    <p className="text-white/70 text-sm">{activeDept.shortDesc[l]}</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
                      <div className="text-xl font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        {fdaCount}
                      </div>
                      <div className="text-[10px] text-white/70 font-semibold">{t("dept.counter.fda")}</div>
                    </div>
                    <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
                      <div className="text-xl font-bold text-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        {researchCount}
                      </div>
                      <div className="text-[10px] text-white/70 font-semibold">{t("dept.counter.research")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="space-y-4">
              {activeDept.applications.map((app, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-5 dept-card"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {app.type === "FDA-Approved" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <FlaskConical className="w-5 h-5 text-sky-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4
                          className="text-[15px] font-bold text-slate-800"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {app.title[l]}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${TYPE_STYLES[app.type]}`}
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {app.type === "FDA-Approved" ? t("dept.type.approved") : app.type === "Research" ? t("dept.type.research") : t("dept.type.emerging")}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">
                          {app.evidence}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "Lato, sans-serif" }}>
                        {app.description[l]}
                      </p>
                      {app.protocol && (
                        <ProtocolPanel protocol={app.protocol} compact />
                      )}
                      <RefTags refs={app.refs} label={t("dept.refs.label")} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-5 flex flex-wrap gap-4 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[12px] text-slate-500 font-medium">{t("dept.type.approved")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-[12px] text-slate-500 font-medium">{t("dept.type.research")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-[12px] text-slate-500 font-medium">{t("dept.type.investigational")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
