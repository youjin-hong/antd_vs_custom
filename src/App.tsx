import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { comparisons } from './comparisons'
import './App.css'

const tabItems: TabsProps['items'] = comparisons.map(
  ({ key, label, Component }) => ({
    key,
    label,
    children: <Component />,
  }),
)

function App() {
  return (
    <div id="app-shell">
      <h1>Antd vs Custom</h1>
      <Tabs items={tabItems} />
    </div>
  )
}

export default App
