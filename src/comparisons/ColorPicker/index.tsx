import ComparisonView from '../../components/ComparisonView'
import AntdColorPicker from './Antd'
import CustomColorPicker from './Custom'

function ColorPickerComparison() {
  return (
    <ComparisonView antd={<AntdColorPicker />} custom={<CustomColorPicker />} />
  )
}

export default ColorPickerComparison
