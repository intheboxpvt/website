const Gallery = () => {
  const galleryItems = [
    { caption: "Luxury Jewelry Boxes", category: "Rigid Box", span: "col-span-2 row-span-2" },
    { caption: "Premium Paper Bags", category: "Paper Bag", span: "col-span-1 row-span-1" },
    { caption: "Artisan Gift Hampers", category: "Hamper", span: "col-span-1 row-span-1" },
    { caption: "Custom Potli Collection", category: "Potli Bag", span: "col-span-1 row-span-2" },
    { caption: "Minimalist Packaging", category: "Foldable Box", span: "col-span-2 row-span-1" },
    { caption: "Brand Stickers", category: "Accessories", span: "col-span-1 row-span-1" },
  ];

  const placeholderColors = [
    "from-deep-purple to-soft-purple",
    "from-brushed-gold/60 to-brushed-gold/30",
    "from-soft-purple to-deep-purple",
    "from-primary to-soft-purple",
    "from-brushed-gold/40 to-soft-purple",
    "from-deep-purple/80 to-brushed-gold/40",
  ];

  return (
    <section id="gallery" className="section-padding bg-beige">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-brushed-gold"></span>
            <span className="font-satoshi text-sm tracking-widest uppercase text-muted-foreground font-medium">
              Our Work
            </span>
            <span className="w-8 h-[2px] bg-brushed-gold"></span>
          </div>
          
          <h2 className="font-clash text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
            Packaging Possibilities{" "}
            <span className="text-soft-purple">Unboxed</span>
          </h2>
          
          <p className="font-satoshi text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated showcase of packaging crafted for brands across multiple industries.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
          {galleryItems.map((item, index) => (
            <div 
              key={item.caption}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
            >
              {/* Placeholder Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${placeholderColors[index]} transition-transform duration-700 group-hover:scale-110`}>
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }}></div>
                
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-4xl opacity-60">📦</span>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-deep-purple/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="font-satoshi text-xs tracking-widest uppercase text-brushed-gold mb-2 block font-medium">
                    {item.category}
                  </span>
                  <h3 className="font-clash text-xl font-bold text-cream">
                    {item.caption}
                  </h3>
                </div>
              </div>

              {/* Gold Corner Accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border border-brushed-gold/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <a 
            href="#"
            className="inline-flex items-center gap-3 font-satoshi text-base font-medium text-primary hover:text-soft-purple transition-colors group"
          >
            <span className="relative">
              View Complete Portfolio
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brushed-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </span>
            <span className="w-8 h-[1px] bg-brushed-gold"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;