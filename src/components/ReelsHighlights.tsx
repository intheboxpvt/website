import { Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export const ReelsHighlights = () => {
  const reels = [
    {
      id: "1",
      link: "https://www.instagram.com/reel/DShS7byEnwq/",
      title: "Luxury Rigid Assembly",
      subtitle: "Watch the seamless magnetic flap and corner alignment process.",
      bgImage: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500&q=80",
    },
    {
      id: "2",
      link: "https://www.instagram.com/reel/DSH7NmIjdWL/",
      title: "Precision Foil Stamping",
      subtitle: "Details of custom copper foil detailing under mechanical press plates.",
      bgImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80",
    },
    {
      id: "3",
      link: "https://www.instagram.com/reel/DPvoZx6jQ5E/",
      title: "Eco-Board Rigidity Test",
      subtitle: "Demonstrating load-bearing capacity of our hybrid agri-waste board.",
      bgImage: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&q=80",
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#38BDF8]/[0.01] rounded-full blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-16 text-left">
          <span className="inline-flex items-center gap-3 text-xs font-mono text-white/50 mb-4">
            <span className="w-12 h-px bg-white/20"></span>
            Social Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">
            InTheBox <span className="text-white/30 italic">In Action.</span>
          </h2>
          <p className="font-sans text-sm text-white/50 mt-4 max-w-md">
            Go behind the scenes of our packaging manufacturing and custom design prototypes on Instagram.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reels.map((reel, idx) => (
            <ScrollReveal key={reel.id} delay={idx * 150}>
              <a 
                href={reel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative aspect-[9/16] w-full border border-white/10 hover:border-[#38BDF8]/40 transition-colors duration-500 bg-black overflow-hidden"
              >
                {/* Background image */}
                <img 
                  src={reel.bgImage} 
                  alt={reel.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Visual shade gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                {/* Centered play icon trigger */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white group-hover:text-black group-hover:bg-[#38BDF8] group-hover:border-[#38BDF8] transition-all duration-300 transform group-hover:scale-110">
                    <Play className="w-5 h-5 fill-current ml-1" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 text-left">
                  <span className="font-mono text-[10px] text-[#38BDF8] uppercase tracking-widest block mb-2">Reel 0{idx + 1}</span>
                  <h3 className="font-serif text-2xl text-white font-light leading-tight">{reel.title}</h3>
                  <p className="font-sans text-xs text-white/50 mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {reel.subtitle}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
