import { useState } from 'react'
import { ColorPicker, Space } from 'antd'
import type { ColorPickerProps } from 'antd'
import type { Color } from 'antd/es/color-picker'

const presets: ColorPickerProps['presets'] = [
  {
    label: 'Brand',
    colors: ['#1677ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
  },
  {
    label: 'Grayscale',
    colors: ['#000000', '#595959', '#8c8c8c', '#bfbfbf', '#ffffff'],
  },
]

function AntdColorPicker() {
  const [color, setColor] = useState('#1677ff')

  return (
    <Space direction="vertical">
      <ColorPicker
        value={color}
        presets={presets}
        showText
        onChangeComplete={(value: Color) => setColor(value.toHexString())}
      />
      <span>선택된 값: {color}</span>
    </Space>
  )
}

export default AntdColorPicker
