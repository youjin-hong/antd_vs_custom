import { useEffect, useMemo, useRef, useState } from 'react'
import SaturationPanel from './SaturationPanel'
import HueSlider from './HueSlider'
import AlphaSlider from './AlphaSlider'
import HexInput from './HexInput'
import { hexToHsv, hsvToHex } from './color'
import type { HSV } from './color'

const presets: { label: string; colors: string[] }[] = [
  {
    label: 'Brand',
    colors: ['#1677ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
  },
  {
    label: 'Grayscale',
    colors: ['#000000', '#595959', '#8c8c8c', '#bfbfbf', '#ffffff'],
  },
]

const CHECKERBOARD_STYLE = {
  backgroundImage: 'repeating-conic-gradient(#ccc 0 25%, #fff 0 50%)',
  backgroundSize: '8px 8px',
}

function CustomColorPicker() {
  const [hsv, setHsv] = useState<HSV>(() => hexToHsv('#1677ff'))
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const hex = useMemo(() => hsvToHex(hsv), [hsv])

  useEffect(() => {
    if (!open) return

    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [open])

  return (
    <div className="relative inline-flex flex-col items-center gap-2" ref={containerRef}>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-border px-2 py-1 text-text cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className="inline-block h-5 w-5 rounded border border-border"
          style={CHECKERBOARD_STYLE}
        >
          <span
            className="block h-full w-full rounded-[inherit]"
            style={{ background: hex }}
          />
        </span>
        <span>{hex.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-2 flex w-[220px] flex-col gap-2.5 rounded-lg border border-border bg-bg p-3 shadow-elevated">
          <SaturationPanel
            hue={hsv.h}
            saturation={hsv.s}
            value={hsv.v}
            onChange={(s, v) => setHsv((prev) => ({ ...prev, s, v }))}
          />
          <HueSlider
            hue={hsv.h}
            onChange={(h) => setHsv((prev) => ({ ...prev, h }))}
          />
          <AlphaSlider
            hue={hsv.h}
            saturation={hsv.s}
            value={hsv.v}
            alpha={hsv.a}
            onChange={(a) => setHsv((prev) => ({ ...prev, a }))}
          />
          <HexInput value={hex} onCommit={(next) => setHsv(hexToHsv(next))} />

          {presets.map((group) => (
            <div key={group.label} className="flex flex-col gap-1">
              <span className="text-xs text-text-h">{group.label}</span>
              <div className="flex gap-1.5">
                {group.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="h-5 w-5 rounded border border-border p-0 cursor-pointer"
                    style={{ background: color }}
                    onClick={() => setHsv(hexToHsv(color))}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <span>선택된 값: {hex}</span>
    </div>
  )
}

export default CustomColorPicker
