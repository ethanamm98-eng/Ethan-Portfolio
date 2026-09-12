import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import SelectedWorkSection from "./components/sections/SelectedWorkSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import TechnologiesSection from "./components/sections/TechnologiesSection";
import ProcessSection from "./components/sections/ProcessSection";
import ContactSection from "./components/sections/ContactSection";
import PremiumBrandsSection from "./components/sections/PremiumBrandsSection";
import ScrollRocket from "./components/ui/ScrollRocket";
// import TestimonialsSection from "./components/sections/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="bg-(--background) text-(--foreground) transition-colors duration-300">
      <Navbar />
      <ScrollRocket />
      <HeroSection />
      <PremiumBrandsSection />
      <SelectedWorkSection />
      <AboutSection />
      <SkillsSection />
      <TechnologiesSection />
      <ProcessSection />
      {/* TODO: Collect real testimonials */}
      {/* <TestimonialsSection /> */}
      <ContactSection />
      <Footer />
    </main>
  );
}
