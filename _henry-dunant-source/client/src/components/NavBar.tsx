import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NavBar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Primary links — always visible in the bar
  const PRIMARY_LINKS = [
    { label: t("nav.mechanisms"), href: "#mechanisms" },
    { label: t("nav.fda"),        href: "#fda" },
    { label: t("nav.explorer"),   href: "#explorer" },
    { label: t("nav.departments"), href: "#departments" },
    { label: t("nav.longevity"),  href: "#longevity" },
    { label: t("nav.contact"),    href: "#contact" },
  ];

  // Secondary links — hidden behind "More" dropdown
  const MORE_LINKS = [
    { label: t("nav.evidence"),   href: "#evidence" },
    { label: t("nav.strategy"),   href: "#strategy" },
    { label: t("nav.references"), href: "#references" },
    { label: t("nav.compare"),    href: "#compare" },
  ];

  const ALL_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ALL_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [language]);

  // Close More dropdown on outside click
  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setMoreOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "el" : "en");
  };

  const moreActive = MORE_LINKS.some((l) => l.href === active);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <button
            onClick={() => handleNav("#hero")}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <img
              src="/manus-storage/henry-dunant-logo_2f705583.jpg"
              alt="Henry Dunant Hospital Center"
              className="h-10 w-10 rounded-lg object-contain bg-white p-0.5 shadow-sm"
            />
            <div className="text-left">
              <div
                className={`font-bold text-sm leading-none tracking-tight transition-colors ${
                  scrolled ? "text-slate-800" : "text-white"
                }`}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("nav.brand")}
              </div>
              <div
                className={`text-[10px] leading-none mt-0.5 transition-colors ${
                  scrolled ? "text-slate-500" : "text-white/70"
                }`}
              >
                {t("nav.subtitle")}
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {PRIMARY_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 ${
                  active === link.href
                    ? scrolled
                      ? "text-[#0e7490] bg-[#0e7490]/8"
                      : "text-white bg-white/15"
                    : scrolled
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                {link.label}
              </button>
            ))}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 ${
                  moreActive
                    ? scrolled
                      ? "text-[#0e7490] bg-[#0e7490]/8"
                      : "text-white bg-white/15"
                    : scrolled
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={{ fontFamily: "Lato, sans-serif" }}
                aria-haspopup="true"
                aria-expanded={moreOpen}
              >
                {t("nav.more")}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>

              {moreOpen && (
                <div
                  className="absolute top-full right-0 mt-1.5 w-44 rounded-xl bg-white shadow-lg border border-slate-200/80 py-1.5 z-50"
                  role="menu"
                >
                  {MORE_LINKS.map((link) => (
                    <button
                      key={link.href}
                      role="menuitem"
                      onClick={() => handleNav(link.href)}
                      className={`w-full text-left px-4 py-2 text-[13px] font-medium transition-colors ${
                        active === link.href
                          ? "text-[#0e7490] bg-[#0e7490]/8"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side: Language Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleLanguage}
              title={language === "en" ? "Switch to Greek" : "Αλλαγή σε Αγγλικά"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-bold tracking-wider transition-all duration-200 ${
                scrolled
                  ? "border-slate-300 text-slate-600 hover:border-[#0e7490] hover:text-[#0e7490] bg-white"
                  : "border-white/30 text-white/80 hover:border-white hover:text-white hover:bg-white/10"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <Globe className="w-3.5 h-3.5" />
              {language === "en" ? "ΕΛ" : "EN"}
            </button>

            <button
              onClick={() => handleNav("#departments")}
              className="px-4 py-2 rounded-lg bg-[#0e7490] text-white text-[13px] font-semibold hover:bg-[#0c6880] transition-colors shadow-sm"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {t("nav.cta")}
            </button>
          </div>

          {/* Mobile: Language Toggle + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
                scrolled
                  ? "border-slate-300 text-slate-600 bg-white"
                  : "border-white/30 text-white/80"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              <Globe className="w-3 h-3" />
              {language === "en" ? "ΕΛ" : "EN"}
            </button>
            <button
              className={`p-2 rounded-md transition-colors ${
                scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — shows all links flat */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {ALL_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active === link.href
                    ? "text-[#0e7490] bg-[#0e7490]/8"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
