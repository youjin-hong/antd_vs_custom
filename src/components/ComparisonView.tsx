import type { ReactNode } from 'react'

interface ComparisonViewProps {
  antd: ReactNode
  custom: ReactNode
}

function ComparisonView({ antd, custom }: ComparisonViewProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <section className="flex-1 min-w-0 rounded-lg border border-border p-4">
        <h3 className="mb-3 text-sm font-semibold text-text-h">Antd</h3>
        <div>{antd}</div>
      </section>
      <section className="flex-1 min-w-0 rounded-lg border border-border p-4">
        <h3 className="mb-3 text-sm font-semibold text-text-h">Custom</h3>
        <div>{custom}</div>
      </section>
    </div>
  )
}

export default ComparisonView
