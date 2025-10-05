import Navigation from "../Navigation";
import HeroSection from "../HeroSection";
import ServicesGrid from "../ServicesGrid";
import HowItWorks from "../HowItWorks";
import TestimonialsSection from "../TestimonialsSection";
import CTASection from "../CTASection";
import Footer from "../Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesGrid />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
