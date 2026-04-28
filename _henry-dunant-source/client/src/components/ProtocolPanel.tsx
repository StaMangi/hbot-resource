import { useLanguage } from "@/contexts/LanguageContext";
import type { Protocol } from "@/data/hbot-data";
import { Clock, Gauge, Hash, RefreshCw, BookOpen } from "lucide-react";

interface ProtocolPanelProps {
  protocol: Protocol;
  compact?: boolean;
}

const LABELS = {
  en: {
    pressure: "Pressure",
    duration: "Duration",
    sessions: "Sessions",
    frequency: "Frequency",
    basis: "Evidence Basis",
    protocol: "Treatment Protocol",
  },
  el: {
    pressure: "Πίεση",
    duration: "Διάρκεια",
    sessions: "Συνεδρίες",
    frequency: "Συχνότητα",
    basis: "Βάση Τεκμηρίωσης",
    protocol: "Πρωτόκολλο Θεραπείας",
  },
};

export default function ProtocolPanel({ protocol, compact = false }: ProtocolPanelProps) {
  const { lang } = useLanguage();
  const L = LABELS[lang];

  if (compact) {
    // Compact version — used inside FDA cards (white background context)
    return (
      <div className="mt-3 rounded-lg border border-[#0e7490]/25 bg-[#f0f9ff] px-3 py-3">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-[#0e7490]">
          {L.protocol}
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 shrink-0 text-[#0e7490]" />
            <span className="text-[12px] text-slate-800">
              <span className="font-semibold text-slate-500 mr-0.5">{L.pressure}:</span>
              <span className="font-bold">{protocol.ata}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0 text-[#0e7490]" />
            <span className="text-[12px] text-slate-800">
              <span className="font-semibold text-slate-500 mr-0.5">{L.duration}:</span>
              <span className="font-bold">{protocol.duration}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Hash className="h-3.5 w-3.5 shrink-0 text-[#0e7490]" />
            <span className="text-[12px] text-slate-800">
              <span className="font-semibold text-slate-500 mr-0.5">{L.sessions}:</span>
              <span className="font-bold">{protocol.sessions}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5 shrink-0 text-[#0e7490]" />
            <span className="text-[12px] text-slate-800">
              <span className="font-semibold text-slate-500 mr-0.5">{L.frequency}:</span>
              <span className="font-bold">{protocol.frequency}</span>
            </span>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 border-t border-[#0e7490]/15 pt-2">
          <BookOpen className="h-3.5 w-3.5 shrink-0 text-[#0e7490]" />
          <span className="text-[11px] font-semibold text-[#0e7490]">
            {L.basis}:&nbsp;
          </span>
          <span className="text-[11px] text-slate-700 font-medium">
            {protocol.basis[lang]}
          </span>
        </div>
      </div>
    );
  }

  // Full-size panel — used inside Longevity cards (white background context)
  return (
    <div className="mt-4 rounded-xl border border-[#0e7490]/25 bg-[#f0f9ff] p-4">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0e7490]">
        {L.protocol}
      </p>
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col gap-1 rounded-lg bg-white border border-slate-200 p-2.5 shadow-sm min-w-0">
          <div className="flex items-center gap-1 text-[#0e7490] min-w-0">
            <Gauge className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider truncate">{L.pressure}</span>
          </div>
          <span className="text-xs font-bold text-slate-900 break-words leading-snug">{protocol.ata}</span>
        </div>
        <div className="flex flex-col gap-1 rounded-lg bg-white border border-slate-200 p-2.5 shadow-sm min-w-0">
          <div className="flex items-center gap-1 text-[#0e7490] min-w-0">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider truncate">{L.duration}</span>
          </div>
          <span className="text-xs font-bold text-slate-900 break-words leading-snug">{protocol.duration}</span>
        </div>
        <div className="flex flex-col gap-1 rounded-lg bg-white border border-slate-200 p-2.5 shadow-sm min-w-0">
          <div className="flex items-center gap-1 text-[#0e7490] min-w-0">
            <Hash className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider truncate">{L.sessions}</span>
          </div>
          <span className="text-xs font-bold text-slate-900 break-words leading-snug">{protocol.sessions}</span>
        </div>
        <div className="flex flex-col gap-1 rounded-lg bg-white border border-slate-200 p-2.5 shadow-sm min-w-0">
          <div className="flex items-center gap-1 text-[#0e7490] min-w-0">
            <RefreshCw className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider truncate">{L.frequency}</span>
          </div>
          <span className="text-xs font-bold text-slate-900 break-words leading-snug">{protocol.frequency}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 shadow-sm">
        <BookOpen className="h-3.5 w-3.5 shrink-0 text-[#0e7490]" />
        <span className="text-xs text-slate-800">
          <span className="font-bold text-[#0e7490]">{L.basis}: </span>
          <span className="font-medium">{protocol.basis[lang]}</span>
        </span>
      </div>
    </div>
  );
}
