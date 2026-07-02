import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Catalogue from "./pages/Catalogue";
import About from "./pages/About";
import DesignStudio from "./pages/DesignStudio";
import Customize from "./pages/Customize";
import ConfiguratorDev from "./pages/ConfiguratorDev";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import { QuoteDialog } from "./components/QuoteDialog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <QuoteDialog />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/about" element={<About />} />
            <Route path="/studio" element={<DesignStudio />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/product/:preset" element={<ProductDetail />} />
            <Route path="/configurator-dev" element={<ConfiguratorDev />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;