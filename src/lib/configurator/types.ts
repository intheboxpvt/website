export type Unit = 'mm' | 'cm' | 'in'

export type BoxType =
  | 'straight_tuck'    // standard folding carton, tuck ends
  | 'reverse_tuck'     // reverse tuck ends
  | 'rigid_lid_base'   // two-piece rigid box (lid + base)
  | 'mailer'           // e-commerce mailer/shipper
  | 'sleeve'           // sliding sleeve/outer wrap
  | 'drawer'           // slide-out drawer box
  | 'perfume'          // tall narrow tuck-end (perfume/cosmetics)
  | 'gift'             // wide shallow lid-base gift box
  | 'bag'              // custom handle paper bag

export type Material =
  | 'white_cardboard'  // coated white board 220–300gsm
  | 'kraft'            // natural brown kraft
  | 'black_cardboard'  // black-core board
  | 'rigid_greyboard'  // greyboard 1500–2500gsm for rigid boxes

export type Finish =
  | 'matte_lamination'
  | 'gloss_lamination'
  | 'soft_touch'
  | 'aqueous_coating'
  | 'no_finish'

export type FoilEffect =
  | 'none'
  | 'gold_foil'
  | 'silver_foil'
  | 'holographic'
  | 'rose_gold_foil'

export type PrintingSide = 'outside' | 'inside' | 'both'
export type LogoFace = 'front' | 'back'
export type ViewMode = '3d' | 'dieline'

export interface Dimensions {
  length: number
  width:  number
  height: number
  unit:   Unit
}

export interface ConfigState {
  boxType:       BoxType
  dimensions:    Dimensions
  material:      Material
  finish:        Finish
  foilEffect:    FoilEffect
  printingSide:  PrintingSide
  quantity:      number
  lidOpenAmount: number      // 0.0=closed, 1.0=fully open
  viewMode:      ViewMode
  isRotating:    boolean
  logoDataUrl:   string | null
  logoFace:      LogoFace
  logoOpacity:   number      // 0–1
  savedConfigId: string | null
  quoteOpen:     boolean
  // setters
  setBoxType:       (t: BoxType)              => void
  setDimensions:    (d: Partial<Dimensions>)  => void
  setUnit:          (u: Unit)                 => void
  setMaterial:      (m: Material)             => void
  setFinish:        (f: Finish)               => void
  setFoilEffect:    (fe: FoilEffect)          => void
  setPrintingSide:  (ps: PrintingSide)        => void
  setQuantity:      (q: number)               => void
  setLidOpen:       (v: number)               => void
  setViewMode:      (vm: ViewMode)            => void
  setIsRotating:    (r: boolean)              => void
  setLogo:          (url: string | null)      => void
  setLogoFace:      (f: LogoFace)             => void
  setLogoOpacity:   (o: number)               => void
  setSavedConfigId: (id: string | null)       => void
  setQuoteOpen:     (open: boolean)           => void
  // computed
  getDimensionsInMM: () => { l: number; w: number; h: number }
}
