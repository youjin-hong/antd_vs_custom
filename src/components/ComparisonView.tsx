import type { ReactNode } from 'react'
import './ComparisonView.css'

interface ComparisonViewProps {
  antd: ReactNode
  custom: ReactNode
}

function ComparisonView({ antd, custom }: ComparisonViewProps) {
  return (
    <div className="comparison-view">
      <section className="comparison-panel">
        <h3>Antd</h3>
        <div className="comparison-panel-body">{antd}</div>
      </section>
      <section className="comparison-panel">
        <h3>Custom</h3>
        <div className="comparison-panel-body">{custom}</div>
      </section>
    </div>
  )
}

export default ComparisonView
