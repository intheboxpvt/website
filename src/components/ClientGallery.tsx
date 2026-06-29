import { Star, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ClientGallery = () => {
  const testimonials = [
    {
      quote: "InTheBox’s agri-waste hybrid boards elevated our unboxing experience while helping us reduce our carbon footprint by 30%. Their prototyping speed and manufacturing reliability are unmatched.",
      author: "Sarah Jenkins",
      role: "Supply Chain Director, Eleva Wellness",
      rating: 5,
    },
    {
      quote: "Scaling from 500 to 10,000 units was seamless. InTheBox provided end-to-end support—from structural engineering to final delivery—maintaining exacting quality standards across every batch.",
      author: "David Chen",
      role: "Head of Operations, Aura Cosmetics",
      rating: 5,
    },
    {
      quote: "Their technical expertise in premium finishes and low-MOQ flexibility allowed us to launch our flagship collection flawlessly. They are true manufacturing partners, not just vendors.",
      author: "Emily Roberts",
      role: "Founder, Lumière Home",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden border-t border-border">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-white/[0.01] rounded-full blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-20 lg:mb-24">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-xs font-mono text-foreground/50 mb-6">
                <span className="w-12 h-px bg-border"></span>
                Client Stories
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif tracking-tight leading-[0.9] text-foreground">
                Loved by<br/>
                <span className="text-foreground/30 italic">Brands Like Yours.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className="text-lg text-foreground/60 leading-relaxed font-sans">
                Hear what designers, product leads, and business founders say about working with our custom packaging studio.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="bg-card p-8 lg:p-12 rounded-none border border-border hover:border-accent relative h-full flex flex-col justify-between transition-all duration-500 shadow-soft">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-foreground/40">0{index + 1}</span>
                    <Quote className="w-5 h-5 text-accent/20" />
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                    ))}
                  </div>
                  
                  <p className="font-sans text-foreground/85 text-base leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="border-t border-border pt-4 mt-6">
                  <p className="font-sans text-base font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="font-sans text-xs text-foreground/50 mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientGallery;