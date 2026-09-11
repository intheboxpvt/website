import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";

// Core content pages: statically imported so page navigation is instant with zero black flash
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Catalogue from "./pages/Catalogue";
import Sustainability from "./pages/Sustainability";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { QuoteDialog } from "./components/QuoteDialog";

// 3D heavy pages: lazily imported so three.js loads on demand for the configurators
const DesignStudio   = lazy(() => import("./pages/DesignStudio"));
const Customize      = lazy(() => import("./pages/Customize"));
const ConfiguratorDev = lazy(() => import("./pages/ConfiguratorDev"));

const queryClient = new QueryClient();

// Elegant branded loader shown only when loading 3D Studio routes
const PageShell = () => (
  <div className="min-h-screen bg-[#1d0a27] flex flex-col items-center justify-center text-white space-y-4" aria-busy="true" aria-label="Loading 3D Studio">
    <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
    <span className="font-mono text-xs uppercase tracking-widest text-white/50">Loading 3D Studio...</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <QuoteDialog />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageShell />}>
            <Routes>
              <Route path="/"                  element={<Index />} />
              <Route path="/services"          element={<Services />} />
              <Route path="/catalogue"         element={<Catalogue />} />
              <Route path="/about"             element={<About />} />
              <Route path="/sustainability"    element={<Sustainability />} />
              <Route path="/studio"            element={<DesignStudio />} />
              <Route path="/customize"         element={<Customize />} />
              <Route path="/product/:preset"   element={<ProductDetail />} />
              <Route path="/configurator-dev"  element={<ConfiguratorDev />} />
              <Route path="*"                  element={<NotFound />} />
            </Routes>
          </Suspense>
          {/* Global chat widget — shown on all pages */}
          <ChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
