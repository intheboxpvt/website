import { BoxType, LogoFace } from './types'

export interface SurfaceOption {
  id: LogoFace
  label: string
  description: string
}

export function getAvailableSurfaces(boxType: BoxType): SurfaceOption[] {
  if (boxType === 'drawer' || boxType === 'sleeve') {
    return [
      { id: 'top', label: 'Sleeve Top', description: 'Top surface of outer sleeve' },
      { id: 'front', label: 'Sleeve Front', description: 'Front face of sleeve' },
    ]
  }
  if (boxType === 'rigid_lid_base' || boxType === 'gift') {
    return [
      { id: 'top', label: 'Lid Top', description: 'Top surface of rigid lid' },
      { id: 'front', label: 'Lid Front', description: 'Front face of lid' },
    ]
  }
  if (boxType === 'mailer') {
    return [
      { id: 'top', label: 'Lid Top', description: 'Top hinged cover' },
      { id: 'front', label: 'Front Wall', description: 'Front exterior wall' },
    ]
  }
  // Tuck carton / default
  return [
    { id: 'top', label: 'Top Lid', description: 'Top flap lid' },
    { id: 'front', label: 'Front Face', description: 'Main front panel' },
  ]
}

export function isTargetMeshFace(boxType: BoxType, logoFace: LogoFace, meshFace: string): boolean {
  if (!logoFace || !meshFace) return false

  const f = meshFace.toLowerCase()

  if (logoFace === 'top') {
    return (
      f === 'lid_top' ||
      f === 'lid' ||
      f === 'sleeve_top' ||
      f === 'body_top' ||
      f === 'top' ||
      f === 'base_bottom' // lid bottom in rigid box is physically top panel
    )
  }

  if (logoFace === 'front') {
    return (
      f === 'lid_front' ||
      f === 'body_front' ||
      f === 'sleeve_front' ||
      f === 'tray_front' ||
      f === 'front'
    )
  }

  if (logoFace === 'back') {
    return f === 'body_back' || f === 'lid_back' || f === 'sleeve_back' || f === 'back'
  }

  return false
}
