import type { KeyboardEvent } from 'react'
import { usePointerDrag } from './usePointerDrag'
import { hsvToHex } from './color'

interface AlphaSliderProps {
  hue: number
  saturation: number
  value: number
  alpha: number
  onChange: (alpha: number) => void
}

const STEP = 0.05

function AlphaSlider({
  hue,
  saturation,
  value,
  alpha,
  onChange,
}: AlphaSliderProps) {
  const { ref, onPointerDown, onPointerMove } = usePointerDrag<HTMLDivElement>(
    (ratioX) => onChange(ratioX),
  )

  const clamp = (n: number) => Math.min(Math.max(n, 0), 1)
  const opaqueHex = hsvToHex({ h: hue, s: saturation, v: value, a: 1 })

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      onChange(clamp(alpha - STEP))
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      onChange(clamp(alpha + STEP))
    } else {
      return
    }
    event.preventDefault()
  }

  return (
    <div
      ref={ref}
      className="relative h-3 touch-none rounded-md cursor-pointer"
      style={{
        backgroundImage: `linear-gradient(to right, transparent, ${opaqueHex}), repeating-conic-gradient(#ccc 0 25%, #fff 0 50%)`,
        backgroundSize: '100% 100%, 8px 8px',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      tabIndex={0}
      role="slider"
      aria-label="투명도"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(alpha * 100)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/40%)] pointer-events-none"
        style={{ left: `${alpha * 100}%` }}
      />
    </div>
  )
}

export default AlphaSlider
