import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueCards from "@/components/ValueCards";
import AboutPreview from "@/components/AboutPreview";
import PricingTiers from "@/components/PricingTiers";
import SustainabilityPreview from "@/components/SustainabilityPreview";
import ClientGallery from "@/components/ClientGallery";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <main className="min-h-screen">
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