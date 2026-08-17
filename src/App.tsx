import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { comparisons } from './comparisons'

const tabItems: TabsProps['items'] = comparisons.map(
  ({ key, label, Component }) => ({
    key,
    label,
    children: <Component />,
  }),
)

function App() {
  return (
    <div className="mx-auto w-full max-w-[1126px] px-5 py-6 lg:py-8">
      <h1 className="my-5 text-[36px] font-medium tracking-[-1.68px] text-text-h lg:my-8 lg:text-[56px]">
        Antd vs Custom
      </h1>
      <Tabs items={tabItems} />
    </div>
  )
}

export default App
