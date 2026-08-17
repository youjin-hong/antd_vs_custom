import ComparisonView from '../../components/ComparisonView'
import AntdChartLibrary from './Antd'
import CustomChartLibrary from './Custom'

function ChartLibraryComparison() {
  return (
    <ComparisonView antd={<AntdChartLibrary />} custom={<CustomChartLibrary />} />
  )
}

export default ChartLibraryComparison
