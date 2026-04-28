import NavBar from "@/components/NavBar";
import AttributionBar from "@/components/AttributionBar";
import HeroSection from "@/components/HeroSection";
import MechanismsSection from "@/components/MechanismsSection";
import FDASection from "@/components/FDASection";
import DepartmentsSection from "@/components/DepartmentsSection";
import ApplicationsExplorer from "@/components/ApplicationsExplorer";
import LongevitySection from "@/components/LongevitySection";
import EvidenceSection from "@/components/EvidenceSection";
import NoHBOTSection from "@/components/NoHBOTSection";
import StrategySection from "@/components/StrategySection";
import ReferencesSection from "@/components/ReferencesSection";
import ProtocolComparison from "@/components/ProtocolComparison";
import ContactFooter from "@/components/ContactFooter";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <AttributionBar />
      <main>
        <HeroSection />
        <div className="section-divider" />
        <MechanismsSection />
        <div className="section-divider" />
        <FDASection />
        <div className="section-divider" />
        <ApplicationsExplorer />
        <div className="section-divider" />
        <DepartmentsSection />
        <div className="section-divider" />
        <LongevitySection />
        <div className="section-divider" />
        <EvidenceSection />
        <div className="section-divider" />
        <NoHBOTSection />
        <div className="section-divider" />
        <StrategySection />
        <div className="section-divider" />
        <ReferencesSection />
        <div className="section-divider" />
        <ProtocolComparison />
      </main>
      <ContactFooter />
    </div>
  );
}
