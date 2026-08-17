import type { ComponentType } from 'react'
import ColorPickerComparison from './ColorPicker'
import WysiwygComparison from './Wysiwyg'
import DataTableComparison from './DataTable'
import CalendarComparison from './Calendar'
import ChartLibraryComparison from './ChartLibrary'

export interface ComparisonEntry {
  key: string
  label: string
  Component: ComponentType
}

export const comparisons: ComparisonEntry[] = [
  { key: 'color-picker', label: 'Color Picker', Component: ColorPickerComparison },
  { key: 'wysiwyg', label: 'WYSIWYG', Component: WysiwygComparison },
  { key: 'data-table', label: 'Data Table', Component: DataTableComparison },
  { key: 'calendar', label: 'Calendar', Component: CalendarComparison },
  { key: 'chart-library', label: 'Chart Library', Component: ChartLibraryComparison },
]
