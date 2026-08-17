import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

/**
 * 요소 내부 포인터 위치를 0~1 비율(x, y)로 정규화해 전달하는 드래그 훅.
 * SaturationPanel(2축)과 HueSlider(1축)가 동일한 클램프/캡처 로직을 공유하기 위해 분리.
 */
export function usePointerDrag<T extends HTMLElement>(
  onUpdate: (ratioX: number, ratioY: number) => void,
) {
  const ref = useRef<T>(null)

  const updateFromPointer = (event: ReactPointerEvent<T>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width)
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height)

    onUpdate(x / rect.width, y / rect.height)
  }

  const onPointerDown = (event: ReactPointerEvent<T>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    updateFromPointer(event)
  }

  const onPointerMove = (event: ReactPointerEvent<T>) => {
    if (event.buttons !== 1) return
    updateFromPointer(event)
  }

  return { ref, onPointerDown, onPointerMove }
}
