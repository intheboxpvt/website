import { create } from 'zustand'
import { ConfigState, Dimensions, Unit } from './types'

const MM_PER: Record<Unit, number> = { mm: 1, cm: 10, in: 25.4 }

export const useConfigStore = create<ConfigState>((set, get) => ({
  boxType:       'straight_tuck',
  dimensions:    { length: 100, width: 70, height: 30, unit: 'mm' },
  material:      'white_cardboard',
  boxColor:      '#F5F0EB',
  finish:        'matte_lamination',
  foilEffect:    'none',
  printingSide:  'outside',
  quantity:      500,
  lidOpenAmount: 0,
  viewMode:      '3d',
  isRotating:    false,
  logoDataUrl:   null,
  logoFace:      'top',
  logoX:         0.5,
  logoY:         0.5,
  logoScale:     0.6,
  logoRotation:  0,
  logoOpacity:   1.0,
  savedConfigId: null,
  quoteOpen:     false,

  setBoxType:      (t)    => set({ boxType: t }),
  setDimensions:   (d)    => set(s => ({ dimensions: { ...s.dimensions, ...d } })),
  setUnit:         (u)    => set(s => {
    const factor = MM_PER[s.dimensions.unit] / MM_PER[u]
    return {
      dimensions: {
        length: Math.round(s.dimensions.length * factor * 100) / 100,
        width:  Math.round(s.dimensions.width  * factor * 100) / 100,
        height: Math.round(s.dimensions.height * factor * 100) / 100,
        unit:   u,
      }
    }
  }),
  setMaterial:     (m)    => set({ material: m }),
  setBoxColor:     (c)    => set({ boxColor: c }),
  setFinish:       (f)    => set({ finish: f }),
  setFoilEffect:   (fe)   => set({ foilEffect: fe }),
  setPrintingSide: (ps)   => set({ printingSide: ps }),
  setQuantity:     (q)    => set({ quantity: q }),
  setLidOpen:      (v)    => set({ lidOpenAmount: v }),
  setViewMode:     (vm)   => set({ viewMode: vm }),
  setIsRotating:   (r)    => set({ isRotating: r }),
  setLogo:         (url)  => set({ logoDataUrl: url }),
  setLogoFace:     (f)    => set({ logoFace: f }),
  setLogoX:        (x)    => set({ logoX: x }),
  setLogoY:        (y)    => set({ logoY: y }),
  setLogoScale:    (s)    => set({ logoScale: s }),
  setLogoRotation: (deg)  => set({ logoRotation: deg }),
  setLogoOpacity:  (o)    => set({ logoOpacity: o }),
  setSavedConfigId:(id)   => set({ savedConfigId: id }),
  setQuoteOpen:    (open) => set({ quoteOpen: open }),

  getDimensionsInMM: () => {
    const { length, width, height, unit } = get().dimensions
    const f = MM_PER[unit]
    return { l: length * f, w: width * f, h: height * f }
  },
}))

