export interface HSV {
  h: number
  s: number
  v: number
  a: number
}

export function isValidHex(value: string): boolean {
  return /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)
}

export function hexToHsv(hex: string): HSV {
  const hasShorthandAlpha = hex.length === 5
  const isShorthand = hex.length === 4 || hasShorthandAlpha

  const normalized = isShorthand
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}${
        hasShorthandAlpha ? hex[4] + hex[4] : ''
      }`
    : hex

  const r = parseInt(normalized.slice(1, 3), 16) / 255
  const g = parseInt(normalized.slice(3, 5), 16) / 255
  const b = parseInt(normalized.slice(5, 7), 16) / 255
  const a = normalized.length === 9 ? parseInt(normalized.slice(7, 9), 16) / 255 : 1

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6
    else if (max === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4
    h *= 60
    if (h < 0) h += 360
  }

  const s = max === 0 ? 0 : delta / max
  const v = max

  return { h, s, v, a }
}

export function hsvToHex({ h, s, v, a }: HSV): string {
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c

  let r: number
  let g: number
  let b: number
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]

  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, '0')

  const toAlphaHex = (n: number) =>
    Math.round(n * 255)
      .toString(16)
      .padStart(2, '0')

  const alphaHex = a < 1 ? toAlphaHex(a) : ''

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaHex}`
}
