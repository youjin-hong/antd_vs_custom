import { Badge, Calendar } from 'antd'
import type { Dayjs } from 'dayjs'
import type { BadgeProps, CalendarProps } from 'antd'
import './Antd.css'

interface Event {
  type: BadgeProps['status']
  content: string
}

const eventsByDate: Record<string, Event[]> = {
  '2026-08-05': [{ type: 'success', content: '스프린트 킥오프' }],
  '2026-08-14': [
    { type: 'warning', content: '릴리즈 배포' },
    { type: 'processing', content: 'QA 회의' },
  ],
  '2026-08-21': [{ type: 'error', content: '마감일' }],
}

function getEvents(date: Dayjs): Event[] {
  return eventsByDate[date.format('YYYY-MM-DD')] ?? []
}

const cellRender: CalendarProps<Dayjs>['cellRender'] = (date, info) => {
  if (info.type !== 'date') return info.originNode

  return (
    <ul className="antd-calendar-events">
      {getEvents(date).map((event) => (
        <li key={event.content}>
          <Badge status={event.type} text={event.content} />
        </li>
      ))}
    </ul>
  )
}

function AntdCalendar() {
  return <Calendar fullscreen={false} cellRender={cellRender} />
}

export default AntdCalendar
