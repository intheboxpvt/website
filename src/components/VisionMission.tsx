const VisionMission = () => {
  return (
    <section className="section-padding bg-beige">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-satoshi text-sm tracking-widest uppercase text-muted-foreground font-medium">
            Our Purpose
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Card */}
          <div className="group card-elevated p-10 lg:p-14 hover-lift">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-12 rounded-full bg-brushed-gold/20 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-brushed-gold"></span>
              </span>
              <h3 className="font-satoshi text-sm tracking-widest uppercase text-muted-foreground font-medium">
                Our Vision
              </h3>
            </div>
            
            <h2 className="font-clash text-3xl lg:text-4xl font-bold text-primary leading-tight mb-6">
              Redefining India's{" "}
              <span className="text-soft-purple">Packaging</span>{" "}
              Experience
            </h2>
            
            <p className="font-satoshi text-lg text-muted-foreground leading-relaxed">
              "To redefine how India experiences packaging by merging thoughtful 
              design, premium materials, and seamless production into one elevated 
              brand journey."
            </p>

            {/* Gold Accent Line */}
            <div className="mt-10 flex items-center gap-4">
              <span className="flex-1 h-[1px] bg-gradient-to-r from-brushed-gold to-transparent"></span>
              <span className="w-2 h-2 rounded-full bg-brushed-gold"></span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="group card-elevated p-10 lg:p-14 hover-lift">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
              </span>
              <h3 className="font-satoshi text-sm tracking-widest uppercase text-muted-foreground font-medium">
                Our Mission
              </h3>
            </div>
            
            <h2 className="font-clash text-3xl lg:text-4xl font-bold text-primary leading-tight mb-6">
              Empowering Brands Through{" "}
              <span className="text-soft-purple">Excellence</span>
            </h2>
            
            <p className="font-satoshi text-lg text-muted-foreground leading-relaxed">
              "To empower brands—big or small—with custom packaging that enhances 
              perception, protects products, and elevates every unboxing moment."
            </p>

            {/* Gold Accent Line */}
            <div className="mt-10 flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="flex-1 h-[1px] bg-gradient-to-l from-primary to-transparent"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;