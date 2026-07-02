import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";

// Light pages: statically imported (no three.js)
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { QuoteDialog } from "./components/QuoteDialog";

// Heavy pages: lazily imported so three.js / r3f never land on initial bundle
const Catalogue      = lazy(() => import("./pages/Catalogue"));
const DesignStudio   = lazy(() => import("./pages/DesignStudio"));
const Customize      = lazy(() => import("./pages/Customize"));
const ProductDetail  = lazy(() => import("./pages/ProductDetail"));
const ConfiguratorDev = lazy(() => import("./pages/ConfiguratorDev"));

const queryClient = new QueryClient();

// Minimal full-screen skeleton shown while lazy chunks are loading
const PageShell = () => (
  <div style={{ minHeight: "100vh", background: "#050505" }} aria-busy="true" aria-label="Loading page" />
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
              <Route path="/studio"            element={<DesignStudio />} />
              <Route path="/customize"         element={<Customize />} />
              <Route path="/product/:preset"   element={<ProductDetail />} />
              <Route path="/configurator-dev"  element={<ConfiguratorDev />} />
              <Route path="*"                  element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;