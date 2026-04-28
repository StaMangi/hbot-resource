/**
 * ContactFooter — bottom-of-page footer showing IN2050 Ltd company details.
 * Dark navy background. Large logo on the left (overflows upward), contact details on the right.
 */
export default function ContactFooter() {
  return (
    <footer id="contact" className="w-full overflow-visible" style={{ background: "oklch(0.13 0.04 240)" }}>
      <div className="container mx-auto px-4 lg:px-8 py-10 overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-end overflow-visible">

          {/* Column 1 — Large IN2050 logo (overflows upward, transparent bg) */}
          <div className="flex flex-col items-center md:items-start gap-3 overflow-visible">
            <img
              src="/manus-storage/in2050-logo-white_29f9eadb.webp"
              alt="IN2050 Ltd"
              className="h-40 md:h-80 w-auto object-contain opacity-90"
            />
            <p
              className="text-sm text-center md:text-left leading-snug text-white/60"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              The Luxury of<br />Living Better. Longer.
            </p>
          </div>

          {/* Column 2 — Company / legal details */}
          <div className="flex flex-col gap-1.5 text-sm text-white/70 items-center md:items-start text-center md:text-left">
            <p className="font-semibold text-white mb-1">IN2050s Ltd</p>
            <p>1, Antistaseos Street</p>
            <p>2660 Kokkinotrimithia, Cyprus</p>
            <div className="mt-3 flex flex-col gap-1.5 items-center md:items-start">
              <a
                href="mailto:welcome@in2050.space"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                style={{ color: "oklch(0.65 0.13 195)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                welcome@in2050.space
              </a>
              <a
                href="https://in2050.space"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                style={{ color: "oklch(0.65 0.13 195)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>
                in2050.space
              </a>
              <a
                href="https://wa.me/4915207002050"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                style={{ color: "oklch(0.65 0.13 195)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                +49 152 0700 2050
              </a>
            </div>
            <p className="mt-3 text-white/50 text-xs">Reg. No HE416406</p>
            <p className="text-white/50 text-xs">VAT CY10416406K</p>
          </div>

          {/* Column 3 — Attribution */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-white/40 text-xs leading-relaxed text-center md:text-left">
              A proprietary clinical resource developed by IN2050 Ltd ·
              Exclusively for Henry Dunant Hospital Center ·
              Not for public distribution.
            </p>
          </div>

        </div>

        {/* Bottom rule */}
        <div
          className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span>© {new Date().getFullYear()} IN2050s Ltd. All rights reserved.</span>
          <span>HBOT Clinical Resource Platform · Henry Dunant Hospital Center</span>
        </div>
      </div>
    </footer>
  );
}
