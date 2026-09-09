import * as THREE from 'three'
import { Material } from './types'

const BASE_COLORS: Record<Material, string> = {
  white_cardboard: '#F5F0EB',
  kraft:           '#C4975A',
  black_cardboard: '#1C1C1C',
  rigid_greyboard: '#8A8A8A',
}

interface BakeInput {
  material:         Material
  logoDataUrl:      string | null
  logoOpacity:      number
  watermarkSrc:     string   // path to InTheBox logo for watermark
  canvasSize?:      number   // default 1024
}

export async function bakeTexture(input: BakeInput): Promise<THREE.CanvasTexture> {
  const size = input.canvasSize ?? 1024
  const canvas = document.createElement('canvas')
  canvas.width  = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // 1. Fill base color
  ctx.fillStyle = BASE_COLORS[input.material]
  ctx.fillRect(0, 0, size, size)

  // 2. Draw client logo if provided
  if (input.logoDataUrl) {
    await new Promise<void>(resolve => {
      const img = new Image()
      img.onload = () => {
        // Constrain logo to 70% of canvas width, centered
        const maxW = size * 0.70
        const scale = Math.min(maxW / img.width, maxW / img.height)
        const dw = img.width  * scale
        const dh = img.height * scale
        const dx = (size - dw) / 2
        const dy = (size - dh) / 2
        ctx.globalAlpha = input.logoOpacity
        ctx.drawImage(img, dx, dy, dw, dh)
        ctx.globalAlpha = 1.0
        resolve()
      }
      img.onerror = () => resolve()  // resolve silently if logo load fails
      img.src = input.logoDataUrl!
    })
  }

  // 3. Tile InTheBox watermark diagonally across entire face
  //    This is baked at the pixel level — cannot be removed
  //    from the scene via DevTools
  await new Promise<void>(resolve => {
    const wm = new Image()
    wm.onload = () => {
      ctx.save()
      ctx.globalAlpha = 0.07  // 7% — visible but unobtrusive
      // Rotate canvas 30° and tile
      ctx.translate(size / 2, size / 2)
      ctx.rotate(-Math.PI / 6)
      ctx.translate(-size / 2, -size / 2)
      const wmW = size * 0.28
      const wmH = (wm.height / wm.width) * wmW
      const cols = Math.ceil((size * 1.5) / (wmW * 1.4)) + 1
      const rows = Math.ceil((size * 1.5) / (wmH * 2.2)) + 1
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * wmW * 1.4 - size * 0.25
          const y = r * wmH * 2.2 - size * 0.25
          ctx.drawImage(wm, x, y, wmW, wmH)
        }
      }
      ctx.restore()
      resolve()
    }
    wm.onerror = () => resolve()  // silently skip if logo not found
    wm.src = input.watermarkSrc
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
