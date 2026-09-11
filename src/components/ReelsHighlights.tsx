import { useState, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ReelCard = ({
  videoSrc,
  instagramUrl,
  title
}: {
  videoSrc: string;
  instagramUrl: string;
  title: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleCardClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      // Unmute on playing via click interaction so it plays with sound
      video.muted = false;
      setIsMuted(false);

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error("Audio playback blocked or failed:", err);
            // Fallback to muted autoplay if browser blocks audio
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true));
          });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid custom play/pause toggle trigger
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div
      className="relative aspect-[9/16] w-full border border-border bg-card overflow-hidden group shadow-soft rounded-none flex flex-col"
    >
      {/* Custom Unified Header Bar */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between z-20 select-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-black flex items-center justify-center border border-border shrink-0">
            <img
              src="/assets/logo.png"
              alt="InTheBox Logo"
              className="w-5 h-5 object-contain filter invert"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xs font-bold text-foreground leading-tight">inthebox.co.in</span>
            <span className="font-mono text-[9px] text-foreground/50 leading-none">Original audio</span>
          </div>
        </div>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent text-white font-sans text-[10px] font-semibold uppercase tracking-wider hover:bg-accent/80 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          View Profile
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Video Content Container */}
      <div
        className="relative flex-1 bg-black cursor-pointer overflow-hidden z-10"
        onClick={handleCardClick}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="none"
          muted={isMuted}
        />

        {/* Play/Pause Overlay Indicator */}
        <div className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100 bg-black/30"}`}>
          <div className="w-14 h-14 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center border border-border shadow-soft text-foreground group-hover:scale-110 transition-transform duration-300">
            {isPlaying ? (
              <Pause className="w-6 h-6 text-accent fill-accent" />
            ) : (
              <Play className="w-6 h-6 text-accent fill-accent ml-0.5" />
            )}
          </div>
        </div>

        {/* Floating Mute/Unmute Action Toggle */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-20 bg-card/90 backdrop-blur-md p-2 rounded-full border border-border text-foreground hover:bg-accent hover:text-white transition-all duration-300 shadow-soft"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-accent" />
            ) : (
              <Volume2 className="w-4 h-4 text-accent" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export const ReelsHighlights = () => {
  const reels = [
    { id: "1", videoSrc: "/assets/reels/reel1.mp4", instagramUrl: "https://www.instagram.com/reel/DShS7byEnwq/" },
    { id: "2", videoSrc: "/assets/reels/reel2.mp4", instagramUrl: "https://www.instagram.com/reel/DSH7NmIjdWL/" },
    { id: "3", videoSrc: "/assets/reels/reel3.mp4", instagramUrl: "https://www.instagram.com/reel/DPvoZx6jQ5E/" },
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
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground leading-tight">
            InTheBox <span className="text-foreground/30 italic font-semibold">In Action.</span>
          </h2>
          <p className="font-sans text-sm text-foreground/75 mt-4 max-w-md">
            Watch our actual rigid box manufacturing, prototype testing, and unboxing processes unfold.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reels.map((reel, idx) => (
            <ScrollReveal key={reel.id} delay={idx * 150}>
              <ReelCard
                videoSrc={reel.videoSrc}
                instagramUrl={reel.instagramUrl}
                title={`InTheBox Reel ${idx + 1}`}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
