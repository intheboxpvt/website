import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const PricingTiers = () => {
  const tiers = [
    {
      name: "Starter",
      subtitle: "Entry-level plan",
      description: "Designed for small-volume clients just starting out with affordable access.",
      features: [
        "50-500 Units MOQ",
        "Quick onboarding",
        "Standard box styles",
        "Testing scalability",
        "Basic finishing options",
      ],
      popular: false,
    },
    {
      name: "Scale",
      subtitle: "Growth-focused plan",
      description: "Ideal for mid-sized clients expanding production with a balance of volume and value.",
      features: [
        "500-5,000 Units MOQ",
        "Custom box structures",
        "Dedicated design support",
        "Premium finishes included",
        "Prioritized production schedule",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      subtitle: "Premium plan",
      description: "For large-scale, long-term clients needing optimized cost efficiencies and high volume.",
      features: [
        "5,000-20,000+ Units MOQ",
        "Cost-optimized volume pricing",
        "Bespoke structures",
        "All premium finishes",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden border-t border-border">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-20 lg:mb-24">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-xs font-mono text-foreground/50 mb-6">
                <span className="w-12 h-px bg-border"></span>
                Packaging Tiers
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-sans font-bold tracking-tight leading-[0.9] text-foreground">
                Find Your<br/>
                <span className="text-foreground/30 italic font-semibold">Perfect Fit.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className="text-lg text-foreground/60 leading-relaxed font-sans">
                Flexible options designed to grow with your brand, from first design launch to international retail market leader.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {tiers.map((tier, index) => {
            const isMiddle = index === 1;
            return (
              <ScrollReveal key={tier.name} delay={index * 150}>
                <div
                  className={`relative rounded-none p-8 lg:p-12 transition-all duration-500 h-full flex flex-col justify-between border ${
                    isMiddle
                      ? "bg-[#1c0f24] text-white border-accent shadow-gold z-10"
                      : "bg-card text-foreground border-border shadow-soft hover:border-accent/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`font-mono text-xs ${isMiddle ? "text-white/40" : "text-foreground/40"}`}>0{index + 1}</span>
                      {isMiddle && (
                        <span className="text-accent text-[10px] font-mono tracking-widest uppercase">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <div className="mb-6">
                      <h3 className={`font-sans text-3xl font-bold ${isMiddle ? "text-white" : "text-foreground"}`}>
                        {tier.name}
                      </h3>
                      <p className="font-mono text-xs text-accent tracking-wider uppercase mt-2">
                        {tier.subtitle}
                      </p>
                    </div>

                    <p className={`font-sans text-sm mb-8 leading-relaxed ${isMiddle ? "text-white/80" : "text-foreground/75"}`}>
                      {tier.description}
                    </p>

                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-4 h-4 flex-shrink-0 text-accent mt-0.5" />
                          <span className={`font-sans text-sm ${isMiddle ? "text-white/90" : "text-foreground/85"}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                    size="lg"
                    className={`w-full mt-auto group rounded-lg font-sans text-xs tracking-widest uppercase font-semibold py-5 transition-all duration-300 shadow-sm ${
                      isMiddle
                        ? "bg-accent hover:bg-accent/90 text-white shadow-md border border-accent"
                        : "bg-transparent border border-accent hover:bg-accent/10 text-accent"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;