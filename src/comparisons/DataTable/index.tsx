import ComparisonView from '../../components/ComparisonView'
import AntdDataTable from './Antd'
import CustomDataTable from './Custom'

function DataTableComparison() {
  return <ComparisonView antd={<AntdDataTable />} custom={<CustomDataTable />} />
}

export default DataTableComparison
