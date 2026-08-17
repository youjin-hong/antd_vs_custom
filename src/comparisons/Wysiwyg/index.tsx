import ComparisonView from '../../components/ComparisonView'
import AntdWysiwyg from './Antd'
import CustomWysiwyg from './Custom'

function WysiwygComparison() {
  return <ComparisonView antd={<AntdWysiwyg />} custom={<CustomWysiwyg />} />
}

export default WysiwygComparison
