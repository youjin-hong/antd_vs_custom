import type { KeyboardEvent } from 'react'
import { usePointerDrag } from './usePointerDrag'

interface SaturationPanelProps {
  hue: number
  saturation: number
  value: number
  onChange: (saturation: number, value: number) => void
}

const STEP = 0.02

function SaturationPanel({
  hue,
  saturation,
  value,
  onChange,
}: SaturationPanelProps) {
  const { ref, onPointerDown, onPointerMove } = usePointerDrag<HTMLDivElement>(
    (ratioX, ratioY) => onChange(ratioX, 1 - ratioY),
  )

  const clamp = (n: number) => Math.min(Math.max(n, 0), 1)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        onChange(clamp(saturation - STEP), value)
        break
      case 'ArrowRight':
        onChange(clamp(saturation + STEP), value)
        break
      case 'ArrowUp':
        onChange(saturation, clamp(value + STEP))
        break
      case 'ArrowDown':
        onChange(saturation, clamp(value - STEP))
        break
      default:
        return
    }
    event.preventDefault()
  }

  return (
    <div
      ref={ref}
      className="relative h-[140px] w-full touch-none rounded cursor-crosshair"
      style={{ background: `hsl(${hue}, 100%, 50%)` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      tabIndex={0}
      role="slider"
      aria-label="채도 및 명도"
      aria-valuetext={`채도 ${Math.round(saturation * 100)}%, 명도 ${Math.round(value * 100)}%`}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(to_right,#fff,rgb(255_255_255/0%))]" />
      <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(to_top,#000,rgb(0_0_0/0%))]" />
      <div
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/40%)] pointer-events-none"
        style={{
          left: `${saturation * 100}%`,
          top: `${(1 - value) * 100}%`,
        }}
      />
    </div>
  )
}

export default SaturationPanel
