import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, Factory, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const About = () => {
  const teamMembers = [
    {
      name: "Liv Arpit",
      role: "Founder & CEO",
      image: "/team/LivArpit.jpeg",
      // bio: "Transforming ideas into reality"
    },
    {
      name: "Aashvi Chawla",
      role: "MD, COO",
      image: "/team/AashviChalwa.jpeg",
      // bio: "Visionary leader driving innovation"
    },
    {
      name: "Ishan Kumar",
      role: "Co-founder, CMO",
      image: "/team/Ishan.jpeg",
      // bio: "Crafting digital excellence"
    }
  ];

  const testimonials = [
    {
      quote: "InTheBox transformed our brand perception completely. The packaging quality exceeded our expectations and our customers love the unboxing experience.",
      author: "Meera Joshi",
      company: "Luxe Cosmetics",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "Working with InTheBox has been a game-changer. Their attention to detail and commitment to sustainability aligns perfectly with our brand values.",
      author: "Vikram Singh",
      company: "Organic Earth",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      quote: "The team understood our vision from day one. They delivered premium packaging that truly represents our luxury brand positioning.",
      author: "Ananya Gupta",
      company: "Heritage Jewels",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="Our Story & Team | InTheBox Packaging"
        description="Meet the team behind InTheBox. We have been crafting premium, sustainable packaging solutions since 2010. Born from passion, built on excellence."
        keywords="packaging team, inthebox story, packaging manufacturers india, luxury packaging team"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 lg:pt-36 pb-20 section-royal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-[2px] bg-gold-metallic"></div>
              <span className="font-sans text-sm tracking-widest uppercase text-gold-light font-semibold">
                Our Story
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Crafting Premium Packaging Since 2010
            </h1>
            <p className="font-sans text-xl text-ivory/80 leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              From a small workshop to industry leaders, we have been helping brands create 
              unforgettable first impressions through exceptional packaging solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 md:py-28 section-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mb-8">
                Born from Passion, Built on Excellence
              </h2>
              <div className="space-y-6 font-sans text-lg text-soft-purple leading-relaxed">
                <p>
                  InTheBox began in 2010 with a simple belief: every product deserves packaging 
                  that tells its story. What started as a small family-run workshop in Mohali 
                  has grown into one of India's most trusted premium packaging manufacturers.
                </p>
                <p>
                  Our founder recognized that small and medium businesses 
                  were struggling to access the same quality packaging that luxury brands enjoyed. 
                  He set out to change that, making premium packaging accessible without 
                  compromising on quality or craftsmanship.
                </p>
                <p>
                  Today, we serve over 500 brands across India and beyond, from emerging 
                  startups to established luxury houses. Our commitment remains unchanged: 
                  delivering packaging that makes brands impossible to ignore.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="/about/who_we_are.png" 
                  alt="InTheBox Team Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-purple/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold-metallic rounded-xl p-6 shadow-lg z-10">
                <p className="font-serif text-3xl font-bold text-royal-purple">14+</p>
                <p className="font-sans text-royal-purple/80">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-widest uppercase text-gold-metallic font-semibold">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mt-4 mb-4">
              Our Core Values
            </h2>
            <p className="font-sans text-xl text-soft-purple max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Quality First", desc: "Premium materials and meticulous craftsmanship in every piece" },
              { icon: Users, title: "Client Focus", desc: "Your success is our success. We listen, understand, and deliver" },
              { icon: Factory, title: "Innovation", desc: "Constantly evolving our techniques and sustainable practices" },
              { icon: Heart, title: "Integrity", desc: "Transparent pricing, honest timelines, and genuine partnerships" },
            ].map((value, index) => (
              <div key={index} className="card-royal p-8 hover-lift">
                <div className="w-14 h-14 bg-gold-metallic/10 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-gold-metallic" />
                </div>
                <h3 className="font-serif text-xl text-royal-purple mb-3">{value.title}</h3>
                <p className="font-sans text-soft-purple">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 section-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-widest uppercase text-gold-metallic font-semibold">
              The People Behind InTheBox
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mt-4 mb-4">
              Meet Our Team
            </h2>
            <p className="font-sans text-xl text-soft-purple max-w-2xl mx-auto">
              The passionate people behind every exceptional package
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group w-full max-w-xs">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-purple/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="font-serif text-xl text-royal-purple">{member.name}</h3>
                <p className="font-sans text-gold-metallic font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="font-sans text-sm tracking-widest uppercase text-gold-metallic font-semibold">
              Client Success Stories
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mt-4 mb-4">
              What Our Clients Say
            </h2>
            <p className="font-sans text-xl text-soft-purple max-w-2xl mx-auto">
              Success stories from brands we have partnered with
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-royal p-8 hover-lift">
                <div className="mb-6">
                  <svg className="w-10 h-10 text-gold-metallic/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="font-sans text-lg text-royal-purple leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-sans font-semibold text-royal-purple">{testimonial.author}</p>
                    <p className="font-sans text-sm text-soft-purple">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 section-royal">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-6">
            Ready to Elevate Your Brand?
          </h2>
          <p className="font-sans text-xl text-ivory/80 mb-10 max-w-2xl mx-auto">
            Let us create packaging that tells your story and delights your customers
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl" className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default About;