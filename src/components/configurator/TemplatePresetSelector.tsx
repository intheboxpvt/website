import React from 'react'
import { useConfigStore } from '@/lib/configurator/store'
import { TEMPLATES, ConfigTemplate } from '@/lib/configurator/templates'
import ITBLabel from './ui/ITBLabel'
import { getBaseColor } from '@/lib/configurator/MaterialSystem'

export const TemplatePresetSelector: React.FC = () => {
  const store = useConfigStore()

  const applyTemplate = (template: ConfigTemplate) => {
    store.setBoxType(template.config.boxType)
    store.setDimensions(template.config.dimensions)
    store.setMaterial(template.config.material)
    const color = getBaseColor(template.config.material) || '#F5F0EB'
    store.setBoxColor(color)
    store.setFinish(template.config.finish)
    store.setFoilEffect(template.config.foilEffect)
    store.setQuantity(template.config.quantity)
  }

  const resetBlank = () => {
    store.setBoxColor('#F5F0EB')
    store.setMaterial('white_cardboard')
    store.setLogo(null)
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <ITBLabel text="START FROM TEMPLATE" className="text-[10px]" />
        <button
          onClick={resetBlank}
          className="text-[10px] font-mono text-accent uppercase font-bold hover:underline"
        >
          Reset Blank
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => applyTemplate(tmpl)}
            className="p-2.5 rounded-xl border border-border bg-background hover:border-accent/60 hover:bg-accent/5 transition-all text-left group flex flex-col justify-between min-h-[72px]"
          >
            <div>
              <p className="font-mono text-[10px] font-bold text-foreground group-hover:text-accent truncate">
                {tmpl.name}
              </p>
              <p className="font-sans text-[9px] text-foreground/50 line-clamp-2 mt-0.5 leading-tight">
                {tmpl.description}
              </p>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-wider text-accent/80 mt-1 font-semibold">
              Apply Preset →
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplatePresetSelector
