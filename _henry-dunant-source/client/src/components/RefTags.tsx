/**
 * RefTags — renders a row of styled, clickable reference badges.
 *
 * Each badge (e.g. "[2]") scrolls smoothly to the corresponding
 * anchor in the References section (id="ref-2").
 *
 * Usage:
 *   <RefTags refs={["[1]", "[3]"]} />
 */

interface RefTagsProps {
  refs: string[];
  label?: string; // optional prefix label, e.g. "Refs:" or "Αναφ.:"
}

function parseRefNumber(ref: string): string {
  // "[2]" → "2",  "[12]" → "12"
  return ref.replace(/[\[\]]/g, "").trim();
}

export default function RefTags({ refs, label }: RefTagsProps) {
  if (!refs || refs.length === 0) return null;

  const handleClick = (ref: string) => {
    const num = parseRefNumber(ref);
    const el = document.getElementById(`ref-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // Brief highlight flash
      el.classList.add("ref-highlight");
      setTimeout(() => el.classList.remove("ref-highlight"), 1800);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {label && (
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mr-0.5">
          {label}
        </span>
      )}
      {refs.map((ref) => {
        const num = parseRefNumber(ref);
        return (
          <button
            key={ref}
            onClick={() => handleClick(ref)}
            title={`View reference ${ref}`}
            className="inline-flex items-center justify-center min-w-[26px] h-[22px] px-1.5 rounded-md
                       bg-[#0e7490]/10 text-[#0e7490] border border-[#0e7490]/25
                       text-[11px] font-bold leading-none
                       hover:bg-[#0e7490] hover:text-white hover:border-[#0e7490]
                       active:scale-95 transition-all duration-150 cursor-pointer"
          >
            {num}
          </button>
        );
      })}
    </div>
  );
}
