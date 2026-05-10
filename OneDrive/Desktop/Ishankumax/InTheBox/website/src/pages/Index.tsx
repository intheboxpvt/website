import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueCards from "@/components/ValueCards";
import AboutPreview from "@/components/AboutPreview";
import PricingTiers from "@/components/PricingTiers";
import SustainabilityPreview from "@/components/SustainabilityPreview";
import ClientGallery from "@/components/ClientGallery";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO 
        title="Premium Custom Packaging Solutions | InTheBox"
        description="Elevate your brand with InTheBox's premium custom packaging solutions. Sustainable, design-led boxes for startups and established brands."
        keywords="custom packaging, premium boxes, sustainable packaging, branding design, packaging solutions india"
      />
      <Navbar />
      <Hero />
      <ValueCards />
      <AboutPreview />
      <PricingTiers />
      <SustainabilityPreview />
      <ClientGallery />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;