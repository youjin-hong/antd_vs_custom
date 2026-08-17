import type { KeyboardEvent } from 'react'
import { usePointerDrag } from './usePointerDrag'

interface HueSliderProps {
  hue: number
  onChange: (hue: number) => void
}

const STEP = 5

function HueSlider({ hue, onChange }: HueSliderProps) {
  const { ref, onPointerDown, onPointerMove } = usePointerDrag<HTMLDivElement>(
    (ratioX) => onChange(ratioX * 360),
  )

  const clamp = (n: number) => Math.min(Math.max(n, 0), 360)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      onChange(clamp(hue - STEP))
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      onChange(clamp(hue + STEP))
    } else {
      return
    }
    event.preventDefault()
  }

  return (
    <div
      ref={ref}
      className="relative h-3 touch-none rounded-md cursor-pointer bg-[linear-gradient(to_right,red,yellow,lime,cyan,blue,magenta,red)]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      tabIndex={0}
      role="slider"
      aria-label="색상"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={Math.round(hue)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/40%)] pointer-events-none"
        style={{ left: `${(hue / 360) * 100}%` }}
      />
    </div>
  )
}

export default HueSlider
