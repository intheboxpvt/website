import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ReelCard = ({ videoUrl }: { videoUrl: string }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative aspect-[9/16] w-full border border-white/10 hover:border-[#38BDF8]/40 transition-colors duration-500 bg-black overflow-hidden group">
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700 ease-out"
      />
      
      {/* Visual shadow gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Sound Toggle Control overlay */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:border-[#38BDF8]/40 flex items-center justify-center text-white hover:text-[#38BDF8] transition-colors duration-300 backdrop-blur-sm"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
};

export const ReelsHighlights = () => {
  const videoUrls = [
    "/assets/hero-video.mp4",
    "/assets/hero-video.mp4",
    "/assets/hero-video.mp4"
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
            Watch our actual rigid box manufacturing, prototype testing, and unboxing processes unfold.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {videoUrls.map((url, idx) => (
            <ScrollReveal key={idx} delay={idx * 150}>
              <ReelCard videoUrl={url} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
