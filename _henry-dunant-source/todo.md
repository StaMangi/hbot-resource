# HBOT Clinical Resource - TODO

- [x] Set up global styles, fonts, color palette in index.css and index.html
- [x] Create HBOT data file with all content (departments, indications, references, etc.)
- [x] Build sticky navigation component with smooth scrolling
- [x] Build Hero section with key statistics (14 indications, 20%+ telomere, 258 citations)
- [x] Build Executive Summary section
- [x] Build Mechanisms of Action section (5 mechanisms)
- [x] Build FDA-Approved Indications section (14 conditions, table + cards)
- [x] Build Interactive Department Mapping page
- [x] Build Longevity and Wellness section (6 applications)
- [x] Build Evidence-Based Research section with cited studies
- [x] Build Departments Without HBOT Applications section with rationale
- [x] Build Strategic Recommendations section
- [x] Build Comprehensive References page (24 sources with DOI)
- [x] Wire all routes in App.tsx
- [x] Ensure responsive design on mobile and tablet
- [x] Write vitest tests (14 tests, all passing)
- [x] Fix TypeScript error in storageProxy.ts
- [x] Final polish and checkpoint

## Greek Language (i18n)
- [x] Create LanguageContext with EN/EL toggle and localStorage persistence
- [x] Create English translation file (en.ts) with all UI strings
- [x] Create Greek translation file (el.ts) with all UI strings translated
- [x] Add language toggle button (EN/EL) to NavBar
- [x] Wire useLanguage hook into all section components (NavBar, Hero, Mechanisms, FDA, Departments, Longevity, Evidence, NoHBOT, Strategy, References)
- [x] Translate all section headings, body text, labels, and CTAs
- [x] Test language switching across all sections
- [x] Save checkpoint

## Full Data-Layer Greek Localization
- [x] Audit hbot-data.ts and design bilingual data structure (add `el` fields to all objects)
- [x] Translate MECHANISMS_DATA (5 cards: title, subtitle, detail, keyPoints)
- [x] Translate FDA_INDICATIONS (14 conditions: condition, description, protocol, keyBenefit)
- [x] Translate DEPARTMENTS_WITH_HBOT (9 departments: name, shortDesc, applications titles/descriptions)
- [x] Translate LONGEVITY_APPLICATIONS (6 cards: title, subtitle, description, mechanism, protocol)
- [x] Translate RESEARCH_STUDIES (8 studies: title, keyFinding)
- [x] Translate STRATEGY_PHASES (4 phases: title, description, actions)
- [x] Translate DEPARTMENTS_WITHOUT_HBOT (6 entries: name, rationale, role)
- [x] Update all components to use language-aware data helpers
- [x] Test full Greek mode across all sections
- [x] Save checkpoint

## Protocol Integration (ATA / Duration / Sessions / Frequency)
- [x] Define Protocol interface in hbot-data.ts (ata, duration, sessions, frequency, evidenceBasis)
- [x] Add protocol data to all 14 FDA_INDICATIONS
- [x] Add protocol data to all department applications (9 departments, ~40 applications)
- [x] Add protocol data to all 6 LONGEVITY_APPLICATIONS
- [x] Add protocol i18n label keys to en.ts and el.ts
- [x] Build reusable ProtocolPanel component
- [x] Update FDASection to display protocol panel per indication card
- [x] Update DepartmentsSection to display protocol panel per application
- [x] Update LongevitySection to display protocol panel per card
- [x] Test TypeScript, run all tests, save checkpoint

## Bug Fixes
- [x] Fix ProtocolPanel contrast issue — teal/grey text on grey-green background is unreadable in FDA cards and Department sections

## Applications Explorer (Filter Feature)
- [x] Build ApplicationsExplorer component with department, status, and combined filters
- [x] Add search-by-keyword input
- [x] Display result count and active filter chips
- [x] Add i18n keys for all filter labels and UI strings (en.ts + el.ts)
- [x] Add "Explorer" nav link to NavBar
- [x] Wire Explorer section into Home.tsx
- [x] Test TypeScript, run all tests, save checkpoint

## Bug Fix — References Not Clickable
- [x] Build reusable RefTags component (styled teal pills, clickable, scroll to #ref-N in References section)
- [x] Add anchor IDs (id="ref-1" ... id="ref-24") to each entry in ReferencesSection
- [x] Wire RefTags into ApplicationsExplorer cards
- [x] Wire RefTags into FDASection indication cards
- [x] Wire RefTags into DepartmentsSection application detail
- [x] Wire RefTags into LongevitySection cards
- [x] Test, checkpoint, deliver

## Greek Nav Bar Labels
- [x] Add Greek translations for all nav link labels to el.ts
- [x] Wire nav labels through useLanguage in NavBar.tsx
- [x] Test language toggle — nav labels switch EN/EL correctly
- [x] TypeScript check, tests, checkpoint

## Protocol Comparison Tool
- [x] Build ProtocolComparison component — multi-select picker + side-by-side comparison table
- [x] Source all protocols from FDA indications, department applications, and longevity cards
- [x] Compare fields: ATA pressure, session count, duration, frequency, evidence basis
- [x] Add i18n keys for all comparison UI strings (en.ts + el.ts)
- [x] Add "Compare" nav link to NavBar
- [x] Wire ProtocolComparison section into Home.tsx
- [x] TypeScript check, run all tests, save checkpoint

## PDF Export for Protocol Comparison Tool
- [x] Install jspdf and jspdf-autotable client-side packages
- [x] Add exportToPDF function in ProtocolComparison.tsx
- [x] Add "Download as PDF" button (only visible when ≥1 indication selected)
- [x] PDF includes: title, date, comparison table with all 5 rows, footer with source attribution
- [x] Add i18n key for download button label (en + el)
- [x] TypeScript check, tests, checkpoint

## Nav Bar Declutter
- [x] Remove Overview link from NAV_LINKS in NavBar.tsx
- [x] Checkpoint

## Nav Bar Further Declutter
- [x] Shorten "FDA Indications" → "FDA" and "Departments" → "Depts." in i18n (en + el)
- [x] Group Evidence, Strategy, References, Compare into a "More" dropdown in NavBar.tsx
- [x] More dropdown: keyboard accessible, closes on outside click, works on mobile menu too
- [x] TypeScript check, checkpoint

## Hero Section Cleanup
- [x] Remove Executive Summary card from HeroSection
- [x] Remove Scroll to Explore indicator from HeroSection
- [x] TypeScript check, checkpoint

## Hospital Logo in NavBar
- [x] Copy logo to webdev-static-assets and upload via manus-upload-file --webdev
- [x] Replace Activity icon in NavBar with <img> using the uploaded logo URL
- [x] Adjust logo sizing to fit the 72px nav bar height cleanly
- [x] TypeScript check, checkpoint

## Hero Layout Restructure
- [x] Change hero to two-column layout: left = title/desc/CTAs, right = 2x2 compact stat grid
- [x] Reduce stat card font sizes and padding (compact style)
- [x] Ensure responsive: stacks vertically on mobile
- [x] TypeScript check, checkpoint

## ProtocolPanel Pill Overflow Fix
- [x] Fix pill boxes to use flex-1 min-w-0 and allow text to wrap — no overflow outside frames
- [x] TypeScript check, checkpoint

## Attribution Sub-Bar
- [x] Upload IN2050 logo v1 (horizontal) to webdev-static-assets
- [x] Build AttributionBar component: slim fixed bar below nav, IN2050 logo left, Option C text right
- [x] Wire AttributionBar into App.tsx layout (always visible, fixed position)
- [x] Adjust page top padding so content is not hidden behind nav + sub-bar
- [x] TypeScript check, checkpoint

## Logo Fix + Contact Footer
- [x] Fix IN2050 logo visibility in AttributionBar (white webp invisible on dark bg — use text fallback or tinted container)
- [x] Build ContactFooter component with IN2050 company details (address, reg, VAT, tagline, logo)
- [x] Wire ContactFooter at the bottom of Home.tsx
- [x] TypeScript check, checkpoint

## Contact Details in Footer
- [x] Add email (welcome@in2050.space), website (in2050.space), WhatsApp (+4915207002050) to ContactFooter
- [x] TypeScript check, checkpoint

## White Logo Fix
- [x] Upload white IN2050 logo v1 and use it directly on dark bg in AttributionBar and ContactFooter
- [x] Remove white pill wrapper from both components
- [x] Checkpoint
