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
    <section className="section-padding bg-ivory relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gold-metallic/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-widest uppercase text-gold-metallic font-medium">
              Client Stories
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-royal-purple mt-4">
              Loved by Brands Like Yours
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-royal-purple/10 hover:shadow-xl transition-shadow relative h-full">
                <Quote className="w-10 h-10 text-gold-metallic/30 absolute top-6 right-6" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-metallic fill-gold-metallic" />
                  ))}
                </div>
                
                <p className="font-sans text-aubergine leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t border-royal-purple/10 pt-4">
                  <p className="font-serif text-lg font-semibold text-royal-purple">
                    {testimonial.author}
                  </p>
                  <p className="font-sans text-sm text-aubergine/60">
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