import { ConfigState } from './types'

const BOX_LABELS: Record<string, string> = {
  straight_tuck: "Straight Tuck Box",
  reverse_tuck: "Reverse Tuck Box",
  rigid_lid_base: "Rigid Lid & Base Box",
  mailer: "Mailer Box",
  sleeve: "Sleeve Tube Box",
  drawer: "Drawer Box",
  perfume: "Perfume Box",
  gift: "Gift Box",
  bag: "Paper Bag",
}

export interface CustomerInfo {
  name: string
  phone: string
  company?: string
  email?: string
  message?: string
}

export function generateQuoteSummaryText(
  config: ConfigState,
  customerInfo?: CustomerInfo
): string {
  const boxName = BOX_LABELS[config.boxType] || config.boxType
  const dims = `${config.dimensions.length} × ${config.dimensions.width} × ${config.dimensions.height} ${config.dimensions.unit}`
  const color = config.boxColor || '#F5F0EB'
  const qty = config.quantity.toLocaleString()
  const logoInfo = config.logoDataUrl
    ? `Uploaded (${config.logoFace ? config.logoFace.toUpperCase() : 'TOP'})`
    : 'None'

  let summary = `Product: ${boxName}\nSize: ${dims}\nColour: ${color}\nQuantity: ${qty} units\nLogo: ${logoInfo}`

  if (customerInfo) {
    if (customerInfo.name) summary += `\n\nName: ${customerInfo.name}`
    if (customerInfo.company) summary += `\nCompany: ${customerInfo.company}`
    if (customerInfo.phone) summary += `\nPhone: ${customerInfo.phone}`
    if (customerInfo.email) summary += `\nEmail: ${customerInfo.email}`
    if (customerInfo.message) summary += `\nMessage: ${customerInfo.message}`
  }

  return summary
}

export function generateShareableUrl(config: ConfigState): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const params = new URLSearchParams()

  params.set('preset', config.boxType)
  params.set('l', String(config.dimensions.length))
  params.set('w', String(config.dimensions.width))
  params.set('h', String(config.dimensions.height))
  params.set('unit', config.dimensions.unit)
  params.set('color', config.boxColor)
  params.set('q', String(config.quantity))

  if (config.logoFace) params.set('face', config.logoFace)
  if (config.logoX !== undefined) params.set('lx', String(Math.round(config.logoX * 100)))
  if (config.logoY !== undefined) params.set('ly', String(Math.round(config.logoY * 100)))
  if (config.logoScale !== undefined) params.set('ls', String(Math.round(config.logoScale * 100)))
  if (config.logoRotation !== undefined) params.set('lr', String(config.logoRotation))

  return `${origin}/customize?${params.toString()}`
}

export function generateWhatsAppUrl(
  config: ConfigState,
  customerInfo?: CustomerInfo
): string {
  const phoneNumber = '917087778689'
  const shareUrl = generateShareableUrl(config)
  const boxName = BOX_LABELS[config.boxType] || config.boxType
  const dims = `${config.dimensions.length} × ${config.dimensions.width} × ${config.dimensions.height} ${config.dimensions.unit}`
  const logoInfo = config.logoDataUrl
    ? `Uploaded (${config.logoFace ? config.logoFace.toUpperCase() : 'TOP'})`
    : 'None'

  let text = `Hi InTheBox,\n\nI'd like a quote for this packaging design:\n\n`
  text += `📦 Product: ${boxName}\n`
  text += `📏 Size: ${dims}\n`
  text += `🎨 Colour: ${config.boxColor}\n`
  text += `🔢 Quantity: ${config.quantity.toLocaleString()} units\n`
  text += `🖼️ Logo: ${logoInfo}\n\n`
  text += `🔗 Design Link:\n${shareUrl}\n`

  if (customerInfo?.name) {
    text += `\n👤 Name: ${customerInfo.name}`
  }
  if (customerInfo?.company) {
    text += `\n🏢 Company: ${customerInfo.company}`
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
}

export function parseUrlConfig(searchParams: URLSearchParams): Partial<ConfigState> | null {
  const preset = searchParams.get('preset')
  const l = searchParams.get('l')
  const w = searchParams.get('w')
  const h = searchParams.get('h')
  const unit = searchParams.get('unit') as any
  const color = searchParams.get('color')
  const q = searchParams.get('q')

  if (!preset && !l && !color) return null

  const result: any = {}
  if (preset) result.boxType = preset
  if (color) result.boxColor = color
  if (q) result.quantity = parseInt(q, 10)

  if (l && w && h) {
    result.dimensions = {
      length: parseFloat(l),
      width: parseFloat(w),
      height: parseFloat(h),
      unit: unit || 'mm',
    }
  }

  const face = searchParams.get('face')
  const lx = searchParams.get('lx')
  const ly = searchParams.get('ly')
  const ls = searchParams.get('ls')
  const lr = searchParams.get('lr')

  if (face) result.logoFace = face
  if (lx) result.logoX = parseFloat(lx) / 100
  if (ly) result.logoY = parseFloat(ly) / 100
  if (ls) result.logoScale = parseFloat(ls) / 100
  if (lr) result.logoRotation = parseInt(lr, 10)

  return result
}
