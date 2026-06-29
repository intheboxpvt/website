import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ReelCard = ({ embedUrl, title, idx }: { embedUrl: string; title: string; idx: number }) => {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div 
      className="relative aspect-[9/16] w-full border border-border hover:border-accent transition-colors duration-500 bg-card overflow-hidden group shadow-soft rounded-none"
      onClick={() => setIsInteracting(true)}
    >
      <iframe
        src={embedUrl}
        className={`absolute inset-0 w-full h-full transition-all duration-300 ${
          isInteracting ? "pointer-events-auto" : "pointer-events-none select-none"
        }`}
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        allow="encrypted-media"
        title={title}
      ></iframe>

      {/* Interactivity overlay block scroll hijacking */}
      {!isInteracting && (
        <div className="absolute inset-0 bg-transparent z-10 flex flex-col items-center justify-center cursor-pointer select-none">
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-md px-4 py-2 border border-border text-foreground font-mono text-[10px] tracking-wider uppercase flex items-center gap-2 group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300 shadow-soft">
            <VolumeX className="w-3.5 h-3.5 text-accent group-hover:text-white" />
            <span>Tap to unmute</span>
          </div>
        </div>
      )}
      
      {isInteracting && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsInteracting(false);
          }}
          className="absolute top-4 right-4 z-20 bg-card/95 backdrop-blur-md p-2 rounded-full border border-border text-foreground hover:bg-accent hover:text-white transition-all duration-300 shadow-soft"
          title="Lock scrolling"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export const ReelsHighlights = () => {
  const reels = [
    { id: "1", embedUrl: "https://www.instagram.com/reel/DShS7byEnwq/embed/" },
    { id: "2", embedUrl: "https://www.instagram.com/reel/DSH7NmIjdWL/embed/" },
    { id: "3", embedUrl: "https://www.instagram.com/reel/DPvoZx6jQ5E/embed/" },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-background border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/[0.01] rounded-full blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-16 text-left">
          <span className="inline-flex items-center gap-3 text-xs font-mono text-foreground/50 mb-4">
            <span className="w-12 h-px bg-border"></span>
            Social Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground leading-tight">
            InTheBox <span className="text-foreground/30 italic">In Action.</span>
          </h2>
          <p className="font-sans text-sm text-foreground/75 mt-4 max-w-md">
            Watch our actual rigid box manufacturing, prototype testing, and unboxing processes unfold on Instagram.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reels.map((reel, idx) => (
            <ScrollReveal key={reel.id} delay={idx * 150}>
              <ReelCard 
                embedUrl={reel.embedUrl} 
                title={`InTheBox Reel ${idx + 1}`} 
                idx={idx} 
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
