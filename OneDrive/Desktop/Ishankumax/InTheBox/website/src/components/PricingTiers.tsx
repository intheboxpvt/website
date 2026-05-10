import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const PricingTiers = () => {
  const tiers = [
    {
      name: "Starter",
      subtitle: "For new brands",
      description: "Perfect for startups testing their first premium packaging.",
      features: [
        "100-500 units MOQ",
        "Standard box styles",
        "1 design revision",
        "Basic finishing options",
        "2-3 week delivery",
      ],
      popular: false,
    },
    {
      name: "Scale",
      subtitle: "Most popular",
      description: "For growing brands ready to elevate their unboxing experience.",
      features: [
        "500-2000 units MOQ",
        "Custom box structures",
        "3 design revisions",
        "Premium finishes included",
        "Dedicated design support",
        "1-2 week delivery",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      subtitle: "For established brands",
      description: "Full-service packaging partnership for high-volume needs.",
      features: [
        "2000+ units",
        "Bespoke structures",
        "Unlimited revisions",
        "All premium finishes",
        "Priority production",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ];

  return (
    <section className="section-padding bg-ivory relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-metallic/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-widest uppercase text-gold-metallic font-medium">
              Packaging Tiers
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-royal-purple mt-4">
              Find Your Perfect Fit
            </h2>
            <p className="font-sans text-lg text-aubergine/70 mt-4 max-w-2xl mx-auto">
              Flexible options designed to grow with your brand, from first launch to market leader.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <ScrollReveal key={tier.name} delay={index * 150}>
              <div
                className={`relative rounded-3xl p-8 transition-all duration-300 h-full ${
                  tier.popular
                    ? "bg-royal-purple text-ivory shadow-elevated scale-105"
                    : "bg-white shadow-lg border border-royal-purple/10 hover:shadow-xl"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gold-metallic text-royal-purple text-sm font-sans font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`font-serif text-2xl font-semibold ${tier.popular ? "text-ivory" : "text-royal-purple"}`}>
                    {tier.name}
                  </h3>
                  <p className={`font-sans text-sm ${tier.popular ? "text-ivory/70" : "text-aubergine/60"}`}>
                    {tier.subtitle}
                  </p>
                </div>

                <p className={`font-sans text-sm mb-8 ${tier.popular ? "text-ivory/80" : "text-aubergine/70"}`}>
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 text-gold-metallic" />
                      <span className={`font-sans text-sm ${tier.popular ? "text-ivory/90" : "text-aubergine"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <Button
                    variant={tier.popular ? "gold" : "royal-outline"}
                    size="lg"
                    className="w-full group"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;