import ComparisonView from '../../components/ComparisonView'
import AntdCalendar from './Antd'
import CustomCalendar from './Custom'

function CalendarComparison() {
  return <ComparisonView antd={<AntdCalendar />} custom={<CustomCalendar />} />
}

export default CalendarComparison
