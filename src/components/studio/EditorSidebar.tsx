import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, Settings, Type, Palette, Sparkles, Download } from "lucide-react";

interface EditorSidebarProps {
  settings: any;
  onChange: (settings: any) => void;
}

const EditorSidebar = ({ settings, onChange }: EditorSidebarProps) => {
  const update = (key: string, value: any) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="p-8 space-y-10">
      <header>
        <h1 className="font-serif text-2xl text-royal-purple">Product Studio</h1>
        <p className="text-xs font-sans text-soft-purple uppercase tracking-widest mt-2">
          Thank-you Card Configurator
        </p>
      </header>

      {/* 1. CARD STATE */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-royal-purple mb-4">
          <Settings className="w-4 h-4" />
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest">Card Animation</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm">Fold Angle</Label>
            <span className="text-[10px] font-mono text-soft-purple">{Math.round(settings.isOpen * 100)}%</span>
          </div>
          <Slider 
            value={[settings.isOpen * 100]} 
            onValueChange={(v) => update("isOpen", v[0] / 100)} 
            max={100} 
            step={1}
          />
        </div>
      </section>

      {/* 2. TYPOGRAPHY */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-royal-purple mb-4">
          <Type className="w-4 h-4" />
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest">Typography</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-soft-purple">Front Message</Label>
            <Input 
              value={settings.frontText} 
              onChange={(e) => update("frontText", e.target.value)}
              className="bg-ivory/20 border-black/5"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-soft-purple">Interior Story</Label>
            <Textarea 
              value={settings.insideText} 
              onChange={(e) => update("insideText", e.target.value)}
              className="bg-ivory/20 border-black/5 h-24 resize-none"
            />
          </div>
        </div>
      </section>

      {/* 3. MATERIAL & EFFECTS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-royal-purple mb-4">
          <Palette className="w-4 h-4" />
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest">Finishes</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-ivory/30 rounded-xl border border-black/5">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-gold-metallic" />
              <Label className="text-sm">Gold Foil Stamping</Label>
            </div>
            <Switch 
              checked={settings.foilEffect} 
              onCheckedChange={(v) => update("foilEffect", v)} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label className="text-[10px] uppercase">Base Color</Label>
                <input 
                  type="color" 
                  value={settings.bgColor}
                  onChange={(e) => update("bgColor", e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                />
             </div>
             <div className="space-y-2">
                <Label className="text-[10px] uppercase">Print Color</Label>
                <input 
                  type="color" 
                  value={settings.textColor}
                  onChange={(e) => update("textColor", e.target.value)}
                  className="w-full h-10 rounded-lg cursor-pointer border-none p-0 bg-transparent"
                />
             </div>
          </div>
        </div>
      </section>

      {/* 4. EXPORT */}
      <section className="pt-10 border-t border-black/5">
         <button className="w-full py-4 bg-royal-purple text-ivory rounded-xl font-sans text-sm font-bold flex items-center justify-center gap-2 hover:bg-aubergine transition-colors group">
            <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            Generate Production PDF
         </button>
      </section>
    </div>
  );
};

export default EditorSidebar;
