/**
 * AttributionBar — slim always-visible bar pinned just below the main nav.
 * Bar height is 40px. The IN2050 logo (transparent bg) is h-40 and overflows
 * visually above/below the bar — no clipping needed since bg is transparent.
 * On mobile: logo only (smaller). On desktop: logo + single-line attribution text.
 */
export default function AttributionBar() {
  return (
    <div
      className="fixed left-0 right-0 z-40 flex items-center justify-between px-4 lg:px-8 overflow-visible"
      style={{
        top: "72px",
        height: "40px",
        background: "rgba(7, 25, 45, 0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Left — IN2050 white logo (transparent bg) overflows the slim bar */}
      <img
        src="/manus-storage/in2050-logo-white_29f9eadb.webp"
        alt="IN2050 Ltd"
        className="h-16 lg:h-40 w-auto object-contain opacity-90 flex-shrink-0"
        style={{ position: "relative", zIndex: 1 }}
      />

      {/* Right — short text on mobile, full text on desktop */}
      <p
        className="block lg:hidden text-[11px] text-white/55 tracking-wide text-right leading-none whitespace-nowrap ml-2"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        Proprietary · IN2050 Ltd · Henry Dunant
      </p>
      <p
        className="hidden lg:block text-[13px] text-white/55 tracking-wide text-right leading-none whitespace-nowrap ml-4"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        A proprietary clinical resource developed by IN2050 Ltd · Exclusively for Henry Dunant Hospital Center · Not for public distribution
      </p>
    </div>
  );
}
