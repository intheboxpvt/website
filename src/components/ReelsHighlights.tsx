import ScrollReveal from "./ScrollReveal";

export const ReelsHighlights = () => {
  const reels = [
    { id: "1", embedUrl: "https://www.instagram.com/reel/DShS7byEnwq/embed/" },
    { id: "2", embedUrl: "https://www.instagram.com/reel/DSH7NmIjdWL/embed/" },
    { id: "3", embedUrl: "https://www.instagram.com/reel/DPvoZx6jQ5E/embed/" },
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
            Watch our actual rigid box manufacturing, prototype testing, and unboxing processes unfold on Instagram.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reels.map((reel, idx) => (
            <ScrollReveal key={reel.id} delay={idx * 150}>
              <div className="relative aspect-[9/16] w-full border border-white/10 hover:border-[#38BDF8]/40 transition-colors duration-500 bg-black overflow-hidden group">
                <iframe
                  src={reel.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media"
                  title={`InTheBox Reel ${idx + 1}`}
                ></iframe>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
