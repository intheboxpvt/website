import * as THREE from 'three'
import { Material } from './types'

const BASE_COLORS: Record<Material, string> = {
  white_cardboard: '#F5F0EB',
  kraft:           '#C4975A',
  black_cardboard: '#1C1C1C',
  rigid_greyboard: '#8A8A8A',
}

export interface BakeInput {
  material:      Material
  boxColor?:     string
  logoDataUrl:   string | null
  logoX:         number      // 0 to 1 (0.5 center)
  logoY:         number      // 0 to 1 (0.5 center)
  logoScale:     number      // 0.1 to 2.0 (0.6 default)
  logoRotation:  number      // degrees -180 to 180
  logoOpacity:   number      // 0 to 1
  canvasSize?:   number      // default 2048 for high-definition rendering
}

// In-memory HTMLImageElement cache for zero-flicker synchronous redraws
const imageCache = new Map<string, HTMLImageElement>()

function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!)
  }
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imageCache.set(src, img)
      resolve(img)
    }
    img.onerror = () => reject(new Error('Failed to load logo image'))
    img.src = src
  })
}

export async function bakeTexture(input: BakeInput): Promise<THREE.CanvasTexture> {
  // Use 2048x2048 high-definition resolution to guarantee crisp logo rendering
  const size = input.canvasSize ?? 2048
  const canvas = document.createElement('canvas')
  canvas.width  = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Enable high quality image smoothing algorithms
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  // 1. Fill canvas with box color (or material base color)
  const effectiveColor = input.boxColor || BASE_COLORS[input.material] || '#F5F0EB'
  ctx.fillStyle = effectiveColor
  ctx.fillRect(0, 0, size, size)

  // 2. Render logo if provided
  if (input.logoDataUrl) {
    try {
      const img = await loadImage(input.logoDataUrl)

      // Calculate position (normalized 0..1 to canvas coordinates)
      const cx = input.logoX * size
      const cy = input.logoY * size

      // Calculate size maintaining aspect ratio
      const maxDim = size * input.logoScale
      const aspect = img.width / img.height

      let dw: number, dh: number
      if (aspect >= 1) {
        dw = maxDim
        dh = maxDim / aspect
      } else {
        dh = maxDim
        dw = maxDim * aspect
      }

      ctx.save()
      ctx.translate(cx, cy)

      if (input.logoRotation !== 0) {
        ctx.rotate((input.logoRotation * Math.PI) / 180)
      }

      ctx.globalAlpha = Math.max(0, Math.min(1, input.logoOpacity))
      ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh)
      ctx.restore()
    } catch (e) {
      // Silently fail if image fails to load
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.anisotropy = 16 // 16x anisotropic filtering for razor-sharp logos at 3D perspective angles
  texture.needsUpdate = true
  return texture
}
