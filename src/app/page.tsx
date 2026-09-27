import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import PortfolioSection from "@/components/portfolio-section";
import ProcessSection from "@/components/process-section";
import MapSection from "@/components/map-section";
import AboutSection from "@/components/about-section";
import IndustriesSection from "@/components/industries-section";
import AmbassadorSection from "@/components/ambassador-section";
import ContactSection from "@/components/contact-section";
import SiteFooter from "@/components/site-footer";
import SectionDivider from "@/components/section-divider";
import ScrollGradientOverlay from "@/components/scroll-gradient";
import ScrollWaves from "@/components/scroll-waves";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <ScrollGradientOverlay />
      <ScrollWaves />
      <main id="main">
        <HeroSection />
        <SectionDivider />
        <ServicesSection />
        <SectionDivider />
        <PortfolioSection />
        <SectionDivider />
        <ProcessSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <MapSection />
        <SectionDivider />
        <IndustriesSection />
        <SectionDivider />
        <AmbassadorSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
