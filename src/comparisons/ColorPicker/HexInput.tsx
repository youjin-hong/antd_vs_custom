import { useState } from 'react'
import type {
  ChangeEvent,
  CompositionEvent,
  FocusEvent,
  KeyboardEvent,
} from 'react'
import { isValidHex } from './color'

interface HexInputProps {
  value: string
  onCommit: (hex: string) => void
}

const FULL_HEX_LENGTH = '#00000000'.length

function HexInput({ value, onCommit }: HexInputProps) {
  const [text, setText] = useState(value)
  const [isComposing, setIsComposing] = useState(false)
  const [syncedValue, setSyncedValue] = useState(value)

  if (value !== syncedValue && !isComposing) {
    setSyncedValue(value)
    setText(value)
  }

  // 3/4/6자리 hex는 그 자체로 유효하면서 동시에 더 긴 값(6자리 또는 8자리 알파 포함)의
  // 접두사이기도 하다. 타이핑 도중 이 상태에서 바로 커밋해버리면, 뒤이어 입력되는 글자가
  // 부모가 되돌려준 완성된 값으로 덮어써진 입력창 위에 엉뚱한 위치로 들어가며 값이 깨진다.
  // 그래서 더 이상 늘어날 수 없는 8자리(#+8, 알파 포함) 값만 타이핑 중 즉시 커밋하고,
  // 그보다 짧은 형태는 사용자가 입력을 끝냈다고 확정할 수 있는 blur/Enter 시점에만 커밋한다.
  const commitIfComplete = (candidate: string) => {
    if (candidate.length === FULL_HEX_LENGTH && isValidHex(candidate)) {
      onCommit(candidate)
    }
  }

  const commitOrRevert = (candidate: string) => {
    if (isValidHex(candidate)) onCommit(candidate)
    else setText(value)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value
    setText(next)
    // IME 조합 중에는 중간 글자가 hex로 파싱되며 값이 튀는 문제(antd에서 확인된 버그)를
    // 피하기 위해, 조합이 끝난 뒤에만 커밋한다.
    if (!isComposing) commitIfComplete(next)
  }

  const handleCompositionStart = () => setIsComposing(true)

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false)
    commitIfComplete(event.currentTarget.value)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    // compositionend 없이 blur가 먼저 발생하는 환경(일부 브라우저/모바일 IME)에 대비해
    // 항상 조합 상태를 해제한다 — 그렇지 않으면 외부에서 바뀐 값이 이 입력창에 더 이상
    // 반영되지 않는 채로 멈출 수 있다.
    setIsComposing(false)
    commitOrRevert(event.currentTarget.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') commitOrRevert(event.currentTarget.value)
  }

  return (
    <input
      type="text"
      className="rounded border border-border px-2 py-1 font-mono uppercase"
      value={text}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      spellCheck={false}
    />
  )
}

export default HexInput
