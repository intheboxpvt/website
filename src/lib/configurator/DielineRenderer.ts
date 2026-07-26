import { BoxType, Dimensions, LogoFace, Unit } from './types'

interface DielineInput {
  boxType:       BoxType
  dimensions:    Dimensions   // in whatever unit the user set
  watermarkSrc:  string
  logoDataUrl?:  string | null
  logoFace?:     LogoFace
  logoX?:        number
  logoY?:        number
  logoScale?:    number
  logoRotation?: number
  logoOpacity?:  number
}

interface DielineOutput {
  canvas: HTMLCanvasElement
}

export async function renderDieline(input: DielineInput): Promise<DielineOutput> {
  const canvas = document.createElement('canvas')
  canvas.width  = 1400
  canvas.height = 900
  const ctx = canvas.getContext('2d')!

  // Background
  ctx.fillStyle = '#faf9f5'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Convert dimensions to mm for layout math
  const MM: Record<Unit, number> = { mm: 1, cm: 10, in: 25.4 }
  const f = MM[input.dimensions.unit]
  const lMM = input.dimensions.length * f
  const wMM = input.dimensions.width  * f
  const hMM = input.dimensions.height * f

  // Scale to fit canvas (leave margin on each side)
  const available = { w: canvas.width - 240, h: canvas.height - 240 }
  
  // Estimate layout footprints
  let netNaturalW = wMM * 2 + lMM * 2
  let netNaturalH = hMM + wMM * 2
  if (input.boxType === 'rigid_lid_base' || input.boxType === 'gift') {
    netNaturalW = lMM + hMM * 3
    netNaturalH = wMM + hMM * 4 + 80 // Base + Lid stacked
  } else if (input.boxType === 'mailer') {
    netNaturalW = lMM + hMM * 2 + wMM * 0.8
    netNaturalH = wMM * 2 + hMM * 3.5
  }

  const scale = Math.min(available.w / netNaturalW, available.h / netNaturalH)

  const originX = canvas.width  / 2
  const originY = canvas.height / 2

  // Scaled values for rendering
  const l = lMM * scale
  const w = wMM * scale
  const h = hMM * scale

  // 1. Draw flat net layout
  if (input.boxType === 'rigid_lid_base' || input.boxType === 'gift') {
    drawRigidBoxNet(ctx, originX, originY, l, w, h)
  } else if (input.boxType === 'mailer') {
    drawMailerNet(ctx, originX, originY, l, w, h)
  } else {
    // straight_tuck, reverse_tuck, perfume, sleeve, drawer, bag, default
    drawTuckEndNet(ctx, originX, originY, l, w, h)
  }

  // 2. Draw user artwork/logo on dieline net panel if uploaded
  if (input.logoDataUrl) {
    await drawDielineLogo(ctx, originX, originY, l, w, h, input)
  }

  // 3. Draw annotations (measurement lines and labels)
  drawAnnotations(ctx, originX, originY, l, w, h, input.dimensions, input.boxType)

  // 4. Draw face labels ("FRONT", "BACK", etc.)
  drawFaceLabels(ctx, originX, originY, l, w, h, input.boxType)

  // 5. Tile InTheBox watermark diagonally across dieline
  await drawWatermarkTile(ctx, canvas.width, canvas.height, input.watermarkSrc)

  // 6. Draw Footer disclaimer notice
  ctx.save()
  ctx.fillStyle = '#666666'
  ctx.font = '11px Inter, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText(
    'InTheBox · For reference only · Not a production dieline',
    canvas.width - 24,
    canvas.height - 24
  )
  ctx.restore()

  return { canvas }
}

async function drawDielineLogo(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  l: number,
  w: number,
  h: number,
  input: DielineInput
) {
  if (!input.logoDataUrl) return

  let px = ox, py = oy, pw = l, ph = h

  if (input.boxType === 'rigid_lid_base' || input.boxType === 'gift') {
    const lidOY = oy - h * 1.1
    const baseOY = oy + h * 0.8
    if (input.logoFace === 'top') {
      py = lidOY; pw = l * 1.04; ph = w * 1.04
    } else {
      py = baseOY + w/2 + (h * 0.65)/2; pw = l; ph = h * 0.65
    }
  } else if (input.boxType === 'mailer') {
    if (input.logoFace === 'top') {
      py = oy - w/2 - h - w/2; pw = l; ph = w
    } else {
      py = oy + w/2 + h/2; pw = l; ph = h
    }
  } else {
    if (input.logoFace === 'top') {
      py = oy - h/2 - w/2; pw = l; ph = w
    } else {
      py = oy; pw = l; ph = h
    }
  }

  await new Promise<void>((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.save()
      const lx = input.logoX ?? 0.5
      const ly = input.logoY ?? 0.5
      const scale = input.logoScale ?? 0.6
      const rot = input.logoRotation ?? 0
      const opacity = input.logoOpacity ?? 1

      const cx = px - pw/2 + lx * pw
      const cy = py - ph/2 + ly * ph

      const maxDim = Math.min(pw, ph) * scale
      const aspect = img.width / img.height
      let dw = maxDim, dh = maxDim / aspect
      if (aspect < 1) {
        dh = maxDim; dw = maxDim * aspect
      }

      ctx.translate(cx, cy)
      if (rot !== 0) ctx.rotate((rot * Math.PI) / 180)
      ctx.globalAlpha = opacity
      ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh)
      ctx.restore()
      resolve()
    }
    img.onerror = () => resolve()
    img.src = input.logoDataUrl!
  })
}

// Helper to draw dashed lines for folding margins
function drawDashedLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.save()
  ctx.strokeStyle = '#666666'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.restore()
}

// Helper to draw dimension arrows and texts
function drawArrowLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  text: string,
  align: 'horizontal' | 'vertical'
) {
  ctx.save()
  ctx.strokeStyle = '#333333'
  ctx.lineWidth = 1
  ctx.fillStyle = '#333333'
  ctx.font = '10px Inter, sans-serif'

  // Draw line
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()

  // Draw arrowheads
  const arrowSize = 5
  if (align === 'horizontal') {
    // Arrow left
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x1 + arrowSize, y1 - arrowSize / 1.5)
    ctx.lineTo(x1 + arrowSize, y1 + arrowSize / 1.5)
    ctx.fill()
    // Arrow right
    ctx.beginPath()
    ctx.moveTo(x2, y2)
    ctx.lineTo(x2 - arrowSize, y2 - arrowSize / 1.5)
    ctx.lineTo(x2 - arrowSize, y2 + arrowSize / 1.5)
    ctx.fill()

    // Draw text
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'
    ctx.fillText(text, (x1 + x2) / 2, y1 - 4)
  } else {
    // Arrow top
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x1 - arrowSize / 1.5, y1 + arrowSize)
    ctx.lineTo(x1 + arrowSize / 1.5, y1 + arrowSize)
    ctx.fill()
    // Arrow bottom
    ctx.beginPath()
    ctx.moveTo(x2, y2)
    ctx.lineTo(x2 - arrowSize / 1.5, y2 - arrowSize)
    ctx.lineTo(x2 + arrowSize / 1.5, y2 - arrowSize)
    ctx.fill()

    // Draw text
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x1 - 6, (y1 + y2) / 2)
  }
  ctx.restore()
}

// 1. TUCK END LAYOUT (Straight Tuck / Reverse Tuck / Perfume / Sleep)
function drawTuckEndNet(ctx: CanvasRenderingContext2D, ox: number, oy: number, l: number, w: number, h: number) {
  // Dashed fold lines (drawn internally)
  drawDashedLine(ctx, ox - l/2 - w, oy - h/2, ox - l/2 - w, oy + h/2) // Glue tab / Left fold
  drawDashedLine(ctx, ox - l/2, oy - h/2, ox - l/2, oy + h/2)         // Left / Front fold
  drawDashedLine(ctx, ox + l/2, oy - h/2, ox + l/2, oy + h/2)         // Front / Right fold
  drawDashedLine(ctx, ox + l/2 + w, oy - h/2, ox + l/2 + w, oy + h/2) // Right / Back fold

  drawDashedLine(ctx, ox - l/2, oy - h/2, ox + l/2, oy - h/2)         // Front / Top lid fold
  drawDashedLine(ctx, ox - l/2, oy - h/2 - w, ox + l/2, oy - h/2 - w) // Top lid / flap fold
  drawDashedLine(ctx, ox - l/2, oy + h/2, ox + l/2, oy + h/2)         // Front / Bottom lid fold
  drawDashedLine(ctx, ox - l/2, oy + h/2 + w, ox + l/2, oy + h/2 + w) // Bottom lid / flap fold

  // Solid cut outer borders
  ctx.beginPath()
  // Start top-left of Left panel
  ctx.moveTo(ox - l/2 - w, oy - h/2)
  // Top margins
  ctx.lineTo(ox - l/2, oy - h/2)
  ctx.lineTo(ox - l/2, oy - h/2 - w)
  ctx.lineTo(ox - l/2 + 12, oy - h/2 - w - w * 0.3) // top lid flap
  ctx.lineTo(ox + l/2 - 12, oy - h/2 - w - w * 0.3)
  ctx.lineTo(ox + l/2, oy - h/2 - w)
  ctx.lineTo(ox + l/2, oy - h/2)
  ctx.lineTo(ox + l/2 + w, oy - h/2)
  ctx.lineTo(ox + l/2 + w + l, oy - h/2)

  // Back panel right margin
  ctx.lineTo(ox + l/2 + w + l, oy + h/2)

  // Bottom margins
  ctx.lineTo(ox + l/2 + w, oy + h/2)
  ctx.lineTo(ox + l/2, oy + h/2)
  ctx.lineTo(ox + l/2, oy + h/2 + w)
  ctx.lineTo(ox + l/2 - 12, oy + h/2 + w + w * 0.3) // bottom lid flap
  ctx.lineTo(ox - l/2 + 12, oy + h/2 + w + w * 0.3)
  ctx.lineTo(ox - l/2, oy + h/2 + w)
  ctx.lineTo(ox - l/2, oy + h/2)
  ctx.lineTo(ox - l/2 - w, oy + h/2)

  // Glue flap on left side
  ctx.lineTo(ox - l/2 - w - 12, oy + h/2 - 8)
  ctx.lineTo(ox - l/2 - w - 12, oy - h/2 + 8)

  ctx.closePath()
  ctx.strokeStyle = '#333333'
  ctx.lineWidth = 1
  ctx.stroke()
}

// 2. RIGID BOX / TWO PIECE LAYOUT (Base + Lid stacked)
function drawRigidBoxNet(ctx: CanvasRenderingContext2D, ox: number, oy: number, l: number, w: number, h: number) {
  // Base Net centered slightly down
  const baseOY = oy + h * 0.8
  const baseH = h * 0.65

  // Dashed folds
  drawDashedLine(ctx, ox - l/2, baseOY - w/2, ox - l/2, baseOY + w/2)
  drawDashedLine(ctx, ox + l/2, baseOY - w/2, ox + l/2, baseOY + w/2)
  drawDashedLine(ctx, ox - l/2, baseOY - w/2, ox + l/2, baseOY - w/2)
  drawDashedLine(ctx, ox - l/2, baseOY + w/2, ox + l/2, baseOY + w/2)

  // Base Solid boundary
  ctx.beginPath()
  ctx.moveTo(ox - l/2, baseOY - w/2)
  ctx.lineTo(ox - l/2, baseOY - w/2 - baseH)
  ctx.lineTo(ox + l/2, baseOY - w/2 - baseH)
  ctx.lineTo(ox + l/2, baseOY - w/2)
  ctx.lineTo(ox + l/2 + baseH, baseOY - w/2)
  ctx.lineTo(ox + l/2 + baseH, baseOY + w/2)
  ctx.lineTo(ox + l/2, baseOY + w/2)
  ctx.lineTo(ox + l/2, baseOY + w/2 + baseH)
  ctx.lineTo(ox - l/2, baseOY + w/2 + baseH)
  ctx.lineTo(ox - l/2, baseOY + w/2)
  ctx.lineTo(ox - l/2 - baseH, baseOY + w/2)
  ctx.lineTo(ox - l/2 - baseH, baseOY - w/2)
  ctx.closePath()
  ctx.strokeStyle = '#333333'
  ctx.stroke()

  // Lid Net centered slightly up (Lid is slightly wider)
  const lidOY = oy - h * 1.1
  const lidH = h * 0.35
  const lidScale = 1.04
  const lL = l * lidScale
  const lW = w * lidScale

  // Dashed folds
  drawDashedLine(ctx, ox - lL/2, lidOY - lW/2, ox - lL/2, lidOY + lW/2)
  drawDashedLine(ctx, ox + lL/2, lidOY - lW/2, ox + lL/2, lidOY + lW/2)
  drawDashedLine(ctx, ox - lL/2, lidOY - lW/2, ox + lL/2, lidOY - lW/2)
  drawDashedLine(ctx, ox - lL/2, lidOY + lW/2, ox + lL/2, lidOY + lW/2)

  // Lid Solid boundary
  ctx.beginPath()
  ctx.moveTo(ox - lL/2, lidOY - lW/2)
  ctx.lineTo(ox - lL/2, lidOY - lW/2 - lidH)
  ctx.lineTo(ox + lL/2, lidOY - lW/2 - lidH)
  ctx.lineTo(ox + lL/2, lidOY - lW/2)
  ctx.lineTo(ox + lL/2 + lidH, lidOY - lW/2)
  ctx.lineTo(ox + lL/2 + lidH, lidOY + lW/2)
  ctx.lineTo(ox + lL/2, lidOY + lW/2)
  ctx.lineTo(ox + lL/2, lidOY + lW/2 + lidH)
  ctx.lineTo(ox - lL/2, lidOY + lW/2 + lidH)
  ctx.lineTo(ox - lL/2, lidOY + lW/2)
  ctx.lineTo(ox - lL/2 - lidH, lidOY + lW/2)
  ctx.lineTo(ox - lL/2 - lidH, lidOY - lW/2)
  ctx.closePath()
  ctx.stroke()
}

// 3. MAILER NET LAYOUT
function drawMailerNet(ctx: CanvasRenderingContext2D, ox: number, oy: number, l: number, w: number, h: number) {
  // Center Bottom panel centered at ox, oy
  // Folds
  drawDashedLine(ctx, ox - l/2, oy - w/2, ox - l/2, oy + w/2)
  drawDashedLine(ctx, ox + l/2, oy - w/2, ox + l/2, oy + w/2)
  drawDashedLine(ctx, ox - l/2, oy - w/2, ox + l/2, oy - w/2)
  drawDashedLine(ctx, ox - l/2, oy + w/2, ox + l/2, oy + w/2)

  // Back panel fold (above) & Lid fold
  drawDashedLine(ctx, ox - l/2, oy - w/2 - h, ox + l/2, oy - w/2 - h)
  // Front panel fold (below) & Front flap fold
  drawDashedLine(ctx, ox - l/2, oy + w/2 + h, ox + l/2, oy + w/2 + h)

  // Mailer Outer Boundary
  ctx.beginPath()
  // Start left of Left wall
  ctx.moveTo(ox - l/2 - h, oy - w/2)
  // Back wall tabs
  ctx.lineTo(ox - l/2 - h * 0.4, oy - w/2 - h)
  ctx.lineTo(ox - l/2, oy - w/2 - h)
  
  // Back wall top
  ctx.lineTo(ox - l/2, oy - w/2 - h - w)
  ctx.lineTo(ox - l/2 + 10, oy - w/2 - h - w - h * 0.4) // lid tuck tab
  ctx.lineTo(ox + l/2 - 10, oy - w/2 - h - w - h * 0.4)
  ctx.lineTo(ox + l/2, oy - w/2 - h - w)
  ctx.lineTo(ox + l/2, oy - w/2 - h)

  // Right Back tab
  ctx.lineTo(ox + l/2 + h * 0.4, oy - w/2 - h)
  ctx.lineTo(ox + l/2 + h, oy - w/2)

  // Right wall
  ctx.lineTo(ox + l/2 + h, oy + w/2)
  
  // Right Front tab
  ctx.lineTo(ox + l/2 + h * 0.4, oy + w/2 + h)
  ctx.lineTo(ox + l/2, oy + w/2 + h)

  // Front Wall
  ctx.lineTo(ox + l/2, oy + w/2 + h + h * 0.6) // front tuck lock
  ctx.lineTo(ox - l/2, oy + w/2 + h + h * 0.6)
  ctx.lineTo(ox - l/2, oy + w/2 + h)

  // Left Front tab
  ctx.lineTo(ox - l/2 - h * 0.4, oy + w/2 + h)
  ctx.lineTo(ox - l/2 - h, oy + w/2)

  ctx.closePath()
  ctx.strokeStyle = '#333333'
  ctx.stroke()
}

// 4. ANNOTATIONS (Length, Width, Height labels)
function drawAnnotations(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  l: number,
  w: number,
  h: number,
  dimensions: Dimensions,
  boxType: BoxType
) {
  const labelL = `${dimensions.length} ${dimensions.unit}`;
  const labelW = `${dimensions.width} ${dimensions.unit}`;
  const labelH = `${dimensions.height} ${dimensions.unit}`;

  if (boxType === 'rigid_lid_base' || boxType === 'gift') {
    const baseOY = oy + h * 0.8;
    // Length horizontal annotation (under base center)
    drawArrowLine(ctx, ox - l/2, baseOY + w/2 + 25, ox + l/2, baseOY + w/2 + 25, `L: ${labelL}`, 'horizontal');
    // Width horizontal annotation (right of base center)
    drawArrowLine(ctx, ox + l/2 + 25, baseOY - w/2, ox + l/2 + 25, baseOY + w/2, `W: ${labelW}`, 'vertical');
    // Base Height vertical annotation (left of base center flap)
    drawArrowLine(ctx, ox - l/2 - h * 0.65 - 15, baseOY - w/2, ox - l/2 - h * 0.65 - 15, baseOY + w/2, `H: ${labelH}`, 'vertical');
  } else if (boxType === 'mailer') {
    // Length below center bottom panel
    drawArrowLine(ctx, ox - l/2, oy + w/2 + 25, ox + l/2, oy + w/2 + 25, `L: ${labelL}`, 'horizontal');
    // Width right of center bottom panel
    drawArrowLine(ctx, ox + l/2 + 25, oy - w/2, ox + l/2 + 25, oy + w/2, `W: ${labelW}`, 'vertical');
    // Height vertical (left of Left wall)
    drawArrowLine(ctx, ox - l/2 - h - 15, oy - w/2, ox - l/2 - h - 15, oy + w/2, `H: ${labelH}`, 'vertical');
  } else {
    // Standard Tuck end
    // Length annotation
    drawArrowLine(ctx, ox - l/2, oy + h/2 + 25, ox + l/2, oy + h/2 + 25, `L: ${labelL}`, 'horizontal');
    // Width horizontal annotation
    drawArrowLine(ctx, ox + l/2, oy + h/2 + 25, ox + l/2 + w, oy + h/2 + 25, `W: ${labelW}`, 'horizontal');
    // Height vertical annotation
    drawArrowLine(ctx, ox - l/2 - w - 25, oy - h/2, ox - l/2 - w - 25, oy + h/2, `H: ${labelH}`, 'vertical');
  }
}

// 5. FACE PANEL LABELS
function drawFaceLabels(ctx: CanvasRenderingContext2D, ox: number, oy: number, l: number, w: number, h: number, boxType: BoxType) {
  ctx.save()
  ctx.fillStyle = '#999999'
  ctx.font = 'bold 9px Inter, monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  if (boxType === 'rigid_lid_base' || boxType === 'gift') {
    const baseOY = oy + h * 0.8
    ctx.fillText('BASE BOTTOM', ox, baseOY)
    ctx.fillText('SIDE L', ox - l/2 - (h * 0.65)/2, baseOY)
    ctx.fillText('SIDE R', ox + l/2 + (h * 0.65)/2, baseOY)
    ctx.fillText('WALL F', ox, baseOY + w/2 + (h * 0.65)/2)
    ctx.fillText('WALL B', ox, baseOY - w/2 - (h * 0.65)/2)

    const lidOY = oy - h * 1.1
    const lidH = h * 0.35
    ctx.fillText('LID TOP', ox, lidOY)
    ctx.fillText('LID L', ox - l/2 - lidH/2, lidOY)
    ctx.fillText('LID R', ox + l/2 + lidH/2, lidOY)
    ctx.fillText('LID F', ox, lidOY + w/2 + lidH/2)
    ctx.fillText('LID B', ox, lidOY - w/2 - lidH/2)

  } else if (boxType === 'mailer') {
    ctx.fillText('BOTTOM PANEL', ox, oy)
    ctx.fillText('LEFT WALL', ox - l/2 - h/2, oy)
    ctx.fillText('RIGHT WALL', ox + l/2 + h/2, oy)
    ctx.fillText('BACK WALL', ox, oy - w/2 - h/2)
    ctx.fillText('FRONT WALL', ox, oy + w/2 + h/2)
    ctx.fillText('TOP LID', ox, oy - w/2 - h - w/2)

  } else {
    // Tuck net
    ctx.fillText('FRONT', ox, oy)
    ctx.fillText('RIGHT', ox + l/2 + w/2, oy)
    ctx.fillText('BACK', ox + l/2 + w + l/2, oy)
    ctx.fillText('LEFT', ox - l/2 - w/2, oy)
    ctx.fillText('TOP LID', ox, oy - h/2 - w/2)
    ctx.fillText('BOTTOM', ox, oy + h/2 + w/2)
    ctx.fillText('GLUE FLAP', ox - l/2 - w - 6, oy)
  }
  ctx.restore()
}

// 6. LOGO WATERMARK GRID BACKGROUND
async function drawWatermarkTile(ctx: CanvasRenderingContext2D, sizeW: number, sizeH: number, src: string): Promise<void> {
  await new Promise<void>(resolve => {
    const wm = new Image()
    wm.onload = () => {
      ctx.save()
      ctx.globalAlpha = 0.04  // 4% opacity repeating logo grid
      ctx.translate(sizeW / 2, sizeH / 2)
      ctx.rotate(-Math.PI / 6)
      ctx.translate(-sizeW / 2, -sizeH / 2)
      
      const wmW = sizeW * 0.16
      const wmH = (wm.height / wm.width) * wmW
      
      const cols = Math.ceil((sizeW * 1.5) / (wmW * 1.4)) + 1
      const rows = Math.ceil((sizeH * 1.5) / (wmH * 2.2)) + 1
      
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * wmW * 1.4 - sizeW * 0.25
          const y = r * wmH * 2.2 - sizeH * 0.25
          ctx.drawImage(wm, x, y, wmW, wmH)
        }
      }
      ctx.restore()
      resolve()
    }
    wm.onerror = () => resolve()
    wm.src = src
  })
}
